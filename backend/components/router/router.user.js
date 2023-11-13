const {
  createOneOrder,
  getOptionCourseMostOrder,
} = require("../controller/controller.user");
const router = require("express").Router();

router.post("/order", createOneOrder);
router.get("/order/most-opt/:courseId",getOptionCourseMostOrder);

module.exports = router;
