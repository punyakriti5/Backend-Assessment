const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// photo, name, bio, phone, email, and password
const signup = async (req, res) => {
  const { fullname, email, phoneNum, password } = req.body;

  try {
    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email is already registered" })}
   
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      fullname,
      email,
      phoneNum,
      password: hashedPassword,
    });
    await user.save();

    //res.status(201).send("User registered successfully");
    res.redirect("/");
  } catch (error) {
    console.error("Error during user registration:", error);
    res.status(500).send("Internal server error");
  }
};

const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      //return res.status(401).json({ error: "Invalid password or email" });
      return res.render("signin", {
        error: "Invalid Username or Password",
      });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    //  res.status(200).json({ accessToken: token, user: rest });
    //  res.json({ token });
    res.cookie({ token });
  return res.redirect("/");

  } catch (error) {
    console.error("Error during user login:", error);
    res.status(500).send("Internal server error");
  }
};

module.exports = { signup, signin };
