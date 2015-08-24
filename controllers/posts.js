var Post = require('../models/post');

// INDEX
function postsIndex(req, res){
  Post.find(function(err, posts){
    if (err) res.json({message: 'There are no posts here.'});
    Post.find({})
      .populate('_author')
      .populate('comments._author')
      .exec(function(err, posts) {
        res.render("posts/index", { posts: posts });
      })
  });
}

// CREATE
function postsCreate(req,res){
  var post = new Post(req.body);
  post.save(function(err){
    if (err) res.json({message: "Creating a post failed."});
    res.json({post: post});
  });
}

// SHOW
function postsShow(req, res){
  var id = req.params.id;

  Post.findById({_id: id}, function(err, post){
    if (err) res.json({message: 'There is not a post with that id.'});
    res.render("posts/show", { post: post });
  });
}

// NEW
function postsNew(req, res){
  res.render("posts/new");
}

// UPDATE
function postsUpdate(req, res){
  var id = req.params.id;

  Post.findById({_id: id}, function(err, post) {
    if (err) res.json({message: 'There is not a post with that id.'})

    post.save(function(err) {
      if (err) res.json({
        message: "There seems to be some err in updating your post."
      });

      res.json({message: 'Post successfully updated.', post: post});
    });
  });
}

// DELETE
function postsDestroy(req, res){
  var id = req.params.id;
  Post.remove({_id: id}, function(err) {
    if (err) res.json({message: 'There is not a post with that id.'})
    res.json({message: 'Post has been successfully deleted'});
  });
}

module.exports = {
  postsIndex: postsIndex,
  postsCreate: postsCreate,
  postsNew: postsNew,
  postsShow: postsShow,
  postsUpdate: postsUpdate,
  postsDestroy: postsDestroy
}