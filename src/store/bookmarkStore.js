import { create } from "zustand";

const getInitialBookmarks = () => {
  const saved = localStorage.getItem("bookmarks");
  return saved ? JSON.parse(saved) : [];
};

const useBookmarkStore = create((set, get) => ({
  bookmarks: getInitialBookmarks(),
  addBookmark: (article) => {
    const bookmarks = get().bookmarks;
    if (!bookmarks.some((b) => b.url === article.url)) {
      const newBookmarks = [...bookmarks, article];
      localStorage.setItem("bookmarks", JSON.stringify(newBookmarks));
      set({ bookmarks: newBookmarks });
    }
  },
  removeBookmark: (articleUrl) => {
    const updated = get().bookmarks.filter((b) => b.url !== articleUrl);
    localStorage.setItem("bookmarks", JSON.stringify(updated));
    set({ bookmarks: updated });
  },
}));

export default useBookmarkStore;
