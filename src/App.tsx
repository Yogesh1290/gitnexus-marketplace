import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import './index.css';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/category/:slug" element={<CategoryPage />} />
      </Routes>
      <footer className="footer">
        <div>
          <strong style={{ color: 'var(--text-secondary)' }}>GitNexus Marketplace</strong>
          {' '}— Open source apps, running in your browser.{' '}
          <a href="https://github.com/Yogesh1290/gitnexus-bundler" target="_blank" rel="noopener noreferrer">
            Submit your app
          </a>
        </div>
      </footer>
    </BrowserRouter>
  );
}
