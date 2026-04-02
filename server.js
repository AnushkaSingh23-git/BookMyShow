const express = require('express');
const path = require('path');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'idx.html'));
});

app.get('/signin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'signin.html'));
});

app.post('/signin', (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    res.redirect('/');
  } else {
    res.redirect('/signin?error=1');
  }
});

app.listen(5000, () => console.log('Running at http://localhost:5000'));