/* src/components/globalcomp/Navbar.jsx */

import { useEffect, useState } from "react";

export default function Navbar() {

  const [points, setPoints] =
    useState(0);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const fetchPoints = async () => {

      try {

        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/user/points`
        );

        const data =
          await res.json();

        console.log(
          "POINTS RESPONSE:",
          data
        );

        /*
          SAFE CHECK
        */

        if (
          data &&
          typeof data.points ===
            "number"
        ) {

          setPoints(
            data.points
          );

        } else {

          setPoints(0);

        }

      } catch (error) {

        console.error(error);

        setPoints(0);

      } finally {

        setLoading(false);

      }

    };

    fetchPoints();

  }, []);

  return (
    <nav
      className="
        w-full
        border-b
        border-zinc-800
        bg-black
      "
    >

      <div
        className="
          max-w-7xl
          mx-auto
          px-6
          h-20
          flex
          items-center
          justify-between
        "
      >

        <div>

          <h1
            className="
              text-2xl
              font-bold
              text-white
            "
          >
            Revedoo
          </h1>

          <p className="text-zinc-500 text-sm">
            Reward Platform
          </p>

        </div>

        <div
          className="
            bg-zinc-900
            px-5
            py-3
            rounded-xl
          "
        >

          <p className="text-zinc-500 text-xs">
            Total Points
          </p>

          <h2
            className="
              text-green-400
              font-bold
              text-xl
            "
          >
            {
              loading
                ? "..."
                : points
            }
          </h2>

        </div>

      </div>

    </nav>
  );
}