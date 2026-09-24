// ======================================================
// ResumeSuggestions.jsx
// SkillSync V2
// Resume Improvement Suggestions
// ======================================================

import {
  Lightbulb,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";

function ResumeSuggestions({ suggestions }) {

  if (!suggestions) return null;

  return (

    <div className="mt-14">

      {/* Heading */}

      <div className="flex items-center gap-3 mb-6">

        <Lightbulb
          className="text-blue-600"
          size={24}
          strokeWidth={1.8}
        />

        <div>

          <h2 className="text-2xl font-bold text-slate-900">
            Resume Suggestions
          </h2>

          <p className="text-slate-500 mt-1">
            Recommendations to improve your resume.
          </p>

        </div>

      </div>


      {/* No Suggestions */}

      {suggestions.length === 0 ? (

        <div className="bg-green-50 border border-green-200 rounded-xl p-6 flex items-center gap-4">

          <CheckCircle
            className="text-green-600 shrink-0"
            size={26}
            strokeWidth={1.8}
          />

          <div>

            <h3 className="text-lg font-semibold text-green-700">
              No major improvements suggested
            </h3>

            <p className="text-slate-600 mt-1">
              Your resume looks good based on the current analysis.
              Continue improving your projects and interview preparation.
            </p>

          </div>

        </div>

      ) : (

        <>

          {/* Summary */}

          <div className="bg-white rounded-xl border border-slate-200 p-5 mb-6">

            <p className="text-slate-600">

              <span className="font-semibold text-blue-600">
                {suggestions.length}
              </span>{" "}

              resume improvement suggestion
              {suggestions.length !== 1 ? "s" : ""} found.

            </p>

          </div>


          {/* Suggestion Cards */}

          <div className="grid md:grid-cols-2 gap-5">

            {suggestions.map((item, index) => (

              <div
                key={index}
                className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow duration-200"
              >

                <div className="flex items-start gap-4">

                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-50 border border-amber-200">

                    <AlertTriangle
                      className="text-amber-600"
                      size={19}
                      strokeWidth={1.8}
                    />

                  </div>


                  <div>

                    <h3 className="font-semibold text-slate-900">
                      Suggestion {index + 1}
                    </h3>

                    <p className="text-slate-600 mt-2 leading-7">
                      {item}
                    </p>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </>

      )}

    </div>

  );

}

export default ResumeSuggestions;