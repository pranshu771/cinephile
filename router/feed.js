var express = require('express');
var router = express.Router();
var movies = require('../models/movies.js');
var users = require('../models/user.js')

router.get('/', function (req, res) {
    
    res.sendFile('index.html');
    
    
});

router.get('/getMoviesData',(req,res) => {
  
  movies.find({},(err,data) => {
    if(err) {
      
    }
    else {
      res.send(data);
    }
  }).skip(parseInt(req.query.start)).limit(5)
})
router.post('/addMovies',(req,res) => {
    movies.create(req.body.result);
    // 
    
    

})

module.exports = router;