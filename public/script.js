var form = document.querySelector('form');
var sendBtn = document.querySelector('input[type=submit]');
var deleteBtns = document.querySelectorAll('.delete');
var updBtns = document.querySelectorAll('.update');

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

updBtns.forEach(btn =>{
    btn.addEventListener('click', function(){
        var id =this.parentNode.parentNode.dataset.id;
        var tableRow = this.parentNode.parentNode;
        var td = tableRow.firstChild;

        if (this.textContent =='Отправить'){
            var newObj = {};
            newObj['full_name'] =td.querySelector('input').value;
            newObj['adress'] =td.nextSibling.querySelector('input').value;
            newObj['phone'] =td.nextSibling.nextSibling.querySelector('input').value;
            newObj['id'] = id;
            var xhr = new XMLHttpRequest();
            xhr.open("PUT", 'http://localhost:3000/put', true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify(newObj));
            location.reload();
            return;
        }
        this.textContent = "Отправить";
        for (var i = 0; i< 3; i++){
            var inputEl = document.createElement('input');
            inputEl.value = td.textContent;
            td.appendChild(inputEl);
            td = td.nextSibling;
        }
    })
})