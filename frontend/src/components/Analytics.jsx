import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

function Analytics({ result }) {
  if (!result) return null;

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

  const barData = [
    {
      name: "Resume",
      Score: result.resume_score,
      Count: 0,
    },
    {
      name: "Recommendations",
      Score: 0,
      Count: result.recommendations.length,
    },
  ];

  const COLORS = ["#06b6d4", "#ef4444"];

  return (
    <div className="mt-16">

      <h2 className="text-3xl font-bold text-center mb-10">
        Resume Analytics
      </h2>

      <div className="grid md:grid-cols-2 gap-8">

        {/* Pie Chart */}

        <div className="bg-slate-800 rounded-2xl p-6">

          <h3 className="text-xl font-bold text-center mb-6">
            Skills Analysis
          </h3>

          <ResponsiveContainer width="100%" height={300}>

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

        <div className="bg-slate-800 rounded-2xl p-6">

          <h3 className="text-xl font-bold text-center mb-6">
            Resume Overview
          </h3>

          <ResponsiveContainer width="100%" height={300}>

            <BarChart data={barData}>

              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />

              <Bar dataKey="Score" fill="#06b6d4" />
              <Bar dataKey="Count" fill="#22c55e" />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>
                
    </div>
  );
}

export default Analytics;