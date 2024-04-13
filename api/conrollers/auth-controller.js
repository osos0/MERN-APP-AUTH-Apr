import User from "../models/usaer-model.js";
import bcrypt from "bcryptjs";

const Singup = async (req, res, next) => {
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

export default Singup;
