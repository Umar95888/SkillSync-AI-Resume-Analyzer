// ======================================================
// SkillGapAnalysis.jsx
// SkillSync V2
// AI Skill Gap Analysis
// ======================================================

/*
========================================================

Purpose

Shows

✔ Overall Skill Match
✔ Found Skills
✔ Missing Skills
✔ Skill Progress
✔ AI Recommendation

========================================================
*/

import {
  CheckCircle,
  XCircle,
  TrendingUp,
  Award,
} from "lucide-react";

function SkillGapAnalysis({ result }) {

  if (!result) return null;

  // ==========================================
  // Backend Data
  // ==========================================

  const skillMatch =
    result.skill_match_percentage || 0;

  const skills =
    result.skill_analysis || [];

  // ==========================================
  // Found Skills
  // ==========================================

  const foundSkills =
    skills.filter(
      (item) =>
        item.status === "Found"
    );

  // ==========================================
  // Missing Skills
  // ==========================================

  const missingSkills =
    skills.filter(
      (item) =>
        item.status === "Missing"
    );

  return (

    <div className="mt-16">

      {/* ====================================== */}
      {/* Heading */}
      {/* ====================================== */}

      <div className="flex items-center gap-3 mb-8">

        <TrendingUp
          className="text-cyan-400"
          size={30}
        />

        <h2 className="text-3xl font-bold">

          Skill Gap Analysis

        </h2>

      </div>

      {/* ====================================== */}
      {/* Overall Skill Match */}
      {/* ====================================== */}

      <div className="bg-slate-800 rounded-3xl border border-slate-700 p-8">

        <div className="flex justify-between items-center">

          <div>

            <h3 className="text-xl font-bold">

              Overall Skill Match

            </h3>

            <p className="text-gray-400 mt-2">

              Based on your resume skills.

            </p>

          </div>

          <div className="text-4xl font-bold text-cyan-400">

            {skillMatch}%

          </div>

        </div>

        {/* Progress */}

        <div className="mt-8 w-full bg-slate-700 rounded-full h-5">

          <div

            className="bg-cyan-400 h-5 rounded-full transition-all duration-700"

            style={{
              width: `${skillMatch}%`,
            }}

          />

        </div>

      </div>
            {/* ====================================== */}
      {/* Skill Cards */}
      {/* ====================================== */}

      <div className="grid lg:grid-cols-2 gap-8 mt-10">

        {/* ================================== */}
        {/* Found Skills */}
        {/* ================================== */}

        <div className="bg-slate-800 rounded-3xl border border-green-500/30 p-6">

          <div className="flex items-center gap-3 mb-6">

            <CheckCircle
              className="text-green-400"
              size={28}
            />

            <h3 className="text-2xl font-bold">

              Skills You Already Have

            </h3>

          </div>

          {foundSkills.length === 0 ? (

            <p className="text-gray-400">

              No matching skills found.

            </p>

          ) : (

            <div className="flex flex-wrap gap-3">

              {foundSkills.map((item, index) => (

                <span
                  key={index}
                  className="bg-green-500/20 border border-green-500 text-green-300 px-4 py-2 rounded-full"
                >

                  ✅ {item.skill}

                </span>

              ))}

            </div>

          )}

        </div>

        {/* ================================== */}
        {/* Missing Skills */}
        {/* ================================== */}

        <div className="bg-slate-800 rounded-3xl border border-red-500/30 p-6">

          <div className="flex items-center gap-3 mb-6">

            <XCircle
              className="text-red-400"
              size={28}
            />

            <h3 className="text-2xl font-bold">

              Skills To Learn

            </h3>

          </div>

          {missingSkills.length === 0 ? (

            <p className="text-green-400">

              🎉 Amazing! No missing skills detected.

            </p>

          ) : (

            <div className="flex flex-wrap gap-3">

              {missingSkills.map((item, index) => (

                <span
                  key={index}
                  className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-2 rounded-full"
                >

                  ❌ {item.skill}

                </span>

              ))}

            </div>

          )}

        </div>

      </div>

      {/* ====================================== */}
      {/* AI Recommendation */}
      {/* ====================================== */}

      <div className="mt-10 bg-slate-800 rounded-3xl border border-yellow-500/30 p-8">

        <div className="flex items-center gap-3 mb-5">

          <Award
            className="text-yellow-400"
            size={28}
          />

          <h3 className="text-2xl font-bold">

            AI Recommendation

          </h3>

        </div>

        {skillMatch >= 90 ? (

          <p className="text-green-400 leading-8">

            Excellent! Your resume already contains most of the
            important technical skills. Continue improving your
            projects and interview preparation.

          </p>

        ) : skillMatch >= 70 ? (

          <p className="text-cyan-400 leading-8">

            Your resume is strong. Learning the missing skills
            will significantly improve your ATS score and job
            recommendations.

          </p>

        ) : (

          <p className="text-yellow-300 leading-8">

            Your resume needs more technical skills. Focus on
            learning the missing technologies, build projects,
            and update your resume regularly.

          </p>

        )}

      </div>

    </div>

  );

}

export default SkillGapAnalysis;