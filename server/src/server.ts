import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/config";
import authRoutes from "./routes/authRoutes";
import authMiddleware from "./middlewares/authMiddleware";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({ msg: "This is a protected route" });
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
