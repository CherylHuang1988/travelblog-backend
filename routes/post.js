const { Router } = require("express");
const upload = require("../middleware/cloudinary");
const isLoggedIn = require("../middleware/isLoggedIn");
const BlogPost = require("../models/Post.model");

const router = Router();

router.post("/create", isLoggedIn, upload.single("postPicture"), (req, res) => {
  BlogPost.create({
    owner: req.user._id,
    title: req.body.title,
    content: req.body.content,
    image: req.file.path,
  })
    .then((createdPost) => {
      res.json({ post: createdPost });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
