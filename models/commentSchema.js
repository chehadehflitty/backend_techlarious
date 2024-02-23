const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  commentOwner:{
    type: Schema.Types.ObjectId,
    ref:"User",
  },
  parentPost:{
    type: Schema.Types.ObjectId,
    ref:"User",
  },
  content:{
    type:String,
    default:"",
    maxlength: 400,
  },
 },
 {timestmaps: true}
);

module.exports = mongoose.model("Comment",commentSchema);
