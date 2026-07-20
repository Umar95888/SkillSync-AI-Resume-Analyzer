function RecommendationList({ recommendations }) {
  return (
    <div className="grid md:grid-cols-2 gap-6">

      {recommendations.length === 0 ? (

        <div className="text-center text-gray-400 col-span-2">
          No recommendations found.
        </div>

      ) : (

        recommendations.map((job, index) => (

          <div
            key={index}
            className="bg-slate-800 rounded-2xl p-6 border border-slate-700 hover:border-cyan-400 hover:scale-[1.02] transition-all duration-300"
          >

            <h2 className="text-xl font-bold text-cyan-400">
              {job.Title}
            </h2>

            <p className="mt-2 text-gray-300">
              {job.Company}
            </p>

            <span className="inline-block mt-3 bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full text-sm">
              {job.Type}
            </span>

            <p className="mt-4">
              📍 {job.Location}
            </p>

            <p className="mt-2">
              💰 {job.Salary}
            </p>

            <p className="mt-2">
              ⏳ {job.Duration}
            </p>

            <div className="mt-5">

              <div className="flex justify-between mb-2">

                <span>Match Score</span>

                <span>
                  {(job["Match Score"] * 100).toFixed(0)}%
                </span>

              </div>

              <div className="bg-slate-700 rounded-full h-3">

                <div
                  className="bg-cyan-400 h-3 rounded-full"
                  style={{
                    width: `${job["Match Score"] * 100}%`,
                  }}
                />

              </div>

            </div>

            <button
              onClick={() => {
                if (job["Apply Link"]) {
                  window.open(job["Apply Link"], "_blank");
                } else {
                  alert("Application link not available.");
                }
              }}
              className="mt-6 w-full bg-cyan-500 hover:bg-cyan-600 py-3 rounded-xl font-semibold"
            >
              Apply Now
            </button>

          </div>

        ))

      )}

    </div>
  );
}

export default RecommendationList;