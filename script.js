function registrar(){
			if (document.getElementById('user').value != "" && document.getElementById('email').value != ""
			 										&& document.getElementById('password').value != "") {
					user = document.getElementById('user').value;
					email = document.getElementById('email').value;
					password = document.getElementById('password').value;
			
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
					window.location.assign('login.html')
				}else{
					alert('Rellena todos los campos!')
				}
}

function login(){

	contador = localStorage.getItem('contador');
	user = document.getElementById('user').value;
	password = document.getElementById('password').value;

	for (var i = 0; i  <= contador; i++) {
		if (!localStorage.getItem('user')){
			if(localStorage.getItem('password'+i) == password && user == localStorage.getItem('user'+i)){
				window.location.assign('infoTarea.html');
			}
		}
	}
}