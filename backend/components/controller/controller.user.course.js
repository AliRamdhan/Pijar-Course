const User = require("../model/model.user");
const Order = require("../model/model.orders.course");
const OrderItem = require("../model/model.orders.items.course");
const Course = require("../model/model.course");
const OptionCourse = require("../model/model.course.variation.option");
const UserCourse = require("../model/model.user.course");

const getCourseUser = async (req, res) => {
  const user = req.params.userId;
  try {
    const courses = await UserCourse.findAll({
      where: { UserCourse_User: user },
      include: [Course],
    });
    const CourseUser = [];
    const orders = await Order.findAll({
      where: {
        Orders_user: user,
        Orders_status: "Succes",
      },
      attributes: ["createdAt", "updatedAt"],
    });
    CourseUser.push({
      courses,
      orders,
    });
    if (!courses || courses.length == 0) {
      res
        .status(404)
        .json({ message: "Not buy course yet by user ", Course: CourseUser });
    }
    res
      .status(200)
      .json({ message: "List course by User", Course: CourseUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

module.exports = {
  getCourseUser,
};
