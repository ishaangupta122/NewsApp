import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import News from "./components/News";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<News />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
