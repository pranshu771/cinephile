var express = require('express');
var router = express.Router();
var users = require('../models/user.js');

router.post('/recommend',(req,res) => {

    users.bulkWrite([
        {updateOne: {
            "filter": {"username": req.body.username},
            "update": {$push: {"recommendedTo": {"username": req.body.friendname,"movie": req.body.movieId}}}
        }},
        {updateOne: {
            "filter": {"username": req.body.friendname},
            "update": {$push: {"recommendedBy": {"username": req.body.username,"movie": req.body.movieId},
                                "notification": {"message": req.body.username + ' Recommended you ' + req.body.movieName,"status": "unread",type: "recommendation",subjectImage: req.body.posterPath,performerImage: null}}}
        }}
    ],(err,data) => {
        if(err) {
            throw err;
        }
        else {
            res.send(data)
        }
    })
})
router.post('/:id/:username/friends/reply',(req,res) => {
    
    res.send({message: req.body.repliedTo});
})

module.exports = router;