import { useEffect, useState } from "react";

function Loader() {
  const [progress, setProgress] = useState(0);
  const [step, setStep] = useState("Uploading Resume...");

  useEffect(() => {
    const stages = [
      { progress: 10, text: "📄 Uploading Resume..." },
      { progress: 25, text: "📝 Extracting Resume Text..." },
      { progress: 45, text: "🧠 Detecting Skills..." },
      { progress: 65, text: "💼 Matching Jobs..." },
      { progress: 80, text: "📚 Finding Courses..." },
      { progress: 95, text: "📊 Preparing Report..." },
    ];

    let i = 0;

    const interval = setInterval(() => {
      if (i < stages.length) {
        setProgress(stages[i].progress);
        setStep(stages[i].text);
        i++;
      }
    }, 700);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">

      <div className="bg-slate-900 p-10 rounded-3xl border border-slate-700 w-[430px]">

        {/* Loading Spinner */}
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
        </div>

        {/* Main Heading */}
        <h2 className="text-2xl font-bold text-center text-cyan-400">
          AI is analyzing your resume...
        </h2>

        {/* Subtitle */}
        <p className="text-center text-gray-400 mt-2">
          Please wait a few seconds
        </p>

        {/* Progress Section */}
        <div className="mt-8">

          {/* Progress Text */}
          <div className="flex justify-between mb-2 text-white font-medium">
            <span>Progress</span>

            <span>
              {progress}%
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-700 rounded-full h-4 overflow-hidden">

            <div
              className="bg-cyan-400 h-4 rounded-full transition-all duration-700"
              style={{
                width: `${progress}%`,
              }}
            />

          </div>

          {/* Current Processing Step */}
          <div className="mt-6 text-center text-lg font-medium text-white">

            {step}

          </div>

        </div>

      </div>

    </div>
  );
}

export default Loader;