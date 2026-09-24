import { motion } from "framer-motion";
import {
  FileText,
  BarChart3,
  Briefcase,
  GraduationCap,
  MessageSquare,
  Search,
} from "lucide-react";

import Navbar from "./Navbar";

function LandingPage({ onStart, onHome, onFeatures }) {
  const features = [
    {
      icon: FileText,
      title: "Resume Analysis",
      description:
        "Extract relevant skills and information from your resume.",
    },
    {
      icon: BarChart3,
      title: "ATS Analysis",
      description:
        "Review your resume using an ATS-style scoring approach.",
    },
    {
      icon: Search,
      title: "Skill Gap Analysis",
      description:
        "Identify skills that may be required for your target roles.",
    },
    {
      icon: Briefcase,
      title: "Job Recommendations",
      description:
        "Find job opportunities based on your extracted skills.",
    },
    {
      icon: GraduationCap,
      title: "Course Recommendations",
      description:
        "Explore learning resources for improving missing skills.",
    },
    {
      icon: MessageSquare,
      title: "Interview Questions",
      description:
        "Practice questions related to your resume and skills.",
    },
  ];

  return (
    <>
      <Navbar
        onStart={onStart}
        onHome={onHome}
        onFeatures={onFeatures}
      />

      <main className="bg-slate-50 text-slate-900">

        {/* Hero */}

        <section
          id="home"
          className="border-b border-slate-200 bg-white"
        >
          <div className="max-w-6xl mx-auto px-6 py-24 md:py-32">

            <div className="max-w-3xl">

              <p className="text-sm font-semibold tracking-wide text-blue-600 uppercase">
                Resume Analysis Platform
              </p>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-4 text-4xl md:text-6xl font-bold tracking-tight text-slate-900"
              >
                Understand your resume.
                <span className="block text-blue-600">
                  Improve your career profile.
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mt-6 max-w-2xl text-lg leading-8 text-slate-600"
              >
                SkillSync analyzes your resume, identifies skills,
                evaluates your profile and provides job, internship, course and
                recommendations.
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-8"
              >
                <button
                  onClick={onStart}
                  className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  Analyze Your Resume
                </button>
              </motion.div>

            </div>

          </div>
        </section>


        {/* How it works */}

        <section className="max-w-6xl mx-auto px-6 py-20">

          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-blue-600">
              PROCESS
            </p>

            <h2 className="mt-2 text-3xl font-bold text-slate-900">
              How SkillSync works
            </h2>

            <p className="mt-4 text-slate-600">
              A simple workflow for analyzing your resume and
              understanding your career profile.
            </p>
          </div>


          <div className="mt-12 grid gap-6 md:grid-cols-3">

            {[
              {
                number: "01",
                title: "Upload Resume",
                description:
                  "Upload your resume in a supported format.",
              },
              {
                number: "02",
                title: "Resume Analysis",
                description:
                  "The system extracts resume information and skills.",
              },
              {
                number: "03",
                title: "View Results",
                description:
                  "Review your ATS analysis, skill gaps and recommendations.",
              },
            ].map((item) => (

              <div
                key={item.number}
                className="border border-slate-200 bg-white p-6 rounded-xl"
              >

                <span className="text-sm font-semibold text-blue-600">
                  {item.number}
                </span>

                <h3 className="mt-4 text-xl font-semibold text-slate-900">
                  {item.title}
                </h3>

                <p className="mt-3 leading-7 text-slate-600">
                  {item.description}
                </p>

              </div>

            ))}

          </div>

        </section>


        {/* Features */}

        <section
          id="features"
          className="border-y border-slate-200 bg-white"
        >

          <div className="max-w-6xl mx-auto px-6 py-20">

            <div className="max-w-2xl">

              <p className="text-sm font-semibold text-blue-600">
                FEATURES
              </p>

              <h2 className="mt-2 text-3xl font-bold text-slate-900">
                Tools available in SkillSync
              </h2>

              <p className="mt-4 text-slate-600">
                The platform combines resume analysis with
                career-oriented recommendations.
              </p>

            </div>


            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">

              {features.map((feature) => {

                const Icon = feature.icon;

                return (
                  <div
                    key={feature.title}
                    className="rounded-xl border border-slate-200 bg-slate-50 p-6"
                  >

                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                      <Icon size={20} strokeWidth={1.8} />
                    </div>

                    <h3 className="mt-5 text-lg font-semibold text-slate-900">
                      {feature.title}
                    </h3>

                    <p className="mt-2 leading-6 text-slate-600">
                      {feature.description}
                    </p>

                  </div>
                );

              })}

            </div>

          </div>

        </section>


        {/* CTA */}

        <section className="max-w-6xl mx-auto px-6 py-20">

          <div className="rounded-2xl bg-slate-900 px-6 py-12 text-center md:px-12">

            <h2 className="text-3xl font-bold text-white">
              Analyze your resume
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-slate-300">
              Upload your resume and explore the analysis and
              recommendations provided by SkillSync.
            </p>

            <button
              onClick={onStart}
              className="mt-7 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Get Started
            </button>

          </div>

        </section>


        {/* Footer */}

        <footer className="border-t border-slate-200 bg-white">

          <div className="max-w-6xl mx-auto px-6 py-8">

            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">

              <div>
                <p className="font-semibold text-slate-900">
                  SkillSync
                </p>

                <p className="mt-1 text-sm text-slate-500">
                Resume analysis and career recommendations.
                </p>
              </div>

              <p className="text-sm text-slate-500">
                © 2026 SkillSync
              </p>

            </div>

          </div>

        </footer>

      </main>
    </>
  );
}

export default LandingPage;