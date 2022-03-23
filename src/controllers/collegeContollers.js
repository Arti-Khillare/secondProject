const collegeModel = require("../models/collegeModel");
const internModel = require("../models/internModel");

const createCollege = async(req, res) => {
  try{
        let data = req.body;

        if(!data.name) {
          res.status(400).send({ status: false, message: 'College Name is required'})
          return
        }
        if(!data.fullName) {
          res.status(400).send({ status: false, message: 'Fullname is required'})
          return
        }
        if(!data.logoLink) {
          res.status(400).send({ status: false, message: 'Logolink is required'})
        }

        let uniqueNameTest = await collegeModel.findOne({name:data.name})
        if(uniqueNameTest) {
          return res.status(400).send({status:false, message: 'this name is already exist, as unique name is required' })
        }

        let uniqueFullNameTest = await collegeModel.findOne({fullName:data.fullName})
        if(uniqueFullNameTest) {
          return res.status(400).send({status:false, message: 'this fullname is already exist, as unique fullname is required' })
        }
        
        let collegeData = await collegeModel.create(data)
        res.status(201).send({status:true, message: collegeData})
  }
  catch(error)
  {
      res.status(500).send({message: error.message})
  }
}

const collegeDetails = async function(req, res) {
  try{
       let collegeName = req.query.collegeName
       if(!collegeName) {
         return res.status(400).send({ status: false, message: "please provide collegeName in query"})
       }

       let collegeDetail = await collegeModel.findOne({ name:collegeName, isDeleted: false }).select({name:1,
       fullName:1, logoLink:1, _id:1})
       if(!collegeDetail) {
         return res.status(404).send({status:false, message: "college not found" })
       }

       let internDetails = await internModel.find({collegeId: collegeDetail._id,
      isDeleted : false}).select({_id:1, name:1, email:1, mobile:1})

      let result = {name: collegeDetail.name, fullName:collegeDetail.fullName, logoLink:collegeDetail.logoLink}
      if(internDetails.length>0) {
        result["Interest"] = internDetails
        return res.status(200).send({ data: result})
      }
      if(internDetails.length == 0) {
        result["Interst"] = "no interns for now";
        return res.status(200).send({ data:result})
      }

  }
  catch(error)
  {
      res.status(500).send({message: error.message})
  }
}
module.exports.createCollege = createCollege ;
module.exports.collegeDetails = collegeDetails ;