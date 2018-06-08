var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var dropdownValidator = [
    function(val) {
        return (val.length > 0 && val.toLowerCase() != '')
    },
    //Customer Error Text
    'Select a valid company'
]

var requiredStringValidator = [
    function(val) {
       var testVal = typeof val;
        return (testVal !== Number)
    },
    //Custom error text
    '{PATH} cannot be empty'
];
var borderguruOrderSchema = new Schema({
    companyName: {type: String,
                required: true,
                validate: dropdownValidator },

    customerAddress:{type: String,
                required: true,
                validate : dropdownValidator },

    ordereditem:  {type: String,
                required: false,
                validate :  dropdownValidator},

    Price: {type: Number,
                required: true,
                validate :  requiredStringValidator },

    Currency : {type: String,
                required: false,
                default :'none' },
    createdOn : {type: Date, default: Date.now}
});

module.exports = mongoose.model('Standup', borderguruOrderSchema)