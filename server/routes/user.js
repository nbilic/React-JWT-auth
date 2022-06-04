const {
  createSessionHandler,
  getSessionHandler,
  deleteSessionHandler,
} = require("../controllers/session.controller");
const { requireUser } = require("../middleware/requireUser");
const router = require("express").Router();

// login
router.post("/session", createSessionHandler);

// get the current session
router.get("/session", requireUser, getSessionHandler);

// logout
router.delete("/session", requireUser, deleteSessionHandler);
module.exports = router;
