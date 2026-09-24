import { useState } from "react";
import LandingPage from "./components/LandingPage";
import ResumeUpload from "./components/ResumeUpload";

function App() {
  const [started, setStarted] = useState(false);

  const handleStart = () => {
    setStarted(true);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleHome = () => {
    setStarted(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleFeatures = () => {
    setStarted(false);

    setTimeout(() => {
      document.getElementById("features")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  return (
    <>
      {started ? (
        <ResumeUpload
          onHome={handleHome}
          onFeatures={handleFeatures}
          onStart={handleStart}
        />
      ) : (
        <LandingPage
          onStart={handleStart}
          onHome={handleHome}
          onFeatures={handleFeatures}
        />
      )}
    </>
  );
}

export default App;