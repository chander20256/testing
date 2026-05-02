/* src/pages/ShortlinksPage.jsx */

import Navbar from "../components/globalcomp/Navbar";
// import ShortlinkCard from "../components/shortlinks/ShortlinkCard";

export default function ShortlinksPage() {

  const shortlinks = [
    {
      id: 1,
      title: "Easy Shortlink",
      reward: 20,
      time: "30s",
      difficulty: "Easy",
    },
    {
      id: 2,
      title: "Medium Shortlink",
      reward: 35,
      time: "45s",
      difficulty: "Medium",
    },
    {
      id: 3,
      title: "Hard Shortlink",
      reward: 50,
      time: "60s",
      difficulty: "Hard",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">

      <Navbar />

      <div className="px-4 sm:px-6 py-10">

        <div className="max-w-7xl mx-auto">

          {/* Header */}

          <div className="mb-12">

            <div
              className="
                inline-flex
                items-center
                gap-2
                px-4
                py-2
                rounded-full
                border
                border-zinc-800
                bg-zinc-900/60
                text-sm
                text-green-400
                mb-5
              "
            >
              Reward Verification Enabled
            </div>

            <h1
              className="
                text-4xl
                md:text-5xl
                font-bold
                leading-tight
              "
            >
              Complete Shortlinks
              <br />
              Earn Reward Points
            </h1>

            <p
              className="
                text-zinc-400
                mt-5
                max-w-2xl
                text-base
                md:text-lg
              "
            >
              Open shortlinks, complete verification,
              and receive reward points after successful validation.
            </p>

          </div>

          {/* Info Cards */}

          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              gap-4
              mb-10
            "
          >

            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
              <p className="text-zinc-500 text-sm">
                Available Shortlinks
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {shortlinks.length}
              </h2>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
              <p className="text-zinc-500 text-sm">
                Reward System
              </p>

              <h2 className="text-3xl font-bold mt-2 text-green-400">
                Active
              </h2>
            </div>

          </div>

          {/* Cards */}

          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-2
              xl:grid-cols-3
              gap-6
            "
          >
            {/* {shortlinks.map((link) => (
              <ShortlinkCard
                key={link.id}
                link={link}
              />
            ))} */}
          </div>

        </div>

      </div>

    </div>
  );
}