const ExpeditionController = require("../controllers/expedition.controller")

module.exports = app => {
    app.post("/api/expedition/new", ExpeditionController.createExpedition)
    app.get("/api/expeditions/user", ExpeditionController.getExpeditions)
    app.get("/api/expedition/:id", ExpeditionController.getOneExpedition)
}