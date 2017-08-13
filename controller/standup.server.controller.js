var Standup = require('../models/standup.server.model.js');

exports.list = function(req, res) {
    var query = Standup.find();

    query.sort({createdOn: 'desc'})
        .limit(12)
        .exec(function(err, results) {
            res.render('index', {title: 'StandUp - List', notes: results});
        })
}

exports.filterByMember = function(req, res) {
    var query = Standup.find();
    var filter = req.body.memberName;

    query.sort({createdOn : 'desc'});

    if(filter.length > 0) {
        query.where({memberName: filter})
    }

    query.exec(function(err, results) {
        res.render('index', {title: 'Standup - List' , notes : results})
    })

}
exports.create = function(req, res) {
    var entry = new Standup({
        memberName: req.body.memberName,
        project:    req.body.project,
        workToday:  req.body.workToday,
        workYesterday: req.body.workYesterday,
        impediment : req.body.impediment
     });

     entry.save(function(err, results) {
         if(err) {
             var errMsg = 'Sorry but there was an error saving a note,' + err;
             res.render('newnote', {title: 'Standup - New Note (error)', message: errMsg})    
         }
         else {
             console.log('NOted Saved Succesfully...');
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