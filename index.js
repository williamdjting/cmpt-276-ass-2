const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

var app = express();
  
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => res.render('pages/index'));

app.get('/database', (req, res) => {
  var data = { results: [2, 3, 4, 5, 6]};
  res.render('pages/db',data);
});

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
