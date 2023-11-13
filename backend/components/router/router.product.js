const {
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
} = require("../controller/controller.product");
const router = require("express").Router();
const {
  uploadCourse,
  uploadMateri,
  uploadTools,
} = require("../../middleware/multer.middleware");

router.get("/cat/all", getAllCategory);
router.post("/cat/create", createOneCategory);
router.get("/cro/all", getAllCourse);
router.get("/cro/:courseId", getDetailsCourse);
router.get("/cro/all/:categoryId", getCourseByCategory);

router.post(
  "/cro/create",
  uploadCourse.single("Course_image"),
  createOneCourse
);
router.post(
  "/cro/materi/create",
  uploadMateri.single("Materi_image"),
  createOneMateriCourse
);
router.post(
  "/cro/tools/create",
  uploadTools.single("Tools_image"),
  createOneToolsCourse
);
router.get("/cro/materi/:courseId", getAllMateriCourse);
router.get("/cro/opt/:courseId", getAllOptionsCourse);
router.get("/cro/tools/:courseId", getAllToolsCourse);
router.post("/cro/opt/create", createOneOptionCourse);

module.exports = router;
