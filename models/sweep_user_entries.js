var mongoose = require("mongoose");

var SweepUserEntry = mongoose.model("sweep_user_entries", {
    first_name: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    last_name: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        trim: true
    },
    campaign_id: {
        type: Number,
        default: 999
    },
    is_winner: {
        type: Boolean,
        default: false
    }
});

module.exports = {SweepUserEntry}