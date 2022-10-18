
const express = require('express');
const path = require('path');

const codeMap = {};
let antiDdosMultiplier = 1.0;

// New app using express module
const app = express();
app.use(express.json());

// Serve frontend
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../client')));
app.use('/prism', express.static(__dirname + '../public/prism'));

// Set CORS policy
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
  res.header(
      'Access-Control-Allow-Headers',
      'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  next();
});

app.get('/data', function (req, res) {
  res.end(JSON.stringify([codeMap, antiDdosMultiplier]));
});

app.post('/', function(req, res) {
  console.log(req.body);
  const name = req.body.name;
  const version = req.body.version;
  const code = req.body.code;

  if (!codeMap.hasOwnProperty(name) || version > codeMap[name][0]) {
    codeMap[name] = [version, code];
  }

  res.end('added to map');
});

app.post("/ddos", function (req, res) {
  const newVal = req.body.multiplier;
  if (newVal > 0.5 && newVal < 10) {
    antiDdosMultiplier = newVal;
    console.log("Updated anti-DDOS multiplier to", newVal);
  }
  res.end();
})

app.delete('/', function(req, res) {
  codeMap = {};
})

app.listen(process.env.PORT || 3000, function() {
  console.log('server is running on port 3000');
})