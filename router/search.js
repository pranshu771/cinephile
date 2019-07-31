var express = require('express');
var router = express.Router();
var movies = require('../models/movies.js');
var user = require('../models/user.js')

router.get('/search',(req,res) => {
    res.sendfile('public/search.html');
})
router.get('/getQueryResult',(req,res) => {
    // movies.find({title: new RegExp('^' + req.query.query)},(err,data) => {
    //     if(err) {
    //     throw err;
    //     }
    //     return res.send(data);
    // })
    
    // movies.aggregate([
    //     {$match : {title: new RegExp('^' + req.query.query)}},
    //     {$lookup: {from: "users",localField: "username",foreignField: "title",as: "users"}},
    //     {$project : {
    //             user : { $filter : {input : "$user"  , as : "user", cond : { $eq : ['$$user.username' , 'Pranshu'] } } },
    //             title: new RegExp('^' + req.query.query)
    
    //         }}
    
    // ],(err,data) => {
    //     if(err) {
    //         throw err;
    //     }
    //     else {
    //         res.send(data);
    //     }
    // })
    movies.aggregate([
        {$match: {title: new RegExp('^' + req.query.query)}},
        {$project: {id: 1,title: 1,backdrop_path: 1}}
    ],(upperErr,upperData) =>{
        if(upperErr) {
            throw upperErr;
        }
        else {
            
            user.aggregate([
                {$match: {username: new RegExp('^' + req.query.query)}} 
            ],(err,data) => {
                if(err) {
                    throw err;
                }
                else {
                    return res.send(upperData.concat(data))
                }
            })
            
        }
    })
    
    

})

module.exports = router;