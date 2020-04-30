var express = require('express');
var app = express();
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser').json();

app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'pug');
app.use(express.static('views'));
app.use(express.static('public'));

app.get('/', function(req, res){
	var arrayOfHospitalsObject =getDataFromIpu();
	res.render('index', {arrayOfHospitalsObject});
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

app.delete('/del', bodyParser, function(req,res){
	deleteDataFromIpu(req.body.id);
	res.send('ok');
})

app.put('/put', bodyParser, function(req,res){
	updateDataInIpu(req.body);
	res.send('ok');
})

app.listen(3000, function(){
	console.log('------------------');
});

function getDataFromIpu(){
	var jsonObj = JSON.parse(fs.readFileSync('ipu.json', 'utf8'));
	return jsonObj;
}

function putDataInIpu(obj){
	var arrOfObj = getDataFromIpu();
	var arrOfKeys = Object.keys(arrOfObj);
	var lastObjId = parseInt(arrOfKeys[arrOfKeys.length-1]);
	var newObjid = (lastObjId + 1).toString();
	arrOfObj[newObjid] = obj;
	arrOfObj[newObjid].id = newObjid
	fs.writeFile('ipu.json', JSON.stringify(arrOfObj), function(err){
		if(err) throw err;
		console.log('Added');
	});
}

function deleteDataFromIpu(id){
	var arrOfObj = getDataFromIpu();
	delete arrOfObj[id];
	fs.writeFile('ipu.json', JSON.stringify(arrOfObj), function(err){
		if(err) throw err;
		console.log('Deleted');
	});
}

function updateDataInIpu(obj){
	var arrOfObj = getDataFromIpu();
	arrOfObj[obj.id] = obj;

	fs.writeFile('ipu.json', JSON.stringify(arrOfObj), function(err){
		if(err) throw err;
		console.log('Updated');
	});
}