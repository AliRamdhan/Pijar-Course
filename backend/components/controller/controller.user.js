const User = require("../model/model.user");
const Order = require("../model/model.orders.course");
const OrderItem = require("../model/model.orders.items.course");
const Course = require("../model/model.course");
const OptionCourse = require("../model/model.course.variation.option");
const UserCourse = require("../model/model.user.course");
const Sequelize = require("sequelize");

const getOptionCourseMostOrder = async (req, res) => {
  const courseId = req.params.courseId; // Assuming you pass the course ID as a parameter

  try {
    const mostOrderedOptions = await OrderItem.findAll({
      attributes: [
        "OrdersItems_option_course",
        [
          Sequelize.fn("COUNT", "OrdersItems_option_course"),
          "OptionOrderCount",
        ],
      ],
      where: { OrdersItems_course: courseId },
      group: ["OrdersItems_option_course"],
      order: [[Sequelize.literal("OptionOrderCount"), "DESC"]],
      include: [
        {
          model: OptionCourse,
          attributes: ["Option_name", "Option_description"],
        },
      ],
      limit: 1, // You can limit the result to the top N options
    });

    res.status(200).json({
      message: "Most option that ordered",
      Options: mostOrderedOptions,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal server error", error: error.message });
  }
};

const createOneOrder = async (req, res) => {
  const {
    Orders_totalAmount,
    Orders_user,
    OrdersItems_quantity,
    OrdersItems_unitPrice,
    OrdersItems_course,
    OrdersItems_option_course,
  } = req.body;

  try {
    const user = await User.findByPk(Orders_user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const course = await Course.findByPk(OrdersItems_course);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    const option = await OptionCourse.findByPk(OrdersItems_option_course);
    if (!option) {
      return res.status(404).json({ message: "Course option not found" });
    }
    // Create the main order
    const order = await Order.create({
      Orders_totalAmount: Orders_totalAmount || 0,
      Orders_user: user.id,
    });
    if (!order) {
      return res.status(500).json({ message: "Failed to create the order" });
    }

    // Create the order item
    const orderItem = await OrderItem.create({
      OrdersItems_quantity,
      OrdersItems_unitPrice,
      OrdersItems_order: order.id,
      OrdersItems_course: course.id,
      OrdersItems_option_course: option.id,
    });

    if (!orderItem) {
      return res
        .status(500)
        .json({ message: "Failed to create the order item" });
    }

    // Update the total amount of the main order based on the option price adjustment
    const price = OrdersItems_quantity * option.Option_priceAdjusment;
    const pricePPN = price * 0.1;
    const totalPrice = price + pricePPN;
    order.Orders_totalAmount = totalPrice;
    await order.save();

    res.json({
      message: "Successful order created",
      Order: order,
      Items: orderItem,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createPaymentOrder = async (req, res) => {
  try {
    const { orderItemId, userId } = req.body; // Assuming you pass orderId and userId in the request body

    // Update order status to "Paid" or handle the payment success logic
    const orderItem = await OrderItem.findByPk(orderItemId);

    const order = await Order.findByPk(orderItem.OrdersItems_order);
    order.Orders_status = "Succes";
    await order.save();

    // Find the course associated with the order
    const course = await Course.findByPk(orderItem.OrdersItems_course);

    // Associate the user with the course
    await UserCourse.create({
      UserCourse_User: userId,
      UserCourse_Course: course.id,
    });

    // Optionally, you can send a response back to the client
    res
      .status(200)
      .json({ message: "Payment successful. Access to the course granted." });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getTrackCourseOrder = async (req, res) => {
  const user = req.params.userId;
  try {
    const orders = await Order.findAll({
      where: {
        Orders_user: user,
      },
    });

    if (!orders || orders.length === 0) {
      return res
        .status(404)
        .json({ message: "No orders found for the given user" });
    }

    // Retrieve order items for each order
    const OrderItems = [];
    for (const order of orders) {
      const orderItems = await OrderItem.findAll({
        where: {
          OrdersItems_order: order.id,
        },
        include: [
          { model: Course, attributes: ["id", "Course_name"] },
          {
            model: OptionCourse,
            attributes: ["Option_name", "Option_description"],
          },
        ],
      });
      OrderItems.push({
        order,
        orderItems,
      });
    }

    res.status(200).json({
      message: "Orders and Order Items for the given user ID",
      Orders: OrderItems,
    });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createOneOrder,
  createPaymentOrder,
  getTrackCourseOrder,
  getOptionCourseMostOrder,
};
