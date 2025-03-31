import { useState, useEffect } from "react";
import { auth, signInWithGoogle, logOut } from "/firebase.js"
import { onAuthStateChanged } from "firebase/auth";
import "../styles/Navbar.css";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );
  const [user, setUser] = useState(null);

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <nav className="navbar">
      <div className="logo">AI News Hub</div>
      <div className="nav-links">
        <a href="/">Home</a>
        <a href="/bookmarks">Bookmarks</a>
      </div>
      <div className="auth-actions">
        {user ? (
          <>
            <span>{user.displayName}</span>
            <button onClick={logOut}>Sign Out</button>
          </>
        ) : (
          <button onClick={signInWithGoogle}>Sign In</button>
        )}
      </div>
      <button className="toggle-btn" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "☀️" : "🌙"}
      </button>
    </nav>
  );
};

export default Navbar;
