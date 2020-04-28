var form = document.querySelector('form');
var sendBtn = document.querySelector('input[type=submit]');

function postData(e){
    var objHospital = {};
    objHospital['full_name'] =document.querySelector('#full_name').value;
    objHospital['adress'] =document.querySelector('#adress').value;
    objHospital['phone'] =document.querySelector('#phone').value;
    
    var xhr = new XMLHttpRequest();
    xhr.open("POST", 'http://localhost:3000/post', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(objHospital));

    location.reload();
}

//form.onsubmit(postData);
sendBtn.addEventListener('click', postData);
