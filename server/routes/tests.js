var express = require('express');
var router = express.Router();
var TestModal = require('../modals/test')
const mongoose = require('mongoose');

router.get('/:id', function(req, res, next) {
  let testID=req.params.id;
  /**
   * '0': 'disconnected', '1': 'connected', '2': 'connecting',
   * '3': 'disconnecting','99': 'uninitialized',
   */
  if(!mongoose.connections[0]._readyState) next(new Error('error connecting db'));

  TestModal.findById(testID,function (err, test) {
    if (err) { return next(err); }
    res.json(test)
  })
 
});


router.post('/:id/questions/:qid', function(req, res, next) {
  let testID=req.params.id;
  let questionID=req.params.qid;

  /**
   * '0': 'disconnected', '1': 'connected', '2': 'connecting',
   * '3': 'disconnecting','99': 'uninitialized',
   */
  if(!mongoose.connections[0]._readyState) next(new Error('error connecting db'));

  TestModal.findById(testID, function (err, test) {
    if (err) { return next(err); }
    test.questions[questionID].checkedAnswerIndex=req.body.data;
    test.save(function (err) {
      if (err) { return next(err); }
      // Successful
      res.json({status:"Successful"})
    });
  })
});


router.post('/:id/time', function(req, res, next) {
  let testID=req.params.id;

  /**
   * '0': 'disconnected', '1': 'connected', '2': 'connecting',
   * '3': 'disconnecting','99': 'uninitialized',
   */
  if(!mongoose.connections[0]._readyState) next(new Error('error connecting db'));

  TestModal.findById(testID, function (err, test) {
    if (err) { return next(err); }
    test.time=req.body.data;
    test.save(function (err) {
      if (err) { return next(err); }
      // Successful
      res.json({status:"Successful"})
    });
  })
});


module.exports = router;
