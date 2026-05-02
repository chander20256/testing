/* frontend/src/components/shortlinks/ShortlinkCard.jsx */

import { useState } from "react";

export default function ShortlinkCard({ link }) {

  const [loading, setLoading] = useState(false);

  const handleOpen = async () => {

    try {

      setLoading(true);

      const res = await fetch(
        "http://localhost:5000/api/shortlink/start",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();

      console.log(data);

      if (data.success && data.shortlink) {

        window.location.href =
          data.shortlink;

      } else {

        alert(
          data.message ||
          "Failed to generate shortlink"
        );

      }

    } catch (error) {

      console.error(error);

      alert("Server Error");

    } finally {

      setLoading(false);

    }

  };

  return (
    <div
      className="
        bg-zinc-900
        border
        border-zinc-800
        rounded-2xl
        p-6
        hover:border-green-500
        transition-all
        duration-300
      "
    >

      <h2 className="text-2xl font-bold">
        {link.title}
      </h2>

      <p className="text-zinc-500 mt-3">
        Reward: {link.reward} Points
      </p>

      <p className="text-zinc-500 mt-1">
        Time: {link.time}
      </p>

      <button
        onClick={handleOpen}
        disabled={loading}
        className="
          w-full
          mt-6
          bg-green-500
          hover:bg-green-400
          disabled:opacity-50
          text-black
          py-3
          rounded-xl
          font-semibold
          transition-all
        "
      >
        {
          loading
            ? "Generating..."
            : "Open Shortlink"
        }
      </button>

    </div>
  );
}