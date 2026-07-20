function SearchFilter({
  search,
  setSearch,
  filter,
  setFilter,
}) {
  return (
    <div className="mt-10 mb-8">

      {/* Search */}

      <input
        type="text"
        placeholder="🔍 Search by title or company..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 outline-none focus:border-cyan-400"
      />

      {/* Filter Buttons */}

      <div className="flex gap-4 mt-5">

        <button
          onClick={() => setFilter("All")}
          className={`px-5 py-2 rounded-xl ${
            filter === "All"
              ? "bg-cyan-500 text-white"
              : "bg-slate-800"
          }`}
        >
          All
        </button>

        <button
          onClick={() => setFilter("Job")}
          className={`px-5 py-2 rounded-xl ${
            filter === "Job"
              ? "bg-cyan-500 text-white"
              : "bg-slate-800"
          }`}
        >
          Jobs
        </button>

        <button
          onClick={() => setFilter("Internship")}
          className={`px-5 py-2 rounded-xl ${
            filter === "Internship"
              ? "bg-cyan-500 text-white"
              : "bg-slate-800"
          }`}
        >
          Internships
        </button>

      </div>

    </div>
  );
}

export default SearchFilter;