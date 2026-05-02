import { useState } from "react";

export default function ShortlinkCard(props) {

  console.log("SHORTLINK PROPS:", props);

  const [loading, setLoading] = useState(false);

  const link = props?.link;

  if (!link) {

    console.log("LINK IS UNDEFINED");

    return (
      <div className="text-red-500">
        Invalid Link Data
      </div>
    );

  }

  const handleOpen = async () => {

    try {

      setLoading(true);

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/shortlink/start`,
        {
          method: "POST",
        }
      );

      const data = await res.json();

      if (data.success) {

        window.location.href =
          data.shortlink;

      }

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  };

  return (
    <div className="bg-zinc-900 p-6 rounded-2xl">

      <h2 className="text-2xl font-bold">
        {link.title}
      </h2>

      <p>
        Reward: {link.reward}
      </p>

      <button
        onClick={handleOpen}
        className="mt-4 bg-green-500 px-4 py-2 rounded-xl text-black"
      >
        {
          loading
            ? "Loading..."
            : "Open"
        }
      </button>

    </div>
  );
}