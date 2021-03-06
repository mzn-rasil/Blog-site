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
import Write from "./components/blog/Write";
import ForgotPassword from "./pages/login/ForgotPassword";
import ResetPassword from "./pages/login/ResetPassword";
import Drafts from "./components/blog/Drafts";
import Published from "./components/blog/Published";
import Edit from "./components/blog/Edit";
import ResendVerificationLink from "./pages/login/ResendVerificationLink";
import Blog from "./pages/blogs/Blog";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<BlogLandingPage />} />
        <Route path="signUpStep1" element={<SignUpStep1Page />} />
        <Route path="signUpStep2" element={<SignUpStep2Page />} />
        <Route path="signUpStep3" element={<SignUpStep3Page />} />
        <Route path="login" element={<LoginPage />} />

        <Route path="blogMenu" element={<BlogFeaturesPage />}>
          {/* <Route index element={<Home />} /> */}
          <Route index element={<Home />} />
          <Route path="write" element={<Write />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="bookmarks" element={<Bookmarks />} />
          <Route path="edit" element={<Edit />} />

          <Route path="stories" element={<Stories />}>
            <Route index element={<Drafts />} />
            <Route path="drafts" element={<Drafts />} />
            <Route path="published" element={<Published />} />
          </Route>
        </Route>

        <Route path="forgotPassword" element={<ForgotPassword />} />
        <Route path="forgotPassword/resendVerificationLink" element={<ResendVerificationLink />} />
        <Route path="forgotPassword/resetPassword" element={<ResetPassword />} />

        <Route path="blogMenu/blogs" element={<Blog />} />
      </Routes>
    </Router>
  );
}

export default App;
