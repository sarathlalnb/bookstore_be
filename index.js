//config dotenv
require('dotenv').config()
const express = require("express");
const cors = require("cors");
const router = require("./routes");

//require db config
require('./config/dbConfig')


const server = express();

// thirdparty, application-level
server.use(cors());


// middleware to parse json //builtin , application-level
server.use(express.json())

// built-in middleware function in Express. It serves static files and is based on serve-static.

server.use('/uploads',express.static('./uploads'))

//before going to router we must go through the json parser
server.use(router)


const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => {
  console.log("server is successfully running in", PORT);
});
