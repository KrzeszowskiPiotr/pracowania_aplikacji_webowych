const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const db = new PrismaClient();

const sendError = (next, code, msg) => next({ status: code, message: msg });

router.post('/', async (req, res, next) => {
    const { message, author, wpisID } = req.body;
    if (!message || !author || !wpisID) return sendError(next, 400, "Treœæ, autor i wpisID s¹ wymagane");

    try {
        const postExists = await db.wpis.findUnique({ where: { id: wpisID } });
        if (!postExists) return sendError(next, 400, "Wpis nie istnieje");

        const newComment = await db.komentarz.create({ data: { tresc: message, autor: author, wpisID } });
        res.status(201).json(newComment);
    } catch (err) { next(err); }
});

router.get('/', async (req, res, next) => { try { res.json(await db.komentarz.findMany()); } catch (err) { next(err); } });
router.get('/:commentId', async (req, res, next) => {
    const commentId = Number(req.params.commentId);
    try {
        const comment = await db.komentarz.findUnique({ where: { id: commentId } });
        if (!comment) return sendError(next, 404, "Komentarz nie istnieje");
        res.json(comment);
    } catch (err) { next(err); }
});

router.put('/:commentId', async (req, res, next) => {
    const commentId = Number(req.params.commentId);
    const { message, author } = req.body;
    if (!message || !author) return sendError(next, 400, "Treœæ i autor s¹ wymagane");

    try {
        const updatedComment = await db.komentarz.update({ where: { id: commentId }, data: { tresc: message, autor: author } });
        res.json(updatedComment);
    } catch (err) {
        if (err.code === 'P2025') return sendError(next, 404, "Komentarz nie istnieje");
        next(err);
    }
});

router.delete('/:commentId', async (req, res, next) => {
    const commentId = Number(req.params.commentId);
    try {
        const deletedComment = await db.komentarz.delete({ where: { id: commentId } });
        res.json(deletedComment);
    } catch (err) {
        if (err.code === 'P2025') return sendError(next, 404, "Komentarz nie istnieje");
        next(err);
    }
});

module.exports = router;
