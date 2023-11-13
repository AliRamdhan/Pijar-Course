//CRUD PRODUCT + CATEGORY
const Course = require("../model/model.course");
const Category = require("../model/model.category.course");
const Materi = require("../model/model.course.materi");
const Tools = require("../model/model.course.tools");
const OptionCourse = require("../model/model.course.variation.option");

const getAllCategory = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res
      .status(200)
      .json({ message: "List all category course", Category: categories });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createOneCategory = async (req, res) => {
  const { Category_name } = req.body;
  try {
    if (Category_name) {
      const categories = await Category.findOne({
        where: { Category_name: Category_name },
      });
      if (categories) {
        res.status(404).json({ message: "categories was created" });
      } else {
        const category = await Category.create({
          Category_name: Category_name,
        });
        res.status(200).json({
          message: "Category was created",
          Category: category,
        });
      }
    } else {
      res.status(400).json({ error: "Category_name is required" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllCourse = async (req, res) => {
  try {
    const courses = await Course.findAll();
    res.status(200).json({ message: "List all course", Course: courses });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getDetailsCourse = async (req, res) => {
  try {
    const products = await Course.findByPk(req.params.courseId);
    res.status(200).json({ message: "List details course", Product: products });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getCourseByCategory = async (req, res) => {
  try {
    const course = await Course.findAll({
      where: { Course_category: req.params.categoryId },
      attributes: [
        "Course_name",
        "Course_description",
        "Course_release_date",
        "Course_image",
        "Course_category",
      ],
    });
    res
      .status(200)
      .json({ message: "List all course by category", Course: course });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createOneCourse = async (req, res) => {
  const {
    Course_name,
    Course_description,
    Course_release_date,
    Course_category,
  } = req.body;
  const Course_image = req.file;
  try {
    const courseName = await Course.findOne({
      where: { Course_name: Course_name },
    });
    if (courseName) {
      res.status(201).json({ message: "Course name have used" });
    } else {
      const courseCat = await Category.findOne({
        where: { id: Course_category },
      });
      if (!courseCat) {
        res.status(404).json({ message: "Category not found" });
      } else {
        const course = await Course.create({
          Course_name: Course_name,
          Course_description: Course_description,
          Course_release_date: Course_release_date,
          Course_image: Course_image.filename,
          Course_category: courseCat.id,
        });
        res
          .status(200)
          .json({ message: "Succes create one course", Course: course });
      }
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllMateriCourse = async (req, res) => {
  try {
    const materi = await Materi.findAll({
      where: { Materi_course: req.params.courseId },
    });
    res
      .status(200)
      .json({ message: "List all materi of course", Materi: materi });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createOneMateriCourse = async (req, res) => {
  const {
    Materi_video,
    Materi_module,
    Materi_description,
    Materi_time,
    Materi_course,
  } = req.body;
  const Materi_image = req.file;
  try {
    const course = await Course.findByPk(Materi_course);
    if (!course) {
      res.status(404).json({ message: "Course not found" });
    } else {
      const materi = await Materi.create({
        Materi_video: Materi_video,
        Materi_module: Materi_module,
        Materi_description: Materi_description,
        Materi_time: Materi_time,
        Materi_image: Materi_image.filename,
        Materi_course: course.id,
      });
      res
        .status(200)
        .json({ message: "succesffull create materi course", Materi: materi });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllToolsCourse = async (req, res) => {
  try {
    const tools = await Tools.findAll({
      where: { Tools_course: req.params.courseId },
    });
    res.status(200).json({ message: "List all tools of course", Tools: tools });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createOneToolsCourse = async (req, res) => {
  const { Tools_name, Tools_description, Tools_course } = req.body;
  const Tools_image = req.file;
  try {
    const course = await Course.findByPk(Tools_course);
    if (!course) {
      res.status(404).json({ message: "Course not found" });
    } else {
      const tools = await Tools.create({
        Tools_name: Tools_name,
        Tools_description: Tools_description,
        Tools_course: course.id,
        Tools_image: Tools_image.filename,
      });
      res
        .status(200)
        .json({ message: "succesffull create tools course", Tools: tools });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllOptionsCourse = async (req, res) => {
  try {
    const options = await OptionCourse.findAll({
      where: { Option_course: req.params.courseId },
    });
    res
      .status(200)
      .json({ message: "List all option course of course", Option: options });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const createOneOptionCourse = async (req, res) => {
  const {
    Option_name,
    Option_description,
    Option_priceAdjusment,
    Option_course,
  } = req.body;
  try {
    const course = await Course.findByPk(Option_course);
    if (!course) {
      res.status(404).json({ message: "Course not found" });
    } else {
      const options = await OptionCourse.create({
        Option_name: Option_name,
        Option_description: Option_description,
        Option_priceAdjusment: Option_priceAdjusment,
        Option_course: course.id,
      });
      res.status(200).json({
        message: "succesffull create options course",
        Options: options,
      });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports = {
  getAllCategory,
  createOneCategory,
  getAllCourse,
  getDetailsCourse,
  getCourseByCategory,
  createOneCourse,
  getAllMateriCourse,
  createOneMateriCourse,
  getAllToolsCourse,
  createOneToolsCourse,
  getAllOptionsCourse,
  createOneOptionCourse,
};
