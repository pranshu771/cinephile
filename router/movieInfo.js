var express = require('express');
var router = express.Router();
var movies = require('../models/movies.js');

router.get('/movie/:id',(req,res) => {
    movies.find({id: req.params.id},(err,data) => {
        res.render('movieInfo.ejs',{data: data})
    })
})
module.exports = router;