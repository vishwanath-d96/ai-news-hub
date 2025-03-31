import { useEffect, useState } from "react";
import useNewsStore from "../store/newsStore";
import useBookmarkStore from "../store/bookmarkStore";
import SearchBar from "./SearchBar";
import SummarizeButton from "./SummarizeButton";
import "../styles/NewsList.css";

const NewsList = () => {
  const { news, loading, fetchNews, loadMoreNews } = useNewsStore();
  const { addBookmark, bookmarks } = useBookmarkStore();

  // For filtering and sorting
  const [category, setCategory] = useState(
    localStorage.getItem("preferredCategory") || ""
  );
  const [sortOrder, setSortOrder] = useState("publishedAt");

  // Fetch news when component mounts or when filter changes
  useEffect(() => {
    // Save preference for personalization
    localStorage.setItem("preferredCategory", category);
    fetchNews("", 1, category, sortOrder);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, sortOrder]);

  const handleSearch = (query) => {
    fetchNews(query, 1, category, sortOrder);
  };

  const isBookmarked = (articleUrl) =>
    bookmarks.some((b) => b.url === articleUrl);

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      <div className="filter-sort">
        <div>
          <label htmlFor="category">Category: </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All</option>
            <option value="business">Business</option>
            <option value="entertainment">Entertainment</option>
            <option value="general">General</option>
            <option value="health">Health</option>
            <option value="science">Science</option>
            <option value="sports">Sports</option>
            <option value="technology">Technology</option>
          </select>
        </div>
        <div>
          <label htmlFor="sort">Sort By: </label>
          <select
            id="sort"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="publishedAt">Published At</option>
            <option value="popularity">Popularity</option>
            <option value="relevancy">Relevancy</option>
          </select>
        </div>
      </div>
      <div className="news-container">
        {loading && news.length === 0 ? (
          <p>Loading news...</p>
        ) : (
          news.map((article, index) => (
            <div key={index} className="news-card">
              {article.urlToImage && (
                <img src={article.urlToImage} alt={article.title} />
              )}
              <h3>{article.title}</h3>
              <p>{article.description}</p>
              <div className="card-actions">
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Read more
                </a>
                <button
                  onClick={() => addBookmark(article)}
                  disabled={isBookmarked(article.url)}
                >
                  {isBookmarked(article.url) ? "Bookmarked" : "Bookmark"}
                </button>
              </div>
              {article.description && (
                <SummarizeButton articleText={article.description} />
              )}
            </div>
          ))
        )}
      </div>
      {!loading && news.length > 0 && (
        <div className="load-more">
          <button onClick={loadMoreNews}>Load More</button>
        </div>
      )}
      {loading && news.length > 0 && (
        <p style={{ textAlign: "center", margin: "20px 0" }}>
          Loading more news...
        </p>
      )}
    </>
  );
};

export default NewsList;
