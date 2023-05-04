const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { User } = require("../models/user");

const {
      HttpError,
      ctrlWrapper,
} = require("../utils/index");

const { SECRET_KEY } = process.env;

const register = async (req, res) => {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (user) {
            throw HttpError(409, "Email already in use")
      };

      const hashPassword = await bcrypt.hash(password, 10);

      const result = await User.create({
            ...req.body,
            password: hashPassword,
      });
      res.status(201).json({
            user: {
                  email: result.email,
                  subscription: result.subscription,
            },
      });
};

const login = async (req, res) => {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
            throw HttpError(401, "Email or password invalid");
      };

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
            throw HttpError(401, "Email or password invalid");
      };

      const payload = {
            id: user._id,
      };

      const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
      await User.findByIdAndUpdate(user._id, { token });

      res.status(200).json({
            token,
            user: {
                  email: user.email,
                  subscription: user.subscription,
            },
      });
};

const getCurrent = async (req, res) => {
      const { subscription, email } = req.user;

      res.status(200).json({
            email,
            subscription,
      });
};

const logout = async (req, res) => {
      const { _id } = req.user;
      await User.findByIdAndUpdate(_id, { token: "" });

      res.status(200).json({
            message: "Logout success",
      });
};

const updateSubscription = async (req, res, next) => {
      const { _id } = req.user;
      const { subscription } = req.body;

      await User.findByIdAndUpdate(
            _id,
            { subscription },
            { runValidators: true }
      );

      res.status(200).json({
            subscription,
      });
};

module.exports = {
      register: ctrlWrapper(register),
      login: ctrlWrapper(login),
      getCurrent: ctrlWrapper(getCurrent),
      logout: ctrlWrapper(logout),
      updateSubscription: ctrlWrapper(updateSubscription),
};