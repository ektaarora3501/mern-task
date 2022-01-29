const Users = require("../model/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Router = require("express").Router();
const Auth = require("./../middleware/auth");

Router.post("/register", async (req, res) => {
  try {
    const data = req.body;
    if (
      !data.email ||
      !data.password ||
      !data.passwordCheck ||
      !data.first_name ||
      !data.last_name ||
      !data.phone_number
    ) {
      return res.status(400).json("Please enter all the fields");
    }
    if (data.password.length < 5) {
      return res
        .status(400)
        .json("Password should be atleast 5 characters long");
    }
    if (data.password !== data.passwordCheck) {
      return res.status(400).json("Passwords do not match");
    }
    if (data.phone_number.length !== 10) {
      return res.status(400).json("Enter valid 10 digit mobile number");
    }

    Users.findOne({ email: data.email }, async (err, res_data) => {
      if (res_data) {
        return res.status(400).json("Email Id already registered");
      } else {
        const salt = await bcrypt.genSalt();
        const pwdHash = await bcrypt.hash(data.password, salt);

        const newUser = new Users({
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
          password: pwdHash,
          phone_number: data.phone_number,
        });

        newUser.save((err, data) => {
          if (err) {
            console.log(err);
            return res.status(500).json("Some error in registering user");
          }
          res.status(200).json("User registered successfully");
        });
      }
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json("Some error in registering user");
  }
});

Router.post("/login", (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json("Please enter email and password to login");
    }

    Users.findOne({ email: email }, async (err, user) => {
      if (user) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(403).json("Bad credentials");
        } else {
          const token = jwt.sign({ id: user._id }, process.env.TOKEN);

          return res.status(200).json({
            token: token,
            user: user,
          });
        }
      } else {
        return res.status(400).json("No account found");
      }
    });
  } catch (err) {
    return res.status(500).json({ err });
  }
});

Router.get("/profile", Auth, async (req, res) => {
  console.log(req.user)
  try {
    Users.findById(req.user, (err, data) => {
      return res.status(200).json(data);
    });
  } catch (err) {
    return res.status(500).json({ err });
  }
});

module.exports = Router;
