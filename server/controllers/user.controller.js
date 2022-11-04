const {request} = require('express');
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

    registerUser = (request, response) => {
        User.create(request.body)
            .then(user => {
                const userToken = jwt.sign({id: user._id}, secret);
                
                response
                    .cookie("usertoken", userToken, secret, {httpOnly: true})
                    .json({user: user})
            })
    }

    loginUser = async(reqyest, response) => {
        // We will not move on until we find email, if not found, send to error
        const user = await User.findOne({email: request.body.email});
        if (!user) return response.sendStatus(400);

        const correctPassword = await bcrypt.compare(request.body, user.password);
        if (!correctPassword) response.sendStatus(400);

        const userToken = jwt.sign({id: user._id}, secret)

        response
            .cookie("usertoken", userToken, secret, {httpOnly: true})
            .json({user: user})
    }

    logoutUser = (request, response) => {
        response.clearCookie('usertoken');
        response.sendStatus(200);
    }
}

module.exports = new UserController();