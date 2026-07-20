import { useState } from "react";
import LandingPage from "./components/LandingPage";
import ResumeUpload from "./components/ResumeUpload";

function App() {
  const [started, setStarted] = useState(false);

  return (
    <>
      {started ? (
        <ResumeUpload />
      ) : (
        <LandingPage
          onStart={() => setStarted(true)}
        />
      )}
    </>
  );
}

export default App;