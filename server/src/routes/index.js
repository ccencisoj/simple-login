const router = require("express").Router();

router.use("/api/user", require("./api/user"));
router.use("/api/avatar", require("./api/avatar"));
router.use("/api/profile", require("./api/profile"));
router.use("/api/test", require("./api/test"));

module.exports = router;