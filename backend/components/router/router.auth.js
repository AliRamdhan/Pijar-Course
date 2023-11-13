const router = require("express").Router();
const {
  authRegisterUser,
  authLoginUser,
  authHome,
} = require("../controller/controller.auth");

const {
  isAdmin,
  isUser,
  isMentor,
} = require("../../middleware/auth.middleware");
const passport = require("../../middleware/passport.middleware");
router.post("/register", authRegisterUser);
router.post("/login", authLoginUser);
router.get(
  "/home",
  passport.authenticate("jwt", { session: false }),
  isUser,
  authHome
);

router.get(
  "/admin/home",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  authHome
);

router.get(
  "/mentor/home",
  passport.authenticate("jwt", { session: false }),
  isMentor,
  authHome
);
module.exports = router;
