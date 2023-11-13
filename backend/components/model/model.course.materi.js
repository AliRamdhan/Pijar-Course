const Sequelize = require("sequelize");
const sequelize = require("../../config/config.db");
const course = require("./model.course");
const materi = sequelize.define("course_materi", {
  Materi_image: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  Materi_video: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  Materi_module: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  Materi_description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  Materi_time: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

materi.belongsTo(course, { foreignKey: "Materi_course" });
module.exports = materi;
