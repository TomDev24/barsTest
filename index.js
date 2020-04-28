var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser').json();

app.set('view engine', 'pug');
app.use(express.static('views'));

app.get('/', function(req, res){
	arrayOfHospitalsObject =getDataFromIpu();
	res.render('index', {message: 'Hello there!', arrayOfHospitalsObject});
});

app.post('/post', bodyParser, function(req,res){
	if (req.body){
		putDataInIpu(req.body);
		res.send("SUces");
	} else {
		res.status(303);
		res.send("Her");
	}
});

app.listen(3000, function(){
	console.log('Example app is listening!');
});

function getDataFromIpu(){
	var jsonObj = JSON.parse(fs.readFileSync('ipu.json', 'utf8'));
	arrayOfHospitalsObject = [];
	for (idObj in jsonObj){
		arrayOfHospitalsObject.push(jsonObj[idObj]);
	}
	return arrayOfHospitalsObject;
}

function putDataInIpu(obj){
	var arrOfObj = getDataFromIpu();
	arrOfObj.push(obj);
	fs.writeFile('ipu.json', JSON.stringify(arrOfObj), function(err){
		if(err) throw err;
		console.log('Added');
	});
}