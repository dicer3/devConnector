const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");

const User = require("../../models/user");

// @route   GET api/users
// @desc    Register user
// @access  Public
router.post(
  "/",
  [
    check("name", "name is required").not().isEmpty(),
    check("email", "please include a valid email").isEmail(),
    check(
      "password",
      "please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { name, email, password } = req.body;
    try {
      //console.log(req.body);
      let user = await User.findOne({ email });
      // see if user exists
      if (user)
        return res
          .status(400)
          .json({ errors: [{ msg: "user already exists" }] });

      //get users gravatar
      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      });

      user = new User({
        name,
        email,
        avatar,
        password,
      });

      //encrypt password
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      //return jsonwebtoken

      res.send("user registered");
    } catch (err) {
      console.log(err.message);
      res.status(500);
    }
  }
);

module.exports = router;
