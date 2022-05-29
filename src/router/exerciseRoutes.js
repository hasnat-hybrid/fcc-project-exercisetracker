const express = require('express');
const Exercise = require('../models/exercise');
const User = require('../models/user')
const router = express.Router();

router.post('/api/users/:_id/exercises', async (req, res) => {

    try {
    
    const user = await User.findById(req.params._id)
    if (!user) {
        return res.json({
            error: 'No user exists for given Id.'
        })
    }

    let date;

    if (!req.body.date) {
        date = new Date().toDateString()
    }
    else{
        date = new Date(req.body.date).toDateString()
    }
    
    const exercise = await new Exercise({
        description: req.body.description,
        duration: req.body.duration,
        date: date,
        author: req.params._id
    })

    const userObj = user.toObject();
    const exerciseObj = exercise.toObject();

    delete exerciseObj._id;
    delete exerciseObj.author;

    delete userObj.__v;

    await exercise.save();
    res.json(Object.assign(userObj, exerciseObj))

    }
    catch (error) {
        res.send({
            error: error 
        })
        console.log(error);
    }

})

module.exports = router