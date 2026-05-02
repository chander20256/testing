/* frontend/src/components/globalcomp/Navbar.jsx */

import { useEffect, useState } from "react";

export default function Navbar() {

  const [points, setPoints] = useState(null);

  useEffect(() => {

    const fetchPoints = async () => {
      try {

        const res = await fetch(
          "http://localhost:5000/api/user/points"
        );

        const data = await res.json();

        setPoints(data.points);

      } catch (error) {
        console.error(error);
      }
    };

    fetchPoints();

  }, []);

  return (
    <nav
      className="
        sticky
        top-0
        z-50
        w-full
        border-b
        border-zinc-800
        bg-black/80
        backdrop-blur-xl
      "
    >
      <div
        className="
          max-w-7xl
          mx-auto
          px-4
          sm:px-6
          h-20
          flex
          items-center
          justify-between
        "
      >

        {/* Logo */}

        <div>

          <h1
            className="
              text-2xl
              font-bold
              tracking-wide
            "
          >
            Revedoo
          </h1>

          <p className="text-xs text-zinc-500">
            Rewarded Shortlinks
          </p>

        </div>

        {/* Dynamic Points */}

        <div
          className="
            flex
            items-center
            gap-3
            bg-zinc-900
            border
            border-zinc-800
            px-5
            py-3
            rounded-2xl
          "
        >

          <div
            className="
              w-3
              h-3
              rounded-full
              bg-green-500
              animate-pulse
            "
          />

          <div>

            <p className="text-xs text-zinc-500">
              Total Points
            </p>

            <h2
              className="
                text-lg
                font-bold
                text-green-400
              "
            >
              {points !== null
                ? points
                : "Loading..."}
            </h2>

          </div>

        </div>

      </div>
    </nav>
  );
}