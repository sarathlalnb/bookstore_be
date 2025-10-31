const applicant = require('../models/applicantModel')

exports.addApplicant = async(req,res)=>{
    try {
        const {fullName,JobTitle,Qualification,email,Phone,coverLetter} = req.body
        const resume = req.file.filename

        let existingApplicant = await applicant.findOne({JobTitle,email})

        if(existingApplicant){
            res.status(409).json({message:"Job Already Applied"})
        }else{
            const newApplication = new applicant({
                fullName,JobTitle,Qualification,email,Phone,coverLetter,resume
            })

            await newApplication.save()
            res.status(201).json(newApplication)
        }

    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

exports.getAllApplications = async (req,res)=>{
    try {
        const applications = await applicant.find()
        res.status(200).json(applications)
    } catch (error) {
        res.status(500).json({message:error})
    }
}