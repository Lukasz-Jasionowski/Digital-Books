import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./routes/home/Home";
import About from "./routes/about/About";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Book from "./routes/book/Book";

function App() {

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/books" element={<Book />} />
        </Routes>
        <Footer />
      </Router>
    </>
  )
}

export default App