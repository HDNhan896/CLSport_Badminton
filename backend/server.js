const express = require('express');
const app = express();
app.use(express.static(path.join(__dirname, '../frontend')));

app.get('/vnbshop', (req, res) => {
  res.send('Me may beo');
});

app.listen(3000, () => {
  console.log('Server running');
});