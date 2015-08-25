var User = require('../models/user');

// INDEX
function usersIndex(req, res){
  User.find(function(err, users){
    // if (err) res.json({message: 'There are no users here.'});
    res.render("users/index", { users: users });
  });
}

// CREATE
function usersCreate(req,res){
  var user = new User(req.body);
  user.save(function(err){
    // if (err) res.json({message: "Creating a user failed."});
    // res.json({user: user});
    res.redirect("/users");
  });
}

// SHOW
function usersShow(req, res){
  var id = req.params.id;

  User.findById({_id: id}, function(err, user){
    // if (err) res.json({message: 'There is not a user with that id.'});
    console.log(user)
    res.render("users/show", { user: user });
  });
}

// NEW
function usersNew(req, res){
  res.render("users/new");
}

// EDIT
function usersEdit(req, res){
  res.render("users/edit");
}

// UPDATE
function usersUpdate(req, res){
  var id = req.params.id;

  User.findById({_id: id}, function(err, user) {
    // if (err) res.json({message: 'There is not a user with that id.'})

    user.save(function(err) {
      // if (err) res.json({
      //   message: "There seems to be some err in updating your user."
      // });

      // res.json({message: 'User successfully updated.', user: user});
    });
  });
}

// DELETE
function usersDestroy(req, res){
  var id = req.params.id;
  User.remove({_id: id}, function(err) {
    // if (err) res.json({message: 'There is not a user with that id.'})
    // res.json({message: 'User has been successfully deleted'});
  });
}

module.exports = {
  usersIndex: usersIndex,
  usersCreate: usersCreate,
  usersNew: usersNew,
  usersEdit: usersEdit,
  usersShow: usersShow,
  usersUpdate: usersUpdate,
  usersDestroy: usersDestroy
}