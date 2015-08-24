# mongoose-populate-example
An example of referencing schema in properties and arrays

When using a NoSQL database like MongoDb, most of the time you'll have documents that contain all properties by itself. But there are also scenarios where you might encounter the need for a more relational approach and need to reference other documents by the ObjectIds.

This post will show you how to deal with these references using Node.js and the [mongoose ODM][1].

Lets consider we'll have a users collection and a posts collection, thus we'll have a `UserSchema` as well as a `PostSchema`. Posts can be written by users and the can by commented by users.

In this example, well reference the users in posts and comments by their ObjectId reference.

The `UserSchema` is implemented straight forward and looks like this:

    var mongoose = require('mongoose');

    var UserSchema = new mongoose.Schema({
        name: String
    });

    module.exports = mongoose.model("User", UserSchema);

Beside the title property, the `PostSchema` also defines the reference by ObjectId for the `postedBy` property of the PostSchema as well as the `postedBy` property of the comments inside the `comments` array property:

    var mongoose = require('mongoose');

    var PostSchema = new mongoose.Schema({
        title: String,
        postedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        comments: [{
            text: String,
            postedBy: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        }]
    });

    module.exports = mongoose.model("Post", PostSchema);

Now lets create two users:

    require("./database");

    var User = require('./User'),
        Post = require('./Post');

    var alex = new User({
        name: "Alex"
    });

    var gerry = new User({
        name: "Gerry"
    })

    alex.save();
    gerry.save();

The interesting part of course is the creation and even more the query for posts. The post is created with the ObjectId references to the users.

    var post = new Post({
        title: "Hello World",
        postedBy: alex._id,
        comments: [{
            text: "Nice post!",
            postedBy: gerry._id
        }, {
            text: "Thanks :)",
            postedBy: alex._id
        }]
    })

Now lets save the Post and after it got created, query for all existing Posts.

    post.save(function(error) {
        if (!error) {
            Post.find({})
                .populate('postedBy')
                .populate('comments.postedBy')
                .exec(function(error, posts) {
                    console.log(JSON.stringify(posts, null, "t"))
                })
        }
    });

As you can see, the we're using the [`populate`][2] function of mongoose to join the documents when querying for Posts. The first call to `populate` joins the Users for the `postedBy` property of the posts whereas the second one joins the Users for the comments.

The Post document in the database looks like this:

    {
        "_id" : ObjectId("54cd6669d3e0fb1b302e54e6"),
        "title" : "Hello World",
        "postedBy" : ObjectId("54cd6669d3e0fb1b302e54e4"),
        "comments" : [
            {
                "text" : "Nice post!",
                "postedBy" : ObjectId("54cd6669d3e0fb1b302e54e5"),
                "_id" : ObjectId("54cd6669d3e0fb1b302e54e8")
            },
            {
                "text" : "Thanks :)",
                "postedBy" : ObjectId("54cd6669d3e0fb1b302e54e4"),
                "_id" : ObjectId("54cd6669d3e0fb1b302e54e7")
            }
        ],
        "__v" : 0
    }

In contrast, the query result is a full document containing all User references for the Posts.

    [
        {
            "_id": "54cd6669d3e0fb1b302e54e6",
            "title": "Hello World",
            "postedBy": {
                "_id": "54cd6669d3e0fb1b302e54e4",
                "name": "Alex",
                "__v": 0
            },
            "__v": 0,
            "comments": [
                {
                    "text": "Nice post!",
                    "postedBy": {
                        "_id": "54cd6669d3e0fb1b302e54e5",
                        "name": "Gerry",
                        "__v": 0
                    },
                    "_id": "54cd6669d3e0fb1b302e54e8"
                },
                {
                    "text": "Thanks :)",
                    "postedBy": {
                        "_id": "54cd6669d3e0fb1b302e54e4",
                        "name": "Alex",
                        "__v": 0
                    },
                    "_id": "54cd6669d3e0fb1b302e54e7"
                }
            ]
        }
    ]

You can find the source code for this sample in [this][3] GitHub repository.

[1]: http://mongoosejs.com/
[2]: http://mongoosejs.com/docs/populate.html
[3]: https://github.com/alexpchin/mongoose-populate-example
  