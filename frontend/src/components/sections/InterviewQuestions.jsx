import { useState } from "react";

function InterviewQuestions({ interviewQuestions }) {
  const [openSkill, setOpenSkill] = useState(null);

  if (!interviewQuestions || interviewQuestions.length === 0) return null;

  const copyQuestions = (questions) => {
    navigator.clipboard.writeText(questions.join("\n"));
    alert("Questions copied!");
  };

  return (
    <div className="mt-14">
      <h2 className="text-3xl font-bold mb-6">
        AI Interview Questions
      </h2>

      <div className="space-y-5">

        {interviewQuestions.map((item, index) => (

          <div
            key={index}
            className="bg-slate-800 rounded-2xl border border-slate-700"
          >

            <button
              onClick={() =>
                setOpenSkill(openSkill === index ? null : index)
              }
              className="w-full flex justify-between items-center p-5"
            >
              <span className="text-xl font-bold text-cyan-400">
                {item.skill}
              </span>

              <span className="text-2xl">
                {openSkill === index ? "−" : "+"}
              </span>
            </button>

            {openSkill === index && (

              <div className="px-6 pb-6">

                <ul className="space-y-3">

                  {item.questions.map((question, i) => (

                    <li key={i}>
                      ✅ {question}
                    </li>

                  ))}

                </ul>

                <button
                  onClick={() => copyQuestions(item.questions)}
                  className="mt-5 bg-cyan-500 hover:bg-cyan-600 px-5 py-2 rounded-lg"
                >
                  📋 Copy Questions
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