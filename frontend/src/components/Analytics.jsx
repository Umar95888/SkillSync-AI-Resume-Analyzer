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
  // Chart Colors
  // ==========================================

  const COLORS = [

    "#2563EB",

    "#DC2626",

  ];

  // ==========================================
  // Small Progress Bar
  // ==========================================

  const ProgressBar = ({ value, max }) => (

    <div className="w-full bg-slate-200 rounded-full h-2.5">

      <div
        className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
        style={{
          width: `${Math.min((value / max) * 100, 100)}%`,
        }}
      />

    </div>

  );

  // ==========================================
  // Analytics UI
  // ==========================================

  return (

    <div className="mt-16">

      {/* Section Heading */}

      <div className="flex items-center gap-3 mb-6">

        <div className="w-1 h-6 bg-blue-600 rounded-full"></div>

        <div>

          <h2 className="text-2xl font-bold text-slate-900">
            Resume Analytics
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Overview of your resume analysis results.
          </p>

        </div>

      </div>


      {/* ====================================== */}
      {/* Summary Cards */}
      {/* ====================================== */}

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">

        {/* Resume Score */}

        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">

          <p className="text-sm font-medium text-slate-500">
            Resume Score
          </p>

          <p className="text-3xl font-bold text-blue-600 mt-3">
            {result.resume_score}%
          </p>

        </div>


        {/* Resume Rating */}

        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">

          <p className="text-sm font-medium text-slate-500">
            Resume Rating
          </p>

          <p className="text-xl font-semibold text-slate-900 mt-4">
            {rating}
          </p>

        </div>


        {/* Skill Match */}

        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">

          <p className="text-sm font-medium text-slate-500">
            Skill Match
          </p>

          <p className="text-3xl font-bold text-blue-600 mt-3">
            {skillMatch}%
          </p>

        </div>


        {/* Recommendations */}

        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">

          <p className="text-sm font-medium text-slate-500">
            Recommendations
          </p>

          <p className="text-3xl font-bold text-slate-900 mt-3">
            {result.recommendations.length}
          </p>

        </div>

      </div>


      {/* ====================================== */}
      {/* ATS Breakdown */}
      {/* ====================================== */}

      <div className="bg-white rounded-xl border border-slate-200 p-6 md:p-8 mb-10 shadow-sm">

        <h3 className="text-xl font-semibold text-slate-900 mb-7">
          ATS Breakdown
        </h3>

        <div className="space-y-6">

          {breakdownData.map((item, index) => (

            <div key={index}>

              <div className="flex justify-between mb-2">

                <span className="text-sm font-medium text-slate-700">
                  {item.name}
                </span>

                <span className="text-sm text-slate-500">
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

      <div className="grid lg:grid-cols-2 gap-6">


        {/* Pie Chart */}

        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">

          <h3 className="text-lg font-semibold text-slate-900 mb-5">
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

        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">

          <h3 className="text-lg font-semibold text-slate-900 mb-5">
            ATS Breakdown Scores
          </h3>

          <ResponsiveContainer
            width="100%"
            height={320}
          >

            <BarChart data={chartData}>

              <XAxis
                dataKey="name"
                tick={{ fill: "#64748B", fontSize: 12 }}
              />

              <YAxis
                tick={{ fill: "#64748B", fontSize: 12 }}
              />

              <Tooltip />

              <Legend />

              <Bar
                dataKey="Score"
                fill="#2563EB"
                radius={[6, 6, 0, 0]}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>


      </div>

    </div>

  );

}

export default Analytics;