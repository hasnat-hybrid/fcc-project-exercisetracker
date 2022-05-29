const express = require('express');
const router = express.Router();
const User = require('../models/user')

router.post('/api/users', async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();
        res.status(201).json(user);

    } catch (error) {
        res.status(400).send(error);
        console.log('post1 error: ', error);
    }
    
})

router.get('/api/users', async (req, res) => {
    
    try {
        const users = await User.find()
        res.json(users)
    } catch (error) {
        res.status(400).send(error)
        console.log('get1 error: ', error);
    }
})

module.exports = router