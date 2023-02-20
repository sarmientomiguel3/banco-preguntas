'use strict';

//controlador principal de toda la aplicacion
miApp.controller('rolCtrl', ['$scope','$mdDialog','$mdToast','recursoCrud',function($scope,$mdDialog,$mdToast,recursoCrud) {
	
	$scope.rol = {Nom:"",Des:"",LisVen:"",EstReg:'A'};	
	$scope.listaRoles = [];
	$scope.rolSel = {};
	
	$scope.ventanas = [];
	$scope.listaVentanas = [];
	$scope.listaVentanasSel = [];
	
	listarVentanas();	
	
	function listarVentanas(){
		recursoCrud.listar("ServicioVentanas.php", {accion:1} ).then(
			function(data) {
				$scope.ventanas = data.data;
				$scope.listaVentanas = loadVentanas($scope.ventanas);
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}, function(data) {
				//alert( data);
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}
		);
	};
	
	$scope.registrarRol = function (){
		
		for (var i in $scope.listaVentanasSel) {
			$scope.rol.LisVen += $scope.listaVentanasSel[i].Nom + ", ";
		}
		recursoCrud.insertar("ServicioRoles.php", {rol:$scope.rol,ventanas:$scope.listaVentanasSel} ).then(
			function(data) {
				$mdToast.show($mdToast.simple().textContent(data.mensaje ).position('top right').hideDelay(2000));
				if(data.estado){
					$scope.rol.RolID = data.ID;
					$scope.listaRoles.push($scope.rol);
					$scope.rol = {Nom:"",Des:"",LisVen:"",EstReg:'A'};
					$scope.listaVentanas = loadVentanas($scope.ventanas);
					$scope.listaVentanasSel = [];
				}
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}, function(data) {
				//alert( data);
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}
		);
	};
	$scope.listarRoles = function (){
		recursoCrud.listar("ServicioRoles.php", {accion:1} ).then(
			function(data) {
				$scope.listaRoles = data.data;
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}, function(data) {
				//alert( data);
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}
		);
	};
	$scope.actualizarRol = function (r,ven){
		
		var rolActualizar = {Nom:r.Nom,Des:r.Des,LisVen:r.LisVen};
		var rolID = {RolID:r.RolID};
		
		recursoCrud.actualizar("ServicioRoles.php", {dato:rolActualizar,ID:rolID,ventanas:ven} ).then(
			function(data) {				
				$mdToast.show($mdToast.simple().textContent(data.mensaje).position('top right').hideDelay(2000));
				if(data.estado)
					recursoCrud.copiar($scope.rolSel,rolActualizar);
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}
		);
	};
	$scope.eliminarRol = function (ev,i,r){
		var rolID = {RolID:r.RolID};
        
        var confirm = $mdDialog.confirm()
			.title('Mensaje de Confirmacion?')
			.textContent('Esta seguro que desea eliminar el rol')
			.ariaLabel('Lucky day')
			.targetEvent(ev)
			.ok('Aceptar')
			.cancel('Cancelar');
			  
		$mdDialog.show(confirm).then(function() {
            
            recursoCrud.eliminar("ServicioRoles.php", rolID ).then(
                function(data) {				
                    $mdToast.show($mdToast.simple().textContent(data.mensaje).position('top right').hideDelay(2000));
                    if(data.estado)
                        $scope.listaRoles.splice(i,1);
                }, function(data) {
                    $mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
                }, function(data) {
                    $mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
                }
            );
        }, function() {	  
		});
	};
	
	$scope.prepararEditar = function(ev,r) {
		
		$scope.rolSel = r;
		
		var misVentanas = [];
		var lasVentanas = loadVentanas($scope.ventanas);
        
        var nomVentanas = r.LisVen.split(", ");
        
        nomVentanas.forEach(function (n) {
            lasVentanas.forEach(function (v) {
                if(v.Nom==n){
                    misVentanas.push(v);                    
                }
            });
        });
		
		$mdDialog.show({
		  controller: DialogController,
		  templateUrl: 'admin/dialogoEditarRol.tmpl.html',
		  parent: angular.element(document.body),
		  targetEvent: ev,
		  clickOutsideToClose:true,
		  locals: { rol: r, ventanas:misVentanas , ventanas2:lasVentanas }
		})
		.then(function(datos) {
			//guardadno lo cambios hechos
			//alert( datos.ven[1]  );
			$scope.actualizarRol(datos.rolEdi,datos.ven);
		}, function() {
			//cancelando la funcion
		});
	};
	
	
	/*para lista de dunciones*/

    $scope.buscarVentanas = function(query) {
      var results = query ? $scope.listaVentanas.filter(createFilterFor(query)) : [];
	  return results;
    };
    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);

      return function filterFn(contact) {
        return (contact._lowername.indexOf(lowercaseQuery) != -1);
      };
    };
    function loadVentanas(datos) {
		
      return datos.map(function (v, index) {
        var ventana = {Nom: v.Nom,imagen: '../resources/img/menu/'+v.Ico,VenID:v.VenID};
        ventana._lowername = ventana.Nom.toLowerCase();
        return ventana;
      });
    };
	
	/*FIN para lista de dunciones*/

}]);

function DialogController($scope, $mdDialog,rol,ventanas,ventanas2) {
	
	//$scope.rolSel = rol;
	$scope.rolSel = JSON.parse(JSON.stringify(rol));
	$scope.listaVentanas2 = ventanas2;
	$scope.listaVentanasSel2 = ventanas;
	
	var ventnasAnt = $scope.rolSel.LisVen;
	
	
	$scope.cancelar = function() {
		$mdDialog.cancel();
	};
	$scope.guardarCambios = function() {
		var misVentanas = [];
		$scope.rolSel.LisVen ="";
		for (var i in $scope.listaVentanasSel2) {
			$scope.rolSel.LisVen += $scope.listaVentanasSel2[i].Nom + ", ";
			misVentanas.push($scope.listaVentanasSel2[i].VenID);
		}
		if($scope.rolSel.LisVen == ventnasAnt)
			misVentanas = [];
		
		$mdDialog.hide({rolEdi:$scope.rolSel,ven:misVentanas});
	};
	
	$scope.buscarVentanas2 = function(query) {
      var results = query ? $scope.listaVentanas2.filter(createFilterFor(query)) : [];
	  return results;
    };
    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);

      return function filterFn(contact) {
        return (contact._lowername.indexOf(lowercaseQuery) != -1);
      };
    };
};
