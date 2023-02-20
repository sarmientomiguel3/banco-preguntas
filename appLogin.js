'use strict';

/**
 * @name aplicacionn SMTAURED
 * @autor	
 */
//Creando mi aplicacion
//primer modulo que ayudara al registro de los usuarios
var miApp = angular.module('miLogin', [
		'ngMaterial'	//cargando nmaterial
	]);
//metodo run
miApp.run(['$rootScope','servicioLogin',function($rootScope, servicioLogin) {
	localStorage.clear();
	$rootScope.usuIni = {nom:"",pas:""} ;
    $rootScope.loger = false;
	$rootScope.iniciarSession = function() {
        
        $rootScope.loger = true;
		
		if($rootScope.usuIni.nom == null || $rootScope.usuIni.nom == "" ){
			servicioLogin.mensaje('Ingrese nombre de usuario!');
			return;
		}
		if($rootScope.usuIni.pas == null || $rootScope.usuIni.pas == ""){
			servicioLogin.mensaje('Ingrese el password!');
			return;
		}   
		//Se busca los usuarios de acuerdo a su nombre y correo 
		servicioLogin.buscarUsuario($rootScope.usuIni.nom , $rootScope.usuIni.pas, function(dato) {
				//debugger;
				console.log(dato);
				if(dato.conectado){
					localStorage.setItem("usuario", JSON.stringify(dato.usuario));
					localStorage.setItem("menu",JSON.stringify(dato.menus) );
					localStorage.setItem('jwt', dato.jwt);
                    localStorage.setItem('periodo', JSON.stringify(dato.periodo));
					location.replace( dato.url );
				}else{
					servicioLogin.mensaje(dato);
                    $rootScope.loger = false;
				}
			}
		);
   };
	
}]);

//Creamos una factoria propia de Angular JS: que representa un servicio que es creado en la funcion servicioLogin que trata objetos y devueve uno.

miApp.factory('servicioLogin', ['$http','$mdToast', function($http,$mdToast){
    return{ 
        buscarUsuario: function(usuario,password,funcionExito){
            $http({
                method: 'POST',
                url: "servidor/ServicioLogin.php",
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                data: {NomUsu:usuario,Pas:password}
            }).success( funcionExito ).error( function(){});
        },
        mensaje: function(mensaje){
            $mdToast.show($mdToast.simple().textContent(mensaje).position('top right').hideDelay(2000));
            
        }	
    };
}]);