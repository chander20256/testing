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
      userId: user._id.toString(),
      reward: 20,
    });

    const callbackUrl =
      `https://testing-9858.onrender.com/api/shortlink/complete/${sessionId}`;

    console.log(
      "CALLBACK URL:"
    );

    console.log(callbackUrl);

    const apiUrl =
      `https://shrinkme.io/api?api=${process.env.SHRINKME_API}&url=${encodeURIComponent(callbackUrl)}&format=text`;

    console.log(
      "API URL:"
    );

    console.log(apiUrl);

    const response =
      await axios.get(apiUrl);

    console.log(
      "SHRINKME RESPONSE:"
    );

    console.log(response.data);

    if (!response.data) {

      return res.status(500).json({
        success: false,
        message:
          "Empty response from ShrinkMe",
      });

    }

    return res.status(200).json({
      success: true,
      shortlink: response.data,
    });

  } catch (error) {

    console.log(
      "SHORTLINK ERROR:"
    );

    console.log(
      error.response?.data ||
      error.message
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to generate shortlink",
    });

  }

};