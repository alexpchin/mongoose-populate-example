require("./config/database");

var User = require('./models/user'),
Post = require('./models/post');

var alex = new User({
  name: "Alex"
});

var gerry = new User({
  name: "Gerry"
})

alex.save();
gerry.save();

var post = new Post({
  title: "Hello World",
  postedBy: alex._id,
  comments: [
    {
      text: "Nice post!",
      postedBy: gerry._id
    }, {
      text: "Thanks :)",
      postedBy: alex._id
    }
  ]
})

post.save(function(err) {
  if (!err) {
    // Display the posts out on the page
    Post.find({})
    .populate('postedBy')
    .populate('comments.postedBy')
    .exec(function(err, posts) {
      console.log(JSON.stringify(posts, null, "\t"))
    })
  }
});