const UserController = require("../controllers/user.controller")

module.exports = app => {
    app.get("/api/user/logged", UserController.getUser)
    app.post("/api/user/register", UserController.registerUser)
    app.post("/api/user/login", UserController.loginUser)
    app.get("/api/user/logout", UserController.logoutUser)
}