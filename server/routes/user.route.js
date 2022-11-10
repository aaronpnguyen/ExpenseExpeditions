const UserController = require("../controllers/user.controller")

module.exports = app => {
    app.get("/api/users", UserController.getAllUsers) // Not for prod
    app.get("/api/user/logged", UserController.getUser)
    app.get("/api/user/logout", UserController.logoutUser)
    app.get("/api/:user_id/finances/", UserController.getUserFinances)
    app.post("/api/user/register", UserController.registerUser)
    app.post("/api/user/login", UserController.loginUser)
}