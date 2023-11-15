const Sequelize = require("sequelize");
const sequelize = require("../../config/config.db");
const User = require("./model.user");
const Course = require("./model.course");
const UserCourse = sequelize.define("users_course", {});

UserCourse.belongsTo(User, { foreignKey: "UserCourse_User" });
UserCourse.belongsTo(Course, { foreignKey: "UserCourse_Course" });

module.exports = UserCourse;
