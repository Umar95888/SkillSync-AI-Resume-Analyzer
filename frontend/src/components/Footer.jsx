// ======================================================
// Footer.jsx
// SkillSync V2
// ======================================================

import { FaGithub, FaLinkedin } from "react-icons/fa";

function Footer() {

  return (

    <footer className="bg-white border-t border-slate-200 py-8">

      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-5">

        {/* Logo */}

        <h2 className="text-xl font-bold tracking-tight text-slate-900">
          Skill<span className="text-blue-600">Sync</span>
        </h2>


        {/* Social Links */}

        <div className="flex items-center gap-5">

          <a
            href="https://github.com/"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="text-slate-500 hover:text-slate-900 transition-colors"
          >
            <FaGithub size={20} />
          </a>

          <a
            href="https://linkedin.com/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="text-slate-500 hover:text-blue-600 transition-colors"
          >
            <FaLinkedin size={20} />
          </a>

        </div>


        {/* Copyright */}

        <p className="text-sm text-slate-500">
          © 2026 SkillSync. All rights reserved.
        </p>

      </div>

    </footer>

  );
}

export default Footer;