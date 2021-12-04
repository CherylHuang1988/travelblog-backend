const upload = require("../middleware/cloudinary");
const isLoggedIn = require("../middleware/isLoggedIn");
const BlogPost = require("../models/Post.model");
const User = require("../models/User.model");

const router = require("express").Router();

router.patch("/update-account", isLoggedIn, (req, res) => {
  const { username } = req.body;
  const { _id } = req.user;

  if (username === req.user.username) {
    return res.json({ user: req.user });
  }

  User.findOne({ username }).then((foundUser) => {
    if (foundUser) {
      return res
        .status(400)
        .json({ errorMessage: "Username already taken. No can dozville" });
    }

    User.findByIdAndUpdate(_id, { username }, { new: true }).then(
      (newImprovedUser) => {
        res.json({ user: newImprovedUser });
      }
    );
  });
});

router.post(
  "/updateProfilePic",
  isLoggedIn,
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

module.exports = router;
