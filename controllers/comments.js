var Post = require('../models/post');

// CREATE
function commentsCreate(req, res){
  console.log(req.body.comments)
  var id = req.params.id;

  Post.findById({_id: id}, function(err, post) {
    // if (err) res.json({message: 'There is not a post with that id.'})
    post.comments.push(req.body.comments);
    post.save(function(err) {
      // if (err) res.json({
      //   message: "There seems to be some err in updating your post."
      // });
      // res.json({message: 'Post successfully updated.', post: post});
      res.redirect("/posts/"+id);
    });
  });
}

module.exports = {
  commentsCreate: commentsCreate
}