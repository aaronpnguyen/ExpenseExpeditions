const Finance = require('../models/finance.model');
const User = require('../models/user.model');
const jwt = require("jsonwebtoken");

class FinanceController {
    getUserFinances = async (request, response) => {
        const userData = jwt.decode(request.cookies.usertoken, {complete: true}), userId = userData.payload.id;
        let user = await User.findOne({_id: userId});
        Finance.find({user: user}).sort({date: -1})
            .then(finance => response.json(finance))
            .catch(error => response.json(error))
    }

    createFinance = async (request, response) => {
        const userData = jwt.decode(request.cookies.usertoken, {complete: true}), userId = userData.payload.id;
        let user = await User.findOne({_id: userId}), {...data} = request.body;
        data.user = user
        Finance.create(data)
            .then(expense => {User.findOneAndUpdate({_id: userId}, {$push: {finances: expense}})})
                .then(user => response.json(expense))
            .catch(error => response.json(error))
    }
}

module.exports = new FinanceController();