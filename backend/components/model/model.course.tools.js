const Sequelize = require("sequelize");
const sequelize = require("../../config/config.db");
const course = require("../model/model.course");
const tools = sequelize.define("course_tools", {
  Tools_image: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  Tools_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  Tools_description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

tools.belongsTo(course, { foreignKey: "Tools_course" });
module.exports = tools;
