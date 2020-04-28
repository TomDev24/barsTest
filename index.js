var express = require('express');
var app = express();
var fs = require('fs');

app.set('view engine', 'pug');
//app.use(express.static('public'));

app.get('/', function(req, res){
	arrayOfHospitalsObject =getDataFromIpu();
	res.render('index', {message: 'Hello there!', arrayOfHospitalsObject});
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