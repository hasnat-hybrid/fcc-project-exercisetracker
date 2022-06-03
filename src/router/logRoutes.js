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
         let exercises0 = []
         let exercises1 = []
         let exercises = []

         query.from = new Date(req.query.from)
         query.to = new Date(req.query.to)
         query.limit = parseInt(req.query.limit);

        

         if (req.query.from || req.query.to) {

             //console.log(query.from, query.to);

            if (req.query.from ) {

                exercises0 = await Exercise.find({
                    author: req.params._id,
                    date: {
                        $gt: query.from
                    }
                }).select('description duration date -_id').limit(query.limit) 
            }

            if (req.query.to) {

                exercises1 = await Exercise.find({
                    author: req.params._id,
                    date: {
                        $lt: query.to
                    }
                }).select('description duration date -_id').limit(query.limit)
            }

            //final-array
            exercises = exercises0.concat(exercises1)

        }
        else{
            exercises = await Exercise.find({author: req.params._id}).select('description duration date -_id').limit(query.limit);
        }

        const count = await Exercise.count({author: req.params._id});

        if (req.query.from || req.query.to && limit==1) {
            exercises = await Exercise.find({
                author: req.params._id,
                date: {
                    $gt: query.from
                }
            }).select('description duration date -_id').limit(query.limit)
         }


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