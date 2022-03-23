const internModel  = require("../models/internModel")
const collegeModel = require("../models/collegeModel")
const validate = require("validator")
const { default: mongoose } = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId

const isValid = (value) => {

    if (typeof value === 'undefined' || value === null) return false
  
    if (typeof value === 'string' && value.trim().length === 0) {
      return false
    }
      return true
  
  }
  const isValidRequestBody = (data) => {
    return Object.keys(data).length > 0
  }
const createIntern = async(req, res) => {
    try{
          let data = req.body ;
          if (!isValidRequestBody(data)) {
            return res.status(400).send({ status: false, msg: "invalid request parameters . Please Provide Intern Details" })
          }

          //// Extracting Params ////

          const { name, email, mobile, collegeId } = data;


          if(!isValid(name)) {
              res.status(400).send({ status: true, message: 'Intern Name is required'})
              return
          }

          if (!isValid(email)) {
               res.status(400).send({ Status: false, message: "Email is required" })
               return
          }
      
          if (!validate.isEmail(email)) {
               return res.status(400).send({ status: false, message: "Invalid Email" })
          }

          if(!isValid(mobile)) {
              res.status(400).send({ status: false, message: "MobileNumber is required"})
              return
          }

          if(!(/^((\\+91 - ?)|0)?[0-9]{10}$/.test(mobile))) {
              return res.status(400).send({ status: false, message: "Mobile Number should be valid" })
          }

          if(!isValid(collegeId)) {
              res.status(400).send({ status: false, message: "CollegeId is required"})
          }

          let uniqueNameTest = await internModel.findOne({ name:data.name})
          if(uniqueNameTest) {
              return res.status(406).send({ status: false, message: "name is already exist as unique name is required"})
          }

          let uniqueEmailTest = await internModel.findOne({ email:data.email})
          if(uniqueEmailTest) {
              return res.status(406).send({ status: false, message: "email is already exist as unique email is required"})
          }

          let uniqueMobileTest = await internModel.findOne({ mobile:data.mobile})
          if(uniqueMobileTest) {
              return res.status(406).send({ status: false, message: "mobileno is already exist as unique mobileno is required"})
          }

          
          const Data = { name, email, mobile,collegeId }
          let internData = await internModel.create(Data)
          res.status(201).send({ status: true, message: internData})

    }
    catch(error)
  {
      res.status(500).send({message: error.message})
  }
}

module.exports.createIntern = createIntern ;