import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import shortlinkRoutes from "./routes/shortlinkRoutes.js";

dotenv.config();

const app = express();

/* database */
connectDB();

/* middleware */

app.use(express.json());

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

/* routes */

app.use("/api/user", userRoutes);
app.use("/api/shortlink", shortlinkRoutes);

/* test route */

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Revedoo Backend Running Successfully",
  });
});

/* port */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});