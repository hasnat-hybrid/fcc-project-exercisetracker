const express = require('express');
const User = require('../models/user')
const Exercise = require('../models/exercise')
const router = express.Router();

router.get('/api/users/:_id/logs', async (req, res) => {

    try {

        const user = await User.findById(req.params._id).select('-__v');
        
        if (!user) {
            return res.json({
                error: 'No user exists for given Id.'
            })
        }

        const exercises = await Exercise.find({author: req.params._id}).select('description duration date -_id')
        const count = await Exercise.count({author: req.params._id});


        res.json({
            _id: user._id,
            username: user.username,
            count: count,
            log: exercises
        })
        

    } catch (error) {
        res.send({
            error: error 
        })
        console.log(error);
    }
})

module.exports = router