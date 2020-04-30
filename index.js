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
	arrayOfHospitalsObject =getDataFromIpu();
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
	try {
		var jsonObj = JSON.parse(fs.readFileSync('ipu.json', 'utf8'));
	} catch(err){
		console.log(err);
	}
	var len = Object.keys(jsonObj).length;
	console.log(len);
	arrayOfHospitalsObject = [];
 	for (var i = 0; i < len; i++){
		arrayOfHospitalsObject.push(jsonObj[i])
	};
	return arrayOfHospitalsObject;
}

function putDataInIpu(obj){
	var arrOfObj = getDataFromIpu();
	var len = Object.keys(arrOfObj).length;
	obj.id= len;
	arrOfObj.push(obj);
	fs.writeFile('ipu.json', JSON.stringify(arrOfObj), function(err){
		if(err) throw err;
		console.log('Added');
	});
}

function deleteDataFromIpu(id){
	var arrOfObj = getDataFromIpu();
	var len = Object.keys(arrOfObj).length;
	for (var i = 0; i < len; i++){
		if (i == id){
			arrOfObj.splice(i, 1);
		}
	}; 
	fs.writeFile('ipu.json', JSON.stringify(arrOfObj), function(err){
		if(err) throw err;
		console.log('Deleted');
	});
}

function updateDataInIpu(obj){
	var arrOfObj = getDataFromIpu();
	var len = Object.keys(arrOfObj).length;
	for (var i = 0; i < len; i++){
		if (i == obj.id){
			arrOfObj[i] = obj;
		}
	}; 
	fs.writeFile('ipu.json', JSON.stringify(arrOfObj), function(err){
		if(err) throw err;
		console.log('Updated');
	});
}