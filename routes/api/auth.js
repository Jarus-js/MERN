const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
//Verify
const authorize = require("../../verifyToken");
//Modal
const User = require("../../model/User");
//Validation
const { registerValidation, loginValidation } = require("../../validation");

//Method
/*const tokenForUser = user =>{
  return jwt.sign(user,process.env.SECRET)
}*/

//=> /api/auth/register
router.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  //Validate data before we create user
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  //Check if email passed by user exist in db
  User.findOne({ email })
    .then((dbEmail) => {
      if (dbEmail) {
        return res.status(400).json("Email is in use..");
      }
      //Hashing password
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
          const user = new User({
            name,
            email,
            password: hash,
          });
          user
            .save()
            .then((newUser) => {
              console.log("registeredUser", newUser);
              //create and assign token
              jwt.sign(
                { _id: newUser._id, email: newUser.email },
                process.env.SECRET,
                (err, token) => {
                  if (err) {
                    res.json(err.response);
                  } else {
                    //res.header("auth-token", token).send(token);
                    res.json({
                      token,
                      user: {
                        id: newUser.id,
                        name: newUser.name,
                        email: newUser.email,
                      },
                    });
                  }
                }
              );
            })
            .catch((err) => res.status(400).send(err.response));
        });
      });
    })
    .catch((err) => res.status(500).json(err));
});

//LOGIN => /api/auth/login
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  //Validate data before we login user
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  //Check if email passed by user exist or not in db
  User.findOne({ email }).then((user) => {
    if (!user) {
      return res.status(400).json("Email or Password donot Match..");
    }
    //Check if passowrd Match or Not ?
    bcrypt
      .compare(password, user.password)
      .then((isMatch) => {
        if (!isMatch) {
          return res.json("password donot match");
        }
        //create and assign token
        jwt.sign(
          { _id: user._id, email: user.email },
          process.env.SECRET,
          (err, token) => {
            if (err) {
              res.json(err);
            } else {
              //res.header("auth-token", token).send(token);
              res.json({
                token,
                user: {
                  id: user.id,
                  name: user.name,
                  email: user.email,
                },
              });
            }
          }
        );
      })
      .catch((err) => res.json(err));
  }); //findOne
});

//Protected Route => /api/auth/user
router.get("/user", authorize, (req, res) => {
  //res.send(req.user);
  console.log("loginUser", req.user);
  User.findById(req.user._id)
    .select("-password")
    .then((user) => {
      console.log("currentLoginUser", user);
      res.json(user);
    })
    .catch((err) => {
      console.log("loginError", err.response);
      res.json(err);
    });
});

module.exports = router;
