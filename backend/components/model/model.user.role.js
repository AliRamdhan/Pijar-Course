const Sequelize = require("sequelize");
const sequelize = require("../../config/config.db");
const roles = sequelize.define("users_roles", {
  Role_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});
//admin,mentor,student
module.exports = roles;
