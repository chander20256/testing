import express from "express";

import {
  getUserPoints,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/points", getUserPoints);

export default router;