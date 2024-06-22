// utils.js

import axios from "axios";

// Constructs the endpoint URL for fetching top headlines based on request parameters
export const endpointPath = (request) =>
  `https://newsapi.org/v2/top-headlines?country=${request.country}&category=${request.category}&apiKey=5bf41eb950f54acba3bfe4d6b6c75074&page=${request.page}&pageSize=${request.pageSize}`;

// Constructs the endpoint URL for searching news articles based on search query and request parameters
export const endpointSearch = (searchQuery, request) =>
  `https://newsapi.org/api/v4/search?q=${searchQuery}&lang=en&pageSize=${request.pageSize}&apikey=${request.apiKey}`;

// Asynchronously updates news articles based on the provided request parameters
export const updateNews = async (
  request,
  setLoadingArticle,
  setArticles,
  setPages
) => {
  setLoadingArticle(true); // Set loading state to true before fetching data
  try {
    console.log(request); // Log the request parameters for debugging purposes
    const response = await axios.get(endpointPath(request)); // Fetch data from the constructed endpoint
    const parsedData = response.data; // Parse the response data
    setArticles(parsedData.articles); // Update state with fetched articles
    setPages(parsedData.totalResults); // Update state with total number of results
    console.log(parsedData.articles); // Log the fetched articles for debugging
  } catch (error) {
    console.error(error); // Log any errors that occur during fetching or parsing
  } finally {
    setLoadingArticle(false); // Set loading state to false after fetching data (whether successful or not)
  }
};
