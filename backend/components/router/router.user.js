const {
  createOneOrder,
  createPaymentOrder,
  getTrackCourseOrder,
  getOptionCourseMostOrder,
} = require("../controller/controller.user");
const router = require("express").Router();

router.post("/order", createOneOrder);
router.post("/payment", createPaymentOrder);
router.get("/history/:userId", getTrackCourseOrder);
router.get("/order/most-opt/:courseId", getOptionCourseMostOrder);

module.exports = router;
