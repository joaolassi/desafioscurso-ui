const express = require('express');
const app = express();

// Pego o caminho da pasta dist e sirvo ela pro servidor
app.use(express.static(__dirname + '/dist'));

app.get('/*', function (req, res) {
  res.sendFile(__dirname + '/dist/index.html');
});

app.listen(process.env.PORT || 4200);
