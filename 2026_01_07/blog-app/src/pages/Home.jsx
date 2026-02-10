import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    const posts = [
        { id: 1, title: "Jak nauczć się Reacta?", excerpt: "React to potężna biblioteka..." },
        { id: 2, title: "Vite vs CRA", excerpt: "Dlaczego Vite jest szybszy?" }
    ];

    return (
        <div>
            <h1>Najnowsze wpisy</h1>
            {posts.map(post => (
                <div key={post.id} className="post-card" onClick={() => navigate(`/post/${post.id}`)}>
                    <h2>{post.title}</h2>
                    <p>{post.excerpt}</p>
                </div>
            ))}
        </div>
    );
};
export default Home;