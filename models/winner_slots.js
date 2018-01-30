var mongoose = require("mongoose");

var WinnerSlot = mongoose.model("winner_slots", {
    lucky_timestamp: {
        type: String,
        trim: true
    },
    ocuupied_timestamp: {
        type: String,
        default: null
    },
    campaign_id: {
        type: Number,
        default: 999
    },
    prize_id: {
        type: Number,
        default: null
    },
    entry_id: {
        type: String,
        default: null
    }
});

module.exports = {WinnerSlot}