const { Schema, model } = require("mongoose");
const blogPostSchema = new Schema(
  {
    image: String,
    title: String,
    content: String,
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    owner: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const BlogPost = model("Post", blogPostSchema);
module.exports = BlogPost;
