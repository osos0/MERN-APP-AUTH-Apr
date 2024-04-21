import User from "../models/usaer-model.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const Singup = async (req, res, next) => {
  const { username, email, password } = req.body;

  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    const user = await newUser.save();
    res.status(200).json("User created success");
  } catch (error) {
    next(error);
  }
};

export const Singin = async (req, res, next) => {
  const { username, password, email } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "User not Found"));
    const validPassword = await bcrypt.compare(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Wrong credntials"));
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: hashedPassword, ...rest } = validUser._doc;
    const expireDate = new Date(Date.now() + 3600000); // Set expiration time 1 hour from now

    res
      .cookie("access_token", token, {
        httpOnly: true,
        expires: expireDate,
      })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  try {
    ///////////////////////////////////////////////////////
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: hashedPassword, ...rest } = user._doc;
      const expireDate = new Date(Date.now() + 3600000); // Set expiration time 1 hour from now
      res
        .cookie("access_token", token, {
          httpOnly: true,
          expires: expireDate,
        })
        .status(200)
        .json(rest);
      ///////////////////////////////////////////////
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcrypt.hashSync(generatedPassword, 10);

      const newUser = new User({
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.floor(Math.random() * 10000).toString(9),
        email: req.body.email,
        password: hashedPassword,
        profilePic: req.body.Photo,
      });
      await newUser.save();
      const token = jwt.sign(
        { id: newUser._id, isAdmin: newUser.isAdmin },
        process.env.JWT_SECRET
      );
      const { password, ...rest } = newUser._doc;
      const expireDate = new Date(Date.now() + 3600000); // Set expiration time 1 hour from now
      res
        .cookie("access_token", token, {
          httpOnly: true,
          expires: expireDate,
        })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};

export const signOut = async (req, res, next) => {
  try {
    res
      .clearCookie("access_token")
      .status(200)
      .json({ Message: "Signed out successfully" });
  } catch (error) {
    next(error);
  }
};
