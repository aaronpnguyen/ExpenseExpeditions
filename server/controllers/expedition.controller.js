const Finance = require('../models/finance.model');
const User = require('../models/user.model');
const Expedition = require('../models/expedition.model');
const jwt = require("jsonwebtoken");

class ExpeditionController {
    createExpedition = async (request, response) => {
        const userData = jwt.decode(request.cookies.usertoken, {complete: true}), userId = userData.payload.id
        let user = await User.findOne({_id: userId}), {...data} = request.body;
        data.user = user;
        Expedition.create(data)
            .then(group => {User.findOneAndUpdate({_id: userId}, {$push: {expeditions: group}})})
                .then(user => response.json(group))
            .catch(error => response.json(error))
    }

    getExpeditions = async (request, response) => {
        if (!request.cookies.usertoken) return response.sendStatus(400)
        const userData = jwt.decode(request.cookies.usertoken, {complete: true}), userId = userData.payload.id
        let user = await User.findOne({_id: userId});
        Expedition.find({user: user}).collation({locale: "en"}).sort({title: 1})
            .then(group => response.json(group))
            .catch(error => response.json(error))
    }

    getOneExpedition = async (request, response) => {
        if (!request.cookies.usertoken) return response.sendStatus(400)
        const userData = jwt.decode(request.cookies.usertoken, {complete: true}), userId = userData.payload.id
        let user = await User.findOne({_id: userId});
        Expedition.findOne({user: user, _id: request.params.id})
            .then(expedition => response.json(expedition))
            .catch(error => response.json(error))
    }

    // Should probably add validation where only the user who has this specific document can delete
    deleteExpedition = (request, response) => {
        Expedition.deleteOne({_id: request.params.id})
            .then(expedition => response.json(expedition))
            .catch(error => response.json(error))
    }
}

module.exports = new ExpeditionController()