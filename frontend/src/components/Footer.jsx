import { FaGithub, FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 py-8">
      <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center">

        <h2 className="text-2xl font-bold">
            <span className="text-cyan-400">Skill</span>
            <span className="text-white">Sync</span>
        </h2>

        <div className="flex gap-6 text-2xl my-4 md:my-0">
          <a
            href="https://github.com/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-cyan-400"
          >
            <FaGithub />
          </a>

          <a
            href="https://linkedin.com/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-cyan-400"
          >
            <FaLinkedin />
          </a>
        </div>

        <p className="text-slate-400">
          © 2026 SkillSync • Made with ❤️ by Umar
        </p>

      </div>
    </footer>
  );
}

export default Footer;