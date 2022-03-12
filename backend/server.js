
const express = require("express");
const bodyParser = require("body-parser")
  
const codeMap = {};

// New app using express module
const app = express();
app.use(express.json());

// Set CORS policy
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  next();
});
  
app.get("/data", function(req, res) {
  res.end(JSON.stringify(codeMap));
});

app.get("/name", function(req, res) {
  res.end(JSON.stringify(codeMap));
});
  
app.post("/", function (req, res) {
  console.log(req.body);
  var name = req.body.name;
  var code = req.body.code;
    
  codeMap[name] = code;
    
  res.end("added to map");
});

app.delete("/", function (req, res) {
  codeMap = {};
})
  
app.listen(process.env.PORT || 3000, function(){
  console.log("server is running on port 3000");
})