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

router.get('/companies', function(req, res) {
  return standUpCtrl.listAllCompanies(req, res);
})


/*GET A NEW NOTE PAGE*/
router.get('/neworder', function(req, res) {
  return standUpCtrl.getNote(req, res);
})

/*POST A NEW NOTE PAGE*/
router.post('/neworder', function(req, res) {
  return standUpCtrl.create(req, res)
})

router.get('/view-order/:companyName', function(req, res) {
  console.log('Viewing order');
  return standUpCtrl.viewOrder(req, res);
})

//DELETE REQUEST
router.post('/delete/:id', function(req, res) {
  console.log('Delete Router Invoked...');
  return standUpCtrl.deleteOrder(req, res);
})
module.exports = router;
