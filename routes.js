const express = require("express");
const authController = require("./controllers/authController");
const jwtMiddleWare = require("./middlewares/JWTmiddleware");
const upload = require("./middlewares/multerMiddleware");
const bookController = require("./controllers/bookController");
const userController = require("./controllers/userController");
const jobController = require("./controllers/jobController");
const applicationController = require("./controllers/applicantController");

const router = new express.Router();

router.post("/register", authController.registerUser);

router.post("/login", authController.loginUser);

router.post("/googleAuth", authController.googleAuth);

router.post(
  "/createBooks",
  jwtMiddleWare,
  upload.array("bookImages"),
  bookController.addbook
);

router.get("/getAllBooks", jwtMiddleWare, bookController.getAllbook);

router.get("/getHomebooks", bookController.getHomeBooks);

router.put(
  "/:id/updateUser",
  jwtMiddleWare,
  upload.single("profile"),
  userController.editUser
);

router.get("/getUserBooks", jwtMiddleWare, bookController.getUserBooks);

router.get("/:id/getSingleBook", jwtMiddleWare, bookController.getSingleBook);

router.get("/allUser", jwtMiddleWare, userController.getAllUsers);

router.post("/createJob", jwtMiddleWare, jobController.createJob);

router.get("/getAllJobs", jwtMiddleWare, jobController.getAllJobs);

router.delete("/:id/deleteJob", jwtMiddleWare, jobController.deleteJob);

router.post(
  "/addApplication",
  upload.single("resume"),
  applicationController.addApplicant
);

router.get(
  "/viewApplications",
  jwtMiddleWare,
  applicationController.getAllApplications
);

router.put("/makePayment", jwtMiddleWare, bookController.makePayment);


router.get('/getPayments',jwtMiddleWare,bookController.getPaymentHistory)

module.exports = router;
