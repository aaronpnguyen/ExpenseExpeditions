const UserController = require("../controllers/user.controller")

module.exports = app => {
    app.get("/api/users", UserController.getAllUsers) // Not for prod
    app.post("/api/create/user", UserController.registerUser)
}