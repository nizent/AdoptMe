let writtenIDs = []; // Ira almacenando los mensajes que ya escribio
let lastpassword='';

var comuna;
fetch("chile2.json")
    .then(response => {
        return response.json();
    })
    .then(data => {
        console.log(data);
        comuna = data;
    });
function load_map(){
    var mymap = L.map('mapid').setView([-33.4500000, -70.6666667], 11);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoibmljbzE5OTd0aCIsImEiOiJja2h6Y2Jjdm0waWoyMnJudHh0MTlpYzNkIn0.dzJQaEDI5kxQw66CFXIXFQ'
    }).addTo(mymap);
    loadMessages(mymap);
    setInterval(function () {
        loadMessages(mymap);
    }, 50000);
}

function load_info(msg,div){
    let info="";
    info+="tipo:"+msg[2]+"<br>";
    info+="edad:"+msg[3]+"<br>";
    info+="color:"+msg[4]+"<br>";
    let esterilizado="<img width='10px' height='10px'";
    if(msg[5]===1){
        esterilizado+="src='img/icons/aprobado.png'>";
    }
    else if(msg[5]===0){
        esterilizado+="src='img/icons/renegado.png'>";
    }
    else{
        esterilizado+="src='img/icons/desconocido.png'>";
    }
    info+="esterilizado:"+esterilizado+"<br>";
    let vacunas="<img width='10px' height='10px'";
    if(msg[6]===1){
        vacunas+="src='img/icons/aprobado.png'>";
    }
    else if(msg[6]===0){
        vacunas+="src='img/icons/renegado.png'>";
    }
    else{
        vacunas+="src='img/icons/desconocido.png'>";
    }
    info+="vacunas al día:"+vacunas+"<br>";
    info+="<form id='ver_censo' method='post' action='ver_censo.py'>" +
        "    <input type='hidden' name='mascota_domicilio_id' value='"+msg[0]+"' />" +
        "    <input type='submit' value='ver censo' class='link'/>" +
        "</form>";
    div.innerHTML+="<div><img src='img/"+msg[1]+"' width='105px' height='100px'>"+"<div class='mascota'>"+info+"</div></div>"+"<br>";
}
function load_fotos(comuna_nombre){
    if(document.getElementById(comuna_nombre)){
        let div=document.getElementById(comuna_nombre);
        console.log(comuna_nombre);
        let xhr = new XMLHttpRequest();
        xhr.open('POST', 'read2.py');
        let formdata = new FormData();
        formdata.append('com', comuna_nombre);
        xhr.send(formdata);
        xhr.timeout = 1000;
        xhr.onload = function (data) {
            // noinspection JSUnresolvedVariable
            /** @type {string} */ let datatext = data.currentTarget.responseText;
            if (datatext.includes('ERROR') || datatext.includes('Error')) {
                //writeMessage('Error en el servidor');
                console.log("jkljkl");
                return;
            }
            let messages = JSON.parse(datatext);
            let keys = Object.keys(messages);
            keys = keys.reverse();
            for (let i = 0; i < keys.length; i += 1) {
                let key = keys[i];
                if (messages.hasOwnProperty(key)) {
                    load_info(messages[key],div);
                    console.log("asddddd");
                }
            }
        }
        /*xhr.ontimeout = function () {
            mostrarError('Se excedió el tiempo máximo de comunicación con el servidor');
        }
        xhr.onerror = function () {
            mostrarError('Error al cargar los mensajes desde la base de datos');
        }*/
    }
}

function writeMessage(comuna_nombre, numero_de_fotos,mymap) {
    if(writtenIDs.indexOf(comuna_nombre)!==-1){
        return;
    }
    var latitud, longitud;
    //buscar comuna
    latitud=comuna[comuna_nombre].lat;
    longitud=comuna[comuna_nombre].lng;
    function onClick(){
        setTimeout(() => {load_fotos(comuna_nombre);}, 500);
    }
    var marker = L.marker([latitud, longitud],{draggable: true,        // Make the icon dragable
        title: 'Total fotos: '+numero_de_fotos}).addTo(mymap);
    marker.on('click',onClick);
    let div="<div class='popup' id='"+comuna_nombre+"' style='width: 250px;'></div>";
    marker.bindPopup(div);
    writtenIDs.push(comuna_nombre);
}

function loadMessages(mymap) {
    console.log('Cargando mensajes desde el servidor');
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'read.py');
    let data = new FormData();
    xhr.timeout = 1000; // 1 segundo máximo
    xhr.onload = function (data) {
        // noinspection JSUnresolvedVariable
        /** @type {string} */ let datatext = data.currentTarget.responseText;
        if (datatext.includes('ERROR') || datatext.includes('Error')) {
            writeMessage('Error en el servidor');
            return;
        }
        let messages = JSON.parse(datatext);
        let keys = Object.keys(messages);
        keys = keys.reverse();
        for (let i = 0; i < keys.length; i += 1) {
            let key = keys[i];
            if (messages.hasOwnProperty(key)) {
                writeMessage(messages[key][0], messages[key][1],mymap);
            }
        }
    }
    xhr.ontimeout = function () {
        mostrarError('Se excedió el tiempo máximo de comunicación con el servidor');
    }
    xhr.onerror = function () {
        mostrarError('Error al cargar los mensajes desde la base de datos');
    }
    xhr.send();
}

function initApp() {
    console.log('Iniciando la aplicación');
    loadMessages();
    setInterval(function () {
        loadMessages(lastpassword);
    }, 500);
}

function submitMessage() {
    let msgError = '';
    let nombre = document.getElementById('uname').value;
    let message = document.getElementById('message').value;
    let opassword=document.getElementById('password').value;
    let password = sha256(opassword);
    if(password!=lastpassword){
        let cont = document.getElementById('chatcontainer');
        cont.innerHTML = '';
        writtenIDs = [];
    }
    lastpassword=password;
    if (nombre.length === 0 && message.length === 0) {
        mostrarError('Formulario vacío');
        return false;
    }

    if(opassword.length<1 || opassword.length>32){
        mostrarError('Contraseña nula o excede número de caracteres');
        return false;
    }

    let regex = /^[a-zA-Z ]*$/;
    if (nombre.length < 4 || nombre.length > 10 || !regex.test(nombre)) {
        msgError += 'Nombre invalido, ';
    }
    if (message.length < 1 || message.length > 256) {
        msgError += 'Mensaje invalido'
    }
    mostrarError(msgError);
    if (msgError === '') {
        let formdata = new FormData();
        formdata.append('uname', nombre);
        formdata.append('message', message);
        formdata.append('password', opassword);
        let request = new XMLHttpRequest();
        request.open('POST', 'write.py');
        request.send(formdata);
        request.onload = function (data) {
            // noinspection JSUnresolvedVariable
            /** @type {string}*/ let datatext = data.currentTarget.responseText;
            if (datatext.includes('ERROR') || datatext.includes('Error')) {
                mostrarError(datatext);
            } else {
                console.log('Mensaje escrito exitosamente');
                loadMessages(password);
                document.getElementById('message').value = '';
            }
        }
    }
    return false;
}

function mostrarError(msg) {
    let contenedor = document.getElementById('titulo');
    if (msg === '') {
        contenedor.style.display = 'none';
        return true;
    }
    contenedor.innerHTML = msg;
    contenedor.style.display = 'block';
    contenedor.style.fontWeight = '800';
    setTimeout(function () {
        contenedor.style.display = 'none';
    }, 5000); // Después de 5 segundos se oculta el error
}