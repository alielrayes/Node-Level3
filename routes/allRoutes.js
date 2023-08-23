const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

var { requireAuth } = require("../middleware/middleware");
const { checkIfUser } = require("../middleware/middleware");
const { check, validationResult } = require("express-validator");
const authController = require("../controllers/authController");

router.get("*", checkIfUser);
router.post("*", checkIfUser);




const multer  = require('multer')
const upload = multer({storage: multer.diskStorage({})});
const cloudinary = require('cloudinary').v2
 
          
cloudinary.config({ 
  cloud_name: 'doaaoeqwc', 
  api_key: '589959866763938', 
  api_secret: 'gS0lnLsmJ4mkynsHJ1BZvGc_TO0' 
});
const AuthUser = require("../models/authUser");
var jwt = require("jsonwebtoken");

// LEVEL 3
router.post("/update-profile", upload.single('avatar'), function (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any

  console.log(req.file)


  cloudinary.uploader.upload(req.file.path, async  (error, result)=>{
    console.log("============================================")
    if (result) {
      console.log(result.secure_url)
      var decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET_KEY);

    const avatar = await  AuthUser.updateOne({_id: decoded.id}, {profileImage: result.secure_url})
    console.log(avatar)
    res.redirect("/home")
  }
 
  });
})









// Level 2

router.get("/signout", authController.get_signout);

router.get("/login", authController.get_login);

router.get("/signup", authController.get_signup);

router.post(
  "/signup",
  [
    check("email", "Please provide a valid email").isEmail(),
    check(
      "password",
      "Password must be at least 8 characters with 1 upper case letter and 1 number"
    ).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/),
  ],
  authController.post_signup
);

router.post("/login", authController.post_login);

router.get("/", authController.get_welcome);
// Level 1
// GET Requst
router.get("/home", requireAuth, userController.user_index_get);

router.get("/edit/:id", requireAuth, userController.user_edit_get);

router.get("/view/:id", requireAuth, userController.user_view_get);

router.post("/search", userController.user_search_post);

// DELETE Request
router.delete("/edit/:id", userController.user_delete);

// PUT Requst
router.put("/edit/:id", userController.user_put);

module.exports = router;
