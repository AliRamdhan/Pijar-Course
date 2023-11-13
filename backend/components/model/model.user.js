const Sequelize = require("sequelize");
const sequelize = require("../../config/config.db");
const Role = require("./model.user.role");
const User = sequelize.define("users", {
  User_username: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  User_firstname: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  User_lastname: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  User_phoneNumber: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  User_email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  User_password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

User.belongsTo(Role, { foreignKey: "User_role" });

module.exports = User;
