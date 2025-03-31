import useBookmarkStore from "../store/bookmarkStore";
import "../styles/Bookmarks.css";

const Bookmarks = () => {
  const { bookmarks, removeBookmark } = useBookmarkStore();

  return (
    <div className="bookmarks-container">
      <h2>Your Bookmarked Articles</h2>
      {bookmarks.length === 0 ? (
        <p>No bookmarks yet.</p>
      ) : (
        <div className="bookmarks-grid">
          {bookmarks.map((article, index) => (
            <div key={index} className="bookmark-card">
              {article.urlToImage && (
                <img src={article.urlToImage} alt={article.title} />
              )}
              <h3>{article.title}</h3>
              <p>{article.description}</p>
              <div className="card-actions">
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                  Read more
                </a>
                <button onClick={() => removeBookmark(article.url)}>
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookmarks;
