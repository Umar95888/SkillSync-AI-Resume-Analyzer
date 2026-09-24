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

function ResumeUpload({ onHome, onFeatures, onStart }) {

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
      "SkillSync Resume Analysis Report",
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

      head: [["Required Skills"]],

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

      head: [["Resume Suggestions"]],

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
  "Generated by SkillSync Resume Analyzer",
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
  <Navbar
    onStart={onStart}
    onHome={onHome}
    onFeatures={onFeatures}
  />

  <div className="min-h-screen bg-slate-50 py-12">

    <div className="max-w-7xl mx-auto px-6">

      {loading && <Loader />}

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-10 text-slate-900">

        {/* ========================================= */}
        {/* Header */}
        {/* ========================================= */}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

          <div>

            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
                Resume Analysis
            </h1>

            <p className="text-slate-600 mt-2 max-w-2xl leading-7">
              Upload your resume to analyze your skills, ATS score,
              skill gaps, job opportunities and learning recommendations.
            </p>

          </div>

          {result && (

            <button

              onClick={downloadReport}

              className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 px-5 py-3 rounded-lg font-medium text-white transition"

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

            <div className="rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 hover:border-blue-500 hover:bg-blue-50/30 transition p-12 text-center">

              <UploadCloud
                size={48}
                strokeWidth={1.7}
                className="mx-auto text-blue-600"
              />

              <h2 className="text-xl font-semibold mt-5 text-slate-900">
                Upload your resume
              </h2>

              <p className="text-slate-600 mt-2">
                Click to browse and select your resume
              </p>

              <p className="text-sm text-slate-500 mt-3">
                Supported formats: PDF, DOC and DOCX · Maximum size: 5 MB
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

          <div className="mt-6 bg-slate-50 rounded-xl border border-slate-200 p-5 flex justify-between items-center">

            <div className="flex gap-4 items-center">

              <FileText className="text-blue-600" />

              <div>

                <h3 className="font-semibold">

                  {file.name}

                </h3>

                <p className="text-slate-500 text-sm">

                  {(file.size / 1024).toFixed(2)} KB

                </p>

              </div>

            </div>

            <button

              onClick={() => setFile(null)}

            >

              <X className="text-slate-400 hover:text-red-500"/>

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

            className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-lg font-semibold text-sm text-white transition disabled:opacity-60"

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

            <div className="mt-14">

              <h2 className="text-2xl font-bold text-slate-900">
                ATS Resume Score
              </h2>

              <div className="mt-6 bg-slate-50 rounded-xl border border-slate-200 p-8 flex flex-col items-center">

                <div className="w-56 h-56">

                  <CircularProgressbar

                    value={result.resume_score}

                    text={`${result.resume_score}%`}

                    styles={buildStyles({

                      textColor: "#0F172A",

                      pathColor:

                        result.ats_analysis.rating

                          ? "#22c55e"

                          : result.resume_score >= 70

                          ? "#06b6d4"

                          : result.resume_score >= 50

                          ? "#f59e0b"

                          : "#ef4444",

                      trailColor: "#E2E8F0",

                    })}

                  />

                </div>

                <h2 className="text-xl font-semibold mt-6 text-slate-900">

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

              <div className="flex items-center gap-3 mb-5">

                <div className="w-1 h-6 bg-blue-600 rounded-full"></div>

                <h2 className="text-2xl font-bold text-slate-900">
                  Resume Summary
                </h2>

              </div>

              <div className="bg-white rounded-xl border border-slate-200 p-6">

                <p className="text-slate-600 leading-7">

                  {result.resume_summary}

                </p>

              </div>

            </div>

            <ResumeSuggestions

              suggestions={
                result.resume_suggestions
              }

            />

            {/* Required Skills */}

            <div className="mt-12">

              <div className="flex items-center gap-3 mb-5">

                <div className="w-1 h-6 bg-blue-600 rounded-full"></div>

                <h2 className="text-2xl font-bold text-slate-900">
                  Required Skills
                </h2>

              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-6">

                {result.missing_skills.length === 0 ? (

                  <p className="text-green-600 font-medium">
                    No missing skills found.
                  </p>

                ) : (

                  <div className="flex flex-wrap gap-3">

                    {result.missing_skills.map(
                      (skill, index) => (

                        <span
                          key={index}
                          className="bg-red-50 text-red-700 border border-red-200 px-3 py-1.5 rounded-md text-sm font-medium"
                        >
                          {skill}
                        </span>

                      )
                    )}

                  </div>

                )}

              </div>

            </div>


            {/* Extracted Skills */}

            <div className="mt-10">

              <div className="flex items-center gap-3 mb-5">

                <div className="w-1 h-6 bg-blue-600 rounded-full"></div>

                <h2 className="text-2xl font-bold text-slate-900">
                  Extracted Skills
                </h2>

              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-6">

                <div className="flex flex-wrap gap-3">

                  {result.skills.map(
                    (skill, index) => (

                      <span
                        key={index}
                        className="bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1.5 rounded-md text-sm font-medium"
                      >
                        {skill}
                      </span>

                    )
                  )}

                </div>

              </div>

            </div>
            {/* Recommended Courses */}

            <div className="mt-14">

              <div className="flex items-center gap-3 mb-6">

                <div className="w-1 h-6 bg-blue-600 rounded-full"></div>

                <div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    Recommended Courses
                  </h2>

                  <p className="text-sm text-slate-500 mt-1">
                    Learning resources for the skills identified in your analysis.
                  </p>
                </div>

              </div>

              <div className="grid md:grid-cols-2 gap-5">

                {result.course_recommendations.map(
                  (item, index) => (

                    <div
                      key={index}
                      className="bg-white rounded-xl border border-slate-200 shadow-sm p-6"
                    >

                      {/* Skill */}

                      <div className="mb-5">

                        <p className="text-xs font-medium uppercase tracking-wide text-blue-600">
                          Recommended for
                        </p>

                        <h3 className="text-lg font-semibold text-slate-900 mt-1">
                          {item.skill}
                        </h3>

                      </div>


                      {/* Courses */}

                      <div className="space-y-4">

                        {item.courses.map(
                          (course, i) => (

                            <div
                              key={i}
                              className="border-t border-slate-200 pt-4"
                            >

                              <h4 className="font-medium text-slate-900 leading-6">
                                {course.title}
                              </h4>

                              <p className="text-sm text-slate-500 mt-1">
                                {course.provider}
                              </p>

                              <button
                                onClick={() =>
                                  window.open(
                                    course.url,
                                    "_blank",
                                    "noopener,noreferrer"
                                  )
                                }
                                className="mt-3 inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                              >
                                View Course
                              </button>

                            </div>

                          )
                        )}

                      </div>

                    </div>

                  )
                )}

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

              <div className="flex items-center gap-3 mb-2">

                <div className="w-1 h-6 bg-blue-600 rounded-full"></div>

                <div className="flex items-center gap-3">

                  <Briefcase
                    size={22}
                    strokeWidth={1.8}
                    className="text-blue-600"
                  />

                  <h2 className="text-2xl font-bold text-slate-900">
                    Recommended Jobs & Internships
                  </h2>

                </div>

              </div>

              <p className="text-sm text-slate-500 mb-6">
                Opportunities matched with the skills identified in your resume.
              </p>

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
              