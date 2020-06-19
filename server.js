


let express = require("express")
let app = express()
var jsonData = './data/share-of-individuals-using-the-internet.json';

// let MongoClient = require("mongodb").MongoClient;

// const client = new MongoClient("mongodb://localhost:27017", 
// 	{ useNewUrlParser: true, useUnifiedTopology: true });

// let db = null;
// client.connect(err => {
// 	db = client.db("dim")
// })


app.use("/js",express.static(__dirname + "/js"))
app.use("/css",express.static(__dirname + "/css"))

app.get("/", function(req, res) {
	res.sendFile(__dirname + "/index.html")
})

app.get("/internet-json", function (req, res) {
	var request = new XMLHttpRequest();
	request.open('GET', jsonData);
	axios.get(jsonData)
	.then((res)=>{
	  console.log(res.data);
	}).catch((err)=>{
	  console.log(err);
	})

})


app.listen(1337)

