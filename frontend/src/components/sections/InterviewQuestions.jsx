// ======================================================
// InterviewQuestions.jsx
// SkillSync V2
// Interview Questions
// ======================================================

import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  ClipboardList,
  Copy,
} from "lucide-react";
import { toast } from "react-toastify";

function InterviewQuestions({ interviewQuestions }) {

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

    <div className="mt-14">

      {/* ====================================== */}
      {/* Heading */}
      {/* ====================================== */}

      <div className="flex items-center gap-3 mb-6">

        <div className="w-1 h-6 bg-blue-600 rounded-full"></div>

        <div className="flex items-center gap-3">

          <ClipboardList
            className="text-blue-600"
            size={22}
            strokeWidth={1.8}
          />

          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Interview Questions
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Practice questions based on the skills identified in your resume.
            </p>
          </div>

        </div>

      </div>


      {/* ====================================== */}
      {/* Summary */}
      {/* ====================================== */}

      <div className="bg-white rounded-xl border border-slate-200 p-5 mb-6">

        <p className="text-slate-600">

          Interview questions are available for{" "}

          <span className="text-blue-600 font-semibold">
            {interviewQuestions.length} skill
            {interviewQuestions.length !== 1 ? "s" : ""}
          </span>.

        </p>

      </div>


      {/* ====================================== */}
      {/* Accordion */}
      {/* ====================================== */}

      <div className="space-y-4">

        {interviewQuestions.map((item, index) => (

          <div
            key={index}
            className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm"
          >

            {/* Accordion Header */}

            <button
              onClick={() =>
                setOpenSkill(
                  openSkill === index ? null : index
                )
              }
              className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-slate-50 transition"
            >

              <div>

                <h3 className="text-lg font-semibold text-slate-900">
                  {item.skill}
                </h3>

                <p className="text-slate-500 text-sm mt-1">
                  {item.questions.length} question
                  {item.questions.length !== 1 ? "s" : ""}
                </p>

              </div>


              <div className="text-slate-500">

                {openSkill === index ? (

                  <ChevronUp
                    size={20}
                    strokeWidth={1.8}
                  />

                ) : (

                  <ChevronDown
                    size={20}
                    strokeWidth={1.8}
                  />

                )}

              </div>

            </button>


            {/* Accordion Body */}

            {openSkill === index && (

              <div className="border-t border-slate-200 px-5 pb-5 pt-4">

                <div className="space-y-3">

                  {item.questions.map(
                    (question, i) => (

                      <div
                        key={i}
                        className="bg-slate-50 border border-slate-200 rounded-lg p-4 flex gap-3"
                      >

                        <div className="shrink-0 mt-1">

                          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold">
                            {i + 1}
                          </span>

                        </div>


                        <p className="text-slate-700 leading-7 text-sm">
                          {question}
                        </p>

                      </div>

                    )
                  )}

                </div>


                {/* Copy Button */}

                <button
                  onClick={() =>
                    copyQuestions(
                      item.questions
                    )
                  }
                  className="mt-5 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg font-medium text-sm transition"
                >

                  <Copy
                    size={17}
                    strokeWidth={1.8}
                  />

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