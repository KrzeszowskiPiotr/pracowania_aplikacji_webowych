const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const db = new PrismaClient();

const sendError = (next, code, msg) => next({ status: code, message: msg });

router.post('/', async (req, res, next) => {
    const { name } = req.body;
    if (!name) return sendError(next, 400, "Nazwa kategorii jest wymagana");

    try {
        const exists = await db.kategoria.findUnique({ where: { nazwa: name } });
        if (exists) return sendError(next, 400, "Kategoria o podanej nazwie ju¿ istnieje");

        const newCategory = await db.kategoria.create({ data: { nazwa: name } });
        res.status(201).json(newCategory);
    } catch (err) { next(err); }
});

router.get('/', async (req, res, next) => { try { res.json({ categories: await db.kategoria.findMany() }); } catch (err) { next(err); } });
router.get('/:categoryId', async (req, res, next) => {
    const categoryId = Number(req.params.categoryId);
    try {
        const category = await db.kategoria.findUnique({ where: { id: categoryId } });
        if (!category) return sendError(next, 404, "Kategoria nie istnieje");
        res.json(category);
    } catch (err) { next(err); }
});

router.put('/:categoryId', async (req, res, next) => {
    const categoryId = Number(req.params.categoryId);
    const { name } = req.body;
    if (!name) return sendError(next, 400, "Nazwa jest wymagana");

    try {
        const updatedCategory = await db.kategoria.update({ where: { id: categoryId }, data: { nazwa: name } });
        res.json(updatedCategory);
    } catch (err) {
        if (err.code === 'P2025') return sendError(next, 404, "Kategoria nie istnieje");
        next(err);
    }
});

router.delete('/:categoryId', async (req, res, next) => {
    const categoryId = Number(req.params.categoryId);
    try {
        const deletedCategory = await db.kategoria.delete({ where: { id: categoryId } });
        res.json(deletedCategory);
    } catch (err) {
        if (err.code === 'P2025') return sendError(next, 404, "Kategoria nie istnieje");
        next(err);
    }
});

module.exports = router;
