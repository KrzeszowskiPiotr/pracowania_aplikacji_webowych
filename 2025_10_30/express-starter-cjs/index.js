const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.static('static'));
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'static', 'strona_glowna.html'));
});

app.get('/o-nas', (req, res) => {
  res.sendFile(path.join(__dirname, 'static', 'o_nas.html'));
});

app.get('/oferta', (req, res) => {
  res.sendFile(path.join(__dirname, 'static', 'oferta.html'));
});

app.get('/kontakt', (req, res) => {
  res.sendFile(path.join(__dirname, 'static', 'kontakt.html'));
});

app.post('/kontakt', (req, res) => {
  const { imie, nazwisko, email, wiadomosc } = req.body;

  console.log('Nowa wiadomość z formularza kontaktowego:');
  console.log(`Imię: ${imie}`);
  console.log(`Nazwisko: ${nazwisko}`);
  console.log(`Email: ${email}`);
  console.log(`Treść wiadomości: ${wiadomosc}`);

  res.redirect('/');
});


app.listen(PORT, () => {
  console.log(`Serwer działa na http://localhost:${PORT}`);
});
