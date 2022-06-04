var datos={
    "Region":["Región Metropolitana de Santiago","Región Metropolitana de Santiago","Región Metropolitana de Santiago","Región del Maule","Región del Maule"],
    "Comuna":["La Reina", "Las Condes","Lo Barnechea", "Talca","Maule"],
    "Nombre Calle":["Simón Gonzalez","Presidente Errázuriz","Los Quincheros","Las Rastras","Maule"],
    "Número": ["7901","2426","298","1090","189"],
    "Sector": ["","","","",""],
    "Nombre": ["Juan Perez", "Sigmound Freud", "Juana de Arco", "Albert Einstein", "Nicolás Zen"],
    "email": ["nicolas@hotmail.com","nicolas@hotmail.com","nicolas@hotmail.com","nicolas@hotmail.com","nicolas@hotmail.com"],
    "número de celular": ["+56945566778","+56945566778","+56945566778","+56945566778","+56945566778"],
    "Tipo":["perro","perro","perro","perro","gato"],
    "edad en años":["5","5","5","5","2"],
    "color":["café","café","café","café","naranja"],
    "raza":["chow chow","chow chow","chow chow","chow chow","angora"],
    "esterilizado":["si","si","si","si","si"],
    "vacunas al día":["si","si","si","si","si"],
    "foto":["img/m1.jpg","img/m2.jpg","img/m3.jpg","img/m4.jpg","img/m5.jpg"],
    "fecha":["2/10/2020","2/10/2020","2/10/2020","2/10/2020","2/10/2020"],
    "Total mascotas":["1","1","1","1","1"],
    "Total fotos":["1","1","1","1","1"]
}

function poblar_tabla(){
    let tabla=document.getElementById("tabla");
    for(let i=0;i<5;i++){
        tabla.innerHTML+="<tr onclick='mostrar_columna("+i+")'>\n" +
            "            <th>"+datos["fecha"][i]+"</th>\n" +
            "            <th>"+datos["Comuna"][i]+"</th>\n" +
            "            <th>"+datos["Nombre Calle"][i]+"</th>\n" +
            "            <th>"+datos["Nombre"][i]+"</th>\n" +
            "            <th>"+datos["Total mascotas"][i]+"</th>\n" +
            "            <th>"+datos["Total fotos"][i]+"</th>\n" +
            "        </tr>";
    }
}

function mostrar_columna(i){
    let seccion=document.getElementById("completar");
    let tabla=document.getElementById("tabla_cuerpo1");
    let mostrar_data=document.getElementById("mostrar_data");
    mostrar_data.style.display="block";
    tabla.style.display="none";
    for(let key in datos){
        if(key=="foto"){
            seccion.innerHTML+="foto: <br> <img alt=\"imagen\" src=\""+datos[key][i]+"\" width='320' height='240' onclick='mostrar_imagen("+i+")'></img><br>"
        }
        else{
            seccion.innerHTML+=""+key+":"+datos[key][i]+"<br>";
        }
    }
}
function mostrar_imagen(i){
    let imagen_grande=document.getElementById("imagen_grande");
    let mostrar_data=document.getElementById("mostrar_data");
    mostrar_data.style.display="none";
    imagen_grande.innerHTML+="<img alt=\"imagen\" src='"+datos["foto"][i]+"' width='800' height='600'><br><button class='boton_rojo' type='button' onclick='cerrar_imagen()'>cerrar</button>";
    imagen_grande.style.display="block";
}

function cerrar_imagen(){
    let imagen_grande=document.getElementById("imagen_grande");
    let mostrar_data=document.getElementById("mostrar_data");
    mostrar_data.style.display="block";
    imagen_grande.innerHTML="";
    imagen_grande.style.display="none";
}

function mostrar_data2(group, groups, large){
    for(let i=0; i<large;i++){
        var row=document.getElementById("data"+i);
        if(Math.floor(i/5)==group){
            row.style.display="";
        }
        else{
            row.style.display="none";
        }
    }
}
function m(i,l){
    for(let k=0; k<l; k++){
        let data=document.getElementById("dom"+k);
        data.style.display="none";
    }
    let data=document.getElementById("dom"+i);
    data.style.display="block";
    let tablapagina=document.getElementById("tabla_paginas");
    tablapagina.style.display="none";
    let botones=document.getElementById("botones");
    botones.style.display="block";
}
function agrandar(id){
    let img=document.getElementById(id);
    if( (img.width!="320" || img.height!="240") || (img.style.width=="auto" && img.style.width=="auto") ){
        img.style.height="240px";
        img.style.width="320px";
    }
    else{
        img.style.width="auto";
        img.style.height="auto";
    }
}
function volver_listado(l){
    let tablapagina=document.getElementById("tabla_paginas");
    tablapagina.style.display="block";
    let botones=document.getElementById("botones");
    botones.style.display="none";
    for(let k=0; k<l; k++){
        let data=document.getElementById("dom"+k);
        data.style.display="none";
    }
}