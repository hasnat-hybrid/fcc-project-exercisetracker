const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    }
})

userSchema.virtual('exercises', {
    ref: 'exercises',
    localField: '_id',
    foreignField: 'author'
})

userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject();
    
    delete userObject.__v;

    return userObject;
}

const User = mongoose.model('users', userSchema)

module.exports = User