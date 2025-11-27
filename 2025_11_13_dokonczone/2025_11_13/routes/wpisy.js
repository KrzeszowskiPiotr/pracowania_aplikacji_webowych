const express = require('express');
const wpisyAPI = express.Router();
const { PrismaClient } = require('@prisma/client');
const db = new PrismaClient();

function validateEntryFields(body) {
  const { title, content, category } = body;
  return !title || !content || !category;
}


wpisyAPI.post('/', async (req, res, next) => {
  const { title, content, category } = req.body;
  if (validateEntryFields(req.body)) {
    return res.status(422).json({ msg: "Wszystkie pola muszą być uzupełnione: tytuł, treść, kategoria." });
  }
  try {
    // Zmieniona metoda oraz inny warunek
    const foundCategory = await db.kategoria.findFirst({ where: { nazwa: category } });
    if (!foundCategory) {
      return res.status(409).json({ msg: "Nie odnaleziono pasującej kategorii wpisu." });
    }
    const entry = await db.wpis.create({ data: { tytul: title, tresc: content, kategoria: category } });
    return res.status(201).json(entry);
  } catch (e) {
    next(e);
  }
});


wpisyAPI.get('/', async (req, res, next) => {
  try {
    const entries = await db.wpis.findMany();
    if (!entries.length) {
      return res.status(204).json({ msg: "Brak wpisów w bazie!" });
    }
    return res.json(entries);
  } catch (e) {
    next(e);
  }
});


wpisyAPI.get('/:entryId', async (req, res, next) => {
  const entryId = parseInt(req.params.entryId, 10);
  try {
    const oneEntry = await db.wpis.findUnique({ where: { id: entryId } });
    if (!oneEntry) {
      return res.status(404).json({ msg: "Nie można odnaleźć wpisu o wskazanym ID." });
    }
    return res.json(oneEntry);
  } catch (e) {
    next(e);
  }
});


wpisyAPI.patch('/:entryId', async (req, res, next) => {
  const entryId = Number(req.params.entryId);
  const { title, content, category } = req.body;
  if (validateEntryFields(req.body)) {
    return res.status(400).json({ msg: "Wymagane pola nie zostały uzupełnione." });
  }
  try {
    const entryExists = await db.wpis.findUnique({ where: { id: entryId } });
    if (!entryExists) {
      return res.status(404).json({ msg: "Wpis nie istnieje." });
    }
    const updated = await db.wpis.update({
      where: { id: entryId },
      data: { tytul: title, tresc: content, kategoria: category }
    });
    return res.json(updated);
  } catch (e) {
    next(e);
  }
});


wpisyAPI.delete('/:entryId', async (req, res, next) => {
  const entryId = parseInt(req.params.entryId, 10);
  try {
    const forDelete = await db.wpis.findUnique({ where: { id: entryId } });
    if (!forDelete) {
      return res.status(404).json({ msg: "Nie odnaleziono wpisu do usunięcia." });
    }
    const removed = await db.wpis.delete({ where: { id: entryId } });
    return res.json({ status: "deleted", info: removed });
  } catch (e) {
    next(e);
  }
});

module.exports = wpisyAPI;