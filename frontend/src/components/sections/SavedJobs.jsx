function SavedJobs({ savedJobs, removeJob }) {
  if (savedJobs.length === 0) return null;

  return (
    <div className="mt-14">

      <h2 className="text-3xl font-bold mb-6">
        ❤️ Saved Jobs
      </h2>

      <div className="grid md:grid-cols-2 gap-6">

        {savedJobs.map((job, index) => (

          <div
            key={index}
            className="bg-slate-800 rounded-2xl p-6 border border-cyan-500"
          >

            <h3 className="text-xl font-bold text-cyan-400">
              {job.Title}
            </h3>

            <p className="mt-2 text-gray-300">
              {job.Company}
            </p>

            <p className="mt-2">
              📍 {job.Location}
            </p>

            <button
              onClick={() => removeJob(job)}
              className="mt-6 w-full bg-red-500 hover:bg-red-600 py-3 rounded-xl"
            >
              Remove
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}

export default SavedJobs;