'use strict';

/**
 * @name aplicacionn IAMD
 * @autor	virex technology
 */
//Creando mi aplicacion
var miApp = angular.module('myWebSite', [
		//'ngMaterial'	//cargando nmaterial
	]);

	  
//metodo run
miApp.run(['$rootScope','servicioLogin',function($rootScope, servicioLogin) {
	
	//FALTA
	$rootScope.OrgID = 1;
	$rootScope.WebSitID = 1;
	
	$rootScope.web = {};
	
	$rootScope.start = function() {
		
		var URLsearch = window.location.hash;		
		var hash = URLsearch.substr(0, 1);
		if(hash!='#'){
			alert('sin datos');
			return;
		}
		
		$rootScope.WebSitID = URLsearch.substr(1);
		
		servicioLogin.buscarUsuario($rootScope.OrgID, $rootScope.WebSitID,function(dato) {
			
			if(dato.web[0]){
				$rootScope.web = dato.web[0];
				$rootScope.web.sections = dato.sections;
				//console.log($rootScope.web.sections);
			}
		});
   };
   $rootScope.start();
	
}]);

miApp.factory('servicioLogin', ['$http', function($http){
    return{
		 
        buscarUsuario: function(org,web,funcionExito){
            $http({
                method: 'GET',
                url: "../servidor/MyWebSiteService.php",
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				params: {accion:0,org:org,web:web},
            }).success( funcionExito ).error( function(){});
        },
        mensaje: function(mensaje){
            //$mdToast.show($mdToast.simple().textContent(mensaje).position('top right').hideDelay(2000));
            
        }
    };
}]);