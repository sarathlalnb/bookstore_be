const jobModel = require("../models/jobModel");

exports.createJob = async (req, res) => {
  try {
    let {
      jobTitle,
      jobLocation,
      jobType,
      salary,
      qualification,
      experiance,
      jobDescription,
    } = req.body;

    let existingJob = await jobModel.findOne({ jobTitle, jobLocation });

    if (existingJob) {
      res
        .status(409)
        .json({ message: "Job With this title and location already Exists" });
    } else {
      let newJob = new jobModel({
        jobTitle,
        jobLocation,
        jobType,
        salary,
        qualification,
        experiance,
        jobDescription,
      });

      await newJob.save();

      res.status(201).json(newJob);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getAllJobs = async (req, res) => {
  try {
    let allJobs = await jobModel.find();
    res.status(200).json(allJobs);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.deleteJob = async (req, res) => {
  try {
    let { id } = req.params;

    await jobModel.findByIdAndDelete(id);

    res.status(200).json({ message: "Successfully Deleted" });
  } catch (error) {
    res.status(500).json(error);
  }
};
