var express = require('express');
var router = express.Router();

// Route for random item selection
router.get('/', function(req, res, next) {
  res.render('randomitem', { title: 'A random item' });
});

module.exports = router;
