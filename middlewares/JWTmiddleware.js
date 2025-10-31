// check for token in the req.header
// if not token is available res.status(406).json("Please login")
// if token :- import jwt
// use jwt.verify method using the secret key
// if token is verified :- go to the controller using next()
// if token is not verified :- res.status(401).json(invalid token)

const jwt = require("jsonwebtoken");

const jwtMiddleWare = (req, res, next) => {
  console.log("inside jwt middleware");

  //to avoid bearer word
  let token = req.headers.authorization.split(" ")[1];

  if (token) {
    try {
      let tokenVerify = jwt.verify(token, process.env.JwtSecretKey);
      console.log(tokenVerify);
      req.user = tokenVerify;
      next();
    } catch (error) {
      res.status(401).json({ message: "invalid token" });
    }
  } else {
    res.status(406).json({ message: "Please Login" });
  }

  //token = bearer <token>
};

module.exports = jwtMiddleWare;
