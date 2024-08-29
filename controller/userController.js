const {User} = require("../model/UserModel");
const{handleErr,createToken} = require("../helper/helper");
const usersGet =async function (req,res) {
     try {
          let users = await User.find();
          res.status(200).json(users);
      } catch (err) {
          res.status(500).json({
              message: "Something went wrong. praying......"
          })
      }
  
}
const usersPost = async function (req,res) {
     let newUser = User({
          username: req.body.username,
          email: req.body.email,
          password: req.body.password
      });
  
      newUser.save()
          .then(
              () => {
                  let token = createToken(newUser.id);
                  res.cookie("_token", token, { maxAge: 1000 * 60 * 60 * 24 });
                  res.status(201).json({ id: newUser.id });
  
              }
          )
          .catch(
              (error) => {
                  let errors = handleErr(error)
                  console.log(error.message)
                  res.status(400).json({
                      errors
                  });
              }
          )
  
}
const getUserByID = function(req,res) {
     User.findById(req.params.id)
     .then(document => {

         res.status(200).json(document);
     }).catch(err => {
         console.log(err.message);
         res.status(404).json({
             message: "NOt found......"
         });

     });
}

module.exports = {usersGet,usersPost,getUserByID}
