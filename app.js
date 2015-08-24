var express    = require('express'),
    morgan     = require('morgan'),
    path       = require('path'),
    bodyParser = require('body-parser'),
    ejsLayouts = require('express-ejs-layouts'),
    app        = express();

app.use(morgan('dev')); 

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(ejsLayouts);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

require("./config/database");

var User = require('./models/user'),
    Post = require('./models/post');

var routes = require("./config/routes");
app.use(routes);

var port = process.env.PORT || 1337;

app.listen(port, function(){
  console.log("http://127.0.0.1:" + port + "/");
})












// Creating test users
var alex = new User({
    name: "Alex",
    images: [{
      url: "http://fillmurray.com/200/200"
    }]
});
alex.save();

var gerry = new User({
  name: "Gerry",
  images: [{
    url: "http://fillmurray.com/201/201"
  }]
})
gerry.save();

// https://coderwall.com/p/6v5rcw/querying-sub-documents-and-sub-sub-documents-in-mongoose
// Querying sub-document using _id
var id = alex.images[0]._id
// console.log(alex.images.id(id))

// Adding sub-document using push + save");
var newImage = alex.images.push({ url: "http://fillmurray.com/202/202" });
alex.save();

// Adding sub-document using create
var newdoc = alex.images.create({ url: "http://fillmurray.com/203/203" });

// Creating a new post with some comments
// var post = new Post({
//   title: "Hello World",
//   _author: alex._id,
//   comments: [
//     {
//       text: "Nice post!",
//       _author: gerry._id
//     }, {
//       text: "Thanks :)",
//       _author: alex._id
//     }
//   ]
// });

// post.save(function(err) {
//   if (!err) {
//     // Display the posts out on the page
//     Post.find({})
// // In mongoose >= 3.6, we can pass a space delimited string of path names to populate. Before 3.6 you must execute the populate() method multiple times.
//     // .populate('_author')
//     // .populate('comments._author')
//     .populate('_author comments._author')
//     .exec(function(err, posts) {
//       // Stringify to display nested objects instead of: [Object]
//       // console.log(JSON.stringify(posts, null, "\t"))
//     })
//   }
// });

// Deleting comments when a user is deleted
// First deleting a user
// .remove will delete all
User.remove({ name: gerry.name }, function(err, users){
  // console.log('Gerry has been deleted.');
});

// Showing remaining users
User.find({})
  .exec(function(err, users) {
    // console.log(JSON.stringify(users, null, "\t"))
  })

// Show posts
// Post.find({})
//   .populate('_author comments._author')
//   .exec(function(err, posts) {
//     // Stringify to display nested objects instead of: [Object]
//     // console.log(JSON.stringify(posts, null, "\t"))
//   })