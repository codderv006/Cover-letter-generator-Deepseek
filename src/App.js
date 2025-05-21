import React, { useState } from "react";
import InputPanel from "./components/InputPanel";
import PreviewPanel from "./components/PreviewPanel";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [coverLetter, setCoverLetter] = useState("");
  const [loading, setLoading] = useState(false);

  const reset = () => {
    if (window.confirm("Are you sure? All data will be lost.")) {
      setCoverLetter("");
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gradient-to-br from-black via-gray-900 to-black text-white font-sans relative">
      <ToastContainer />

      {/* Title Bar */}
      <header className="flex items-center gap-3 px-6 py-3 bg-black/10 backdrop-blur-md border-b border-white/20 fixed top-0 left-0 right-0 z-50">
        <img
          src="/favicon.ico"
          alt="App Logo"
          className="w-8 h-8 object-contain"
        />
        <h1 className="text-white font-bold text-xl select-none">
          Cover Letter Generator
        </h1>
      </header>

      {/* Generate New Button */}
      <button
        onClick={reset}
        className="absolute top-16 right-0 p-2 bg-red-500 text-white rounded-xl shadow z-50 backdrop-blur-md hover:bg-red-700 transition"
      >
        Generate New
      </button>

      {/* Content Panels with padding top to avoid overlap with fixed header */}
      <main className="flex flex-col lg:flex-row flex-grow pt-16 w-full">
        <InputPanel onGenerate={setCoverLetter} setLoading={setLoading} />
        <PreviewPanel content={coverLetter} setContent={setCoverLetter} />
      </main>

      {/* Loading overlay */}
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
          <div
            className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-20 w-20"
            style={{
              borderTopColor: "#3498db",
              animation: "spin 1s linear infinite",
            }}
          />
          <style>{`
            @keyframes spin {
              to { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      )}
    </div>
  );
}

export default App;
