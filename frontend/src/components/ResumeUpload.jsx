import API from "../services/api";
import Navbar from "./Navbar";
import Footer from "./Footer";
import {
  CircularProgressbar,
  buildStyles,
} from "react-circular-progressbar";

import "react-circular-progressbar/dist/styles.css";
import { UploadCloud, FileText, X } from "lucide-react";
import { toast } from "react-toastify";
import Loader from "./Loader";
import SkillGapAnalysis from "./sections/SkillGapAnalysis";
import SavedJobs from "./sections/SavedJobs";
import { useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import Analytics from "./Analytics";
import InterviewQuestions from "./sections/InterviewQuestions";
import ResumeSuggestions from "./sections/ResumeSuggestions";
import SearchFilter from "./sections/SearchFilter";

function ResumeUpload() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const [savedJobs, setSavedJobs] = useState(() => {
  const jobs = localStorage.getItem("savedJobs");
  return jobs ? JSON.parse(jobs) : [];
});

  const uploadResume = async () => {
    if (!file) {
      alert("Please select a resume.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
  setLoading(true);

  // Start both at the same time
  const uploadPromise = API.post(
    "/upload",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  // Minimum loader time (4 seconds)
  const minimumLoading = new Promise((resolve) =>
    setTimeout(resolve, 4000)
  );

  // Wait for BOTH
  const [response] = await Promise.all([
    uploadPromise,
    minimumLoading,
  ]);

  setResult(response.data);

  toast.success("Resume analyzed successfully!");
} catch (error) {
  console.error(error);
  toast.error("Upload failed!");
} finally {
  setLoading(false);
}
  };

  const downloadReport = () => {
    if (!result) return;

    const doc = new jsPDF();

    doc.setFontSize(22);
    doc.text("SkillSync Resume Analysis Report", 14, 20);

    doc.setFontSize(12);
    doc.text(`Resume Score : ${result.resume_score}%`, 14, 35);

    autoTable(doc, {
      startY: 45,
      head: [["Extracted Skills"]],
      body: result.skills.map((skill) => [skill]),
    });

    autoTable(doc, {
      head: [["Missing Skills"]],
      body:
        result.missing_skills.length > 0
          ? result.missing_skills.map((skill) => [skill])
          : [["No Missing Skills"]],
    });

    autoTable(doc, {
      head: [["AI Resume Suggestions"]],
      body:
        result.resume_suggestions.length > 0
          ? result.resume_suggestions.map((item) => [item])
          : [["Excellent Resume"]],
    });

    autoTable(doc, {
      head: [["Title", "Company", "Type", "Match"]],
      body: result.recommendations.map((job) => [
        job.Title,
        job.Company,
        job.Type,
        `${(job["Match Score"] * 100).toFixed(0)}%`,
      ]),
    });

    doc.save("SkillSync_Report.pdf");
  };

  const filteredRecommendations =
    result?.recommendations.filter((job) => {
      const matchesSearch =
        job.Title.toLowerCase().includes(search.toLowerCase()) ||
        job.Company.toLowerCase().includes(search.toLowerCase());

      const matchesFilter =
        filter === "All" || job.Type === filter;

      return matchesSearch && matchesFilter;
    }) || [];
  
  const saveJob = (job) => {

  const exists = savedJobs.find(
    (item) =>
      item.Title === job.Title &&
      item.Company === job.Company
  );

  if (exists) {
    toast.info("Job already saved.");
    return;
  }

  const updatedJobs = [...savedJobs, job];

  setSavedJobs(updatedJobs);

  localStorage.setItem(
    "savedJobs",
    JSON.stringify(updatedJobs)
  );

  toast.success("Job saved successfully.");
};

const removeJob = (job) => {

  const updatedJobs = savedJobs.filter(
    (item) =>
      !(
        item.Title === job.Title &&
        item.Company === job.Company
      )
  );

  setSavedJobs(updatedJobs);

  localStorage.setItem(
    "savedJobs",
    JSON.stringify(updatedJobs)
  );

};
    
  return (
  <>
    <Navbar />

    <div className="min-h-screen bg-[#0B1120] py-16">
      <div className="max-w-6xl mx-auto px-6">
      {loading && <Loader />}

      <div className="bg-slate-900/80 backdrop-blur-xl rounded-3xl border border-cyan-500/20 shadow-2xl p-10 text-white">

        <div className="flex justify-between items-center mb-8">

          <h2 className="text-4xl font-bold text-white mb-10">
            Upload Resume
          </h2>

          {result && (
            <button
              onClick={downloadReport}
              className="bg-green-600 hover:bg-green-700 px-5 py-3 rounded-xl font-semibold"
            >
              📄 Download Report
            </button>
          )}

        </div>

        <div className="flex flex-col items-center gap-6 mt-8">

  <label
    htmlFor="resumeUpload"
    className="w-full cursor-pointer"
  >

    <div className="border-2 border-dashed border-cyan-500/40 rounded-3xl p-10 text-center bg-slate-800/50 hover:border-cyan-400 transition">

      <UploadCloud
        size={72}
        className="mx-auto text-cyan-400 mb-6"
      />

      <h3 className="text-2xl font-bold">
        Upload Your Resume
      </h3>

      <p className="text-gray-400 mt-2">
        Drag & Drop or Click to Browse
      </p>

      <p className="text-sm text-gray-500 mt-2">
        PDF • DOC • DOCX
      </p>

    </div>

  </label>

  <input
    id="resumeUpload"
    type="file"
    accept=".pdf,.doc,.docx"
    className="hidden"
    onChange={(e) => setFile(e.target.files[0])}
  />

  {file && (

    <div className="w-full bg-slate-800 rounded-xl p-4 flex justify-between items-center border border-cyan-500/20">

      <div className="flex items-center gap-3">

        <FileText className="text-cyan-400" />

        <div>

          <p className="font-semibold">
            {file.name}
          </p>

          <p className="text-sm text-gray-400">
            {(file.size / 1024).toFixed(1)} KB
          </p>

        </div>

      </div>

      <button
        onClick={() => setFile(null)}
      >
        <X className="text-red-400 hover:text-red-500" />
      </button>

    </div>

  )}

  <button
    onClick={uploadResume}
    disabled={loading}
    className="bg-cyan-500 hover:bg-cyan-600 px-10 py-3 rounded-xl font-bold transition"
  >
    {loading ? "Analyzing Resume..." : "Analyze Resume"}
  </button>

</div>

        {result && (
          <>

            <div className="mt-14">

  <h2 className="text-3xl font-bold text-white mb-8">
    ATS Resume Score
  </h2>

  <div className="bg-slate-800 rounded-3xl border border-slate-700 p-10 flex flex-col items-center">

    <div className="w-56 h-56">

      <CircularProgressbar
        value={result.resume_score}
        text={`${result.resume_score}%`}
        styles={buildStyles({
          textColor: "#fff",
          pathColor:
            result.resume_score >= 85
              ? "#22c55e"
              : result.resume_score >= 70
              ? "#06b6d4"
              : result.resume_score >= 50
              ? "#f59e0b"
              : "#ef4444",
          trailColor: "#334155",
          textSize: "18px",
        })}
      />

    </div>

    <h3
      className="text-2xl font-bold mt-8"
      style={{
        color:
          result.resume_score >= 85
            ? "#22c55e"
            : result.resume_score >= 70
            ? "#06b6d4"
            : result.resume_score >= 50
            ? "#f59e0b"
            : "#ef4444",
      }}
    >
      {result.resume_score >= 85
        ? "Excellent"
        : result.resume_score >= 70
        ? "Good"
        : result.resume_score >= 50
        ? "Average"
        : "Needs Improvement"}
    </h3>

  </div>

</div>

            <div className="mt-10">

             <h3 className="text-2xl font-bold text-white mb-5">
              AI Resume Summary
             </h3>

            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">

             <p className="text-gray-300 leading-8">
              {result.resume_summary}
             </p>

            </div>

          </div>

            <ResumeSuggestions
              suggestions={result.resume_suggestions}
            />

            {/* Missing Skills */}

            <div className="mt-10">

              <h3 className="text-2xl font-bold mb-5">
                Missing Skills
              </h3>

              <div className="flex flex-wrap gap-3">

                {result.missing_skills.length === 0 ? (

                  <span className="text-green-400">
                    No Missing Skills 🎉
                  </span>

                ) : (

                  result.missing_skills.map((skill, index) => (

                    <span
                      key={index}
                      className="bg-red-500/20 text-red-300 px-4 py-2 rounded-full"
                    >
                      {skill}
                    </span>

                  ))

                )}

              </div>

            </div>

            {/* Recommended Courses */}

            <div className="mt-12">

              <h3 className="text-2xl font-bold mb-6">
                Recommended Courses
              </h3>

              <div className="grid md:grid-cols-2 gap-6">

                {result.course_recommendations.map((item, index) => (

                  <div
                    key={index}
                    className="bg-slate-800 rounded-2xl p-6 border border-slate-700"
                  >

                    <h2 className="text-xl font-bold text-cyan-400">
                      {item.skill}
                    </h2>

                    {item.courses.map((course, i) => (

                      <div key={i} className="mt-5">

                        <p className="font-semibold">
                          {course.title}
                        </p>

                        <p className="text-gray-400">
                          {course.provider}
                        </p>

                        <button
                          onClick={() => window.open(course.url, "_blank")}
                          className="mt-3 bg-cyan-500 hover:bg-cyan-600 px-4 py-2 rounded-lg"
                        >
                          View Course
                        </button>

                      </div>

                    ))}

                  </div>

                ))}

              </div>

            </div>

            {/* Extracted Skills */}

            <div className="mt-12">

              <h3 className="text-2xl font-bold mb-5">
                Extracted Skills
              </h3>

              <div className="flex flex-wrap gap-3">

                {result.skills.map((skill, index) => (

                  <span
                    key={index}
                    className="bg-cyan-500/20 text-cyan-300 px-4 py-2 rounded-full"
                  >
                    {skill}
                  </span>

                ))}

              </div>

            </div>
                <SkillGapAnalysis result={result} />
            {/* Recommendations */}

            <div className="mt-14">

              <h3 className="text-2xl font-bold mb-6">
                Recommended Jobs & Internships
              </h3>

              <SearchFilter
                search={search}
                setSearch={setSearch}
                filter={filter}
                setFilter={setFilter}
              />

              <div className="grid md:grid-cols-2 gap-6">
                                {filteredRecommendations.map((job, index) => (

                  <div
                    key={index}
                    className="bg-slate-800 rounded-2xl p-6 border border-slate-700 hover:border-cyan-400 hover:scale-[1.02] transition-all duration-300"
                  >

                    <h2 className="text-xl font-bold text-cyan-400">
                      {job.Title}
                    </h2>

                    <p className="mt-2 text-gray-300">
                      {job.Company}
                    </p>

                    <span className="inline-block mt-3 bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full text-sm">
                      {job.Type}
                    </span>

                    {job.Location && (
                      <p className="mt-4">
                        📍 {job.Location}
                      </p>
                    )}

                    {job.Salary && (
                      <p className="mt-2">
                        💰 {job.Salary}
                      </p>
                    )}

                    {job.Duration && (
                      <p className="mt-2">
                        ⏳ {job.Duration}
                      </p>
                    )}

                    <div className="mt-5">

                      <div className="flex justify-between mb-2">

                        <span>Match Score</span>

                        <span>
                          {(job["Match Score"] * 100).toFixed(0)}%
                        </span>

                      </div>

                      <div className="bg-slate-700 rounded-full h-3">

                        <div
                          className="bg-cyan-400 h-3 rounded-full"
                          style={{
                            width: `${job["Match Score"] * 100}%`,
                          }}
                        />

                      </div>

                    </div>

                    <button
                      onClick={() => {
                        if (job["Apply Link"]) {
                          window.open(job["Apply Link"], "_blank");
                        } else {
                          alert("Application link not available.");
                        }
                      }}
                      className="mt-6 w-full bg-cyan-500 hover:bg-cyan-600 py-3 rounded-xl font-semibold"
                    >
                      Apply Now
                    </button>

                    <button
                      onClick={() => saveJob(job)}
                      className="mt-3 w-full bg-pink-600 hover:bg-pink-700 py-3 rounded-xl font-semibold"
                    >
                      ❤️ Save Job
                    </button>

                  </div>

                ))}

              </div>

            </div>

          </>

          )}

          {result && (
           <InterviewQuestions
              interviewQuestions={result.interview_questions}
            />
          )}

        {result && <Analytics result={result} />}
        <SavedJobs
          savedJobs={savedJobs}
          removeJob={removeJob}
        />

      </div>

      </div>
    </div>

    <Footer />
  </>
);
}


export default ResumeUpload;