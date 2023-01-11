const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: { type: String, required: true, maxLength: 25 },
  entry: { type: String, required: true, maxLength: 1000 },
  isPublished: {
    type: Boolean,
    required: true,
    default: false,
  },
  date_published: { type: Date },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

// Virtual for post's URL
PostSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need this object
  return `/blog/${this._id}`;
});

// Export model
module.exports = mongoose.model("Post", PostSchema);
