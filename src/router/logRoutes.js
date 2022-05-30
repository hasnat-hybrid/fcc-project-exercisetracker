const express = require('express');
const User = require('../models/user')
const Exercise = require('../models/exercise');
const router = express.Router();

router.get('/api/users/:_id/logs', async (req, res) => {

    try {

        const user = await User.findById(req.params._id).select('-__v');
        
        if (!user) {
            return res.json({
                error: 'No user exists for given Id.'
            })
        }

         var query = {}
         var limit;
         let exercises0 = []
         let exercises1 = []
         let exercises = []

         if (req.query.from || req.query.to || req.query.limit) {
             query.from = new Date(req.query.from)
             query.to = new Date(req.query.to)

             //console.log(query.from, query.to);

            exercises0 = await Exercise.find({
                author: req.params._id,
                date: {
                    $gt: query.from
                }
            }).select('description duration date -_id')

            exercises1 = await Exercise.find({
                author: req.params._id,
                date: {
                    $lt: query.to
                }
            }).select('description duration date -_id')

            //final-array
            exercises = exercises0.concat(exercises1)

        }
        else{
            exercises = await Exercise.find({author: req.params._id}).select('description duration date -_id');
        }

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