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
    }
}