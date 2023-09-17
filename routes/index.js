var express = require('express');
var router = express.Router();
const fs = require('fs');

let deletefiles = [] ;
/* GET home page. */
router.get('/', function(req, res) {
  // const files = fs.readFileSync('public/garbage');
  const files = fs.readdirSync('public/garbage');
  deletefiles = [...files];
  res.render('index.ejs',{ files : files});
});


router.post('/create', function(req, res) {
   fs.writeFileSync(`public/garbage/${req.body.filename}`,"file created");
   res.redirect('/');
});


router.get('/delete/:index', function(req, res) {    
    const deletefile = fs.unlinkSync(`public/garbage/${deletefiles[req.params.index]}`);  
    // console.log(deletefiles[req.params.index]);
    // console.log(req.params.index);
    res.redirect("/");
});


module.exports = router;
