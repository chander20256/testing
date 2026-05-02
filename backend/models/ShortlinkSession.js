/* backend/models/ShortlinkSession.js */

import mongoose from "mongoose";

const shortlinkSessionSchema = new mongoose.Schema(
  {
    sessionId: {
      type: String,
      required: true,
      unique: true,
    },

    userId: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
    },

    reward: {
      type: Number,
      default: 20,
    },
  },
  {
    timestamps: true,
  }
);

const ShortlinkSession = mongoose.model(
  "ShortlinkSession",
  shortlinkSessionSchema
);

export default ShortlinkSession;