const router = require("express").Router();
const authRoutes = require("./auth");
const postRouter = require("./post");
const userRoutes = require("./user");

/*const upload = require("..middleware/cloudinary");*/
const User = require("../models/User.model");
const isLoggedIn = require("../middleware/isLoggedIn");

/* GET home page */
router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.use("/auth", authRoutes);
router.use("/post", postRouter);
router.use("/user", userRoutes);

module.exports = router;
