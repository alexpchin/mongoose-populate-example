var express = require('express'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    router = express.Router();

var postsController = require('../controllers/posts');
var commentsController = require('../controllers/comments');
var usersController = require('../controllers/users');

// ## POSTS
router.route('/posts')
  .get(postsController.postsIndex)
  .post(postsController.postsCreate);

router.route('/posts/new')
  .get(postsController.postsNew);

router.route('/posts/:id')
  .get(postsController.postsShow)
  .put(postsController.postsUpdate)
  .delete(postsController.postsDestroy);

router.route('/posts/:id/comments')
  .post(commentsController.commentsCreate);

// ## USERS
router.route('/users')
  .get(usersController.usersIndex)
  .post(usersController.usersCreate);

router.route('/users/new')
  .get(usersController.usersNew);

router.route('/users/:id')
  .get(usersController.usersShow)
  .put(usersController.usersUpdate)
  .delete(usersController.usersDestroy);

// ROOT ROUTE
router.route("/")
  .get(postsController.postsIndex)

module.exports = router;