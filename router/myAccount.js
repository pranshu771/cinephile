var express = require('express');
var router = express.Router();
var userModel = require('../models/user.js');

router.get('/myAccount',(req,res) => {
    if(req.user) {
        return res.redirect('/myAccount/' + req.user.username)
    }
    else {
        return res.redirect('/login')
    }
})

router.get('/myAccount/:username',(req,res) => {
    var authUser = null;
    
    if(req.user) {
        authUser = req.user.username
    }
    userModel.aggregate([
      {$match: {username: req.params.username}},
      {$project: {
          username: 1,
          friends: {
            $filter: {
                input: "$friends",
                as: "friends",
                cond: {$eq: ["$$friends.username",authUser]}
            }
          },
          friendRequests: {
              $filter: {
                  input: "$friendRequests",
                  as: "friendRequests",
                  cond: {$eq: ["$$friendRequests.username",authUser]}
              }
          },
          pendingFriendRequests: {
              $filter: {
                  input: "$pendingFriendRequests",
                  as: "pendingFriendRequests",
                  cond: {$eq: ["$$pendingFriendRequests.username",authUser]}
              }
          }
      }}
    ],(err,data) => {
        if(err) {
            throw err;
        }
        else {
            if(req.user) {
                if(req.user.username === req.params.username) {
                    console.log(data)
                    res.render('myAccount.ejs',{userdata: data});
                }
                else {
                    console.log(data)
                    res.render('userAccount.ejs',{userdata: data})
                    
                }
            }
            else {
                res.redirect('/login')
            }
            
        }
    })
    
    
    // res.render('myAccount.ejs',{data: req.params.id.substring(3,req.params.id.length)});
    // var assignedUser = req.params.username;
    // if(req.user) {
    //     assignedUser = req.user.username;
    // }
    // userModel.aggregate([
    //     {$match: {username: req.params.username}},
    //     {$project: {username: 1,pendingFriendRequests: 1,
    //     friendRequests: {$filter: {
    //         input: '$friendRequests',
    //         as: 'friendRequests',
    //         cond: {$eq: ['$$friendRequests.username',assignedUser]}
    //     }}}}
    // ],(err,data) => {
    //     if(err) {
    //         throw err;
    //     }
    //     else {
    //         if(req.user) {

    //         }
    //     }
    // })
    
    
})
module.exports = router;