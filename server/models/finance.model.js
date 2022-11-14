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
        enum: {
            values: [
                "Housing", "Utilities", "Investments", "Groceries", "Gas", "Auto & Transport", "Travel", "Vacation",
                "Cell Phone", "Education", "Pets", "Clothing", "Shopping", "Subscriptions", "Loan Payment", "Social",
                "Dining & Drinks", "Entertainment", "Health & Wellness", "Medical", "Cash & Checks", "Miscellaneous",
                "Other"
            ],
            message: "Not a supported type!"
        },
        required: [true, 'Type for transaction is required'],
    },
    date: {
        type: Date,
        max: [new Date() + 1, "The date must be today or in the past"],
        required: [true, 'Date for transaction is required'],
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
  },
  {timestamps: true}
);

module.exports = mongoose.model('Finance', FinanceSchema);