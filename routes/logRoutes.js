const logController = require("../controllers/log.controller");
const requireLogin = require("../middlewares/requireLogin");
const requireAdmin = require("../middlewares/requireAdmin");

module.exports = app => {
    app.get("/logs", requireLogin, requireAdmin, logController.showLogs);
}