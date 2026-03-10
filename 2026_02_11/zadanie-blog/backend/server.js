const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let posts = [
    { id: 1, title: "Mój pierwszy wpis", content: "Node.js jest super!" },
    { id: 2, title: "React to potęga", content: "Komponenty są bardzo wygodne." }
];

let comments = [
    { id: 1, postId: 1, text: "Świetny artykuł!" },
    { id: 2, postId: 1, text: "Zgadzam się." }
];

app.get('/api/posts', (req, res) => {
    res.json(posts);
});

app.get('/api/posts/:id', (req, res) => {
    const post = posts.find(p => p.id === parseInt(req.params.id));
    if (!post) return res.status(404).send('Post nie znaleziony');

    const postComments = comments.filter(c => c.postId === post.id);
    res.json({ ...post, comments: postComments });
});

app.post('/api/posts/:id/comments', (req, res) => {
    const newComment = {
        id: comments.length + 1,
        postId: parseInt(req.params.id),
        text: req.body.text
    };
    comments.push(newComment);
    res.status(201).json(newComment);
});

app.listen(PORT, () => console.log(`Backend działa na http://localhost:${PORT}`));