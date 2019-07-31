var express = require('express');
var router = express.Router();
var userModel = require('../models/user.js');

router.get('/notifications',(req,res) => {
    if(req.user) {
        userModel.aggregate([
            {$match: {username: req.user.username}},
            {$project: {notification: 1}},
            {$unwind: "$notification"},
            {$match: {"notification.status": "unread"}}
        ],(err,data) => {
            if(err) {
                throw err;
            }
            else {
                data = data.reverse();
                res.render('notifications.ejs',{data: data});
                
            }
        })
    }
    else {
        res.redirect('/login');
    }
})

module.exports = router;