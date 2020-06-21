let express = require("express");
let app = express();

app.use("/js", express.static(__dirname + "/js"));
app.use("/css", express.static(__dirname + "/css"));
app.use("/node_modules", express.static(__dirname + "/node_modules"));
app.use("/images", express.static(__dirname + "/images"));
app.use("/data", express.static(__dirname + "/data"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.get("/internet-json", function (req, res) {
  var request = new XMLHttpRequest();
  request.open("GET", jsonData);
  axios
    .get(jsonData)
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.listen(1337);
