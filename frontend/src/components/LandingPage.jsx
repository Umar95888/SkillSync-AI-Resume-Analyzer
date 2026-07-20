import { motion } from "framer-motion";
import {
  FaFileUpload,
  FaRobot,
  FaBriefcase,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaGithub,
  FaLinkedin,
  FaChartLine,
  FaUserCheck,
  FaGraduationCap,
  FaClipboardCheck,
  FaStar,
} from "react-icons/fa";
import Navbar from "./Navbar";

function LandingPage({ onStart }) {
  return (
    <>
      <Navbar onStart={onStart} />

      <div className="relative overflow-hidden min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">

        <div className="absolute top-40 left-10 w-72 h-72 bg-cyan-500/20 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-blue-600/20 blur-[140px] rounded-full"></div>  

        {/* Hero */}

        <section 
          id="home"
          className="max-w-7xl mx-auto px-8 py-28">

          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left Side */}

            <motion.div
              initial={{ opacity: 0, x: -80 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >

              <span className="bg-cyan-500/20 text-cyan-300 px-5 py-2 rounded-full border border-cyan-500/30">
                🚀 AI Powered Resume Analyzer
              </span>

              <motion.h1
                className="text-6xl font-extrabold mt-8 leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >

                Build a

                <span className="text-cyan-400">
                  {" "}Job Winning Resume
                </span>

              </motion.h1>

              <motion.p
                className="text-slate-300 mt-8 text-lg leading-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Upload your resume and let SkillSync analyze your skills,
                calculate your ATS score, recommend jobs, internships,
                courses and interview questions.
              </motion.p>

              <button
                onClick={onStart}
                className="mt-10 bg-cyan-500 hover:bg-cyan-600 hover:scale-105 transition-all duration-300 px-8 py-4 rounded-xl text-lg font-semibold shadow-lg shadow-cyan-500/30"
              >
                <div className="flex items-center gap-2">
                  <span>Get Started</span>
                  <span>🚀</span>
                </div>
                
              </button>

            </motion.div>

            {/* Right Side */}

            <motion.div
              animate={{
                y: [0, -15, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
              }}
            >

              <img
                src="https://illustrations.popsy.co/gray/web-design.svg"
                alt="AI Resume"
                className="w-full drop-shadow-[0_0_35px_rgba(34,211,238,0.4)]"
              />

            </motion.div>

          </div>

        </section>

        {/* Stats */}

        <section className="max-w-7xl mx-auto px-8 pb-24">

          <div className="grid md:grid-cols-4 gap-8">

            {[
              {
                number: "10K+",
                title: "Resumes Analyzed",
              },
              {
                number: "2K+",
                title: "Jobs Recommended",
              },
              {
                number: "95%",
                title: "ATS Accuracy",
              },
              {
                number: "24/7",
                title: "AI Support",
              },
            ].map((item, index) => (

              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.15,
                  duration: 0.5,
                }}
                whileHover={{
                  scale: 1.05,
                }}
                className="bg-slate-800/70 backdrop-blur-xl rounded-3xl border border-cyan-500/20 p-8 text-center shadow-xl"
            >

                <h2 className="text-5xl font-extrabold text-cyan-400">
                  {item.number}
                </h2>

                <p className="mt-4 text-slate-300">
                  {item.title}
                </p>

            </motion.div>

          ))}

        </div>

      </section>

        {/* How SkillSync Works */}

        <section className="max-w-7xl mx-auto px-8 pb-24">

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-16"
        >
          How SkillSync Works
        </motion.h2>

        <div className="grid md:grid-cols-4 gap-8">

          {[
            {
            icon: <FaFileUpload />,
            title: "Upload Resume",
            desc: "Upload your PDF or DOCX resume securely.",
            },
            {
              icon: <FaRobot />,
              title: "AI Analysis",
              desc: "AI extracts skills and analyzes your resume.",
            },
            {
              icon: <FaChartLine />,
              title: "ATS Score",
              desc: "Get an instant ATS score with suggestions.",
            },
            {
              icon: <FaUserCheck />,
              title: "Job Match",
              desc: "Receive matching jobs, courses and interview questions.",
            },
          ].map((item, index) => (

            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="bg-slate-800/70 backdrop-blur-xl border border-cyan-500/20 rounded-3xl p-8 text-center shadow-xl"
            >

              <div className="text-cyan-400 text-5xl mb-6 flex justify-center">
                {item.icon}
              </div>

              <h3 className="text-2xl font-bold">
                {item.title}
              </h3>

              <p className="text-slate-300 mt-4 leading-7">
                {item.desc}
              </p>

            </motion.div>

          ))}

        </div>

      </section>

        {/* Features */}

        <section 
          id="features"
          className="max-w-7xl mx-auto px-8 pb-24">

          <h2 className="text-4xl font-bold text-center mb-16">
            Why SkillSync?
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {[
              {
                icon: <FaFileUpload />,
                title: "Resume Analysis",
                desc: "Extract skills, education and experience from your resume instantly.",
              },
              {
                icon: <FaRobot />,
                title: "AI Resume Summary",
                desc: "Generate a professional AI-powered summary for your resume.",
              },
              {
                icon: <FaChartLine />,
                title: "ATS Resume Score",
                desc: "Check how well your resume matches ATS systems with a detailed score.",
              },
              {
                icon: <FaBriefcase />,
                title: "Job Recommendations",
                desc: "Find jobs and internships that match your skills and profile.",
              },
              {
                icon: <FaGraduationCap />,
                title: "Course Recommendations",
                desc: "Discover courses to improve missing skills and boost your profile.",
              },
              {
                icon: <FaClipboardCheck />,
                title: "Interview Questions",
                desc: "Practice AI-generated interview questions based on your resume.",
              },
            ].map((item, index) => (

              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.2,
                }}
                whileHover={{
                  scale: 1.05,
                }}
                className="bg-slate-800/70 backdrop-blur-lg border border-cyan-500/20 rounded-3xl p-8 text-center shadow-xl hover:border-cyan-400 transition"
              >

                <div className="text-cyan-400 text-6xl mb-6 flex justify-center">
                  {item.icon}
                </div>

                <h3 className="text-2xl font-bold">
                  {item.title}
                </h3>

                <p className="text-slate-300 mt-5 leading-7">
                  {item.desc}
                </p>

              </motion.div>

            ))}

          </div>

        </section>

{/* Testimonials */}

<section className="max-w-7xl mx-auto px-8 py-24">

  <motion.h2
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="text-4xl font-bold text-center mb-16"
  >
    Trusted by Students
  </motion.h2>

  <div className="grid md:grid-cols-3 gap-8">

    {[
      {
        name: "Rahul Sharma",
        role: "B.Tech Student",
        review:
          "SkillSync improved my ATS score from 58% to 89%. The resume suggestions were very helpful for placements.",
      },
      {
        name: "Priya Verma",
        role: "Software Engineer",
        review:
          "Clean interface, accurate ATS score and excellent job recommendations. Highly recommended.",
      },
      {
        name: "Aman Khan",
        role: "Final Year Student",
        review:
          "The interview questions and recommended courses helped me prepare for my campus placements.",
      },
    ].map((item, index) => (

      <motion.div
        key={index}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.2 }}
        whileHover={{
          scale: 1.04,
          y: -8,
        }}
        className="bg-slate-800/70 border border-cyan-500/20 rounded-3xl p-8 shadow-xl"
      >

        <div className="flex text-yellow-400 gap-1 text-lg mb-5">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} />
          ))}
        </div>

        <p className="text-slate-300 leading-7 italic">
          "{item.review}"
        </p>

        <div className="mt-8 flex items-center gap-4">

          <div className="w-14 h-14 rounded-full bg-cyan-500 flex items-center justify-center text-xl font-bold">
            {item.name.charAt(0)}
          </div>

          <div>

            <h3 className="font-bold text-lg">
              {item.name}
            </h3>

            <p className="text-cyan-400 text-sm">
              {item.role}
            </p>

          </div>

        </div>

      </motion.div>

    ))}

  </div>

</section>

        {/* FAQ */}

<section className="max-w-5xl mx-auto px-8 py-24">

  <motion.h2
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="text-4xl font-bold text-center mb-16"
  >
    Frequently Asked Questions
  </motion.h2>

  <div className="space-y-6">

    {[
      {
        q: "Is SkillSync free to use?",
        a: "Yes. You can analyze your resume and receive recommendations for free.",
      },
      {
        q: "Which resume formats are supported?",
        a: "Currently PDF and DOCX resumes are supported.",
      },
      {
        q: "How is the ATS score calculated?",
        a: "The ATS score is calculated by analyzing your skills, resume content and matching them with industry requirements.",
      },
      {
        q: "Does SkillSync store my resume?",
        a: "No. Your uploaded resume is processed only for analysis and is not permanently stored.",
      },
      {
        q: "Can I get job and internship recommendations?",
        a: "Yes. SkillSync recommends jobs, internships, courses and interview questions based on your skills.",
      },
    ].map((item, index) => (

      <motion.details
        key={index}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
        className="bg-slate-800 rounded-2xl p-6 border border-cyan-500/20 cursor-pointer"
      >

        <summary className="font-semibold text-lg text-cyan-300">
          {item.q}
        </summary>

        <p className="mt-4 text-slate-300 leading-7">
          {item.a}
        </p>

      </motion.details>

    ))}

  </div>

</section>

        {/* Contact */}
        <section
          id="contact"
          className="bg-slate-900 border-t border-slate-800 py-24"
        >

        <div className="max-w-7xl mx-auto px-8">

          <h2 className="text-4xl font-bold text-center mb-16">
            Contact Us
          </h2>

        <div className="grid md:grid-cols-3 gap-10">

      {/* Email */}

        <div className="bg-slate-800 rounded-3xl p-8 text-center hover:scale-105 transition">

          <FaEnvelope className="text-5xl text-cyan-400 mx-auto mb-5" />

          <h3 className="text-2xl font-bold">
           Email
          </h3>

        <p className="text-slate-300 mt-4">
          support.skillsyncai@gmail.com
        </p>

      </div>

        {/* Phone */}

        <div className="bg-slate-800 rounded-3xl p-8 text-center hover:scale-105 transition">

        <FaPhoneAlt className="text-5xl text-cyan-400 mx-auto mb-5" />

          <h3 className="text-2xl font-bold">
           Phone
         </h3>

        <p className="text-slate-300 mt-4">
          +91 XXXXX XXXXX
        </p>

      </div>

        {/* Location */}

        <div className="bg-slate-800 rounded-3xl p-8 text-center hover:scale-105 transition">

        <FaMapMarkerAlt className="text-5xl text-cyan-400 mx-auto mb-5" />

          <h3 className="text-2xl font-bold">
           Location
          </h3>

        <p className="text-slate-300 mt-4">
          Prayagraj, Uttar Pradesh
        </p>

      </div>

    </div>

      {/* Social Icons */}

        <div className="flex justify-center gap-8 mt-16">

       <a
        href="https://github.com/supportskillsyncai"
        target="_blank"
        rel="noreferrer"
        className="text-4xl text-slate-300 hover:text-cyan-400 transition"
        >
        <FaGithub />
        </a>

        <a
        href="https://www.linkedin.com/in/skillsync-ai-376745422"
        target="_blank"
        rel="noreferrer"
        className="text-4xl text-slate-300 hover:text-cyan-400 transition"
        >
          <FaLinkedin />
        </a>

      </div>

    </div>

    </section>
    
        <footer className="bg-slate-950 border-t border-slate-800 py-8">

          <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center">

            <h2 className="text-2xl font-bold">

              <span className="text-cyan-400">
                Skill
              </span>

              Sync

            </h2>

          <p className="text-slate-400 mt-4 md:mt-0">

            © 2026 SkillSync • Made with ❤️ by Umar

          </p>

        </div>

      </footer>

      </div>
    </>
  );
}

export default LandingPage;