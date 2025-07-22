const express = require("express");
const router = express.Router();
const { login } = require("../controllers/Auth/login");
const {
  createAccount,
  getAllUsers,
  updateUser,
  getSingleUser,
  requestPasswordReset,
  resetPasswordWithOTP,
  countUsers,
} = require("../controllers/Auth/CreateAccount");
const projectRoutes = require("./project.routes");
const amenityRoutes = require("./amenity.routes");
const domainsRoutes = require("./domain.routes");
const homeHeroRoutes = require("./homehero.routes");
const homeAboutRoutes = require("./homeabout.routes");
const associatedeveloperRoutes = require("./associatedeveloper.routes");
const paymentListRoutes = require("./paymentlist.routes");

router.post("/login", login);
router.post("/create", createAccount);
router.get("/users", getAllUsers);
router.get("/users/:id", getSingleUser);
router.put("/users/:id", updateUser);
router.post("/request-password-reset", requestPasswordReset);
router.post("/reset-password-otp", resetPasswordWithOTP);
router.get("/users-count", countUsers);
router.use(projectRoutes);
router.use(amenityRoutes);
router.use(domainsRoutes);
router.use(homeHeroRoutes);
router.use(homeAboutRoutes);
router.use(associatedeveloperRoutes);
router.use(paymentListRoutes);

module.exports = router;
