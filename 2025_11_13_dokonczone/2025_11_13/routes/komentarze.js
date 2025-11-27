const express = require('express');
const opinieRouter = express.Router();
const { PrismaClient } = require('@prisma/client');
const baza = new PrismaClient();


opinieRouter.post('/dodaj', async (req, res, next) => {
  let { wpis, tekst, autorzy } = req.body;
  if (!wpis || !tekst || !autorzy) {
    return res.status(400).json({ alert: "Podaj wszystkie pola: wpis, tekst, autorzy." });
  }
  try {
    const wpisSprawdzony = await baza.wpis.findFirst({ where: { id: Number(wpis) } });
    if (!wpisSprawdzony) {
      return res.status(409).json({ alert: "Brak wpisu o tym identyfikatorze." });
    }
    // Tworzymy nowy komentarz
    const nowyKomentarz = await baza.komentarz.create({
      data: { wpisID: Number(wpis), tresc: tekst, autor: autorzy }
    });
    return res.status(201).json({ komunikat: "Dodano opinię!", opinia: nowyKomentarz });
  } catch (blad) {
    next(blad);
  }
});

opinieRouter.get('/dla/:postId', async (req, res, next) => {
  const postId = Number(req.params.postId);
  try {
    const wszystkieOpinie = await baza.komentarz.findMany({ where: { wpisID: postId } });
    res.status(200).json({ lista: wszystkieOpinie });
  } catch (err) {
    next(err);
  }
});

opinieRouter.get('/id/:komentarzId', async (req, res, next) => {
  const komId = Number(req.params.komentarzId);
  try {
    const wynik = await baza.komentarz.findUnique({ where: { id: komId } });
    if (!wynik) {
      return res.status(404).json({ alert: "Opinia (komentarz) nie istnieje." });
    }
    res.json({ details: wynik });
  } catch (err) {
    next(err);
  }
});

module.exports = opinieRouter;