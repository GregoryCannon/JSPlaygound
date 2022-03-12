
const express = require("express");
const path = require("path");
  
const codeMap = {};

// New app using express module
const app = express();
app.use(express.json());

// Serve frontend
app.use(express.static(path.join(__dirname, '../client')));
app.use("/prism", express.static(__dirname + "../prism"));


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

// app.get("/", function (req, res) {
//   res.sendFile(path.join(__dirname, "../client/index.html"));
// })
  
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