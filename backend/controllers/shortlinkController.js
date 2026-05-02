/* backend/controllers/shortlinkController.js */

import crypto from "crypto";
import axios from "axios";

import ShortlinkSession from "../models/ShortlinkSession.js";
import User from "../models/User.js";

/*
|--------------------------------------------------------------------------
| Start Shortlink
|--------------------------------------------------------------------------
*/

export const startShortlink = async (req, res) => {

  try {

    /*
      demo user
    */

    let user = await User.findOne({
      username: "demoUser",
    });

    if (!user) {

      user = await User.create({
        username: "demoUser",
        points: 0,
      });

    }

    /*
      create session id
    */

    const sessionId =
      crypto.randomBytes(16).toString("hex");

    /*
      save session
    */

    await ShortlinkSession.create({
      sessionId,
      userId: user._id.toString(),
      reward: 20,
    });

    /*
      IMPORTANT

      localhost usually fails with shortlink APIs

      use frontend or deployed callback later
    */

    const callbackUrl =
      `http://localhost:5000/api/shortlink/complete/${sessionId}`;

    console.log(
      "CALLBACK URL:"
    );

    console.log(callbackUrl);

    /*
      shrinkme api
    */

    const apiUrl =
      `https://shrinkme.io/api?api=${process.env.SHRINKME_API}&url=${encodeURIComponent(callbackUrl)}&format=text`;

    console.log(
      "API URL:"
    );

    console.log(apiUrl);

    /*
      request
    */

    const response =
      await axios.get(apiUrl);

    console.log(
      "SHRINKME RESPONSE:"
    );

    console.log(response.data);

    /*
      success
    */

    return res.status(200).json({
      success: true,
      shortlink: response.data,
    });

  } catch (error) {

    console.log(
      "======================"
    );

    console.log(
      "SHORTLINK ERROR"
    );

    console.log(
      "======================"
    );

    console.log(
      "FULL ERROR:"
    );

    console.log(error);

    console.log(
      "----------------------"
    );

    console.log(
      "ERROR RESPONSE:"
    );

    console.log(
      error.response?.data
    );

    console.log(
      "----------------------"
    );

    console.log(
      "ERROR MESSAGE:"
    );

    console.log(
      error.message
    );

    console.log(
      "======================"
    );

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

export const completeShortlink = async (
  req,
  res
) => {

  try {

    const { sessionId } =
      req.params;

    const session =
      await ShortlinkSession.findOne({
        sessionId,
      });

    if (!session) {

      return res.status(404).send(
        "Invalid session"
      );

    }

    /*
      prevent duplicate rewards
    */

    if (
      session.status ===
      "completed"
    ) {

      return res.send(
        "Reward already claimed"
      );

    }

    /*
      get user
    */

    const user =
      await User.findById(
        session.userId
      );

    if (!user) {

      return res.status(404).send(
        "User not found"
      );

    }

    /*
      add points
    */

    user.points +=
      session.reward;

    await user.save();

    /*
      update session
    */

    session.status =
      "completed";

    await session.save();

    console.log(
      "POINTS ADDED"
    );

    /*
      redirect frontend
    */

    return res.redirect(
      "http://localhost:5173/shortlinks"
    );

  } catch (error) {

    console.log(
      "COMPLETE ERROR:"
    );

    console.log(error);

    return res.status(500).send(
      "Server Error"
    );

  }

};