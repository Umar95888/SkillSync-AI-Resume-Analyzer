// ==============================================
// Analytics.jsx
// SkillSync V2
// Resume Analytics Dashboard
// ==============================================

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from "recharts";

/*
==============================================
Analytics Component

Purpose
-------
Displays analytics returned by backend.

Features
--------
✔ Resume Score
✔ Resume Rating
✔ Skill Match
✔ ATS Breakdown
✔ Pie Chart
✔ Bar Chart

==============================================
*/

function Analytics({ result }) {

  if (!result) return null;

  // ==========================================
  // Backend Data
  // ==========================================

  const breakdown =
    result.ats_analysis?.breakdown || {};

  const rating =
    result.ats_analysis?.rating || "Unknown";

  const skillMatch =
    result.skill_match_percentage || 0;

  // ==========================================
  // Pie Chart
  // ==========================================

  const pieData = [

    {
      name: "Skills Found",
      value: result.skills.length,
    },

    {
      name: "Missing Skills",
      value: result.missing_skills.length,
    },

  ];

  // ==========================================
  // ATS Breakdown
  // ==========================================

  const breakdownData = [

    {
      name: "Skills",
      value: breakdown.skills || 0,
      max: 30,
    },

    {
      name: "Projects",
      value: breakdown.projects || 0,
      max: 15,
    },

    {
      name: "Sections",
      value: breakdown.sections || 0,
      max: 20,
    },

    {
      name: "Contact",
      value: breakdown.contact || 0,
      max: 10,
    },

    {
      name: "Action Words",
      value: breakdown.action_words || 0,
      max: 10,
    },

  ];

  // ==========================================
  // Bar Chart
  // ==========================================

  const chartData = breakdownData.map((item) => ({

    name: item.name,

    Score: item.value,

  }));

  // ==========================================
  // Pie Colors
  // ==========================================

  const COLORS = [

    "#06b6d4",

    "#ef4444",

  ];

  // ==========================================
  // Small Progress Bar Component
  // ==========================================

  const ProgressBar = ({ value, max }) => (

    <div className="w-full bg-slate-700 rounded-full h-3">

      <div

        className="bg-cyan-400 h-3 rounded-full transition-all duration-500"

        style={{
          width: `${(value / max) * 100}%`,
        }}

      />

    </div>

  );
    // ==========================================
  // Analytics UI
  // ==========================================

  return (

    <div className="mt-16">

      <h2 className="text-3xl font-bold text-center mb-10">
        Resume Analytics Dashboard
      </h2>

      {/* ====================================== */}
      {/* Summary Cards */}
      {/* ====================================== */}

      <div className="grid md:grid-cols-4 gap-6 mb-10">

        <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">

          <h3 className="text-gray-400">
            Resume Score
          </h3>

          <p className="text-4xl font-bold text-cyan-400 mt-3">
            {result.resume_score}%
          </p>

        </div>

        <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">

          <h3 className="text-gray-400">
            Resume Rating
          </h3>

          <p className="text-2xl font-bold text-green-400 mt-4">
            {rating}
          </p>

        </div>

        <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">

          <h3 className="text-gray-400">
            Skill Match
          </h3>

          <p className="text-4xl font-bold text-yellow-400 mt-3">
            {skillMatch}%
          </p>

        </div>

        <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">

          <h3 className="text-gray-400">
            Recommendations
          </h3>

          <p className="text-4xl font-bold text-pink-400 mt-3">
            {result.recommendations.length}
          </p>

        </div>

      </div>

      {/* ====================================== */}
      {/* ATS Breakdown */}
      {/* ====================================== */}

      <div className="bg-slate-800 rounded-2xl border border-slate-700 p-8 mb-10">

        <h3 className="text-2xl font-bold mb-8">
          ATS Breakdown
        </h3>

        <div className="space-y-6">

          {breakdownData.map((item, index) => (

            <div key={index}>

              <div className="flex justify-between mb-2">

                <span className="font-medium">
                  {item.name}
                </span>

                <span>
                  {item.value} / {item.max}
                </span>

              </div>

              <ProgressBar
                value={item.value}
                max={item.max}
              />

            </div>

          ))}

        </div>

      </div>

      {/* ====================================== */}
      {/* Charts */}
      {/* ====================================== */}

      <div className="grid lg:grid-cols-2 gap-8">

        {/* Pie Chart */}

        <div className="bg-slate-800 rounded-2xl border border-slate-700 p-6">

          <h3 className="text-xl font-bold text-center mb-6">

            Skills Distribution

          </h3>

          <ResponsiveContainer
            width="100%"
            height={320}
          >

            <PieChart>

              <Pie

                data={pieData}

                dataKey="value"

                cx="50%"

                cy="50%"

                outerRadius={90}

                label

              >

                {pieData.map((entry, index) => (

                  <Cell

                    key={index}

                    fill={COLORS[index]}

                  />

                ))}

              </Pie>

              <Tooltip />

              <Legend />

            </PieChart>

          </ResponsiveContainer>

        </div>

        {/* Bar Chart */}

        <div className="bg-slate-800 rounded-2xl border border-slate-700 p-6">

          <h3 className="text-xl font-bold text-center mb-6">

            ATS Breakdown Scores

          </h3>

          <ResponsiveContainer
            width="100%"
            height={320}
          >

            <BarChart data={chartData}>

              <XAxis dataKey="name" />

              <YAxis />

              <Tooltip />

              <Legend />

              <Bar
                dataKey="Score"
                fill="#06b6d4"
                radius={[8, 8, 0, 0]}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>

    </div>

  );

}

export default Analytics;