function SkillGapAnalysis({ result }) {

  return (

    <div className="mt-14">

      <h2 className="text-3xl font-bold mb-6">
        Skill Gap Analysis
      </h2>

      <div className="bg-slate-800 rounded-2xl p-6">

        <div className="flex justify-between mb-3">

          <span className="font-semibold">
            Overall Skill Match
          </span>

          <span className="font-bold text-cyan-400">
            {result.skill_match_percentage}%
          </span>

        </div>

        <div className="w-full bg-slate-700 rounded-full h-4">

          <div
            className="bg-cyan-400 h-4 rounded-full"
            style={{
              width: `${result.skill_match_percentage}%`,
            }}
          />

        </div>

      </div>

      <div className="grid md:grid-cols-2 gap-4 mt-8">

        {result.skill_analysis.map((item, index) => (

          <div
            key={index}
            className={`rounded-xl p-4 flex justify-between ${
              item.status === "Found"
                ? "bg-green-500/20 border border-green-500"
                : "bg-red-500/20 border border-red-500"
            }`}
          >

            <span>{item.skill}</span>

            <span>
              {item.status === "Found"
                ? "✅ Found"
                : "❌ Missing"}
            </span>

          </div>

        ))}

      </div>

    </div>

  );
}

export default SkillGapAnalysis;