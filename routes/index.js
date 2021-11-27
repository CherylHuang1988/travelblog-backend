const router = require("express").Router();
const authRoutes = require("./auth");
const postRouter = require("./post");

/* GET home page */
router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.use("/auth", authRoutes);
router.use("/post", postRouter);

module.exports = router;
