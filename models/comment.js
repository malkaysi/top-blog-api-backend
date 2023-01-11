const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  entry: { type: String, required: true, maxLength: 300 },
  date_published: { type: Date },
  post: { type: Schema.Types.ObjectId, ref: "Post", required: true },
});

// Export model
module.exports = mongoose.model("Comment", CommentSchema);
