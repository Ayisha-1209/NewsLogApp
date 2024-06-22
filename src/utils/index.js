// utils.js
import axios from 'axios';

export const endpointPath = (request) => 
  `https://newsapi.org/v2/top-headlines?country=${request.country}&category=${request.category}&apiKey=5bf41eb950f54acba3bfe4d6b6c75074&page=${request.page}&pageSize=${request.pageSize}`
export const endpointSearch = (searchQuery, request) => 
  `https://newsapi.org/api/v4/search?q=${searchQuery}&lang=en&pageSize=${request.pageSize}&apikey=${request.apiKey}`;

export const updateNews = async (request, setLoadingArticle, setArticles , setPages) => { 
  setLoadingArticle(true);
    try { 
      console.log(request)
      const response = await axios.get(endpointPath(request)); 
      const parsedData = response.data; 
      setArticles(parsedData.articles); 
      setPages(parsedData.totalResults);
      console.log(parsedData.articles);
    } catch (error) { 
      console.error(error); 
    } finally {
      setLoadingArticle(false); 
    }
};
