const mongoose = require('mongoose')
const validator = require('validator')
const ObjectId = mongoose.Schema.Types.ObjectId

const internSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, 'name is required'],
        unique : true,
        trim : true
    },
    email : {
        type : String,
        required : [true, 'email is required'],
        unique : true,
        lowercase : true,
        trim : true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error ("Invalid Email !")
            }
        }
    },
    mobile : {
        type : Number,
        required : [true, 'mobile is required'],
        unique : true,
        length : true,
        trim : true,
        
        validate: {
            validator: function (mobile) {
                return /^((\\+91 - ?)|0)?[0-9]{10}$/.test(mobile);
            }, message: 'Please fill a valid mobile number', isAsync: false
        }
        
    },
    collegeId : {
        type: ObjectId,
        required: [true, 'College Id is Required'],
        ref: "College"
    },
    isDeleted : {
        type : Boolean,
        default : false
    }
}, { timestamps : true });

module.exports = mongoose.model('Intern', internSchema) 