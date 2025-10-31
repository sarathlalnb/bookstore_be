const user = require("../models/userModel");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
  try {
    const { userName, password, email } = req.body;

    if (userName && password && email) {
      let existingUser = await user.findOne({ email });
      if (existingUser) {
        res
          .status(409)
          .json({ message: "User with this mail Id already exists" });
      } else {
        let newUser = new user({ userName, email, password });
        await newUser.save();
        res.status(201).json(newUser);
      }
      // save the data to database
    } else {
      // inform user to fill the data
      res.status(406).json({ message: "Please fill the fields" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.loginUser = async (req, res) => {
  try {
    let { email, password } = req.body;

    let existingUser = await user.findOne({ email });

    if (existingUser) {
      if (existingUser.password == password) {
        // logic for successfull login
        let token = jwt.sign(
          { userMail: existingUser.email },
          process.env.JwtSecretKey
        );

        console.log(token);

        res.status(200).json({ token: token, user: existingUser });
      } else {
        res.status(401).json({ message: "Invalid Password" });
      }
    } else {
      res.status(401).json({ message: "Invalid Email Id" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.googleAuth = async (req, res) => {
  const { userName, email, profile } = req.body;

  try {
    let existingUser = await user.findOne({ email });

    if (existingUser) {
      let token = jwt.sign(
        { userMail: existingUser.email },
        process.env.JwtSecretKey
      );
      res.status(200).json({ token: token, user: existingUser });
      //login
    } else {
      //register - first time using
      let newuser = new user({
        userName,
        email,
        profile,
        password: process.env.dummyPswd,
      });
      await newuser.save();

      let token = jwt.sign(
        { userMail: newuser.email },
        process.env.JwtSecretKey
      );
      res.status(201).json({ token: token, user: newuser });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
