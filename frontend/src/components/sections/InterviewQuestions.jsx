// ======================================================
// InterviewQuestions.jsx
// SkillSync V2
// AI Interview Questions
// ======================================================

import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  ClipboardList,
  Copy,
  CheckCircle2,
} from "lucide-react";
import { toast } from "react-toastify";

/*
========================================================

Purpose

Displays AI-generated interview questions
based on extracted resume skills.

Features

✔ Accordion
✔ Copy Questions
✔ Icons
✔ Better UI

========================================================
*/

function InterviewQuestions({ interviewQuestions }) {

  // ==========================================
  // Open Accordion
  // ==========================================

  const [openSkill, setOpenSkill] = useState(null);

  if (
    !interviewQuestions ||
    interviewQuestions.length === 0
  ) {
    return null;
  }

  // ==========================================
  // Copy Questions
  // ==========================================

  const copyQuestions = (questions) => {

    navigator.clipboard.writeText(
      questions.join("\n")
    );

    toast.success(
      "Questions copied successfully!"
    );

  };

  return (

    <div className="mt-16">

      {/* ====================================== */}
      {/* Heading */}
      {/* ====================================== */}

      <div className="flex items-center gap-3 mb-8">

        <ClipboardList
          className="text-cyan-400"
          size={30}
        />

        <div>

          <h2 className="text-3xl font-bold">

            AI Interview Questions

          </h2>

          <p className="text-gray-400 mt-1">

            Practice questions generated
            from your technical skills.

          </p>

        </div>

      </div>

      {/* ====================================== */}
      {/* Summary */}
      {/* ====================================== */}

      <div className="bg-slate-800 rounded-2xl border border-slate-700 p-5 mb-8">

        <p className="text-gray-300">

          AI generated interview questions for

          <span className="text-cyan-400 font-bold">

            {" "}
            {interviewQuestions.length} skill(s)

          </span>

        </p>

      </div>

      {/* ====================================== */}
      {/* Accordion */}
      {/* ====================================== */}

      <div className="space-y-5">

        {interviewQuestions.map((item, index) => (

          <div
            key={index}
            className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden"
          >

            {/* Accordion Header */}

            <button

              onClick={() =>
                setOpenSkill(
                  openSkill === index
                    ? null
                    : index
                )
              }

              className="w-full flex justify-between items-center px-6 py-5 hover:bg-slate-700 transition"

            >

              <div>

                <h3 className="text-xl font-bold text-cyan-400 text-left">

                  {item.skill}

                </h3>

                <p className="text-gray-400 text-sm mt-1">

                  {item.questions.length} Question(s)

                </p>

              </div>

              {openSkill === index ? (

                <ChevronUp />

              ) : (

                <ChevronDown />

              )}

            </button>

            {/* Accordion Body */}

            {openSkill === index && (

              <div className="px-6 pb-6">

                <div className="space-y-4">

                  {item.questions.map((question, i) => (

                    <div

                      key={i}

                      className="bg-slate-700 rounded-xl p-4 flex gap-3"

                    >

                      <CheckCircle2
                        className="text-green-400 mt-1"
                        size={18}
                      />

                      <p className="leading-7">

                        {question}

                      </p>

                    </div>

                  ))}

                </div>

                {/* Copy Button */}

                <button

                  onClick={() =>
                    copyQuestions(
                      item.questions
                    )
                  }

                  className="mt-6 flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 px-5 py-3 rounded-xl font-semibold transition"

                >

                  <Copy size={18} />

                  Copy Questions

                </button>

              </div>

            )}

          </div>

        ))}

      </div>

    </div>

  );

}

export default InterviewQuestions;