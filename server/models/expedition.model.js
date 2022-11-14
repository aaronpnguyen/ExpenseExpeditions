const mongoose = require('mongoose');

const ExpeditionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Name of transaction is required']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    finances: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Finance"
    }]
  },
  {timestamps: true}
);

module.exports = mongoose.model('Expeditions', ExpeditionSchema);