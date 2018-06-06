var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var memberNameValidator = [
    function(val) {
        return (val.length > 0 && val.toLowerCase() != 'none')
    },
    //Customer Error Text
    'Select a valid member name'
]

var requiredStringValidator = [
    function(val) {
        var testVal = val.trim();
        return (testVal.length > 0)
    },
    //Custom error text
    '{PATH} cannot be empty'
];
var standupSchema = new Schema({
    companyName: {type: String,
                required: true,
                validate: memberNameValidator },

    customerAddress:    {type: String,
                required: true,
                validate : requiredStringValidator },

    ordereditem:  {type: String,
                required: false,
                validate : requiredStringValidator },

    Price: {type: String,
                required: false,
                validate : requiredStringValidator },

    Currency : {type: String,
                required: false,
                default :'none' },
                 createdOn : {type: Date, default: Date.now}
});

module.exports = mongoose.model('Standup', standupSchema)