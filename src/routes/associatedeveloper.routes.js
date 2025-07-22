const express = require("express");
const router = express.Router();
const {
  createAssociateDeveloper,
  getAssociateDeveloper,
  updateAssociateDeveloper,
  deleteAssociateDeveloper,
} = require("../controllers/Dashboard/AssociateDeveloperController");

router.post("/associatedeveloper", createAssociateDeveloper);
router.get("/associatedeveloper", getAssociateDeveloper);
router.put("/associatedeveloper/:id", updateAssociateDeveloper);
router.delete("/associatedeveloper/:id", deleteAssociateDeveloper);
// router.put("/associatedeveloper/index/:index", updateAssociateDeveloper);
// router.delete("/associatedeveloper/index/:index", deleteAssociateDeveloper);
router.put("/associatedeveloper/:id/:index", updateAssociateDeveloper);

module.exports = router; 