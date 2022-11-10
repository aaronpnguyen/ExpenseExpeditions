const Finance = require('../models/finance.model');
const User = require('../models/user.model');

class FinanceController {
    getUserFinances = (request, response) => {
        Finance.find({user_id: request.params.user_id})
            .populate("user_id")
            .then(finance => {response.json(finance)})
            .catch(error => {response.json(error)})
    }

    // Testing
    createFinance = async (request, response) => {
        try {
            const newExpense = await new Finance(request.body).save();
            await User.findOneAndUpdate({_id: newExpense.user}, {$push: {finances: newExpense}});
            response.json(newExpense);
        } catch (error) {
            response.status(400).json(error);
        }
    }
}

module.exports = new FinanceController();