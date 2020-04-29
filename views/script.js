var form = document.querySelector('form');
var sendBtn = document.querySelector('input[type=submit]');
var deleteBtns = document.querySelectorAll('button');

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

deleteBtns.forEach(btn =>{
    btn.addEventListener('click', function(){
        var id =this.parentNode.parentNode.dataset.id;
        this.parentNode.parentNode.remove();
        var xhr = new XMLHttpRequest();
        xhr.open("DELETE", 'http://localhost:3000/del', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify({id}));
    })
})