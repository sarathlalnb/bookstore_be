const multer = require("multer");

const storage = multer.diskStorage({
  // path to store the file.
  destination: (req, file, callBack) => {
    callBack(null, "./uploads");
  },
  // to provide custom name to files
  filename: (req, file, callBack) => {
    let date = Date.now();
    callBack(null, `BookStore-${date}-${file.originalname}`);
  },
});

const fileFilter = (req, file, callBack) => {
  if (
    file.mimetype == "image/png" ||
    file.mimetype == "image/jpeg" ||
    file.mimetype == "image/jpg"  || 
    file.mimetype == "application/pdf"
  ) {
    callBack(null, true);
    // return true to callback
  } else {
    callBack(null, false);
    return callBack(new Error("Please upload png/jpeg/jpg  images only"));
    // return false to callback and throw a error
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
