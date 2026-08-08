// ======================================================
// RecommendationList.jsx
// SkillSync V2
// Job Recommendation Cards
// ======================================================

import {
  MapPin,
  Briefcase,
  IndianRupee,
  Clock,
  ExternalLink,
  Heart,
} from "lucide-react";



function RecommendationList({
  recommendations,
  saveJob,
}) {

  if (!recommendations)
    return null;

  return (

    <div className="grid lg:grid-cols-2 gap-7 mt-8">

      {recommendations.length === 0 ? (

        <div className="col-span-full bg-slate-800 rounded-2xl border border-slate-700 p-8 text-center">

          <h3 className="text-xl font-semibold text-gray-300">

            No matching jobs found.

          </h3>

          <p className="text-gray-500 mt-2">

            Try changing the search or filter.

          </p>

        </div>

      ) : (

        recommendations.map((job, index) => {

          const score =
            job["Match Score"] <= 1
              ? Math.round(job["Match Score"] * 100)
              : Math.round(job["Match Score"]);

          return (

            <div
              key={index}
              className="bg-slate-800 rounded-2xl border border-slate-700 hover:border-cyan-400 hover:-translate-y-1 transition-all duration-300 p-6"
            >
                            {/* ====================================== */}
              {/* Job Header */}
              {/* ====================================== */}

              <div className="flex justify-between items-start">

                <div>

                  <div className="flex justify-between items-start">

                    <h2 className="text-xl font-bold text-cyan-400">
                      {job.Title}
                    </h2>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      job.Type === "Live Job"
                        ? "bg-green-600"
                        : "bg-cyan-600"
                    }`}
                  >
                    {job.Type}
                  </span>

                </div>

                  <div className="flex items-center gap-2 mt-2 text-gray-300">

                    <Briefcase size={16} />

                    <span>{job.Company}</span>

                  </div>

                </div>

              </div>

              {/* ====================================== */}
              {/* AI Match Badge */}
              {/* ====================================== */}

              <div className="mt-5 flex justify-between items-center">

                <span className="text-sm text-gray-400">

                  AI Match Score

                </span>

                <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full font-semibold">

                  ⭐ {score}%

                </span>

              </div>

              {/* Progress Bar */}

              <div className="mt-3 bg-slate-700 rounded-full h-3">

                <div
                  className="bg-cyan-400 h-3 rounded-full transition-all duration-500"
                  style={{
                    width: `${score}%`,
                  }}
                />

              </div>

              {/* ====================================== */}
              {/* Job Details */}
              {/* ====================================== */}

              <div className="mt-6 space-y-3 text-gray-300">

                {job.Location && (

                  <div className="flex items-center gap-3">

                    <MapPin
                      size={18}
                      className="text-cyan-400"
                    />

                    <span>{job.Location}</span>

                  </div>

                )}

                {job.Salary && (

                  <div className="flex items-center gap-3">

                    <IndianRupee
                      size={18}
                      className="text-green-400"
                    />

                    <span>{job.Salary}</span>

                  </div>

                )}

                {/* ====================================== */}
                {/* Matched Skills */}
                {/* ====================================== */}

                {job["Matched Skills"]?.length > 0 && (

                  <div>

                    <h4 className="text-green-400 font-semibold">
                        Matched Skills
                    </h4>

                    <div className="flex flex-wrap gap-2 mt-2">

                        {job["Matched Skills"].map((skill, i) => (

                            <span
                              key={i}
                              className="bg-green-500/20 text-green-300 px-2 py-1 rounded-full text-xs"
                            >
                              {skill}
                            </span>

                        ))}

                    </div>

                  </div>

                )}

                {job.Duration && (

                  <div className="flex items-center gap-3">

                    <Clock
                      size={18}
                      className="text-yellow-400"
                    />

                    <span>{job.Duration}</span>

                  </div>

                )}

              </div>

              {/* ====================================== */}
              {/* Missing Skills */}
              {/* ====================================== */}

              {job["Missing Skills"]?.length > 0 && (

                <div>

                  <h4 className="text-red-400 font-semibold mt-3">
                    Missing Skills
                  </h4>

                  <div className="flex flex-wrap gap-2 mt-2">

                    {job["Missing Skills"].map((skill, i) => (

                      <span
                        key={i}
                        className="bg-red-500/20 text-red-300 px-2 py-1 rounded-full text-xs"
                      >
                        {skill}
                      </span>

                    ))}

                  </div>

                </div>

              )}

              {/* ====================================== */}
              {/* Why Recommended */}
              {/* ====================================== */}

              {job["Why Recommended"]?.length > 0 && (

               <div className="mt-6">

                <h4 className="text-cyan-400 font-semibold mb-2">
                  Why Recommended
                </h4>

                <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">

                  {job["Why Recommended"].map((reason, i) => (

                    <li key={i}>
                      {reason}
                    </li>

                  ))}

                </ul>

              </div>

            )}

              {/* ====================================== */}
              {/* Buttons */}
              {/* ====================================== */}

              <div className="grid grid-cols-2 gap-4 mt-8">

                <button

                  onClick={() => saveJob(job)}

                  className="flex justify-center items-center gap-2 bg-pink-600 hover:bg-pink-700 py-3 rounded-xl font-semibold transition"

                >

                  <Heart size={18} />

                  Save

                </button>

                <button
                  disabled={!job["Apply Link"]}

                  onClick={() => {
                    if (job["Apply Link"]) {
                    window.open(job["Apply Link"], "_blank");
                    }
                  }}

                  className={`flex justify-center items-center gap-2 py-3 rounded-xl font-semibold transition ${
                    job["Apply Link"]
                      ? "bg-cyan-500 hover:bg-cyan-600"
                      : "bg-gray-600 cursor-not-allowed"
                  }`}
                >

                  <ExternalLink size={18} />

                    {job["Apply Link"]
                      ? "Apply Now"
                      : "Link Not Available"}

                </button>

              </div>

            </div>

          );

        })

      )}

    </div>

  );

}

export default RecommendationList;