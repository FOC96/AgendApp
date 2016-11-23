/* Del inicio de sesión al registro */
function irARegistro(){
    document.getElementById('inicio').style.transition="1s all";
    document.getElementById('inicio').classList.remove('medio');
    document.getElementById('inicio').classList.add('arriba');
    
    document.getElementById('registro').style.transition="1s all";
    document.getElementById('registro').classList.remove('abajo');
    document.getElementById('registro').classList.add('medio');
}

/* Del registro al inicio de sesión */
function volverIniciarSesion(){
    document.getElementById('inicio').style.transition="1s all";
    document.getElementById('inicio').classList.remove('arriba');
    document.getElementById('inicio').classList.add('medio');
    
    document.getElementById('registro').style.transition="1s all";
    document.getElementById('registro').classList.remove('medio');
    document.getElementById('registro').classList.add('abajo');
}

function registrar(){
            if (document.getElementById('nombreReg').value != "" && document.getElementById('correoReg').value != ""
                                                    && document.getElementById('contraReg').value != "") {
                    user = document.getElementById('nombreReg').value;
                    email = document.getElementById('correoReg').value;
                    password = document.getElementById('contraReg').value;
            
                    if(!localStorage.getItem('contador')){
                        localStorage.setItem('contador',0);
                    }
                    //OBTENER EL CONTADOR
                    contador = localStorage.getItem('contador');
                    console.log(contador)

                    //GUARDAR LOS DATOS EN UNA VARIABLE CON EL CONTADOR
                    localStorage.setItem('user'+contador,user);
                    localStorage.setItem('email'+contador,email);
                    localStorage.setItem('password'+contador,password);
                    //INCREMENTAR EL CONTADOR
                    contador++
                    localStorage.setItem('contador',contador);
                    alert('Registro exitoso')
                    // window.location.assign('login.html')
                    volverIniciarSesion()
                }else{
                    mistakesIn('nombreReg');
                    setTimeout(getNormalAgain, 500, 'nombreReg');
                    mistakesIn('correoReg');
                    setTimeout(getNormalAgain, 500, 'correoReg');
                    mistakesIn('contraReg');
                    setTimeout(getNormalAgain, 500, 'contraReg');
                }
}

function login(){

    if (document.getElementById('user').value == "" && document.getElementById('password').value == "") {
        mistakesIn('user');
        setTimeout(getNormalAgain, 500, 'user');
        mistakesIn('password');
        setTimeout(getNormalAgain, 500, 'password');
    }

    contador = localStorage.getItem('contador');
    user = document.getElementById('user').value;
    password = document.getElementById('password').value;

    for (var i = 0; i  <= contador; i++) {
        if (!localStorage.getItem('user')){
            if(localStorage.getItem('password'+i) == password && user == localStorage.getItem('user'+i)){
                window.location.assign('infoTarea.html');
            }else{
                mistakesIn('password');
                setTimeout(getNormalAgain, 500, 'password');
            }
        }
    }
}


/* Hay errores en los campos (recibe parámetros[id]) */
function mistakesIn(x){
    document.getElementById(x).style.color="var(--specialColor)";
    document.getElementById(x).style.transition=".1s all";
    document.getElementById(x).classList.add('animated');
    document.getElementById(x).classList.add('shake');
    document.getElementById(x).style.borderBottomColor="var(--specialColor)";
}

/* Vuelve a la normalidad (recibe parámetros[id]) */
function getNormalAgain(x){
    document.getElementById(x).style.color="white";
    document.getElementById(x).style.transition=".1s all";
    document.getElementById(x).classList.remove('animated');
    document.getElementById(x).classList.remove('shake'); 
    document.getElementById(x).style.borderBottomColor="white";
}







