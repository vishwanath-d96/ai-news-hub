import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import NewsList from "./components/NewsList";
import "./styles/Navbar.css";
import "./styles/NewsList.css";
import Bookmarks from "./pages/BookMarks";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<NewsList />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
      </Routes>
    </>
  );
}

export default App;
