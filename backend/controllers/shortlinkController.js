/* backend/controllers/shortlinkController.js */

export const startShortlink =
  async (req, res) => {

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

      const apiUrl =
        `https://shrinkme.io/api?api=${process.env.SHRINKME_API}&url=${encodeURIComponent(callbackUrl)}&format=text`;

      console.log(
        "Generating Shortlink..."
      );

      const response =
        await axios.get(apiUrl);

      console.log(
        "ShrinkMe Response:",
        response.data
      );

      /*
        important validation
      */

      if (
        !response.data ||
        typeof response.data !== "string"
      ) {

        return res.status(500).json({
          success: false,
          message:
            "Invalid shortlink response",
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