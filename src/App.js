import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoMatch from './components/NoMatch';
import Posts from './components/posts/Posts';
import PostLists from './components/posts/PostLists';
import Post from './components/posts/Post';
import SignUpPage from './components/auth/SignUpPage';
import ConfirmUser from './components/auth/ConfirmUser';
import LoginPage from './components/auth/LoginPage';
import RequireAuth from './components/auth/RequireAuth';
import ForgotPasswordPage from './components/auth/ForgotPasswordPage';
import ResetPasswordPage from "./components/auth/ResetPasswordPage"

const App = () => {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<RequireAuth><Home /></RequireAuth>}></Route>
        <Route path="/posts" element={<RequireAuth><Posts /></RequireAuth>}>
          <Route index element={<PostLists />} />
          <Route path=":slug" element={<Post />} />
        </Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/signup" element={<SignUpPage />}></Route>
        <Route path="/confirm-signup" element={<ConfirmUser />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/forgot-password" element={<ForgotPasswordPage />}></Route>
        <Route path="/reset-password" element={<ResetPasswordPage />}></Route>
        <Route path="*" element={<NoMatch />}></Route>
      </Routes>
    </Router>
  )
}

export default App
