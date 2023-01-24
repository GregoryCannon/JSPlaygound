
const express = require('express');
const lzString = require("../public/lzstring/lz-string");
const path = require('path');

const dataLookupByStudent = {};
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
  const uncompressedData = JSON.stringify([dataLookupByStudent, antiDdosMultiplier])
  const compressedData = lzString.compressToUTF16(uncompressedData);
  res.end(compressedData);
});

app.post('/', function(req, res) {
  const name = req.body.name;
  const version = req.body.version;
  const dataModel = req.body.dataModel;

  if (!dataLookupByStudent.hasOwnProperty(name) || version > dataLookupByStudent[name][0]) {
    dataLookupByStudent[name] = [version, dataModel];
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
  dataLookupByStudent = {};
})

app.listen(process.env.PORT || 3000, function() {
  console.log('server is running on port 3000');
})