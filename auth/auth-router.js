const router = require("express").Router();

const userDB = require("./auth-model");

const { validateRegister, validateUser, signToken } = require("../api/middleware/middleware");

const bcrypt = require("bcrypt");

// //* POST /register - Adds new user to database
router.post("/register", validateRegister, (req, res) => {
  const user = ({ username, password } = req.body);

  bcrypt
    .hash(user.password, 8)
    .then((hash) => {
      //Change password to hashed version
      user.password = hash;

      //Insert user into database
      userDB
        .insert(user)
        .then((newUser) => {
          //Send back user id
          res.status(201).json({ userId: newUser[0] });
        })
        .catch((error) => {
          if (error.errno === 19) {
            res.status(403).json({ message: "Username already exists" });
          } else {
            res.status(500).json({ message: "Error adding new user to database", error: error });
          }
        });
    })
    .catch((error) => {
      res.status(500).json({ message: "Error generating hash", error: error });
    });
});

//* POST /login - Authenticates user credentials
router.post("/login", validateUser, (req, res) => {
  const { username, password } = req.body;

  userDB
    .getByUsername(username)
    .first()
    .then((user) => {
      if (user) {
        bcrypt
          .compare(password, user.password)
          .then((authenticated) => {
            if (authenticated) {
              const token = signToken(user);
              res.status(200).json({ message: "Logged in", token });
            } else {
              res.status(400).json({ message: "You shall not pass!" });
            }
          })
          .catch((error) => {
            res.status(500).json({ message: "Invalid username / password combination", error: error });
          });
      } else {
        res.status(404).json({ message: "User invalid" });
      }
    })
    .catch((error) => {
      res.status(400).json({ message: "You shall not pass!", error: error });
    });
});

module.exports = router;
