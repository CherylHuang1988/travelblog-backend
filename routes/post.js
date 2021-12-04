const { Router } = require("express");
const upload = require("../middleware/cloudinary");
const isLoggedIn = require("../middleware/isLoggedIn");
const BlogPost = require("../models/Post.model");

const router = Router();

router.get("/", isLoggedIn, (req, res) => {
  BlogPost.find({}).then((allPosts) => {
    res.json({ post: allPosts });
  });
});

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

router.get("/:postId", (req, res) => {
  const { postId } = req.params;

  BlogPost.findById(postId)
    .populate("owner")
    .then((singlePost) => {
      if (!singlePost) {
        return res
          .status(404)
          .json({ errorMessage: `Post wiht the id ${postId} does not exist` });
      }
      res.json({ post: singlePost });
    });
});

router.delete("/:postId/delete", isLoggedIn, (req, res) => {
  const { postId } = req.params;

  BlogPost.findByIdAndDelete(postId).then((deletePost) => {
    res.json({ success: true });
  });
});

module.exports = router;
