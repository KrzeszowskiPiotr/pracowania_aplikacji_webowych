import { useParams, Link } from 'react-router-dom';

const Post = () => {
    const { id } = useParams();
    return (
        <article>
            <Link to="/">← Powrót</Link>
            <h1>Tytuł wpisu o ID: {id}</h1>
            <p style={{ lineHeight: '1.8' }}>
                To jest pełna treść Twojego posta. W rzeczywistej aplikacji dane te
                zostałyby pobrane z API na podstawie parametru ID z adresu URL.
            </p>
        </article>
    );
};
export default Post;