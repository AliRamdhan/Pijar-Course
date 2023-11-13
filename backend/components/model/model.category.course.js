const Sequelize = require("sequelize");
const sequelize = require("../../config/config.db");

const category = sequelize.define("course_categories", {
  Category_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = category