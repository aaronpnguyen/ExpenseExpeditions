const FinanceController = require("../controllers/finance.controller")

module.exports = app => {
    app.post("/api/finance/new", FinanceController.createFinance)
    app.post("/api/finance/new/test", FinanceController.testFinance)
    app.get("/api/finances/user", FinanceController.getUserFinances)
}