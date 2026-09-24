// ======================================================
// Navbar.jsx
// SkillSync V2
// Main Navigation
// ======================================================

import { motion } from "framer-motion";

function Navbar({ onStart }) {

  return (

    <motion.nav
      initial={{ y: -15, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="sticky top-0 z-50 bg-white border-b border-slate-200"
    >

      <div className="max-w-6xl mx-auto flex h-16 items-center justify-between px-6">

        {/* Logo */}

        <button
          onClick={onStart}
          className="text-xl font-bold tracking-tight text-slate-900"
        >
          Skill<span className="text-blue-600">Sync</span>
        </button>


        {/* Navigation */}

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">

          <a
            href="#home"
            className="transition-colors hover:text-blue-600"
          >
            Home
          </a>

          <a
            href="#features"
            className="transition-colors hover:text-blue-600"
          >
            Features
          </a>

        </div>


        {/* CTA */}

        <button
          onClick={onStart}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
        >
          Analyze Resume
        </button>

      </div>

    </motion.nav>

  );
}

export default Navbar;