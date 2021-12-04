const upload = require("../middleware/cloudinary");
const isLoggedIn = require("../middleware/isLoggedIn");
/*const BlogPost = require("../models/Post.model");*/
const User = require("../models/User.model");

const router = require("express").Router();

router.post(
  "/user/updateProfilePic",
  upload.single("profilePic"),
  (req, res) => {
    const { userId } = req.body;
    User.findByIdAndUpdate(userId, { profilePic: req.file.path }, { new: true })
      .then((updatedUser) => {
        res.json({
          success: true,
          profilePic: updatedUser.profilePic,
        });
      })
      .catch((err) => {
        res.json({
          success: false,
          message: "Something went wrong",
        });
      });
  }
);
