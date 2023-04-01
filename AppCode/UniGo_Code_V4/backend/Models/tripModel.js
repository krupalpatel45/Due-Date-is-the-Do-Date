const mongoose = require("mongoose");
const schema = mongoose.Schema;
const tripSchema = new schema({
    driver: {
        type: mongoose.ObjectId,
        require: true,
    },    
    source: {
        type: Object,
        required: true,
    },
    destination: {
        type: Object,
        required: true,
    },
    route: {
        type: Array
    },
    waypoints: {
        type: Array,
        default: []
    },
    dateTime: {
        type: Date,
        required: true,
    },
    max_riders: {
        type: Number,
        required: true,
    },
    available_riders: {
        type: Boolean,
        required: false,
    },
    riders: {
        type: Array,
        default: []
    },
    baseDuration: {
        type: Number,
        required: false,
    },
    baseDistance: {
        type: Number,
        required: false,
    },
    completed: {    // false: active
        type: Boolean,
        default: false
    },
}, { timestamps: true });

module.exports = mongoose.model("trip", tripSchema)