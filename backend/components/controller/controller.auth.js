const User = require("../model/model.user");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Role = require("../model/model.user.role");
require("dotenv").config();

const authRegisterUser = async (req, res) => {
  const {
    User_username,
    User_firstname,
    User_lastname,
    User_phoneNumber,
    User_email,
    User_password,
    User_repeat_password,
    User_role,
  } = req.body;

  const schema = Joi.object({
    User_username: Joi.string().alphanum().min(3).max(30).required(),
    User_firstname: Joi.string().alphanum().min(3).max(30).required(),
    User_lastname: Joi.string().alphanum().min(3).max(30).required(),
    User_username: Joi.string().alphanum().min(3).max(30).required(),
    User_phoneNumber: Joi.string().min(8).max(13).required(),
    User_email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
    User_password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    User_repeat_password: Joi.ref("User_password"),
    User_role: Joi.number().default(3),
  });
  const role = User_role || 3;
  try {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const username = await User.findOne({
      where: { User_username: User_username },
    });
    if (username) {
      return res
        .status(201)
        .json({ message: "Username has been used by another user" });
    }
    const email = await User.findOne({ where: { User_email: User_email } });
    if (email) {
      return res
        .status(201)
        .json({ message: "Email has already been registered by another user" });
    }
    const roles = await Role.findByPk(role);
    if (!roles) {
      return res.status(404).json({ message: "Role not found" });
    }
    const saltPassword = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(User_password, saltPassword);
    const user = await User.create({
      User_username: User_username,
      User_firstname: User_firstname,
      User_lastname: User_lastname,
      User_phoneNumber: User_phoneNumber,
      User_email: User_email,
      User_password: hashPassword,
      User_role: role,
    });
    return res
      .status(200)
      .json({ message: "Success, user registered", User: user });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const authLoginUser = async (req, res) => {
  const { User_username, User_email, User_password } = req.body;
  const schema = Joi.object({
    User_username: Joi.string().alphanum().min(3).max(30),
    User_email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
    User_password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  }).xor("User_username", "User_email");

  try {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    if (!User_username && !User_email) {
      return res.status(400).json({
        error: "Either 'User_username' or 'User_email' must be provided",
      });
    }

    // Construct the query based on which field is provided
    const whereClause = User_username ? { User_username } : { User_email };

    const user = await User.findOne({
      where: whereClause,
    });

    if (!user) {
      return res.status(400).json({ error: "Username or email is invalid" });
    }

    const passwordMatch = await bcrypt.compare(
      User_password,
      user.User_password
    );
    if (!passwordMatch) {
      return res.status(400).json({ error: "Password is invalid" });
    }

    const token = jwt.sign({ id: user.id }, "secretKey", {
      expiresIn: "8h", // Adjust the expiration time as needed
    });

    res.cookie("secret_key", token, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });

    res
      .status(200)
      .json({ message: "Login successful", Token: token, User: user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const authHome = async (req, res) => {
  try {
    const user = req.user;
    if (user) {
      if (user.User_role === 1) {
        res.status(200).json({ message: "Admin Home Page", User: user });
      } else if (user.User_role === 2) {
        res.status(200).json({ message: "Mentor Home Page", User: user });
      } else if (user.User_role === 3) {
        res.status(200).json({ message: "User Home Page", User: user });
      }
    } else {
      res.status(404).send({ error: "No users found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { authRegisterUser, authLoginUser, authHome };
