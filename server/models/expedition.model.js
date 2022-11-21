const mongoose = require('mongoose');

const ExpeditionSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        maxlength: [15, 'Expedition title cannot be more than 10 characters'],
        minlength: [3, 'Expedition tile must be more than 2 characters'],
        required: [true, 'Name of expedition is required']
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