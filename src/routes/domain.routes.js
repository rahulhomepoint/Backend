const express = require("express");
const { getAllDomains, countActiveDomains, countExpiredDomains } = require("../controllers/Domains/GetDomains");
const router = express.Router();

router.get("/domains", getAllDomains);
router.get("/domains/active-count", countActiveDomains);
router.get("/domains/expired-count", countExpiredDomains);

module.exports = router;
