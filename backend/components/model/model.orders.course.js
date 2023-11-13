const Sequelize = require("sequelize");
const sequelize = require("../../config/config.db");
const User = require("./model.user");

const course_orders = sequelize.define("course_orders", {
  Orders_totalAmount: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  Orders_status: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: "Pending", // Set the default value to "Pending"
  },
});

course_orders.belongsTo(User, { foreignKey: "Orders_user" });

module.exports = course_orders;
