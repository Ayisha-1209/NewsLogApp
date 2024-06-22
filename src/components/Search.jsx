import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const Search = () => {
  const [keyword, setKeyword] = useState("");
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchArticles = async () => {
      if (keyword.trim().length === 0) {
        setArticles([]);
        setShowDropdown(false);
        return;
      }

      try {
        const response = await axios.get(
          "https://newsapi.org/v2/everything",
          {
            params: {
              q: keyword,
              apiKey: "5bf41eb950f54acba3bfe4d6b6c75074",
              sortBy: "relevancy",
              pageSize: 4,
              page: 1,
              urlToImage:true
            },
          }
        );
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
  }, [keyword]);

  const handleOutsideClick = (event) => {
    // Check if the click occurred inside the dropdown or the input field
    if (
      dropdownRef.current &&
      dropdownRef.current.contains(event.target) ||
      event.target.className ===
        "border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
    ) {
      return;
    }

    // Click occurred outside, so close the dropdown
    setShowDropdown(false);
  };

  useEffect(() => {
    // Add event listener on component mount
    document.addEventListener("click", handleOutsideClick);
    // Cleanup: remove event listener on component unmount
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
              <li className="px-4 py-2 text-sm text-gray-700">Type Something...</li>
            )}
            {error && (
              <li className="px-4 py-2 text-sm text-red-600">{error}</li>
            )}
            {articles.map((article, index) => (
              <li 
                key={index}
                className="px-4 border-b-2 py-2 text-sm text-gray-900 hover:bg-gray-100"
              >
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {article.urlToImage && <img src={article.urlToImage} alt=""  />}
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
