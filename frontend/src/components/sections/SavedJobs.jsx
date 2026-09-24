// ======================================================
// SavedJobs.jsx
// SkillSync V2
// Saved Jobs
// ======================================================

import {
  Bookmark,
  MapPin,
  Trash2,
} from "lucide-react";

function SavedJobs({ savedJobs, removeJob }) {

  if (savedJobs.length === 0) return null;

  return (

    <div className="mt-14">

      {/* Heading */}

      <div className="flex items-center gap-3 mb-6">

        <div className="w-1 h-6 bg-blue-600 rounded-full"></div>

        <div className="flex items-center gap-3">

          <Bookmark
            className="text-blue-600"
            size={22}
            strokeWidth={1.8}
          />

          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Saved Jobs
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Jobs you saved for later review.
            </p>
          </div>

        </div>

      </div>

      {/* Job Cards */}

      <div className="grid md:grid-cols-2 gap-5">

        {savedJobs.map((job, index) => (

          <div
            key={index}
            className="bg-white rounded-xl border border-slate-200 shadow-sm p-6"
          >

            {/* Job Title */}

            <h3 className="text-lg font-semibold text-slate-900">
              {job.Title}
            </h3>


            {/* Company */}

            <p className="text-slate-600 mt-2">
              {job.Company}
            </p>


            {/* Location */}

            {job.Location && (

              <div className="flex items-center gap-2 mt-4 text-sm text-slate-500">

                <MapPin
                  size={16}
                  strokeWidth={1.8}
                />

                <span>
                  {job.Location}
                </span>

              </div>

            )}


            {/* Remove Button */}

            <button
              onClick={() => removeJob(job)}
              className="mt-5 w-full flex items-center justify-center gap-2 border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 py-2.5 rounded-lg font-medium text-sm transition"
            >

              <Trash2
                size={17}
                strokeWidth={1.8}
              />

              Remove

            </button>

          </div>

        ))}

      </div>

    </div>

  );
}

export default SavedJobs;