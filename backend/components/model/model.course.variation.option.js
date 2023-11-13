const Sequelize = require("sequelize");
const sequelize = require("../../config/config.db");
const course = require("./model.course");

const variation_option = sequelize.define("course_variation_option", {
  Option_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  Option_description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  Option_priceAdjusment: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

variation_option.belongsTo(course, { foreignKey: "Option_course" });
module.exports = variation_option;
