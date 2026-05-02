/* backend/server.js */

import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";

import userRoutes from "./routes/userRoutes.js";
import shortlinkRoutes from "./routes/shortlinkRoutes.js";

dotenv.config();

const app = express();

/*
|--------------------------------------------------------------------------
| Database
|--------------------------------------------------------------------------
*/

connectDB();

/*
|--------------------------------------------------------------------------
| Middleware
|--------------------------------------------------------------------------
*/

app.use(express.json());

/*
|--------------------------------------------------------------------------
| CORS
|--------------------------------------------------------------------------
*/

app.use(cors());

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
*/

app.use(
  "/api/user",
  userRoutes
);

app.use(
  "/api/shortlink",
  shortlinkRoutes
);

/*
|--------------------------------------------------------------------------
| Health Route
|--------------------------------------------------------------------------
*/

app.get("/", (req, res) => {

  res.status(200).json({
    success: true,
    message:
      "Revedoo Backend Running Successfully",
  });

});

/*
|--------------------------------------------------------------------------
| Server
|--------------------------------------------------------------------------
*/

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(
    `Server running on port ${PORT}`
  );

});