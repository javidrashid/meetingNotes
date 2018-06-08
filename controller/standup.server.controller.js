var Standup = require('../models/standup.server.model.js');

exports.list = function(req, res) {
    var query = Standup.find();

    query.sort({createdOn: 'desc'})
        .limit(12)
        .exec(function(err, results) {
            res.render('index', {title: 'StandUp - List', orders: results});
        })
}

exports.filterByMember = function(req, res) {
    var query = Standup.find();
    var filter = req.body.companyName;

    query.sort({createdOn : 'desc'});

    if(filter.length > 0) {
        query.where({companyName: filter})
    }

    query.exec(function(err, results) {
        res.render('index', {title: 'Standup - List' , orders : results})
    })

}

exports.filterByCustomerAddress = function(req, res) {
    var query = Standup.find();
    var filter = req.body.customerAddress;

    query.sort({createdOn : 'desc'});

    if(filter.length > 0) {
        query.where({customerAddress: filter})
    }

    query.exec(function(err, results) {
        res.render('index', {title: 'Standup - List Customer Address' , orders : results})
    })

}


exports.create = function(req, res) {
    var entry = new Standup({
        companyName: req.body.companyName,
        customerAddress:    req.body.customerAddress,
        ordereditem:  req.body.ordereditem,
        Price: req.body.price,
        Currency : req.body.currency
     });

     entry.save(function(err, results) {
         if(err) {
             var errMsg = 'Sorry but there was an error saving a note,' + err;
             res.render('newnote', {title: 'Standup - New Note (error)', message: errMsg})    
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
    res.render('newnote', {title: 'Stand Up - New Note'})
}

exports.viewOrder = function(req, res) {
    console.log('inside view order');
    var query = Standup.findById(req.param.id);
    query.exec(function(err, results) {
        res.render('allcompanies', {title: 'Your Order' , orders : results})
    })
    
}

exports.deleteOrder = function(req, res) {
    Standup.findOneAndRemove(req.param.id, {}, function(err, results) {
        if (err) return res.status(500).send(err);
        res.status(200);
       
    });
    res.redirect('/');
}

exports.listAllCompanies = function(req, res) {
    res.render('allcompanies', {title: 'All Companies'});
}