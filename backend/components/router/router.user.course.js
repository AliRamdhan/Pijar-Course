const { getCourseUser } = require("../controller/controller.user.course");
const router = require("express").Router();

router.get("/my/:userId", getCourseUser);

module.exports = router;
