var BorderGuruOrders = require('../models/standup.server.model.js');

exports.list = function(req, res) {
    var query = BorderGuruOrders.find();

    query.sort({createdOn: 'desc'})
        .limit(12)
        .exec(function(err, results) {
            res.render('index', {title: 'BorderGuru Orders - List', orders: results});
        })
}

exports.filterByMember = function(req, res) {
    var query = BorderGuruOrders.find();
    var filter = req.body.companyName;

    query.sort({createdOn : 'desc'});

    if(filter.length > 0) {
        query.where({companyName: filter})
    }

    query.exec(function(err, results) {
        res.render('index', {title: 'BorderGuruOrders - List' , orders : results})
    })

}

exports.filterByCustomerAddress = function(req, res) {
    var query = BorderGuruOrders.find();
    var filter = req.body.customerAddress;

    query.sort({createdOn : 'desc'});

    if(filter.length > 0) {
        query.where({customerAddress: filter})
    }

    query.exec(function(err, results) {
        res.render('index', {title: 'BorderGuruOrders - List Customer Address' , orders : results})
    })

}


exports.create = function(req, res) {
    var entry = new BorderGuruOrders({
        companyName: req.body.companyName,
        customerAddress:    req.body.customerAddress,
        ordereditem:  req.body.ordereditem,
        Price: req.body.price,
        Currency : req.body.currency
     });

     entry.save(function(err, results) {
         if(err) {
             var errMsg = 'Sorry but there was an error saving a note,' + err;
             res.render('neworder', {title: 'BorderGuruOrders - New Note (error)', message: errMsg})    
         }
         else {
             //redirect
             res.redirect(301, '/')
         }
     });
     //redirect to homepage

     //res.redirect(301, '/');
};

exports.getNote = function(req, res) {
    res.render('neworder', {title: 'Stand Up - New Note'})
}

exports.viewOrder = function(req, res) {
    console.log('inside view order');
    var query = BorderGuruOrders.findById(req.param.id);
    query.exec(function(err, results) {
        res.render('allcompanies', {title: 'Your Order' , orders : results})
    })
    
}

exports.deleteOrder = function(req, res) {
    BorderGuruOrders.findOneAndRemove(req.param.id, {}, function(err, results) {
        if (err) return res.status(500).send(err);
        res.status(200);
       
    });
    res.redirect('/');
}

exports.listAllCompanies = function(req, res) {
    res.render('allcompanies', {title: 'All Companies'});
}