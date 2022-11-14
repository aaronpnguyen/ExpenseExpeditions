const FinanceController = require("../controllers/finance.controller")

module.exports = app => {
    app.post("/api/finance/new", FinanceController.createFinance)
    app.get("/api/finances/user", FinanceController.getUserFinances)
}