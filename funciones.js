/* Cambia el color de la Status Bar */
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
console.log(StatusBar);
StatusBar.styleLightContent
}


/* Cambia el color del switch cuando se activa */
function btnColor(id) {
    if(document.getElementById(id).value == 0){
        document.getElementById(id).style.background = "#FeFeFe";
        document.getElementById(id).style.borderColor = "#E5E5E5";
        document.getElementById('fichaMapa').style.display="none";
        
    } else {
        document.getElementById(id).style.background = "var(--color1)";
        document.getElementById(id).style.borderColor = "var(--color1)";
        document.getElementById('fichaMapa').style.display="block";
        localizar();
    }
}

function createNew() {
    window.location.assign('infoTarea.html');
    document.getElementById('tituloVentana').value = "Nueva Tarea";
}

function goBack() {
    window.location.assign('index.html');
}

//Guardar la tarea en el localStorage
function save(){
    titulo = document.getElementById('tituloTarea').value;
    descripcion = document.getElementById('descripcionTarea').value;
    fecha = document.getElementById('inputFecha').value;
    importancia = document.getElementById('selectImportant').value;

    if(!localStorage.getItem('contador')){
        contador = 0;
        localStorage.setItem('contador', contador);
    }

    if(titulo != "" && descripcion != "" && fecha != ""){
        contador = localStorage.getItem('contador');
        localStorage.setItem('titulo'+contador, titulo);
        localStorage.setItem('descripcion'+contador, descripcion);
        localStorage.setItem('fecha'+contador, fecha);
        localStorage.setItem('importancia'+contador, importancia);
        
        if(document.getElementById('switchUbicacion').value == 1){
            localStorage.setItem('lati'+contador, pinLati);
            localStorage.setItem('long'+contador, pinLongi);
        }

        alert('Tarea guardada con éxito');
        localStorage.setItem('contador', ++contador);
        window.location.assign('index.html');
    }
    else{
        alert('Los campos deben de estar completos');
    }
}

//Cargar la vista previa de la tarea en el index
function cargarTareaMini(){
    for(i = 0; i< localStorage.getItem('contador'); i++){
        
        titulo = localStorage.getItem('titulo'+i);
        descripcion = localStorage.getItem('descripcion'+i);

        tarea =  "<div onclick="+'"editar('+i+')"'+" class="+'"tarea-mini"'+"><div class="+'"borrar"'+"><button onclick="+'"eliminar('+i+')"'+"></button></div>";
        tarea += "<input class="+'"titulo"'+" id="+'"titulo'+i+'"'+" type="+'"text"'+" value='"+titulo+"' disabled>";
        tarea += "<input"+" class="+'"descripcion"'+" id="+'"descripcion'+i+'"'+" type="+'"text"'+"value='"+descripcion+"' disabled>";
        tarea += "</div><div class="+'"eliminarBack"'+"><img src="+'"media/trash.svg"'+"><br>Eliminar</div>"
        if(titulo != null){
            document.getElementById('tareaDiv').innerHTML += tarea;
        }
    }
}

//Cargar la página de edición de la tarea con las variables en la liga
function editar(num){

    titulo = document.getElementById('titulo'+num).value;
    descripcion = document.getElementById('descripcion'+num).value;

    for(i =0; i< localStorage.getItem('contador'); i++){
        if(localStorage.getItem('descripcion'+i) == descripcion && localStorage.getItem('titulo'+i) == titulo){
                window.location.assign('verTarea.html?titulo='+titulo+'&descripcion='+descripcion);
        }
    }
}

//Cargar la tarea correspondiente en la pantalla de edición
function loadHomework() {

    //Sacar variables
    var paramstr = window.location.search.substr(1);
    //Dividirlas en caso de ser más de 1
    var paramarr = paramstr.split ("&");
    //Declarrar el arreglo que almacenerá las variables
    var params = {};

    //Separamos el nombre de las variables de su valor.
    for ( var i = 0; i < paramarr.length; i++) {
        var tmparr = paramarr[i].split("=");
        //Asignamos el valor a nuestra varible
        params[tmparr[0]] = tmparr[1];
    }

    var tituloOriginal = params['titulo'].split("%20");
    var titulo = "";

    var descripcionOriginal = params['descripcion'].split("%20");
    var descripcion = "";

    for(j = 0; j < tituloOriginal.length; j++){
        titulo += tituloOriginal[j];
        if(j+1 < tituloOriginal.length){
            titulo += " ";
        }
    }

    for(j = 0; j < descripcionOriginal.length; j++){
        descripcion += descripcionOriginal[j];
        if(j+1 < descripcionOriginal.length){
            descripcion += " ";
        }
    }

    for(i = 0; i < localStorage.getItem('contador'); i++){
        if(localStorage.getItem('titulo'+i) == titulo && descripcion == localStorage.getItem('descripcion'+i)){
            document.getElementById('tituloTarea').value = localStorage.getItem('titulo'+i);
            document.getElementById('descripcionTarea').value =localStorage.getItem('descripcion'+i);
            document.getElementById('inputFecha').value = localStorage.getItem('fecha'+i);
            document.getElementById('selectImportant').value = localStorage.getItem('importancia'+i);
            
            if(localStorage.getItem('lati'+i)){
                alert('si hay');
                document.getElementById('fichaMapa').style.display="block";
                document.getElementById('switchUbicacion').style.background = "var(--color1)";
                document.getElementById('switchUbicacion').style.borderColor = "var(--color1)";
                document.getElementById('switchUbicacion').value=1;
                showMap(parseFloat(localStorage.getItem('lati'+i)), parseFloat(localStorage.getItem('long'+i)));
            }
        }
    }

    
     for(i = 0; i<localStorage.getItem('contador'); i++){
            if(titulo == localStorage.getItem('titulo'+i) && descripcion == localStorage.getItem('descripcion'+i)){
                break;
            }
    }

    for(j = 0; j< localStorage.getItem('contadorImg'+i); j++){
         srcData = localStorage.getItem('img'+i+'.'+j);
         //Nueva linea
         if(srcData != null){
             var newImage = document.createElement('img');
             newImage.src = srcData;
             newImage.setAttribute('id','img'+i+'.'+j);
             newImage.setAttribute('onclick', 'ampliarImg('+i+', '+j+')');
             document.getElementById("galeria").innerHTML += newImage.outerHTML;
         }
    }
}

//Convertir la imagen a base64 y guardarla en el localStorage
function encodeImageFileAsURL() {

    var filesSelected = document.getElementById('inputImg').files;
    if (filesSelected.length > 0) {
      var fileToLoad = filesSelected[0];

      var fileReader = new FileReader();

      fileReader.onload = function(fileLoadedEvent) {
        var srcData = fileLoadedEvent.target.result; // <--- data: base64

        titulo = document.getElementById('tituloTarea').value;
        descripcion = document.getElementById('descripcionTarea').value;

        for(i = 0; i<localStorage.getItem('contador'); i++){
            if(titulo == localStorage.getItem('titulo'+i) && descripcion == localStorage.getItem('descripcion'+i)){
                break;
            }
        }
        if(!localStorage.getItem('contadorImg'+i)){
            localStorage.setItem('contadorImg'+i, 0);
        }
        contadorImg = localStorage.getItem('contadorImg'+i);

        localStorage.setItem('img'+i+'.'+contadorImg, srcData);
        contadorImg++;
        localStorage.setItem('contadorImg'+i, contadorImg);

        var newImage = document.createElement('img');
        
        newImage.setAttribute('id','img'+i+'.'+contadorImg);
        newImage.setAttribute('onclick', 'ampliarImg('+i+', '+contadorImg+')');
        
        newImage.src = srcData;
        document.getElementById("galeria").innerHTML += newImage.outerHTML;
      }
      fileReader.readAsDataURL(fileToLoad);
    }
    location.reload(true);
  }

//Eliminar la nota y recorrer los elementos del localStorage
function eliminar(){
    titulo = document.getElementById('tituloTarea').value;
    descripcion = document.getElementById('descripcionTarea').value;
    contador = localStorage.getItem('contador');
    
    for(i = 0; i<contador; i++){
        if(titulo == localStorage.getItem('titulo'+i) && descripcion == localStorage.getItem('descripcion'+i)){
            break;
        }
    }
    localStorage.removeItem('titulo'+i);
    localStorage.removeItem('descripcion'+i);
    localStorage.removeItem('fecha'+i);
    localStorage.removeItem('importancia'+i);

    for(j = 0; j<localStorage.getItem('contadorImg'+i); j++){
    	localStorage.removeItem('img'+i+'.'+j);
    }

    localStorage.removeItem('contadorImg'+i);
    window.location.assign('index.html');
  }

function eliminar(i){
    titulo = document.getElementById('titulo'+i).value;
    descripcion = document.getElementById('descripcion'+i).value;
    contador = localStorage.getItem('contador');
    
    localStorage.removeItem('titulo'+i);
    localStorage.removeItem('descripcion'+i);
    localStorage.removeItem('fecha'+i);
    localStorage.removeItem('importancia'+i);

    for(j = 0; j<localStorage.getItem('contadorImg'+i); j++){
    	localStorage.removeItem('img'+i+'.'+j);
    }

    localStorage.removeItem('contadorImg'+i);
    window.location.assign('index.html');
  }

/*NUEVAS FUNCIONES*/
function ampliarImg(i, contadorImg){

    src = localStorage.getItem('img'+i+'.'+contadorImg); 

    document.getElementById('vista2').classList.add('margin');
    document.getElementById('elementoBorrar').setAttribute('onclick', 'borrar('+i+', '+contadorImg+')');
    hola = document.getElementById('imgMostrar');

    hola.src = src; 
}

function cerrar(){
    document.getElementById('vista2').classList.remove('margin');
}

function borrar(i, contadorImg){
    localStorage.removeItem('img'+i+'.'+contadorImg);
    location.reload(true);
}


function localizar(){
    navigator.geolocation.getCurrentPosition(ubicacion);
}


function ubicacion(datos){
    longitud = datos.coords.longitude;
    latitud = datos.coords.latitude;
    initMap();
}

function initMap() {
  map = new google.maps.Map(document.getElementById('fichaMapa'), {
    center: {lat: latitud, lng: longitud},
    zoom: 18,
    disableDefaultUI: false
  });

    
  var marker = new google.maps.Marker({
    position: {lat: latitud, lng: longitud},
    map: map,
    draggable: true,
//    icon: 'geoPin1.svg',
    animation: google.maps.Animation.DROP,
  });
    
    google.maps.event.addListener(marker, "position_changed", function() {
      var position = marker.getPosition();
        pinLati = position.lat();
        pinLongi = position.lng();
    });
}


function showMap(latitud1, longitud1) {
    map2 = new google.maps.Map(document.getElementById('fichaMapa'), {
    center: {lat: latitud1, lng: longitud1},
    zoom: 18,
    disableDefaultUI: false
  });
    
    
  var marker = new google.maps.Marker({
    position: {lat: latitud1, lng: longitud1},
    map: map2,
    draggable: false,
//    icon: 'geoPin1.svg',
    animation: google.maps.Animation.DROP,
  });
}