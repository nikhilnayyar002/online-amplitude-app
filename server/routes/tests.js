var express = require('express');
var router = express.Router();
var TestModal = require('../modals/test')

/* GET home page. */

router.all('*',function(req, res, next) {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Headers','Content-Type');
  next();
})

router.get('/:id', function(req, res, next) {
  let testID=req.params.id;
  TestModal.findById(testID, function (err, test) {
    if (err) { return next(err); }
    // Successful - 
    //res.set('Content-Type', 'application/json');
    res.json(test)
  });
});


router.post('/:id/questions/:qid', function(req, res, next) {
  let testID=req.params.id;
  let questionID=req.params.qid;
  console.log(req.body)

  TestModal.findById(testID, function (err, test) {
    if (err) { return next(err); }
    test.questions[questionID].checkedAnswerIndex=null;
    test.save(function (err) {
      if (err) { return next(err); }
      // Successful - redirect to new author record.
      res.json({status:"Successful"})
    });
  })
});
module.exports = router;
