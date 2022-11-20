const Finance = require('../models/finance.model');
const User = require('../models/user.model');
const Expedition = require('../models/expedition.model');
const jwt = require("jsonwebtoken");

class FinanceController {
    getUserFinances = async (request, response) => {
        if (!request.cookies.usertoken) return response.sendStatus(400)
        const userData = jwt.decode(request.cookies.usertoken, {complete: true}), userId = userData.payload.id;
        let user = await User.findOne({_id: userId});
        Finance.find({user: user}).sort({date: -1})
            .then(finance => response.json(finance))
            .catch(error => response.json(error))
    }

    getExpeditionFinances = async (request, response) => {
        if (!request.cookies.usertoken) return response.sendStatus(400)
        const userData = jwt.decode(request.cookies.usertoken, {complete: true}), userId = userData.payload.id;
        const expeditionId = request.params.expeditionId;
        let expedition = await Expedition.findOne({_id: expeditionId, user: userId})
        if (!expedition) return response.sendStatus(400)
        const finance = await Finance.find({expedition: expeditionId, user: userId}).sort({date: -1})
            .then(finance => response.json(finance))
            .catch(error => response.json(error))
    }

    createFinance = async (request, response) => {
        const userData = jwt.decode(request.cookies.usertoken, {complete: true}), userId = userData.payload.id
        request.body.user = userId
        try {
            const newExpense = await new Finance(request.body).save();
            const user = await User.findOneAndUpdate({_id: userId}, {$push: {finances: newExpense}})
            const expedition = await Expedition.findOneAndUpdate({_id: request.body.expedition}, {$push: {finances: newExpense}})
            response.json(newExpense)
        } catch (error) {
            response.json(error)
        }
    }

    // Should probably add validation where only the user who has this specific document can delete
    deleteFinance = (request, response) => {
        Finance.deleteOne({_id: request.params.id})
            .then(expense => response.json(expense))
            .catch(error => response.json(error))
    }
}

module.exports = new FinanceController();