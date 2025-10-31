let user = require("../models/userModel");

exports.editUser = async (req, res) => {
  try {
    let { userName, password, bio, email, profile } = req.body;
    // variable to store profile pic
    pro = req.file ? req.file.filename : profile;
    let { id } = req.params;

    let updatedUser = await user.findByIdAndUpdate(
      { _id: id },
      { userName, password, bio, email, profile: pro },
      { new: true, runValidators: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    let users = await user.find({email : {$ne : 'admin@gmail.com'}}).select('-password');

    res.status(200).json(users);
  } catch (error) {
    console.log(error)
    res.status(500).json(error);
  }
};
