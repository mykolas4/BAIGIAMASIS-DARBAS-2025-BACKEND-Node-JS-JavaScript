const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken'); 
const bcrypt = require('bcryptjs'); 
const UserModel = require("../models/user");

const REGISTER = async (req, res) => {
  try {
    const { name, email, username, password } = req.body; 
    if (!name || !email || !username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const salt = await bcrypt.genSalt(10); 
    const hash = await bcrypt.hash(password, salt); 

    const newUser = {
      id: uuidv4(),
      username,
      email,
      password: hash,
    };

    const user = new UserModel(newUser);
    const response = await user.save();

    return res.status(201).json({ message: "User was created", user: response });
  } catch (err) {
    console.error(err); 
    return res.status(500).json({ message: "Internal server error" }); 
  }
};
const LOGIN = async (req, res) => {
  try {
    console.log(req.body);
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(401).json({ message: "You have provided bad data" });
    }

    const isPasswordsMatch = await bcrypt.compare(req.body.password, user.password); 

    if (!isPasswordsMatch) {
      return res.status(401).json({ message: "You have provided bad data" });
    }

    const token = jwt.sign(
      { email: user.email, id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "12h" }
    );

    return res.status(200).json({ message: "Successful login", token: token });
  } catch (err) {
    console.error(err); 
    return res.status(500).json({ message: "Internal server error" }); 
  }
};

module.exports = { REGISTER, LOGIN };