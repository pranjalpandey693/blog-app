import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const secretKey = "my-screct-key";

export interface AuthRequest extends Request {
  user?: string;
}

const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ msg: "No token, authrization denied" });
  }

  try {
    const decoded = jwt.verify(token, secretKey) as { userId: string };
    req.user = decoded.userId;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};

export default authMiddleware;
