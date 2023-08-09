import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./routes/home/Home";
import About from "./routes/about/About";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Book from "./routes/book/Book";
import SingleBook from "./routes/book/SingleBook";
import CreateBook from "./routes/book/CreateBook";
import EditBook from "./routes/book/EditBook";

function App() {

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/books" element={<Book />} />
          <Route path="/books/:slug" element={<SingleBook />} />
          <Route path="/createbook" element={<CreateBook />} />
          <Route path="/editbook/:slug" element={<EditBook />} />
        </Routes>
        <Footer />
      </Router>
    </>
  )
}

export default App