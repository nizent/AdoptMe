var arr = {
    "Región Metropolitana de Santiago": ["Cerrillos", "Cerro Navia", "Conchalí", "El Bosque", "Estación Central", "Huechuraba", "Independencia", "La Cisterna", "La Florida", "La Granja", "La Pintana", "La Reina", "Las Condes", "Lo Barnechea", "Lo Espejo", "Lo Prado", "Macul", "Maipú", "Ñuñoa", "Pedro Aguirre Cerda", "Peñalolén", "Providencia", "Pudahuel", "Quilicura", "Quinta Normal", "Recoleta", "Renca", "San Joaquín", "San Miguel", "San Ramón", "Vitacura", "Puente Alto", "Pirque", "San José de Maipo", "Colina", "Lampa", "Tiltil", "San Bernardo", "Buin", "Calera de Tango", "Paine", "Melipilla", "Alhué", "Curacaví", "María Pinto", "San Pedro", "Talagante", "El Monte", "Isla de Maipo", "Padre Hurtado", "Peñaflor"],
    "Arica y Parinacota": ["Arica", "Camarones", "Putre", "General Lagos"],
    "Tarapacá": ["Iquique", "Alto Hospicio", "Pozo Almonte", "Camiña", "Colchane", "Huara", "Pica"],
    "Antofagasta": ["Antofagasta", "Mejillones", "Sierra Gorda", "Taltal", "Calama", "Ollagüe", "San Pedro de Atacama", "Tocopilla", "María Elena"],
    "Atacama": ["Copiapó", "Caldera", "Tierra Amarilla", "Chañaral", "Diego de Almagro", "Vallenar", "Alto del Carmen", "Freirina", "Huasco"],
    "Coquimbo": ["La Serena", "Coquimbo", "Andacollo", "La Higuera", "Paiguano", "Vicuña", "Illapel", "Canela", "Los Vilos", "Salamanca", "Ovalle", "Combarbalá", "Monte Patria", "Punitaqui", "Río Hurtado"],
    "Valparaíso": ["Valparaíso", "Casablanca", "Concón", "Juan Fernández", "Puchuncaví", "Quintero", "Viña del Mar", "Isla de Pascua", "Los Andes", "Calle Larga", "Rinconada", "San Esteban", "La Ligua", "Cabildo", "Papudo", "Petorca", "Zapallar", "Quillota", "Calera", "Hijuelas", "La Cruz", "Nogales", "San Antonio", "Algarrobo", "Cartagena", "El Quisco", "El Tabo", "Santo Domingo", "San Felipe", "Catemu", "Llaillay", "Panquehue", "Putaendo", "Santa María", "Quilpué", "Limache", "Olmué", "Villa Alemana"],
    "Región del Libertador Gral. Bernardo O Higgins": ["Rancagua", "Codegua", "Coinco", "Coltauco", "Doñihue", "Graneros", "Las Cabras", "Machalí", "Malloa", "Mostazal", "Olivar", "Peumo", "Pichidegua", "Quinta de Tilcoco", "Rengo", "Requínoa", "San Vicente", "Pichilemu", "La Estrella", "Litueche", "Marchihue", "Navidad", "Paredones", "San Fernando", "Chépica", "Chimbarongo", "Lolol", "Nancagua", "Palmilla", "Peralillo", "Placilla", "Pumanque", "Santa Cruz"],
    "Región del Maule": ["Talca", "Constitución", "Curepto", "Empedrado", "Maule", "Pelarco", "Pencahue", "Río Claro", "San Clemente", "San Rafael", "Cauquenes", "Chanco", "Pelluhue", "Curicó", "Hualañé", "Licantén", "Molina", "Rauco", "Romeral", "Sagrada Familia", "Teno", "Vichuquén", "Linares", "Colbún", "Longaví", "Parral", "Retiro", "San Javier", "Villa Alegre", "Yerbas Buenas"],
    "Región de Ñuble": ["Cobquecura", "Coelemu", "Ninhue", "Portezuelo", "Quirihue", "Ránquil", "Treguaco", "Bulnes", "Chillán Viejo", "Chillán", "El Carmen", "Pemuco", "Pinto", "Quillón", "San Ignacio", "Yungay", "Coihueco", "Ñiquén", "San Carlos", "San Fabián", "San Nicolás"],
    "Región del Biobío": ["Alto Biobío","Antuco","Arauco","Cabrero","Cañete","Chiguayante","Concepción","Contulmo","Coronel","Curanilahue","Florida","Hualpén","Hualqui","Laja","Lebu","Los Álamos","Los Ángeles","Lota","Mulchén","Nacimiento","Negrete","Penco","Quilaco","Quilleco","San Pedro de la Paz","San Rosendo","Santa Bárbara","Santa Juana","Talcahuano","Tirúa","Tomé","Tucapel", "Yumbel"],
    "Región de la Araucanía": ["Temuco", "Carahue", "Cunco", "Curarrehue", "Freire", "Galvarino", "Gorbea", "Lautaro", "Loncoche", "Melipeuco", "Nueva Imperial", "Padre las Casas", "Perquenco", "Pitrufquén", "Pucón", "Saavedra", "Teodoro Schmidt", "Toltén", "Vilcún", "Villarrica", "Cholchol", "Angol", "Collipulli", "Curacautín", "Ercilla", "Lonquimay", "Los Sauces", "Lumaco", "Purén", "Renaico", "Traiguén", "Victoria"],
    "Región de Los Ríos": ["Valdivia", "Corral", "Lanco", "Los Lagos", "Máfil", "Mariquina", "Paillaco", "Panguipulli", "La Unión", "Futrono", "Lago Ranco", "Río Bueno"],
    "Región de Los Lagos": ["Puerto Montt", "Calbuco", "Cochamó", "Fresia", "Frutillar", "Los Muermos", "Llanquihue", "Maullín", "Puerto Varas", "Castro", "Ancud", "Chonchi", "Curaco de Vélez", "Dalcahue", "Puqueldón", "Queilén", "Quellón", "Quemchi", "Quinchao", "Osorno", "Puerto Octay", "Purranque", "Puyehue", "Río Negro", "San Juan de la Costa", "San Pablo", "Chaitén", "Futaleufú", "Hualaihué", "Palena"],
    "Región Aisén del Gral. Carlos Ibáñez del Campo": ["Coihaique", "Lago Verde", "Aisén", "Cisnes", "Guaitecas", "Cochrane", "O Higgins", "Tortel", "Chile Chico", "Río Ibáñez"],
    "Región de Magallanes y de la Antártica Chilena": ["Punta Arenas", "Laguna Blanca", "Río Verde", "San Gregorio", "Cabo de Hornos (Ex Navarino)", "Antártica", "Porvenir", "Primavera", "Timaukel", "Natales", "Torres del Paine"]};

function confirmacion(){
    let botones=document.getElementById("confirmacion");
    let formulario=document.getElementById("formulario");
    let hay_errores=document.getElementById("hay_errores");
    hay_errores.style.display="none";
    formulario.style.display="none";
    botones.style.display="block";
}
function cerrar() {
    let botones=document.getElementById("confirmacion");
    let formulario=document.getElementById("formulario");
    formulario.style.display="block";
    botones.style.display="none";
}

function completar_regiones(){
    var select = document.getElementById("region");
    for(var key in arr)
    {
        var option = document.createElement("OPTION"),
            txt = document.createTextNode(key);
        option.appendChild(txt);
        option.setAttribute("value",key);
        select.insertBefore(option,select.lastChild);
    }
}
function completar_comunas(){
    var select = document.getElementById("region");
    var select2 = document.getElementById("comuna");
    select.onchange=function(){
        var region=select.options[select.selectedIndex].text;
        var i, len1=select2.options.length;
        var option2 = document.createElement("SELECT");
        for(i=len1;i>=0;i--){select2.remove(i);}
        for(var key in arr[region])
        {
            var option2 = document.createElement("OPTION");
            var txt = document.createTextNode(arr[region][key]);
            option2.appendChild(txt);
            option2.setAttribute("value",arr[region][key]);
            select2.insertBefore(option2,select2.lastChild);
        }}
}

function other_pet(){
    var masc1=document.getElementById("tipo-mascota");
    var masc2=document.getElementById("textotro");
    if(masc1.options[masc1.selectedIndex].text=="otro"){
        var other=document.createElement("input");
        other.setAttribute("type","text");
        other.setAttribute("id","other");
        other.setAttribute("maxlength","40");
        other.setAttribute("size","40");
        masc2.innerHTML="otro";
        masc2.appendChild(other);}
    else{
        try{
            var c=document.getElementById("other");
            c.parentNode.removeChild(c);
            masc2.innerHTML="";
        } catch{}

    }
}
var count=[];
count.push(1);
function agregar(i){
    if(i==0){
        var but=document.getElementById("agregar-foto");
        var filess=document.getElementById("files");
    }
    else{
        var but=document.getElementById("agregar-foto"+i);
        var filess=document.getElementById("files"+i);
    }
    var infile=document.createElement("input");
    infile.setAttribute("type","file");
    infile.setAttribute("id", "foto-mascota"+i+"_"+count[i]);
    infile.setAttribute("name", "foto-mascota"+i+"_"+count[i]);
    infile.setAttribute("accept","image/*");
    if(count[i]<5){
        filess.innerHTML+="<br>";
        filess.appendChild(infile);
        count[i]++;
    }
}
var nuevas_mascotas=0;
function informar(){
    var form=document.getElementById("informar_mascota");
    nuevas_mascotas++;
    count.push(1);
    var i=nuevas_mascotas;
    form.innerHTML+="Nueva mascota"+"<div class=\"entrada\">\n" +
        "                <div class=\"leyenda\">Tipo</div>\n" +
        "                <select id=\"tipo-mascota"+i+"\" name='tipo-mascota"+i+"' oninput=\"other_pet()\">\n" +
        "                    <option></option>\n" +
        "                    <option>perro</option>\n" +
        "                    <option>gato</option>\n" +
        "                    <option>pez</option>\n" +
        "                    <option>tortuga</option>\n" +
        "                    <option>hamster</option>\n" +
        "                    <option>loro</option>\n" +
        "                    <option>iguana</option>\n" +
        "                    <option>araña</option>\n" +
        "                    <option>otro</option>\n" +
        "                </select>\n" +
        "                <div id=\"textotro"+i+"\"></div>\n" +
        "            </div>\n" +
        "            <div class=\"entrada\">\n" +
        "                <div class=\"leyenda\">Edad en años</div>\n" +
        "                <input type=\"text\" id=\"edad-mascota"+i+"\" name=\"edad-mascota"+i+"\" size=\"5\">\n" +
        "            </div>\n" +
        "            <div class=\"entrada\">\n" +
        "                <div class=\"leyenda\">Color de la mascota</div>\n" +
        "                <input type=\"text\" id=\"color-mascota"+i+"\" name=\"color-mascota"+i+"\" size=\"30\">\n" +
        "            </div>\n" +
        "            <div class=\"entrada\">\n" +
        "                <div class=\"leyenda\">Raza</div>\n" +
        "                <input type=\"text\" id=\"raza-mascota"+i+"\" name=\"raza-mascota"+i+"\" size=\"30\">\n" +
        "            </div>\n" +
        "            <div class=\"entrada\">\n" +
        "                <div class=\"leyenda\">Esterilizado</div>\n" +
        "                <select id=\"esterilizado-mascota"+i+"\" name=\"esterilizado-mascota"+i+"\">\n" +
        "                    <option label='Sí'>1</option>\n" +
        "                    <option label='No'>0</option>\n" +
        "                    <option label='No aplica'>-1</option>\n" +
        "                </select>\n" +
        "            </div>\n" +
        "            <div class=\"entrada\">\n" +
        "                <div class=\"leyenda\">Vacunas</div>\n" +
        "                <select id=\"vacunas-mascota"+i+"\" name=\"vacunas-mascota"+i+"\">\n" +
        "                    <option label='Sí'>1</option>\n" +
        "                    <option label='No'>0</option>\n" +
        "                    <option label='No aplica'>-1</option>\n" +
        "                </select>\n" +
        "            </div>\n" +
        "            <div class=\"entrada\" id=\"files"+i+"\">\n" +
        "                <div class=\"leyenda\" >Foto</div>\n" +
        "                <input type=\"file\" id=\"foto-mascota"+i+"_0\" name=\"foto-mascota"+i+"_0\" accept=\"image/*\">\n" +
        "                <button class=\"boton_verde\" id=\"agregar-foto"+i+"\" type=\"button\" onclick=\"agregar("+i+")\">Agregar foto</button>\n" +
        "            </div>\n";
}

function validar(){
    /*verificar region*/
    var region=document.getElementById("region");
    var region_correcta=(region.options[region.selectedIndex].text!="");
    /*verificar comuna*/
    var comuna=document.getElementById("comuna");
    var comuna_correcta=(comuna.options[comuna.selectedIndex].text!=="");
    /*verificar nombre-calle*/
    var nombre_calle=document.getElementById("calle").value;
    var nombre_calle_correcto=(nombre_calle.length>0 && nombre_calle.length <=250);
    /*verificar numero*/
    var numero=document.getElementById("numero").value;
    var numero_correcto=(numero.length>0 && numero.length<=20);
    /*verificar sector*/
    var sector=document.getElementById("sector").value;
    var sector_correcto=(sector.length<=100);
    /*verificar nombre*/
    var nombre=document.getElementById("nombre").value;
    var nombre_correcto=(nombre.length>0 && nombre.length<=200);
    /*verificar email*/
    var email=document.getElementById("email")
    var textemail=email.value;
    const regex=/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    var span=document.getElementById("validated");
    if(regex.test(textemail)){
        span.innerHTML="email válido";
    }
    else{
        span.innerHTML="email no válido";
    }
    var email_correcto=regex.test(textemail);
    /* verificar celular*/
    var celular=document.getElementById("celular");
    var vph=document.getElementById("validatedph")
    const regexphone=/^\+?([5-5][6-6][9-9])\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
    if(celular.value.match(regexphone)){
        vph.innerHTML="número válido";
    }
    else{
        vph.innerHTML="número inválido, ingreselo nuevamente"
    }
    var celular_correcto= celular.value.length==0 || celular.value.match(regexphone);
    /*VALIDAR INFORMAR MASCOTAS*/
    /*INICIAL 0*/
    /*verificar tipo-mascota*/
    var tipo_mascota=document.getElementById("tipo-mascota");
    var tipo_mascota_correcto=(tipo_mascota.options[tipo_mascota.selectedIndex].text!="");
    /*validar edad-mascota*/
    var edad=document.getElementById("edad-mascota").value;
    if(edad.value>=0){
    }
    else{}
    var edad_correcta=(edad>=0 && edad.length>0);
    /*verificar color-mascota*/
    var color_mascota=document.getElementById("color-mascota").value;
    var color_mascota_correcto=(color_mascota.length>0 && color_mascota.length<=30);
    /*verificar raza-mascota*/
    var raza_mascota=document.getElementById("raza-mascota").value;
    var raza_mascota_correcto=(raza_mascota.length>0 && raza_mascota.length<=30);
    /*validar esterilizado-mascota*/
    var esterilizado_mascota=document.getElementById("esterilizado-mascota");
    var esterilizado_mascota_correcto=(esterilizado_mascota.options[esterilizado_mascota.selectedIndex].text!="");
    /*validar vacunas-mascota*/
    var vacunas=document.getElementById("vacunas-mascota");
    var vacunas_correcto=(vacunas.options[vacunas.selectedIndex].text!="");
    /*validar foto mascota*/
    var foto=document.getElementById("foto-mascota").value;
    var foto_correcto=(foto!='');
    var informar_mascota=[];
    informar_mascota.push(tipo_mascota_correcto && edad_correcta && color_mascota_correcto && raza_mascota_correcto && esterilizado_mascota_correcto && vacunas_correcto && foto_correcto);
    for(let i=1; i<=nuevas_mascotas; i++){
        /*INICIAL i*/
        /*verificar tipo-mascota*/
        tipo_mascota=document.getElementById("tipo-mascota"+i);
        tipo_mascota_correcto=(tipo_mascota.options[tipo_mascota.selectedIndex].text!="");
        /*validar edad-mascota*/
        edad=document.getElementById("edad-mascota"+i).value;
        edad_correcta=(edad>=0 && edad.length>0);
        /*verificar color-mascota*/
        color_mascota=document.getElementById("color-mascota"+i).value;
        color_mascota_correcto=(color_mascota.length>0 && color_mascota.length<=30);
        /*verificar raza-mascota*/
        raza_mascota=document.getElementById("raza-mascota"+i).value;
        raza_mascota_correcto=(raza_mascota.length>0 && raza_mascota.length<=30);
        /*validar esterilizado-mascota*/
        esterilizado_mascota=document.getElementById("esterilizado-mascota"+i);
        esterilizado_mascota_correcto=(esterilizado_mascota.options[esterilizado_mascota.selectedIndex].text!="");
        /*validar vacunas-mascota*/
        vacunas=document.getElementById("vacunas-mascota"+i);
        vacunas_correcto=(vacunas.options[vacunas.selectedIndex].text!="");
        /*validar foto mascota*/
        foto=document.getElementById("foto-mascota"+i).value;
        foto_correcto=(foto!='');
        informar_mascota.push(tipo_mascota_correcto && edad_correcta && color_mascota_correcto && raza_mascota_correcto && esterilizado_mascota_correcto && vacunas_correcto && foto_correcto);
    }
    /*informar validado?*/
    var inf=true;
    for(let i=0; i<informar_mascota.length;i++){
        inf=inf && informar_mascota[i];
    }
    var validated3=raza_mascota_correcto && esterilizado_mascota_correcto && vacunas_correcto && foto_correcto;
    var validated2=nombre_calle_correcto && numero_correcto && sector_correcto && nombre_correcto && tipo_mascota_correcto;
    var validated1=region_correcta && comuna_correcta && email_correcto && celular_correcto && edad_correcta;
    if(validated1 && validated2 && validated3 && inf){
        let mensj=document.getElementById("mensaje_confirmacion");
        mensj.style.display="block";
    }
    else{
        let hay_errores=document.getElementById("hay_errores");
        hay_errores.style.display="block";
    }
    return validated1 && validated2 && validated3 && inf;
    /* tipo-mascota, edad-mascota,color-mascota, raza-mascota, */
    /*esterilizado-mascota, vacunas-mascota,foto-mascota*/
}
