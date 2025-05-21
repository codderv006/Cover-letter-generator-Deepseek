import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { exportAsDocx, exportAsPdf } from "../utils/generateDoc";

export default function PreviewPanel({ content, setContent }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(content);

  useEffect(() => {
    if (!isEditing) {
      setEditContent(content);
    }
  }, [content, isEditing]);

  const handleSave = () => {
    setContent(editContent);
    setIsEditing(false);
  };

  return (
    <div className="relative p-6 w-full lg:w-1/2 flex flex-col text-white font-[Times New Roman] text-sm">
      {/* Glassmorphism background */}
      <div className="absolute inset-0 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 z-0" />
  
      {/* Foreground content */}
      <div className="relative z-10 flex flex-col h-full">
        <h2 className="text-xl font-bold mb-4 text-center">
          📄 Cover Letter Preview
        </h2>
  
        <div
          className="flex-grow overflow-auto min-h-[300px] rounded-lg border border-white/30 p-4 
                      bg-white/10 text-white custom-scroll transition-all duration-300"
        >
          {!isEditing ? (
            <ReactMarkdown
              children={content}
              components={{
                h1: ({ node, ...props }) => (
                  <h1 className="text-2xl font-bold mb-2" {...props} />
                ),
                h2: ({ node, ...props }) => (
                  <h2 className="text-xl font-bold mb-2" {...props} />
                ),
                strong: ({ node, ...props }) => (
                  <strong className="font-bold" {...props} />
                ),
                em: ({ node, ...props }) => (
                  <em className="italic" {...props} />
                ),
                p: ({ node, ...props }) => (
                  <p className="mb-2 leading-relaxed" {...props} />
                ),
              }}
            />
          ) : (
            <textarea
              className="w-full h-full min-h-[300px] bg-white/15 border border-gray-300 rounded-lg p-4 
                         text-sm font-[Times New Roman] resize-none outline-none transition-all"
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
            />
          )}
        </div>
  
        {/* Buttons container - flex row to align buttons inline */}
        <div className="mt-6 flex flex-wrap items-center gap-4 justify-start">
          <button
            onClick={() => exportAsDocx(content)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow transition"
          >
            Export as DOCX
          </button>
          <button
            onClick={() => exportAsPdf(content)}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow transition"
          >
            Export as PDF
          </button>
  
          {/* Edit toggle */}
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 border border-black rounded-full bg-white/90 px-4 py-2 
                         text-black hover:bg-gray-200 shadow transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487a2.25 2.25 0 013.182 3.182L7.5 20.313 3 21l.687-4.5 13.175-13.175z"
                />
              </svg>
              Edit Document
            </button>
          ) : (
            <button
              onClick={handleSave}
              className="rounded-full bg-white/90 px-4 py-2 text-black hover:bg-gray-200 shadow transition"
            >
              Save
            </button>
          )}
        </div>
      </div>
    </div>
  );
}  