// ======================================================
// SearchFilter.jsx
// SkillSync V2
// Job Search and Filter
// ======================================================

import { Search, SlidersHorizontal } from "lucide-react";

function SearchFilter({
  search,
  setSearch,
  filter,
  setFilter,
}) {

  return (

    <div className="mt-10 mb-8">

      {/* Search */}

      <div className="relative">

        <Search
          size={19}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          strokeWidth={1.8}
        />

        <input
          type="text"
          placeholder="Search by job title or company..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white border border-slate-300 rounded-lg pl-11 pr-4 py-3.5 text-slate-900 placeholder:text-slate-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
        />

      </div>


      {/* Filter */}

      <div className="flex items-center gap-3 mt-5 flex-wrap">

        <div className="flex items-center gap-2 text-slate-600 mr-1">

          <SlidersHorizontal
            size={18}
            strokeWidth={1.8}
          />

          <span className="text-sm font-medium">
            Filter:
          </span>

        </div>


        {/* All */}

        <button
          onClick={() => setFilter("All")}
          className={`px-4 py-2 rounded-lg text-sm font-medium border transition ${
            filter === "All"
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white text-slate-600 border-slate-300 hover:bg-slate-50"
          }`}
        >
          All
        </button>


        {/* Jobs */}

        <button
          onClick={() => setFilter("Job")}
          className={`px-4 py-2 rounded-lg text-sm font-medium border transition ${
            filter === "Job"
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white text-slate-600 border-slate-300 hover:bg-slate-50"
          }`}
        >
          Jobs
        </button>


        {/* Internships */}

        <button
          onClick={() => setFilter("Internship")}
          className={`px-4 py-2 rounded-lg text-sm font-medium border transition ${
            filter === "Internship"
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white text-slate-600 border-slate-300 hover:bg-slate-50"
          }`}
        >
          Internships
        </button>

      </div>

    </div>

  );
}

export default SearchFilter;