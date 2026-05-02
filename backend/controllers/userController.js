import User from "../models/User.js";

export const getUserPoints = async (req, res) => {
  try {
    /*
      temporary demo user
      later replace with auth user
    */

    let user = await User.findOne({ username: "demoUser" });

    if (!user) {
      user = await User.create({
        username: "demoUser",
        points: 0,
      });
    }

    res.status(200).json({
      success: true,
      points: user.points,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};