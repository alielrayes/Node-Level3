const AuthUser = require("../models/authUser");
var moment = require("moment");
var jwt = require("jsonwebtoken");

// 1- get nested objects inside an array
// 2- add nested object inside an array
// 3- delete nested object inside an array

// 4- update nested object inside an array

//   /home
//    done
const user_index_get = (req, res) => {
  var decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET_KEY);

  AuthUser.findOne({ _id: decoded.id })
    .then((result) => {
      res.render("index", { arr: result.customerInfo, moment: moment });
    })
    .catch((err) => {
      console.log(err);
    });
};

// done
const user_post = (req, res) => {
  var decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET_KEY);
  console.log("========================================");
  console.log(req.body);

  AuthUser.updateOne({ _id: decoded.id }, { $push: { customerInfo: req.body } })
    .then(() => {
      res.redirect("/home");
    })
    .catch((err) => {
      console.log(err);
    });
};


// done
//   /edit/:id
const user_delete = (req, res) => {

  AuthUser.updateOne(
    { "customerInfo._id" : req.params.id },
    { $pull: { customerInfo: { _id: req.params.id } } }
  )
    .then((result) => {
      res.redirect("/home");
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
};


//  view/:id
const user_view_get = (req, res) => {
  // result ==> object
  User.findById(req.params.id)
    .then((result) => {
      res.render("user/view", { obj: result, moment: moment });
    })
    .catch((err) => {
      console.log(err);
    });
};








const user_edit_get = (req, res) => {
  User.findById(req.params.id)
    .then((result) => {
      res.render("user/edit", { obj: result, moment: moment });
    })
    .catch((err) => {
      console.log(err);
    });
};



const user_search_post = (req, res) => {
  console.log("*******************************");

  const searchText = req.body.searchText.trim();

  User.find({ $or: [{ fireName: searchText }, { lastName: searchText }] })
    .then((result) => {
      console.log(result);
      res.render("user/search", { arr: result, moment: moment });
    })
    .catch((err) => {
      console.log(err);
    });
};

const user_put = (req, res) => {
  User.updateOne({ _id: req.params.id }, req.body)
    .then((result) => {
      res.redirect("/home");
    })
    .catch((err) => {
      console.log(err);
    });
};

const user_add_get = (req, res) => {
  res.render("user/add");
};

module.exports = {
  user_index_get,
  user_edit_get,
  user_view_get,
  user_search_post,
  user_delete,
  user_put,
  user_add_get,
  user_post,
};
