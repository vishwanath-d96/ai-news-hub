import { useState } from "react";
import axios from "axios";

const SummarizeButton = ({ articleText }) => {
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState("");

  const handleSummarize = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://api.deepai.org/api/summarization",
        { text: articleText },
        {
          headers: {
            "Api-Key": "747a9e76-2a3a-4617-a427-6f8d41f7547d" // Replace with your DeepAI API key
          },
        }
      );
      console.log("API response:", response.data);
      if (response.data && response.data.output) {
        setSummary(response.data.output);
      } else {
        setSummary("No summary available.");
      }
    } catch (error) {
      console.error("Error generating summary:", error);
      setSummary("Error generating summary.");
    }
    setLoading(false);
  };

  return (
    <div style={{ marginTop: "10px" }}>
      <button onClick={handleSummarize} disabled={loading}>
        {loading ? "Summarizing..." : "Summarize"}
      </button>
      {summary && (
        <p style={{ marginTop: "10px", fontStyle: "italic" }}>{summary}</p>
      )}
    </div>
  );
};

export default SummarizeButton;
