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
  if (!recommendations) {
    return null;
  }

  return (
    <div className="grid lg:grid-cols-2 gap-6 mt-8">

      {recommendations.length === 0 ? (

        <div className="col-span-full bg-white rounded-xl border border-slate-200 p-8 text-center">

          <Briefcase
            size={32}
            className="mx-auto text-slate-400"
            strokeWidth={1.7}
          />

          <h3 className="text-xl font-semibold text-slate-900 mt-4">
            No matching jobs found
          </h3>

          <p className="text-slate-500 mt-2">
            Try changing the search or filter.
          </p>

        </div>

      ) : (

        recommendations.map((job, index) => {

          // ==========================================
          // Match Score
          // ==========================================

          const rawScore = Number(job["Match Score"]) || 0;

          const score =
            rawScore <= 1
              ? Math.round(rawScore * 100)
              : Math.round(rawScore);

          const safeScore = Math.min(
            Math.max(score, 0),
            100
          );


          // ==========================================
          // Job Source
          // ==========================================

          const isLiveJob =
            job.Type === "Live Job";


          return (

            <div
              key={`${job.Title}-${job.Company}-${index}`}
              className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-200 p-6"
            >

              {/* ====================================== */}
              {/* Job Header */}
              {/* ====================================== */}

              <div className="flex justify-between items-start gap-4">

                <div className="flex-1 min-w-0">

                  <h2 className="text-lg font-semibold text-slate-900 wrap-break-word">
                    {job.Title || "Job Title Not Available"}
                  </h2>

                  <div className="flex items-center gap-2 mt-2 text-slate-600">

                    <Briefcase
                      size={16}
                      className="text-blue-600 shrink-0"
                      strokeWidth={1.8}
                    />

                    <span className="wrap-break-word text-sm">
                      {job.Company || "Company Not Available"}
                    </span>

                  </div>

                </div>


                {/* Live / Dataset Badge */}

                <span
                  className={`shrink-0 px-2.5 py-1 rounded-md text-xs font-medium border ${
                    isLiveJob
                      ? "bg-green-50 text-green-700 border-green-200"
                      : "bg-slate-50 text-slate-600 border-slate-200"
                  }`}
                >
                  {isLiveJob
                    ? "Live Job"
                    : "Dataset"}
                </span>

              </div>


              {/* ====================================== */}
              {/* Job Type */}
              {/* ====================================== */}

              <div className="mt-4">

                <span className="inline-block bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1 rounded-md text-xs font-medium">
                  {isLiveJob
                    ? "Live Job"
                    : job.Type || "Job"}
                </span>

              </div>


              {/* ====================================== */}
              {/* Match Score */}
              {/* ====================================== */}

              <div className="mt-6 flex justify-between items-center">

                <span className="text-sm text-slate-500">
                  Resume Match
                </span>

                <span className="bg-green-50 text-green-700 border border-green-200 px-3 py-1 rounded-md text-sm font-semibold">
                  {safeScore}%
                </span>

              </div>


              {/* ====================================== */}
              {/* Progress Bar */}
              {/* ====================================== */}

              <div className="mt-3 bg-slate-200 rounded-full h-2">

                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                  style={{
                    width: `${safeScore}%`,
                  }}
                />

              </div>


              {/* ====================================== */}
              {/* Job Details */}
              {/* ====================================== */}

              <div className="mt-6 space-y-3 text-slate-600">

                {job.Location &&
                  job.Location !== "Not Available" && (

                  <div className="flex items-center gap-3">

                    <MapPin
                      size={17}
                      className="text-slate-500 shrink-0"
                      strokeWidth={1.8}
                    />

                    <span className="wrap-break-word text-sm">
                      {job.Location}
                    </span>

                  </div>

                )}


                {job.Salary &&
                  job.Salary !== "Not Available" && (

                  <div className="flex items-center gap-3">

                    <IndianRupee
                      size={17}
                      className="text-slate-500 shrink-0"
                      strokeWidth={1.8}
                    />

                    <span className="wrap-break-word text-sm">
                      {job.Salary}
                    </span>

                  </div>

                )}


                {/* ====================================== */}
                {/* Matched Skills */}
                {/* ====================================== */}

                {Array.isArray(job["Matched Skills"]) &&
                  job["Matched Skills"].length > 0 && (

                  <div className="pt-2">

                    <h4 className="text-sm font-semibold text-slate-900">
                      Matched Skills
                    </h4>

                    <div className="flex flex-wrap gap-2 mt-2">

                      {job["Matched Skills"].map(
                        (skill, i) => (

                        <span
                          key={i}
                          className="bg-green-50 text-green-700 border border-green-200 px-2.5 py-1 rounded-md text-xs"
                        >
                          {skill}
                        </span>

                      ))}

                    </div>

                  </div>

                )}


                {job.Duration &&
                  job.Duration !== "Not Available" && (

                  <div className="flex items-center gap-3 pt-1">

                    <Clock
                      size={17}
                      className="text-slate-500 shrink-0"
                      strokeWidth={1.8}
                    />

                    <span className="text-sm">
                      {job.Duration}
                    </span>

                  </div>

                )}

              </div>


              {/* ====================================== */}
              {/* Missing Skills */}
              {/* ====================================== */}

              {Array.isArray(job["Missing Skills"]) &&
                job["Missing Skills"].length > 0 && (

                <div className="mt-5">

                  <h4 className="text-sm font-semibold text-slate-900">
                    Missing Skills
                  </h4>

                  <div className="flex flex-wrap gap-2 mt-2">

                    {job["Missing Skills"].map(
                      (skill, i) => (

                      <span
                        key={i}
                        className="bg-red-50 text-red-700 border border-red-200 px-2.5 py-1 rounded-md text-xs"
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

              {Array.isArray(job["Why Recommended"]) &&
                job["Why Recommended"].length > 0 && (

                <div className="mt-6 border-t border-slate-200 pt-5">

                  <h4 className="text-sm font-semibold text-slate-900 mb-2">
                    Why this job matches
                  </h4>

                  <ul className="list-disc list-inside text-slate-600 text-sm space-y-1">

                    {job["Why Recommended"].map(
                      (reason, i) => (

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

              <div className="grid grid-cols-2 gap-3 mt-7">

                {/* Save Job */}

                <button
                  onClick={() => saveJob(job)}
                  className="flex justify-center items-center gap-2 border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 py-2.5 rounded-lg font-medium text-sm transition"
                >

                  <Heart
                    size={17}
                    strokeWidth={1.8}
                  />

                  Save

                </button>


                {/* Apply Now */}

                <button
                  disabled={!job["Apply Link"]}
                  onClick={() => {

                    if (job["Apply Link"]) {

                      window.open(
                        job["Apply Link"],
                        "_blank",
                        "noopener,noreferrer"
                      );

                    }

                  }}
                  className={`flex justify-center items-center gap-2 py-2.5 rounded-lg font-medium text-sm transition ${
                    job["Apply Link"]
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-slate-200 text-slate-400 cursor-not-allowed"
                  }`}
                >

                  <ExternalLink
                    size={17}
                    strokeWidth={1.8}
                  />

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