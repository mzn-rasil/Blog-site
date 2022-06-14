import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BlogFeaturesPage from "./pages/blogs/BlogFeaturesPage";
import LoginPage from "./pages/login/LoginPage";
import SignUpStep1Page from "./pages/signup/SignUpStep1Page";
import SignUpStep2Page from "./pages/signup/SignUpStep2Page";
import SignUpStep3Page from "./pages/signup/SignUpStep3Page";
import BlogLandingPage from "./pages/blogs/BlogLandingPage";
import Home from "./components/blog/Home";
import Notifications from "./components/blog/Notifications";
import Bookmarks from "./components/blog/Bookmarks";
import Stories from "./components/blog/Stories";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<BlogLandingPage />} />
        <Route path="/signUpStep1" element={<SignUpStep1Page />} />
        <Route path="/signUpStep2" element={<SignUpStep2Page />} />
        <Route path="/signUpStep3" element={<SignUpStep3Page />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/blogForm" element={<BlogFeaturesPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
        <Route path="/stories" element={<Stories />} />
      </Routes>
    </Router>
  );
}

export default App;
