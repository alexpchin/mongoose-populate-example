var express = require('express'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    router = express.Router();

var postsController = require('../controllers/posts');
var usersController = require('../controllers/users');

// ## POSTS
router.route('/posts')
  .get(postsController.postsIndex)
  .post(postsController.postsCreate);

router.route('/posts/new')
  .get(postsController.postsNew);

router.route('/posts/:id')
  .get(postsController.postsShow)
  .put(postsController.postsUpdate);


// ## USERS
router.route('/users')
  .get(usersController.usersIndex)
  .post(usersController.usersCreate);

router.route('/users/new')
  .get(usersController.usersNew);

router.route('/users/:id')
  .get(usersController.usersShow)
  .put(usersController.usersUpdate);

// ROOT ROUTE
router.route("/")
  .get(postsController.postsIndex)

module.exports = router;