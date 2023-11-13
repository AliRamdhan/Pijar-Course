const Sequelize = require("sequelize");
const sequelize = require("../../config/config.db");

const Order = require("./model.orders.course");
const Course = require("./model.course");
const Options = require("./model.course.variation.option");
const OrdersItems = sequelize.define("course_orders_items", {
  OrdersItems_quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  OrdersItems_unitPrice: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

OrdersItems.belongsTo(Order, {
  foreignKey: "OrdersItems_order",
});

OrdersItems.belongsTo(Course, {
  foreignKey: "OrdersItems_course",
});

OrdersItems.belongsTo(Options, {
  foreignKey: "OrdersItems_option_course",
});

module.exports = OrdersItems;
