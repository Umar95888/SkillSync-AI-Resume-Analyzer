function ResumeSuggestions({ suggestions }) {
  return (
    <div className="mt-10">

      <h3 className="text-2xl font-bold mb-5">
        AI Resume Suggestions
      </h3>

      <div className="grid md:grid-cols-2 gap-4">

        {suggestions.length === 0 ? (

          <div className="bg-green-500/20 border border-green-500 rounded-xl p-4">
            🎉 Excellent Resume!
          </div>

        ) : (

          suggestions.map((item, index) => (

            <div
              key={index}
              className="bg-yellow-500/10 border border-yellow-500 rounded-xl p-4"
            >
              💡 {item}
            </div>

          ))

        )}

      </div>

    </div>
  );
}

export default ResumeSuggestions;