import styles from './Navbar.module.scss';
import {Link, Route, Routes } from "react-router";
import Home from "../../pages/home.tsx";
import Contact from "../../pages/contact.tsx";
import Categories from "../../pages/categories.tsx";
import Posts from "../../pages/posts/posts.tsx";

export default function Navbar(){
    return(
        <>
            <nav className={styles.Navbar}>
                <Link to="/home">Strona glówna</Link>
                <br/>
                <Link to="/contact">Kontakt</Link>
                <br/>
                <Link to="/categories">Kategorie</Link>
                <br/>
                <Link to="/posts">Posty</Link>
            </nav>
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/categories" element={<Categories />}/>
                <Route path="/posts" element={<Posts />}/>
            </Routes>
        </>
    );
}

