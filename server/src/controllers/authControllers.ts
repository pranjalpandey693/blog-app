import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User";

const secretKey = "my-screct-key";

export const register = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    user = new User({ username, password });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = { userId: user.id };

    const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });

    res.json({ token });
  } catch (err) {
    if (err instanceof Error) console.log(err.message);
    res.status(500).send("server error");
  }
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    let user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const payload = { userId: user.id };

    const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });

    res.json({ token });
  } catch (err) {
    if (err instanceof Error) console.log(err.message);
    res.status(500).send("server error");
  }
};
