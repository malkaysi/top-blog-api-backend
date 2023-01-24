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
  imageUrl: {type: String, default: 'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80',
}
});

// Virtual for post's URL
PostSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need this object
  return `/blog/${this._id}`;
});

// Export model
module.exports = mongoose.model("Post", PostSchema);
