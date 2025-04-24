import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import PostPage from './pages/PostPage'; // 👈 Keep this as the page wrapper
import Navbar from './components/Navbar';
import EditPost from './pages/EditPost';
import './index.css';

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/post/:id" element={<PostPage />} /> {/* ✅ Wrapper with logic */}
        <Route path="/edit/:id" element={<EditPost />} />
      </Routes>
    </Router>
  );
}
