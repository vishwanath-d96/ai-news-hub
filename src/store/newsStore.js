import { create } from "zustand";
import axios from "axios";

// Replace with your actual NewsAPI key
const API_KEY = "452503b26dac483e96bcaa3a0e4d888c";
// Base URL for top headlines; note that 'category' is only supported on top-headlines
const BASE_URL = "https://newsapi.org/v2/top-headlines?country=us";

const useNewsStore = create((set, get) => ({
  news: [],
  loading: false,
  page: 1,
  query: "",

  // Updated fetchNews with category and sort parameters
  fetchNews: async (
    query = "",
    page = 1,
    category = "",
    sortOrder = "publishedAt"
  ) => {
    set({ loading: true, query, page });
    try {
      let url = "";
      // If there's a query, use the "everything" endpoint which supports sortBy
      if (query) {
        url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(
          query
        )}&page=${page}&sortBy=${sortOrder}&apiKey=${API_KEY}`;
      } else {
        // For top-headlines, we can pass the category parameter if provided
        url = `${BASE_URL}&page=${page}${
          category ? `&category=${category}` : ""
        }&apiKey=${API_KEY}`;
      }
      const response = await axios.get(url);

      // If page is 1, replace news; otherwise, append
      if (page === 1) {
        set({ news: response.data.articles, loading: false });
      } else {
        set({
          news: [...get().news, ...response.data.articles],
          loading: false,
        });
      }
    } catch (error) {
      console.error("Error fetching news:", error);
      set({ loading: false });
    }
  },

  loadMoreNews: async () => {
    const currentPage = get().page;
    const nextPage = currentPage + 1;
    await get().fetchNews(get().query, nextPage);
  },
}));

export default useNewsStore;
