/* frontend/src/pages/LandingPage.jsx */

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      setLoading(true);

      /*
        later connect backend login/signup
      */

      console.log(formData);

      navigate("/shortlinks");

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        min-h-screen
        bg-black
        text-white
        flex
        items-center
        justify-center
        px-4
      "
    >

      <div
        className="
          w-full
          max-w-5xl
          grid
          lg:grid-cols-2
          border
          border-zinc-800
          rounded-3xl
          overflow-hidden
          bg-zinc-950
        "
      >

        {/* Left Side */}

        <div
          className="
            p-10
            lg:p-14
            flex
            flex-col
            justify-center
          "
        >

          <div
            className="
              inline-flex
              w-fit
              px-4
              py-2
              rounded-full
              bg-zinc-900
              border
              border-zinc-800
              text-sm
              text-green-400
              mb-6
            "
          >
            Reward Based Platform
          </div>

          <h1
            className="
              text-5xl
              font-bold
              leading-tight
            "
          >
            Earn Rewards
            <br />
            Through
            <span className="text-green-400">
              {" "}
              Shortlinks
            </span>
          </h1>

          <p
            className="
              text-zinc-400
              mt-6
              text-lg
              leading-relaxed
            "
          >
            Complete shortlinks, verify tasks,
            and earn reward points securely
            through Revedoo.
          </p>

        </div>

        {/* Right Side */}

        <div
          className="
            border-l
            border-zinc-800
            bg-black
            p-10
            lg:p-14
            flex
            flex-col
            justify-center
          "
        >

          <h2
            className="
              text-3xl
              font-bold
              mb-3
            "
          >
            Login / Signup
          </h2>

          <p className="text-zinc-500 mb-10">
            Create your account and start earning reward points.
          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            {/* Email */}

            <div>

              <label
                className="
                  text-sm
                  text-zinc-400
                  mb-2
                  block
                "
              >
                Email Address
              </label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
                className="
                  w-full
                  bg-zinc-900
                  border
                  border-zinc-800
                  rounded-2xl
                  px-5
                  py-4
                  outline-none
                  focus:border-green-500
                  transition-all
                "
              />

            </div>

            {/* Password */}

            <div>

              <label
                className="
                  text-sm
                  text-zinc-400
                  mb-2
                  block
                "
              >
                Password
              </label>

              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
                className="
                  w-full
                  bg-zinc-900
                  border
                  border-zinc-800
                  rounded-2xl
                  px-5
                  py-4
                  outline-none
                  focus:border-green-500
                  transition-all
                "
              />

            </div>

            {/* Submit */}

            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                bg-green-500
                hover:bg-green-400
                text-black
                font-semibold
                py-4
                rounded-2xl
                transition-all
                duration-300
              "
            >
              {
                loading
                  ? "Please wait..."
                  : "Continue"
              }
            </button>

          </form>

          {/* Points Box */}

          <div
            className="
              mt-10
              p-5
              rounded-2xl
              border
              border-zinc-800
              bg-zinc-900/50
            "
          >

            <p className="text-sm text-zinc-400">
              New users will start with:
            </p>

            <h3
              className="
                text-3xl
                font-bold
                text-green-400
                mt-2
              "
            >
              0 Points
            </h3>

          </div>

        </div>

      </div>

    </div>
  );
}