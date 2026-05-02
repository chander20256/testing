import { useState } from "react";

export default function ShortlinkCard(props) {

  const [loading, setLoading] =
    useState(false);

  /*
    SAFE LINK EXTRACTION
  */

  const link =
    props?.link || {};

  const title =
    link?.title || "Shortlink";

  const reward =
    link?.reward || 0;

  const time =
    link?.time || "N/A";

  const handleOpen = async () => {

    try {

      setLoading(true);

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/shortlink/start`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
        }
      );

      const data =
        await res.json();

      console.log(data);

      if (
        data?.success &&
        data?.shortlink
      ) {

        window.location.href =
          data.shortlink;

      } else {

        alert(
          data?.message ||
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
      "
    >

      <h2 className="text-2xl font-bold">
        {title}
      </h2>

      <p className="text-zinc-500 mt-3">
        Reward:
        {" "}
        {reward}
        {" "}
        Points
      </p>

      <p className="text-zinc-500 mt-1">
        Time:
        {" "}
        {time}
      </p>

      <button
        onClick={handleOpen}
        disabled={loading}
        className="
          w-full
          mt-6
          bg-green-500
          text-black
          py-3
          rounded-xl
          font-semibold
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