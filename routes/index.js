var express = require('express');
var router = express.Router();
var standUpCtrl =  require('../controller/standup.server.controller')


/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  return standUpCtrl.list(req, res);
});

router.post('/member', function(req, res) {
  return standUpCtrl.filterByMember(req, res)
});

router.post('/address', function(req, res) {
  return standUpCtrl.filterByCustomerAddress(req, res)
});

/*GET A NEW NOTE PAGE*/
router.get('/newnote', function(req, res) {
  return standUpCtrl.getNote(req, res);
})

/*POST A NEW NOTE PAGE*/
router.post('/newnote', function(req, res) {
  return standUpCtrl.create(req, res)
})


module.exports = router;
