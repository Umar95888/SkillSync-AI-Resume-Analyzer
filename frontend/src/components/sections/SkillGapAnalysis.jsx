import {
  CheckCircle,
  XCircle,
  TrendingUp,
  Award,
} from "lucide-react";

function SkillGapAnalysis({ result }) {
  if (!result) return null;

  const skillMatch = result.skill_match_percentage || 0;
  const skills = result.skill_analysis || [];

  const foundSkills = skills.filter(
    (item) => item.status === "Found"
  );

  const missingSkills = skills.filter(
    (item) => item.status === "Missing"
  );

  return (
    <div className="mt-14">

      {/* Heading */}

      <div className="flex items-center gap-3 mb-6">

        <TrendingUp
          className="text-blue-600"
          size={24}
          strokeWidth={1.8}
        />

        <h2 className="text-2xl font-bold text-slate-900">
          Skill Gap Analysis
        </h2>

      </div>


      {/* Overall Skill Match */}

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">

        <div className="flex justify-between items-center">

          <div>

            <h3 className="text-lg font-semibold text-slate-900">
              Overall Skill Match
            </h3>

            <p className="text-sm text-slate-500 mt-1">
              Based on the skills identified in your resume.
            </p>

          </div>

          <div className="text-3xl font-bold text-blue-600">
            {skillMatch}%
          </div>

        </div>


        {/* Progress Bar */}

        <div className="mt-6 w-full bg-slate-200 rounded-full h-3">

          <div
            className="bg-blue-600 h-3 rounded-full transition-all duration-700"
            style={{
              width: `${skillMatch}%`,
            }}
          />

        </div>

      </div>


      {/* Found and Missing Skills */}

      <div className="grid lg:grid-cols-2 gap-6 mt-6">


        {/* Found Skills */}

        <div className="bg-white rounded-xl border border-slate-200 p-6">

          <div className="flex items-center gap-3 mb-5">

            <CheckCircle
              className="text-green-600"
              size={22}
              strokeWidth={1.8}
            />

            <h3 className="text-lg font-semibold text-slate-900">
              Skills You Already Have
            </h3>

          </div>


          {foundSkills.length === 0 ? (

            <p className="text-sm text-slate-500">
              No matching skills found.
            </p>

          ) : (

            <div className="flex flex-wrap gap-2">

              {foundSkills.map((item, index) => (

                <span
                  key={index}
                  className="bg-green-50 border border-green-200 text-green-700 px-3 py-1.5 rounded-md text-sm"
                >
                  {item.skill}
                </span>

              ))}

            </div>

          )}

        </div>


        {/* Missing Skills */}

        <div className="bg-white rounded-xl border border-slate-200 p-6">

          <div className="flex items-center gap-3 mb-5">

            <XCircle
              className="text-red-600"
              size={22}
              strokeWidth={1.8}
            />

            <h3 className="text-lg font-semibold text-slate-900">
              Skills To Learn
            </h3>

          </div>


          {missingSkills.length === 0 ? (

            <p className="text-sm text-green-700">
              No missing skills detected.
            </p>

          ) : (

            <div className="flex flex-wrap gap-2">

              {missingSkills.map((item, index) => (

                <span
                  key={index}
                  className="bg-red-50 border border-red-200 text-red-700 px-3 py-1.5 rounded-md text-sm"
                >
                  {item.skill}
                </span>

              ))}

            </div>

          )}

        </div>

      </div>


      {/* Recommendation */}

      <div className="mt-6 bg-white rounded-xl border border-slate-200 p-6">

        <div className="flex items-center gap-3 mb-4">

          <Award
            className="text-blue-600"
            size={22}
            strokeWidth={1.8}
          />

          <h3 className="text-lg font-semibold text-slate-900">
            Skill Development Recommendation
          </h3>

        </div>


        {skillMatch >= 90 ? (

          <p className="text-slate-600 leading-7">
            Your resume contains most of the important technical
            skills. Continue improving your projects and interview
            preparation.
          </p>

        ) : skillMatch >= 70 ? (

          <p className="text-slate-600 leading-7">
            Your resume contains several relevant skills.
            Learning the missing skills can help improve your
            job preparation.
          </p>

        ) : (

          <p className="text-slate-600 leading-7">
            Focus on learning the missing technical skills,
            building projects and updating your resume regularly.
          </p>

        )}

      </div>

    </div>
  );
}

export default SkillGapAnalysis;