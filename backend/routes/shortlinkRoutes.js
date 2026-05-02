/* backend/routes/shortlinkRoutes.js */

import express from "express";

import {
  startShortlink,
  completeShortlink,
} from "../controllers/shortlinkController.js";

const router = express.Router();

router.post("/start", startShortlink);

router.get(
  "/complete/:sessionId",
  completeShortlink
);

export default router;