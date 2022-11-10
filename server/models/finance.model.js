const mongoose = require('mongoose');

const FinanceSchema = new mongoose.Schema({
    transaction: {
        type: String,
        required: [true, 'Name of transaction is required']
    },
    amount: {
        type: Number,
        required: [true, 'Amount for transaction is required']
    },
    type: {
        type: String,
        required: [true, 'Type for Int is required'],
    },
    date: {
        type: Date,
        // required: [true, 'Date for transaction is required'],
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
  },
  {timestamps: true}
);

module.exports = mongoose.model('Finance', FinanceSchema);