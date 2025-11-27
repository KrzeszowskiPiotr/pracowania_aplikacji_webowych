const express = require('express');
const categoriesRouter = express.Router();
const { PrismaClient } = require('@prisma/client');
const db = new PrismaClient();


categoriesRouter.post('/', async (req, res, next) => {
  const { name } = req.body;
  if (!name || typeof name !== 'string') {
    return res.status(422).json({ msg: "Pole 'name' jest wymagane i musi być tekstem." });
  }
  try {
    const exists = await db.kategoria.findFirst({ where: { nazwa: name } });
    if (exists) {
      return res.status(409).json({ msg: "Kategoria już istnieje." });
    }
    const created = await db.kategoria.create({ data: { nazwa: name } });
    res.status(201).json(created);
  } catch (error) {
    next(error);
  }
});


categoriesRouter.get('/', async (req, res, next) => {
  try {
    const allCategories = await db.kategoria.findMany();
    res.json(allCategories);
  } catch (error) {
    next(error);
  }
});


categoriesRouter.get('/:catId', async (req, res, next) => {
  try {
    const idNum = Number(req.params.catId);
    const found = await db.kategoria.findUnique({ where: { id: idNum } });
    if (!found) {
      return res.status(404).json({ msg: "Brak takiej kategorii." });
    }
    res.json(found);
  } catch (error) {
    next(error);
  }
});

module.exports = categoriesRouter;