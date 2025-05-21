import React, { useState, useEffect } from "react";
import { generateCoverLetter, suggestSkills } from "../utils/api";

export default function InputPanel({ onGenerate, setLoading }) {
  const [jd, setJd] = useState("");
  const [skills, setSkills] = useState("");
  const [suggestedSkills, setSuggestedSkills] = useState([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);

  // When JD changes, fetch suggestions after a debounce
  useEffect(() => {
    if (jd.trim().length === 0) {
      setSuggestedSkills([]);
      return;
    }

    setLoadingSuggestions(true);

    const debounce = setTimeout(async () => {
      try {
        const skillsFromApi = await suggestSkills(jd);
        setSuggestedSkills(skillsFromApi);
      } catch {
        setSuggestedSkills([]);
      } finally {
        setLoadingSuggestions(false);
      }
    }, 800); // 800ms debounce

    return () => clearTimeout(debounce);
  }, [jd]);

  // Add a suggested skill to the skills input if not already present
  const addSkill = (skill) => {
    const currentSkills = skills
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    if (!currentSkills.includes(skill)) {
      setSkills(currentSkills.concat(skill).join(", "));
      removeSuggestedSkill(skill);
    }
  };

  // Remove skill from suggestedSkills list
  const removeSuggestedSkill = (skill) => {
    setSuggestedSkills(suggestedSkills.filter((s) => s !== skill));
  };

  const handleGenerate = async () => {
    if (!setLoading) {
      // fallback if setLoading not provided
      const skillList = skills.split(",").map((s) => s.trim());
      const result = await generateCoverLetter(jd, skillList);
      onGenerate(result);
      return;
    }
    setLoading(true);
    try {
      const skillList = skills.split(",").map((s) => s.trim());
      const result = await generateCoverLetter(jd, skillList);
      onGenerate(result);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative p-6 w-full lg:w-1/2 flex flex-col justify-between gap-6 text-white">
      {/* Glassmorphic background */}
      <div className="absolute inset-0 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 z-0" />

      {/* Content above blur */}
      <div className="relative z-10 flex flex-col gap-6">
        <textarea
          className="w-full p-4 bg-transparent border border-white/20 rounded-lg placeholder-white/50 focus:outline-none focus:border-accent transition-all"
          rows="10"
          placeholder="Paste Job Description here..."
          value={jd}
          onChange={(e) => setJd(e.target.value)}
        />

        {/* Suggested Skills */}
        {loadingSuggestions ? (
          <div className="text-sm text-gray-300">
            Loading skill suggestions...
          </div>
        ) : suggestedSkills.length > 0 ? (
          <div className="flex flex-wrap gap-2 mb-2">
            {suggestedSkills.map((skill) => (
              <div
                key={skill}
                className="relative cursor-pointer bg-gray-400 hover:bg-gray-500 px-3 py-1 rounded-full text-sm text-black select-none"
                onClick={() => addSkill(skill)}
                title="Click to add this skill"
              >
                {skill}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeSuggestedSkill(skill);
                  }}
                  className="absolute top-[-6px] right-[-6px] w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center hover:bg-red-600"
                  aria-label={`Remove ${skill} from suggestions`}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        ) : null}

        <textarea
          className="w-full p-4 bg-transparent border border-white/20 rounded-lg placeholder-white/50 focus:outline-none focus:border-accent transition-all"
          rows="2"
          placeholder="Enter top skills (comma separated)"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
        />

        <button
          onClick={handleGenerate}
          className="bg-gradient-to-r from-gray-700 to-gray-500 text-white px-6 py-3 rounded-lg shadow-md hover:opacity-90 transition-all duration-300 self-start"
        >
          Generate Cover Letter
        </button>
      </div>
    </div>
  );
}
