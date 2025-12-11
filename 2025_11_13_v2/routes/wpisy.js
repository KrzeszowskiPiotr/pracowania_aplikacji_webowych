const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const db = new PrismaClient();

const sendError = (next, code, msg) => next({ status: code, message: msg });

router.post('/', async (req, res, next) => {
    const { title, content, categoryId } = req.body;
    if (!title || !content || !categoryId) return sendError(next, 400, "Wszystkie pola s¹ wymagane");

    try {
        const categoryExists = await db.kategoria.findUnique({ where: { id: categoryId } });
        if (!categoryExists) return sendError(next, 400, "Podana kategoria nie istnieje");

        const newEntry = await db.wpis.create({ data: { tytul: title, tresc: content, kategoriaID: categoryId } });
        res.status(201).json(newEntry);
    } catch (err) { next(err); }
});

router.get('/', async (req, res, next) => {
    try { res.json(await db.wpis.findMany()); } catch (err) { next(err); }
});

router.get('/:entryId', async (req, res, next) => {
    const entryId = Number(req.params.entryId);
    try {
        const entry = await db.wpis.findUnique({ where: { id: entryId } });
        if (!entry) return sendError(next, 404, "Wpis nie istnieje");
        res.json(entry);
    } catch (err) { next(err); }
});

router.put('/:entryId', async (req, res, next) => {
    const entryId = Number(req.params.entryId);
    const { title, content, categoryId } = req.body;
    if (!title || !content || !categoryId) return sendError(next, 400, "Wszystkie pola s¹ wymagane");

    try {
        const updatedEntry = await db.wpis.update({
            where: { id: entryId },
            data: { tytul: title, tresc: content, kategoriaID: categoryId }
        });
        res.json(updatedEntry);
    } catch (err) {
        if (err.code === 'P2025') return sendError(next, 404, "Wpis nie istnieje");
        next(err);
    }
});

router.delete('/:entryId', async (req, res, next) => {
    const entryId = Number(req.params.entryId);
    try {
        const deletedEntry = await db.wpis.delete({ where: { id: entryId } });
        res.json(deletedEntry);
    } catch (err) {
        if (err.code === 'P2025') return sendError(next, 404, "Wpis nie istnieje");
        next(err);
    }
});

module.exports = router;
