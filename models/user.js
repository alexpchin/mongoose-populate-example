/*
  This user document has an example of a sub-document (sub-doc)
  - http://mongoosejs.com/docs/subdocs.html

  Sub-documents are docs with schemas of their own which are elements of a parents document array. Sub-documents enjoy all the same features as normal documents. The only difference is that they are not saved individually, they are saved whenever their top-level parent document is saved. 
  If an error occurs in a sub-documents' middleware, it is bubbled up to the save() callback of the parent, so error handling is a snap!

  ## PROBLEM with sub-docs
  The problem with sub-docs is that they are not saved individually, they are saved there the parent Schema is saved, so if you need to use the sub-docs individually this may not be the right approach for you.
*/

var mongoose = require('mongoose'),
    Post = require('./post');

var ImageSchema = new mongoose.Schema({
  url: String
})

var UserSchema = new mongoose.Schema({
  name: String,
  images: [ImageSchema]
});

// Cleaning mechanism for removing orphaned comments
// https://github.com/Automattic/mongoose/issues/1241
// UserSchema.post('remove', function(next) {
//   // 'this' is the client being removed.
//   console.log("HERE!")
// });

module.exports = mongoose.model("User", UserSchema);