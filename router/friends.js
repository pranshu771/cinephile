var express = require('express');
var router = express.Router();
var users = require('../models/user.js');
var movies = require('../models/movies.js');

router.get('/friends/:movie',(req,res) => {
    if(req.user) {

        res.redirect('/' + req.params.movie + '/' + req.user.username + '/friends');

    }
    else {
        res.redirect('/login');
    }
})

router.get('/:movie/:username/friends',(req,res) => {
    
    
    console.log('movieID:',req.params.movie);
    if(req.user) {
        movies.find(
            {id: req.params.movie},
            {id: 1,title: 1,backdrop_path: 1}
        ,(upperErr,upperData) => {
            if(upperErr) {
                throw upperErr;
            }
            else {
                users.aggregate([
                    {$match: {username: req.user.username}},
                    {$project: {
                        username: 1,
                        friends: 1,
                        recommendedTo: {
                            $filter: {
                                input: "$recommendedTo",
                                as: "recommendedTo",
                                cond: {$eq: ["$$recommendedTo.movie", req.params.movie]}
                            }
                        },
                        recommendedBy: {
                            $filter: {
                                input: "$recommendedBy",
                                as: "recommendedBy",
                                cond: {$eq: ["$$recommendedBy.movie", req.params.movie]}
                            }
                        }
                        
                    }}
                ],(err,data) => {
                    if(err) {
                        throw err;
                    }
                    else {
                        var friends = data[0].friends;
                        console.log('up: ',friends)
                        var recommendedTo = data[0].recommendedTo;
                        var recommendedBy = data[0].recommendedBy;
                            if(friends) {
        
                                if(recommendedTo) {
                                    recommendedTo.forEach(item => {
                                        var count = 0;
                                        if(friends) {
                                           
                                            for(var i = 0;i < friends.length;i++) {
                                                if(count === 0) {
                                                    if(friends[i].username === item.username) {
                                                        friends.splice(i,1);
                                                        count++;
                                                    }
                                                }
                                                else {
                                                    break;
                                                }
                                                
                                                
                                            }
                                        }
                                    });
        
                                    
                                }
        
                                if(recommendedBy) {
                                    recommendedBy.forEach(item => {
                                        var count = 0;
                                        if(friends) {
                                            for(var i = 0;i < friends.length;i++) {
                                                if(count === 0) {
                                                    if(friends[i].username === item.username) {
                                                        friends.splice(i,1);
                                                        count++;
                                                    }
                                                }
                                                else {
                                                    break;
                                                }
                                                
                                                
                                            }
                                        }
                                    });
                                }
                            }
                        console.log('movie: ' ,upperData);
                        console.log('friends: ',friends);
                        console.log('recommendedTo: ',recommendedTo);
                        console.log('recommendedBy: ',recommendedBy);
                        res.render('friends.ejs',{data: data,friends: friends,recommendedTo: recommendedTo,recommendedBy: recommendedBy,movie: upperData});
                        
                        
                    }
                })
            }
        })
    }
    else {
        res.redirect('/login');
    }
    
    
});
router.post('/sendFriendRequest',(req,res) => {
    
    // users.update(
    //     {username: req.body.username},
    //     //{$addToSet: {notification: {'message': req.user.username + ' sent you a friend Request','status': 'unread'},friendRequests: {username: req.user.username}}},
    //     //{$push: {'friendRequests': {'username': req.body.username}}},{'notification': {'message': req.user.username + ' sent you a friend Request','status': 'unread'}},
    //     {$push: {friendRequests: {username: req.user.username},
    //     notification: {message: req.user.username + ' sent you a friend request',status: 'unread'}}},
    //     (err,data) => {
    //         if(err) {
    //             throw err;
    //         }
    //         else {
    //             users.update(
    //                 {username: req.user.username},
    //                 {$push: {pendingFriendRequests: {username: req.body.username}}},
    //                 (innerErr,innerData) =>{
    //                     if(innerErr) {
    //                         throw innerErr;
    //                     }
    //                     else {
    //                         res.send(innerData);
    //                     }
    //                 }

    //             )
    //         }
    //     }
    // )
    // users.find({username: {$in: [req.body.username,req.user.username]}},(err,data) => {
    //     if(err) {
    //         throw err;
    //     }
    //     else {
    //         res.send(data)
    //     }
    // })

    users.bulkWrite([
        {updateOne: {
            "filter": {"username": req.body.username},
            "update": {$push: {"friendRequests": {"username": req.user.username},
                                "notification": {"message": req.user.username + ' sent you a friend request',status: 'unread'}}}

        }},
        {updateOne: {
            "filter": {"username": req.user.username},
            "update": {$push: {"pendingFriendRequests": {"username": req.body.username}}}

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
router.post('/cancelFriendRequest',(req,res) => {
    users.bulkWrite([
        {updateOne: {
            "filter": {"username": req.body.username},
            "update": {$pull: {"friendRequests": {"username": req.user.username}}}

        }},
        {updateOne: {
            "filter": {"username": req.user.username},
            "update": {$pull: {"pendingFriendRequests": {"username": req.body.username}}}
        }}
    ],(err,data) => {
        if(err) {
            throw err;
        }
        else {
            res.send(data);
        }
    })
    // users.update(
    //     {username: req.body.username},
    //     {$pull: {friendRequests: {username: req.user.username}}},
    //     (err,data) => {
    //         if(err) {
    //             throw err;
    //         }
    //         else {
    //             users.update(
    //                 {username: req.user.username},
    //                 {$pull: {pendingFriendRequests: {username: req.body.username}}},
    //                 (innerErr,innerData) => {
    //                     if(innerErr) {
    //                         throw innerErr;
    //                     }
    //                     else {
    //                         res.send(innerData)
    //                     }
    //                 }
                    
    //             )
                
    //         }
    //     }
    // )
    
});
router.post('/confirmFriendRequest',(req,res) => {
    users.bulkWrite([
        {updateOne: {
            "filter": {"username": req.body.username},
            "update": {$push: {"notification": {"message": 'You are now Friends With ' + req.user.username,"status": "unread"}},
                        $push: {"friends": {"username": req.user.username}},
                        $pull: {"pendingFriendRequests": {"username": req.user.username}}}

        }},
        {updateOne: {
            "filter": {"username": req.user.username},
            "update": {$push: {"friends": {"username": req.body.username}},
                        $pull: {"friendRequests": {"username": req.body.username}}}
        }}
    ],(err,data) => {
        if(err) {
            throw err;
        }
        else {
            res.send(data);
        }
    })
    // users.update(
    //     {username: req.body.username},
    //     {$push: {notification: {message: 'You are now friends with ' + req.user.username,status: 'unread'}},friends: {username: req.user.username}},
        
    //     (err,data) => {
    //         if(err) {
    //             throw err;
    //         }
    //         else {
    //             users.update(
    //                 {username: req.user.username},
    //                 {$push: {friends: {username: req.body.username}}},
    //                 (innerErr,innerData) => {
    //                     if(innerErr) {
    //                         throw innerErr;
    //                     }
    //                     else {
                            
    //                     }
    //                 }
    //             )
    //         }
    //     }

    // )
    // users.update(
    //     {username : req.body.username},
    //     {$pull: {pendingFriendRequests: {username: req.user.username}}},
    //     (err,data) => {
    //         if(err) {
    //             throw err;
    //         }
    //         else {
    //             users.update(
    //                 {username: req.user.username},
    //                 {$pull: {friendRequests: {username: req.body.username}}},
    //                 (innerErr,innerData) => {
    //                     if(innerErr) {
    //                         throw innerErr;
    //                     }
    //                     else {
    //                         res.send(innerData)
    //                     }
    //                 }
    //             )
    //         }
    //     }

    // )
    
});

router.post('/unFriend',(req,res) => {
    users.bulkWrite([
        {updateOne: {
            "filter":  {"username": req.user.username},
            "update": {$pull: {"friends": {"username": req.body.username}}}
        }},
        {updateOne: {
            "filter": {"username": req.body.username},
            "update": {$pull: {"friends": {"username": req.user.username}},
                        $push: {"notification": {"message": req.user.username + ' unfriended you',"status": 'unread'}}
            }
        }}
    ],(err,data) => {
        if(err) {
            throw err;
        }
        else {
            res.send(data);
        }
    })
})
 


module.exports = router;