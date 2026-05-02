import crypto from "crypto";
import axios from "axios";

import ShortlinkSession from "../models/ShortlinkSession.js";
import User from "../models/User.js";

/*
|--------------------------------------------------------------------------
| Start Shortlink
|--------------------------------------------------------------------------
*/

export const startShortlink = async (
  req,
  res
) => {

  try {

    let user =
      await User.findOne({
        username: "demoUser",
      });

    if (!user) {

      user =
        await User.create({
          username: "demoUser",
          points: 0,
        });

    }

    const sessionId =
      crypto
        .randomBytes(16)
        .toString("hex");

    await ShortlinkSession.create({
      sessionId,

      userId:
        user._id.toString(),

      reward: 20,
    });

    const callbackUrl =
      `https://testing-9858.onrender.com/api/shortlink/complete/${sessionId}`;

    const apiUrl =
      `https://shrinkme.io/api?api=${process.env.SHRINKME_API}&url=${encodeURIComponent(callbackUrl)}&format=text`;

    const response =
      await axios.get(apiUrl);

    return res.status(200).json({
      success: true,

      shortlink:
        response.data,
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,

      message:
        "Failed to generate shortlink",
    });

  }

};

/*
|--------------------------------------------------------------------------
| Complete Shortlink
|--------------------------------------------------------------------------
*/

export const completeShortlink =
  async (req, res) => {

    try {

      const { sessionId } =
        req.params;

      const session =
        await ShortlinkSession.findOne({
          sessionId,
        });

      if (!session) {

        return res
          .status(404)
          .send(
            "Invalid session"
          );

      }

      if (
        session.status ===
        "completed"
      ) {

        return res.send(
          "Reward already claimed"
        );

      }

      const user =
        await User.findById(
          session.userId
        );

      if (!user) {

        return res
          .status(404)
          .send(
            "User not found"
          );

      }

      user.points +=
        session.reward;

      await user.save();

      session.status =
        "completed";

      await session.save();

      return res.redirect(
        "https://revadoo.vercel.app/#/shortlinks"
      );

    } catch (error) {

      console.log(error);

      return res
        .status(500)
        .send(
          "Server Error"
        );

    }

  };