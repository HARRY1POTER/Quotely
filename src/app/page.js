"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [quote, setQuote] = useState({ quote: "", author: "" });
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  const fetchQuote = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://api.api-ninjas.com/v1/quotes", {
        headers: { "X-Api-Key": apiKey },
      });

      if (response.status === 200) {
        const data = response.data[0];
        setQuote({ quote: data.quote, author: data.author });
      } else {
        console.error("Error fetching quote:", response.status);
      }
    } catch (error) {
      console.error("Request failed:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`"${quote.quote}" - ${quote.author}`);
    alert("Quote copied to clipboard!");
  };

  const tweetQuote = () => {
    const tweet = `"${quote.quote}" — ${quote.author}`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      tweet
    )}`;
    window.open(url, "_blank");
  };

  return (
    <>
      <div
        className={`${
          darkMode
            ? "bg-gray-800 text-white"
            : "bg-gradient-to-br from-green-200 to-blue-400 text-gray-800"
        } min-h-screen flex flex-col items-center justify-center transition-all duration-500`}
      >
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500 mb-8 text-center">
          Quote of the Day ✨
        </h1>
        <div className="max-w-lg md:w-full mx-4 p-8 mb-3 md:mb-0 rounded-3xl shadow-2xl bg-white/90 dark:bg-gray-700/90 backdrop-blur-lg text-center">
          <div className="flex justify-end mb-5">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="text-sm px-3 py-1 rounded-full bg-gay-300 hover:bg-gray-400 dark:hover:bg-gray-500 transition border dark:text-white"
            >
              {darkMode ? "Light Mode" : "Dark Mode"}
            </button>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-10">
              <div className="loader"></div>
            </div>
          ) : quote.quote && quote.author ? (
            <div className="transition-opacity duration-500 ease-in-out opacity-100">
              <p className="text-2xl font-semibold italic mb-6 text-green-200">
                “{quote.quote}”
              </p>
              <p className="text-lg font-bold text-gray-700 dark:text-gray-300 mb-8">
                — {quote.author}
              </p>
              <div className="flex flex-wrap gap-6 justify-center">
                <button
                  onClick={fetchQuote}
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-6 py-2 rounded-full transition-all duration-300"
                >
                  New Quote
                </button>
                <button
                  onClick={copyToClipboard}
                  className="bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white px-6 py-2 rounded-full transition-all duration-300"
                >
                  Copy
                </button>
                <button
                  onClick={tweetQuote}
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-6 py-2 rounded-full transition-all duration-300"
                >
                  Tweet
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-10 text-4xl text-yellow-400">
              <span className="text-6xl mb-4">😊😅 (o_o)</span>
              <p> No quote available. Check your network and try again!</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
