import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BlogPage from "./pages/BlogPage";
import SignUpStep1Page from "./pages/signup/SignUpStep1Page";
import SignUpStep2Page from "./pages/signup/SignUpStep2Page";
import SignUpStep3Page from "./pages/signup/SignUpStep3Page";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<BlogPage />} />
        <Route path="/signUpStep1" element={<SignUpStep1Page />} />
        <Route path="/signUpStep2" element={<SignUpStep2Page />} />
        <Route path="/signUpStep3" element={<SignUpStep3Page />} />
      </Routes>
    </Router>
  );
}

export default App;
