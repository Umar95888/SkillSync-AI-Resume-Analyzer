// ==============================================
// ResumeUpload.jsx
// SkillSync V2
// AI Resume Analyzer
// ==============================================

import { useState, useMemo } from "react";
import watermark from "../assets/watermark.png";
import API from "../services/api";
import RecommendationList from "./sections/RecommendationList";

import Navbar from "./Navbar";
import Footer from "./Footer";
import Loader from "./Loader";
import Analytics from "./Analytics";

import SkillGapAnalysis from "./sections/SkillGapAnalysis";
import ResumeSuggestions from "./sections/ResumeSuggestions";
import InterviewQuestions from "./sections/InterviewQuestions";
import SavedJobs from "./sections/SavedJobs";
import SearchFilter from "./sections/SearchFilter";

import {
  UploadCloud,
  FileText,
  X,
  Download,
  Briefcase,
} from "lucide-react";

import {
  CircularProgressbar,
  buildStyles,
} from "react-circular-progressbar";

import "react-circular-progressbar/dist/styles.css";

import { toast } from "react-toastify";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function ResumeUpload() {

  // ==========================================
  // Resume File
  // ==========================================

  const [file, setFile] = useState(null);

  // ==========================================
  // Backend Response
  // ==========================================

  const [result, setResult] = useState(null);

  // ==========================================
  // Loading State
  // ==========================================

  const [loading, setLoading] = useState(false);

  // ==========================================
  // Search & Filter
  // ==========================================

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  // ==========================================
  // Saved Jobs
  // ==========================================

  const [savedJobs, setSavedJobs] = useState(() => {

    const storedJobs = localStorage.getItem("savedJobs");

    return storedJobs
      ? JSON.parse(storedJobs)
      : [];

  });
    // ==========================================
  // Upload Resume
  // ==========================================

  const uploadResume = async () => {

    if (!file) {

      toast.warning("Please select a resume.");

      return;

    }

    const formData = new FormData();

    formData.append("file", file);

    try {

      setLoading(true);

      const uploadRequest = API.post(
        "/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Show loader for at least 4 sec
      const loaderDelay = new Promise((resolve) =>
        setTimeout(resolve, 4000)
      );

      const [response] = await Promise.all([
        uploadRequest,
        loaderDelay,
      ]);

      
      setResult(response.data);
      setFile(null);

      toast.success("Resume analyzed successfully.");

    } catch (error) {

      console.error(error);

      if (error.response) {

        console.log(error.response.data);

      }

      toast.error("Resume upload failed.");

    } finally {

      setLoading(false);

    }

  };
    // ==========================================
  // Filter Jobs
  // ==========================================

  const filteredRecommendations = useMemo(() => {

    if (!result) return [];

    return result.recommendations.filter((job) => {

      const matchesSearch =
        job.Title.toLowerCase().includes(
          search.toLowerCase()
        ) ||
        job.Company.toLowerCase().includes(
          search.toLowerCase()
        );

      const matchesFilter =
        filter === "All" ||
        job.Type === filter;

      return matchesSearch && matchesFilter;

    });

  }, [result, search, filter]);

    // ==========================================
  // Download Resume Report
  // ==========================================

  const downloadReport = () => {

    if (!result) return;

    const doc = new jsPDF();

    const today = new Date().toLocaleDateString();

    // =====================================
    // Professional Header
    // =====================================

    doc.setFillColor(15, 23, 42);

    doc.rect(
      0,
      0,
      210,
      35,
      "F"
    );

    doc.setTextColor(255,255,255);

    doc.setFontSize(22);

    doc.text(
      "SkillSync AI Resume Report",
      14,
      18
    );

    doc.setFontSize(10);

    doc.text(
      `Generated : ${today}`,
      150,
      18
    );

    doc.setTextColor(0,0,0);

    // =====================================
    // Resume Overview
    // =====================================

    autoTable(doc,{

    startY:45,

    head:[["Resume Overview","Value"]],

    body:[

      ["ATS Resume Score",
      `${result.resume_score}%`],

      ["ATS Rating",
      result.ats_analysis.rating],

      ["Skill Match",
      `${result.skill_match_percentage}%`],

      ["Skills Found",
      result.skills.length],

      ["Missing Skills",
      result.missing_skills.length],

      ["Top Recommendation",

      result.recommendations[0]?.Title ||

      "Not Available"

      ]

    ],

    theme:"grid",

    headStyles:{

    fillColor:[6,182,212]

    },

    styles:{

    fontSize:10

    } 

    });

    // =====================================
    // Resume Summary
    // =====================================

    autoTable(doc, {

      startY: doc.lastAutoTable.finalY + 10,

      head: [["Resume Summary"]],

      body: [[result.resume_summary]],

      theme: "grid",

      headStyles: {
        fillColor: [34, 197, 94],
      },

      styles: {
        fontSize: 10,
      },

    });

    // ---------------------------------------
    // Extracted Skills
    // ---------------------------------------

    autoTable(doc, {

      startY: doc.lastAutoTable.finalY + 10,

      head:[["Extracted Skills"]],

      body: result.skills.map(skill=>[skill]),

      theme:"grid",

      headStyles:{
      fillColor:[34,197,94]
      }

    });

    // ---------------------------------------
    // Missing Skills
    // ---------------------------------------

    autoTable(doc, {

      startY: (doc.lastAutoTable?.finalY || 20) + 10,

      head: [["Missing Skills"]],

      body:
        result.missing_skills.length > 0
          ? result.missing_skills.map((skill) => [skill])
          : [["No Missing Skills"]],

      headStyles: {
        fillColor: [239, 68, 68],
      },

      styles: {
        fontSize: 10,
      },    

    });

    // ---------------------------------------
    // Resume Suggestions
    // ---------------------------------------

    autoTable(doc, {

      startY: (doc.lastAutoTable?.finalY || 20) + 10,

      head: [["AI Resume Suggestions"]],

      body:
        result.resume_suggestions.length > 0
          ? result.resume_suggestions.map(
              (item) => [item]
            )
          : [["Excellent Resume"]],

    });

    // Recommended Jobs Table
    autoTable(doc, {

    startY: doc.lastAutoTable.finalY + 10,  
    head: [["Title", "Company", "Type", "Match"]],
    body: result.recommendations
      .slice(0, 5)
      .map((job) => [
    job.Title,
    job.Company,
    job.Type,
    `${Math.round(
      (job["Match Score"] <= 1
        ? job["Match Score"] * 100
        : job["Match Score"])
    )}%`,
  ]),
});

doc.setFontSize(10);

doc.text(
  "Generated by SkillSync AI Resume Analyzer",
  14,
  doc.internal.pageSize.height - 10
);

// =====================================
// PNG Watermark on Every Page
// =====================================

const pageCount = doc.getNumberOfPages();

for (let i = 1; i <= pageCount; i++) {

  doc.setPage(i);

  doc.addImage(
  watermark,
  "PNG",
  25,
  45,
  160,
  200
);

}

doc.save("SkillSync_Report.pdf");
};
   
  // ==========================================
  // Save Job
  // ==========================================

  const saveJob = (job) => {

    const alreadySaved =
      savedJobs.find(
        (savedJob) =>

          savedJob.Title === job.Title &&
          savedJob.Company === job.Company
      );

    if (alreadySaved) {

      toast.info(
        "This job is already saved."
      );

      return;

    }

    const updatedJobs = [

      ...savedJobs,

      job,

    ];

    setSavedJobs(updatedJobs);

    localStorage.setItem(

      "savedJobs",

      JSON.stringify(updatedJobs)

    );

    toast.success(
      "Job saved successfully."
    );

  };
    // ==========================================
  // Remove Saved Job
  // ==========================================

  const removeJob = (job) => {

    const updatedJobs =
      savedJobs.filter(

        (savedJob) =>

          !(
            savedJob.Title ===
              job.Title &&

            savedJob.Company ===
              job.Company
          )

      );

    setSavedJobs(updatedJobs);

    localStorage.setItem(

      "savedJobs",

      JSON.stringify(updatedJobs)

    );

    toast.success(
      "Job removed successfully."
    );

  };
  return (
  <>
  <Navbar />

  <div className="min-h-screen bg-[#0B1120] py-16">

    <div className="max-w-7xl mx-auto px-6">

      {loading && <Loader />}

      <div className="bg-slate-900/80 backdrop-blur-xl rounded-3xl border border-cyan-500/20 shadow-2xl p-10 text-white">

        {/* ========================================= */}
        {/* Header */}
        {/* ========================================= */}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

          <div>

            <h1 className="text-4xl font-bold">
              AI Resume Analyzer
            </h1>

            <p className="text-gray-400 mt-2">
              Upload your resume and get ATS analysis,
              skill gap detection, AI suggestions,
              interview questions and job recommendations.
            </p>

          </div>

          {result && (

            <button

              onClick={downloadReport}

              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-6 py-3 rounded-xl font-semibold transition"

            >

              <Download size={20} />

              Download Report

            </button>

          )}

        </div>

        {/* ========================================= */}
        {/* Upload Card */}
        {/* ========================================= */}

        <div className="mt-10">

          <label

            htmlFor="resumeUpload"

            className="cursor-pointer block"

          >

            <div className="rounded-3xl border-2 border-dashed border-cyan-500/30 bg-slate-800 hover:border-cyan-400 transition-all p-12 text-center">

              <UploadCloud

                size={70}

                className="mx-auto text-cyan-400"

              />

              <h2 className="text-2xl font-bold mt-6">

                Upload Your Resume

              </h2>

              <p className="text-gray-400 mt-2">

                Drag & Drop or Click to Browse

              </p>

              <p className="text-sm text-gray-500 mt-3">

                Supported Formats :
                PDF • DOC • DOCX

              </p>

            </div>

          </label>

          <input

            id="resumeUpload"

            type="file"

            accept=".pdf,.doc,.docx"

            className="hidden"

            onChange={(e) => {

  const selectedFile = e.target.files[0];

    if (!selectedFile) return;

    // Maximum File Size: 5 MB
    if (selectedFile.size > 5 * 1024 * 1024) {

      toast.error("File size should not exceed 5 MB.");

      return;

    }

    // Allowed File Types
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(selectedFile.type)) {

      toast.error("Only PDF, DOC and DOCX files are allowed.");

      return;

    }

    setFile(selectedFile);

  }}

          />

        </div>

        {/* ========================================= */}
        {/* Selected File */}
        {/* ========================================= */}

        {file && (

          <div className="mt-6 bg-slate-800 rounded-2xl border border-slate-700 p-5 flex justify-between items-center">

            <div className="flex gap-4 items-center">

              <FileText className="text-cyan-400" />

              <div>

                <h3 className="font-semibold">

                  {file.name}

                </h3>

                <p className="text-gray-400 text-sm">

                  {(file.size / 1024).toFixed(2)} KB

                </p>

              </div>

            </div>

            <button

              onClick={() => setFile(null)}

            >

              <X className="text-red-400 hover:text-red-500"/>

            </button>

          </div>

        )}

        {/* ========================================= */}
        {/* Analyze Button */}
        {/* ========================================= */}

        <div className="mt-8 flex justify-center">

          <button

            disabled={loading}

            onClick={uploadResume}

            className="bg-cyan-500 hover:bg-cyan-600 px-10 py-4 rounded-xl font-bold text-lg transition"

          >

            {loading
              ? "Analyzing Resume..."
              : "Analyze Resume"}

          </button>

        </div>

        {/* ========================================= */}
        {/* ATS Score */}
        {/* ========================================= */}

        {result && (

          <>

            <div className="mt-16">

              <h2 className="text-3xl font-bold">

                ATS Resume Score

              </h2>

              <div className="mt-8 bg-slate-800 rounded-3xl border border-slate-700 p-10 flex flex-col items-center">

                <div className="w-56 h-56">

                  <CircularProgressbar

                    value={result.resume_score}

                    text={`${result.resume_score}%`}

                    styles={buildStyles({

                      textColor: "#fff",

                      pathColor:

                        result.ats_analysis.rating

                          ? "#22c55e"

                          : result.resume_score >= 70

                          ? "#06b6d4"

                          : result.resume_score >= 50

                          ? "#f59e0b"

                          : "#ef4444",

                      trailColor: "#334155",

                    })}

                  />

                </div>

                <h2 className="text-2xl font-bold mt-8">

                  {

                    result.resume_score >= 85

                      ? "Excellent Resume"

                      : result.resume_score >= 70

                      ? "Good Resume"

                      : result.resume_score >= 50

                      ? "Average Resume"

                      : "Needs Improvement"

                  }

                </h2>

              </div>

            </div>

            {/* Resume Summary */}

            <div className="mt-12">

              <h2 className="text-2xl font-bold">

                AI Resume Summary

              </h2>

              <div className="mt-5 bg-slate-800 rounded-2xl border border-slate-700 p-6">

                <p className="text-gray-300 leading-8">

                  {result.resume_summary}

                </p>

              </div>

            </div>

            <ResumeSuggestions

              suggestions={
                result.resume_suggestions
              }

            />

            {/* Missing Skills */}

            <div className="mt-12">

              <h2 className="text-2xl font-bold">

                Missing Skills

              </h2>

              <div className="mt-5 flex flex-wrap gap-3">

                {

                  result.missing_skills.length === 0

                  ?

                  <span className="text-green-400">

                    No Missing Skills 🎉

                  </span>

                  :

                  result.missing_skills.map(

                    (skill,index)=>(

                      <span

                        key={index}

                        className="bg-red-500/20 text-red-300 px-4 py-2 rounded-full"

                      >

                        {skill}

                      </span>

                    )

                  )

                }

              </div>

            </div>

            {/* Extracted Skills */}

            <div className="mt-12">

              <h2 className="text-2xl font-bold">

                Extracted Skills

              </h2>

              <div className="mt-5 flex flex-wrap gap-3">

                {

                  result.skills.map(

                    (skill,index)=>(

                      <span

                        key={index}

                        className="bg-cyan-500/20 text-cyan-300 px-4 py-2 rounded-full"

                      >

                        {skill}

                      </span>

                    )

                  )

                }

              </div>

            </div>

            {/* Recommended Courses */}

            <div className="mt-14">

              <h2 className="text-2xl font-bold mb-6">

                Recommended Courses

              </h2>

              <div className="grid md:grid-cols-2 gap-6">

                {

                  result.course_recommendations.map(

                    (item,index)=>(

                      <div

                        key={index}

                        className="bg-slate-800 rounded-2xl border border-slate-700 p-6"

                      >

                        <h2 className="text-xl font-bold text-cyan-400">

                          {item.skill}

                        </h2>

                        {

                          item.courses.map(

                            (course,i)=>(

                              <div key={i} className="mt-5">

                                <p className="font-semibold">

                                  {course.title}

                                </p>

                                <p className="text-gray-400">

                                  {course.provider}

                                </p>

                                <button

                                  onClick={()=>window.open(course.url,"_blank")}

                                  className="mt-3 bg-cyan-500 hover:bg-cyan-600 px-4 py-2 rounded-lg"

                                >

                                  View Course

                                </button>

                              </div>

                            )

                          )

                        }

                      </div>

                    )

                  )

                }

              </div>

            </div>
                        {/* ========================================= */}
            {/* Skill Gap Analysis */}
            {/* ========================================= */}

            <SkillGapAnalysis result={result} />

            {/* ========================================= */}
            {/* Recommended Jobs */}
            {/* ========================================= */}

            <div className="mt-16">

              <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">

                <Briefcase className="text-cyan-400" />

                Recommended Jobs & Internships

              </h2>

              <SearchFilter

                search={search}

                setSearch={setSearch}

                filter={filter}

                setFilter={setFilter}

              />

              <RecommendationList
                recommendations={filteredRecommendations}
                saveJob={saveJob}
              />
            </div>
            {/* ========================================= */}
            {/* Interview Questions */}
            {/* ========================================= */}

            <InterviewQuestions
              interviewQuestions={
                result.interview_questions
              }
            />

            {/* ========================================= */}
            {/* Analytics */}
            {/* ========================================= */}

            <Analytics result={result} />

            </>

        )}

        {/* ========================================= */}
        {/* Saved Jobs */}
        {/* ========================================= */}

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
              