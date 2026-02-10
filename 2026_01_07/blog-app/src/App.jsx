import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Post from './pages/Post';
import Categories from './pages/Categories';
import './styles/main.scss';

function App() {
    return (
        <Router>
            <nav className="navbar">
                <Link to="/">Strona Główna</Link>
                <Link to="/categories">Kategorie</Link>
            </nav>

            <div className="container">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/categories" element={<Categories />} />
                    <Route path="/post/:id" element={<Post />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;