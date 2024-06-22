import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const Search = () => {
  const [keyword, setKeyword] = useState(""); // State for search keyword
  const [articles, setArticles] = useState([]); // State for fetched articles
  const [error, setError] = useState(""); // State for error message
  const [showDropdown, setShowDropdown] = useState(false); // State to toggle dropdown visibility
  const dropdownRef = useRef(null); // Ref for dropdown element

  // Effect to fetch articles based on keyword
  useEffect(() => {
    const fetchArticles = async () => {
      if (keyword.trim().length === 0) {
        setArticles([]);
        setShowDropdown(false);
        return;
      }

      try {
        const response = await axios.get("https://newsapi.org/v2/everything", {
          params: {
            q: keyword,
            apiKey: "5bf41eb950f54acba3bfe4d6b6c75074",
            sortBy: "relevancy",
            pageSize: 4,
            page: 1,
            urlToImage: true,
          },
        });
        setArticles(response.data.articles);
        setShowDropdown(true); // Show dropdown when there are results
        setError("");
      } catch (error) {
        console.error("Error fetching the articles:", error);
        setArticles([]);
        setShowDropdown(false);
        setError("Failed to fetch articles. Please try again later.");
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchArticles();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [keyword]); // Dependency on keyword to trigger fetch

  // Handle click outside dropdown to close it
  const handleOutsideClick = (event) => {
    if (
      (dropdownRef.current && dropdownRef.current.contains(event.target)) ||
      event.target.className ===
        "border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
    ) {
      return;
    }

    setShowDropdown(false); // Close dropdown if clicked outside
  };

  // Effect to add click event listener for closing dropdown
  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search for news..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onFocus={() => setShowDropdown(true)}
        className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {showDropdown && (
        <div
          className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg border border-gray-200 overflow-hidden"
          ref={dropdownRef}
        >
          <ul className="py-1">
            {articles.length === 0 && !error && (
              <li className="px-4 py-2 text-sm text-gray-700">
                Type Something...
              </li>
            )}
            {error && (
              <li className="px-4 py-2 text-sm text-red-600">{error}</li>
            )}
            {articles.map((article, index) => (
              <li
                key={index}
                className="px-4 border-b-2 py-2 text-sm text-gray-900 hover:bg-gray-100"
              >
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                  {article.urlToImage && (
                    <img src={article.urlToImage} alt="" />
                  )}
                  {article.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Search;
