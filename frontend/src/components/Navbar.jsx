import { motion } from "framer-motion";

function Navbar({ onStart }) {
  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/70 border-b border-cyan-500/20"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-5">

        <h1 className="text-3xl font-extrabold">
          <span className="text-cyan-400">Skill</span>
          <span className="text-white">Sync</span>
        </h1>

        <div className="hidden md:flex gap-10 text-slate-300">

          <a
            href="#home"
            className="hover:text-cyan-400 transition"
          >
            Home
          </a>

          <a
            href="#features"
            className="hover:text-cyan-400 transition"
          >
            Features
          </a>

          <a
            href="#contact"
            className="hover:text-cyan-400 transition"
          >
            Contact
          </a>

        </div>

        <button
          onClick={onStart}
          className="bg-cyan-500 hover:bg-cyan-600 px-6 py-2 rounded-xl font-semibold transition"
        >
          Get Started
        </button>

      </div>
    </motion.nav>
  );
}

export default Navbar;