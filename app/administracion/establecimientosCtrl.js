'use strict';

//controlador principal de toda la aplicacion
miApp.controller('establecimientosCtrl',['$scope','$mdDialog','$mdToast','recursoCrud', function($scope,$mdDialog,$mdToast,recursoCrud) {
	
	$scope.establecimiento = {Nom:"",Dir:"",EstReg:'A',TipEstID:0};
	$scope.establecimientoSel = {};
	$scope.establecimientos = [];
	$scope.tiposEstablecimientos = [{Nom:"Punto de Venta",TipEstID:1},{Nom:"Almacen",TipEstID:2},{Nom:"CentroProduccion",TipEstID:3}];
	
	$scope.registrarEstablecimiento= function (){
		
		var val = validarDatos($scope.establecimiento);
		if(val !=""){
			$mdToast.show($mdToast.simple().textContent(val).position('top right').hideDelay(2000));
			return;
		}		
		recursoCrud.insertar("ServicioEstablecimiento.php", {accion:1, establecimiento:$scope.establecimiento} ).then(		
		
			function(data) {
				$mdToast.show($mdToast.simple().textContent(data.mensaje).position('top right').hideDelay(2000));
				if(data.estado){
					$scope.establecimiento.EstID = data.ID;
					
					for(var i=0;i<$scope.tiposEstablecimientos.length;i++)
						if($scope.tiposEstablecimientos[i].TipEstID == $scope.establecimiento.TipEstID){
							$scope.establecimiento.tipo =$scope.tiposEstablecimientos[i].Nom;
							break;
						}
					
					$scope.establecimientos.push($scope.establecimiento);
					$scope.establecimiento = {Nom:"",Dir:"",EstReg:'A',TipEstID:0};					
				}
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}
		);
	};
	
	$scope.listarEstablecimientos = function(){
		recursoCrud.listar("ServicioEstablecimiento.php", {accion:1} ).then(
			function(data) {
				$scope.establecimientos = data.data;
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}
		);
	};
	$scope.actualizarEstablecimiento = function (e){
		var establecimientoActualizar = {Nom:e.Nom,Dir:e.Dir,EstReg:e.EstReg,TipEstID:e.TipEstID};
		var establecimientoID = {EstID:e.EstID};
		recursoCrud.actualizar("ServicioEstablecimiento.php", {dato:establecimientoActualizar,ID:establecimientoID} ).then(
			function(data) {				
				$mdToast.show($mdToast.simple().textContent(data.mensaje).position('top right').hideDelay(2000));
				if(data.estado){
					recursoCrud.copiar($scope.establecimientoSel,establecimientoActualizar);
					
					for(var i=0;i<$scope.tiposEstablecimientos.length;i++)
						if($scope.tiposEstablecimientos[i].TipEstID == $scope.establecimientoSel.TipEstID){
							$scope.establecimientoSel.tipo =$scope.tiposEstablecimientos[i].Nom;
							break;
						}
				}
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}
		);
	};
	$scope.desactivarEstablecimiento = function (e){
		var establecimientoActualizar = {EstReg:e.EstReg};
		var establecimientoID = {EstID:e.EstID};
		recursoCrud.actualizar("ServicioEstablecimiento.php", {dato:establecimientoActualizar,ID:establecimientoID} ).then(
			function(data) {				
				$mdToast.show($mdToast.simple().textContent(data.mensaje).position('top right').hideDelay(2000));
				if(data.estado)
					$scope.establecimientoSel.EstReg = establecimientoActualizar.EstReg;
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}
		);
	};
	$scope.eliminarEstablecimiento= function (ev,i,e){
		var establecimientoID = {EstID:e.EstID};
        var confirm = $mdDialog.confirm()
			.title('Mensaje de Confirmacion?')
			.textContent('Esta seguro que desea eliminar el establecimiento')
			.ariaLabel('Lucky day')
			.targetEvent(ev)
			.ok('Aceptar')
			.cancel('Cancelar');
			  
		$mdDialog.show(confirm).then(function() {
            recursoCrud.eliminar("ServicioEstablecimiento.php", establecimientoID ).then(
                function(data) {				
                    $mdToast.show($mdToast.simple().textContent(data.mensaje).position('top right').hideDelay(2000));
                    if(data.estado)
                        $scope.establecimientos.splice(i,1);
                }, function(data) {
                    $mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
                }, function(data) {
                    $mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
                }
            );
        }, function() {	  
		});
	};
	$scope.prepararEditar = function(ev,e) {
		$scope.establecimientoSel = e;
		$mdDialog.show({
		  controller: ['$scope', '$mdDialog','establecimiento','tipos',DialogControllerEstablecimiento],
		  templateUrl: 'administracion/dialogoEstablecimiento.html',
		  parent: angular.element(document.body),
		  targetEvent: ev,
		  clickOutsideToClose:true,
		  locals: { establecimiento: e, tipos:$scope.tiposEstablecimientos}
		})
		.then(function(dato) {
			//guardadno lo cambios hechos
			$scope.actualizarEstablecimiento(dato);			
		}, function() {
			//cancelando la funcion
		});
	};
	
	
	function validarDatos(establecimiento){	
		if(establecimiento.TipEstID <= 0 ){
			return 'Elija el tipo de establecimiento';
		}
		if(establecimiento.Nom == null || establecimiento.Nom == "" ){
			return 'Ingrese nombre del establecimiento';
		}
		if(establecimiento.Dir == null || establecimiento.Dir == "" ){
			return 'Ingrese la direccion del establecimiento';
		}		
		return "";
	};
}]);

function DialogControllerEstablecimiento($scope, $mdDialog,establecimiento,tipos) {
	
	$scope.establecimientoSel = JSON.parse(JSON.stringify(establecimiento));
	$scope.tiposEstablecimientos = JSON.parse(JSON.stringify(tipos));

	$scope.cancelar = function() {
		$mdDialog.cancel();
	};
	$scope.guardarCambios = function() {
		$mdDialog.hide($scope.establecimientoSel);
	};
};
