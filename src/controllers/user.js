const { v4: uuidv4 } = require('uuid');
const { jwt } = require('jsonwebtoken');
const { bcrypt } = require('bcryptjs');
const UserModel = require("../models/user");


const REGISTER = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = {
      id: uuidv4(),
      email: req.body.email,
      name: req.body.name,
      password: hash,
    };

    const user = new UserModel(newUser);

    const response = await user.save();

    return res
      .status(201)
      .json({ message: "User was created", user: response });
  } catch (err) {
    console.log(err);
    return res(500).json({ message: "We have some problems" });
  }
};



const LOGIN = async (req, res) => {
  try {
    console.log(req.body)
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(401).json({ message: "You have provided bad data" });
    }

    const isPasswordsMatch = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!isPasswordsMatch) {
      return res.status(401).json({ message: "You have provided bad data" });
    }

    const token = jwt.sign(
      { email: user.email, id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "12h" }
    );

    return res.status(200).json({ message: "successfull login", token: token });
  } catch (err) {
    console.log(err);
    return res(500).json({ message: "We have some problems" });
  }
};

module.exports = { REGISTER, LOGIN };
