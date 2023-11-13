const User = require("../model/model.user");
const Order = require("../model/model.orders.course");
const OrderItem = require("../model/model.orders.items.course");
const Course = require("../model/model.course");
const OptionCourse = require("../model/model.course.variation.option");
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

    res
      .status(200)
      .json({
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

module.exports = {
  createOneOrder,
  getOptionCourseMostOrder,
};
