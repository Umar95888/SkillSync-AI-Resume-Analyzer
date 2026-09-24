// ======================================================
// Loader.jsx
// SkillSync V2
// Resume Analysis Loader
// ======================================================

import { useEffect, useState } from "react";
import {
  UploadCloud,
  FileText,
  Brain,
  Briefcase,
  BookOpen,
  BarChart3,
} from "lucide-react";

function Loader() {

  const [progress, setProgress] = useState(0);

  const [step, setStep] = useState(
    "Uploading Resume..."
  );

  const [stepIcon, setStepIcon] = useState(
    <UploadCloud size={20} strokeWidth={1.8} />
  );


  useEffect(() => {

    const stages = [

      {
        progress: 10,
        text: "Uploading Resume...",
        icon: <UploadCloud size={20} strokeWidth={1.8} />,
      },

      {
        progress: 25,
        text: "Extracting Resume Text...",
        icon: <FileText size={20} strokeWidth={1.8} />,
      },

      {
        progress: 45,
        text: "Detecting Skills...",
        icon: <Brain size={20} strokeWidth={1.8} />,
      },

      {
        progress: 65,
        text: "Matching Job Opportunities...",
        icon: <Briefcase size={20} strokeWidth={1.8} />,
      },

      {
        progress: 80,
        text: "Finding Courses...",
        icon: <BookOpen size={20} strokeWidth={1.8} />,
      },

      {
        progress: 95,
        text: "Preparing Report...",
        icon: <BarChart3 size={20} strokeWidth={1.8} />,
      },

    ];


    let i = 0;


    const interval = setInterval(() => {

      if (i < stages.length) {

        setProgress(
          stages[i].progress
        );

        setStep(
          stages[i].text
        );

        setStepIcon(
          stages[i].icon
        );

        i++;

      }

    }, 700);


    return () => {
      clearInterval(interval);
    };

  }, []);


  return (

    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50">

      {/* ====================================== */}
      {/* Loader Card */}
      {/* ====================================== */}

      <div className="bg-white p-10 rounded-2xl border border-slate-200 shadow-xl w-107.5 max-w-[90vw]">

        {/* ====================================== */}
        {/* Spinner */}
        {/* ====================================== */}

        <div className="flex justify-center mb-7">

          <div className="w-14 h-14 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin">
          </div>

        </div>


        {/* ====================================== */}
        {/* Heading */}
        {/* ====================================== */}

        <h2 className="text-2xl font-bold text-center text-slate-900">

          Analyzing Your Resume

        </h2>


        <p className="text-center text-slate-500 mt-2">

          Please wait while we process your resume.

        </p>


        {/* ====================================== */}
        {/* Progress */}
        {/* ====================================== */}

        <div className="mt-8">


          {/* Progress Header */}

          <div className="flex justify-between mb-2 text-slate-700 font-medium">

            <span>
              Progress
            </span>

            <span className="text-blue-600">
              {progress}%
            </span>

          </div>


          {/* Progress Bar */}

          <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">

            <div
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-700"
              style={{
                width: `${progress}%`
              }}
            />

          </div>


          {/* Current Step */}

          <div className="mt-6 flex items-center justify-center gap-2 text-slate-700 text-sm font-medium">

            <span className="text-blue-600">
              {stepIcon}
            </span>

            <span>
              {step}
            </span>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Loader;