const Sequelize = require("sequelize");
const sequelize = require("../../config/config.db");
const Category = require("./model.category.course");
const Course = sequelize.define("course", {
  Course_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  Course_description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  Course_release_date: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  Course_image: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

Course.belongsTo(Category, { foreignKey: "Course_category" });

module.exports = Course;
