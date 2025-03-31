import { create } from "zustand";
import axios from "axios";

const API_KEY = "452503b26dac483e96bcaa3a0e4d888c";
const BASE_URL = "https://newsapi.org/v2/top-headlines?country=us";

const useNewsStore = create((set, get) => ({
  news: [],
  loading: false,
  page: 1,
  query: "",

  fetchNews: async (
    query = "",
    page = 1,
    category = "",
    sortOrder = "publishedAt"
  ) => {
    set({ loading: true, query, page });
    try {
      let url = "";
      if (query) {
        url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(
          query
        )}&page=${page}&sortBy=${sortOrder}&apiKey=${API_KEY}`;
      } else {
        url = `${BASE_URL}&page=${page}${
          category ? `&category=${category}` : ""
        }&apiKey=${API_KEY}`;
      }
      const response = await axios.get(url);

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
