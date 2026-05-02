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
| CORS FIX
|--------------------------------------------------------------------------
*/

const allowedOrigins = [
  "http://localhost:5173",

  "https://revadoo.vercel.app",

  "https://revadoo.onrender.com",
];

app.use(
  cors({
    origin: function (
      origin,
      callback
    ) {

      /*
        allow requests with no origin
      */

      if (!origin) {

        return callback(
          null,
          true
        );

      }

      if (
        allowedOrigins.includes(
          origin
        )
      ) {

        callback(null, true);

      } else {

        callback(
          new Error(
            "Not allowed by CORS"
          )
        );

      }

    },

    methods: [
      "GET",
      "POST",
      "PUT",
      "DELETE",
      "OPTIONS",
    ],

    credentials: true,
  })
);

/*
|--------------------------------------------------------------------------
| Handle Preflight
|--------------------------------------------------------------------------
*/

app.options("*", cors());

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
| Test Route
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
| Start Server
|--------------------------------------------------------------------------
*/

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(
    `Server running on port ${PORT}`
  );

});