const mongoose = require('mongoose');


const jobschema = new mongoose.Schema({
    company: {
        type: String,
        required: [true, 'Provide the company name'],
        maxlength: 50
    },
    position: {
        type: String,
        required: [true, 'Provide the postion name'],
        maxlength: 20
    },
    status: {
        type: String,
        enum: ['pending', 'interview', 'declined'],
        default: 'pending'
    }
    , createdby: {
        type: mongoose.Types.ObjectId,
        required: [true, 'Provide the user of the job'],
        ref: 'User'
    }
}, { timestamps: true })

module.exports = mongoose.model('jobs', jobschema);