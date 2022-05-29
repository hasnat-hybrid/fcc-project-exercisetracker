const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
    
    description: {
        type: String,
        required: true,
        trim: true
    },
    duration: {
        type: Number,
        required: true
    },
    date: {
        type: String
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    }
})

exerciseSchema.methods.toJSON = function () {
    const exercise = this
    const exerciseObject = exercise.toObject();
    
    delete exerciseObject.__v;
    delete exerciseObject._id;
    delete exerciseObject.author;

    return exerciseObject;
}

const Exercise = mongoose.model('exercises', exerciseSchema)

module.exports = Exercise