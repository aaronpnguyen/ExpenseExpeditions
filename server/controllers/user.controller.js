const User = require('../models/user.model');
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const secret = process.env.SECRET_KEY

class UserController {
    getAllUsers = (request, response) => {
        User.find()
            .then(users => response.json(users))
            .catch(error => response.json(error))
    }

    registerUser = async(request, response) => {
        const check = await User.find({email: request.body.email})
        if (check.length !== 0) return response.json({errors: {email: {message: "Email is already in use!"}}})

        // Check if user submitted an existing email, if they did give error
        if (request.body.email) request.body.email = request.body.email.toLowerCase()
        User.create(request.body)
            .then(user => {
                const userToken = jwt.sign({id: user._id}, secret);
                response.cookie("usertoken", userToken, secret, {httpOnly: true})
                        .json({user: user})
            })
            .catch(error => response.json(error))
    }

    loginUser = async (request, response) => {
        const user = await User.findOne({email: request.body.email});
        if (!user) return response.sendStatus(400);

        const correctPassword = await bcrypt.compare(request.body.password, user.password);
        if (!correctPassword) return response.sendStatus(400);

        const userToken = jwt.sign({id: user._id}, secret)

        response.cookie("usertoken", userToken, secret, {httpOnly: true})
            .json({user: user})
    }

    logoutUser = (request, response) => {
        response.clearCookie('usertoken');
        response.sendStatus(200);
    }

    getUser = (request, response) => {
        if (!request.cookies.usertoken) return response.sendStatus(400)
        const userData = jwt.decode(request.cookies.usertoken, {complete: true})
        User.findOne({_id: userData.payload.id})
            .then(user => {response.json(user)})
            .catch(error => {response.json(error)})
    }
}

module.exports = new UserController();