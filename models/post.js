/*
  ## Saving by reference

  There are no joins in MongoDB but sometimes we still want references to documents in other collections. This is where population comes in.

  ## postedBy
  Our Post model has it's author field set to a user ObjectId. 
  The naming convention _author, would also work as author

  This allows two models to be saved independently.
*/

var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
  title: String,
  _author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  comments: [{
    text: String,
    _author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  }]
});

module.exports = mongoose.model("Post", PostSchema);