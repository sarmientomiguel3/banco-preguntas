'use strict';

//controlador principal de toda la aplicacion
miApp.controller('estatusCtrl', ['$scope','$mdDialog','$mdToast','recursoCrud',function($scope,$mdDialog,$mdToast,recursoCrud) {
	
	$scope.statusSel = {};
	$scope.listaStatus = [];
	$scope.listaBonos = [];
	
	$scope.listarStatus = function (){
		recursoCrud.listar("ServicioStatus.php", {accion:1} ).then(
			function(data) {
				$scope.listaStatus = data.data;
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}
		);
	};
	$scope.listarBonos = function (){
		recursoCrud.listar("ServicioStatus.php", {accion:2} ).then(
			function(data) {
				$scope.listaBonos = data.data;
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}
		);
	};
	$scope.actualizarStatus = function (s){
		
		var statusActualizar = {Nom:s.Nom,Des:s.Des,PunVal:s.PunVal};
		var staID = {StaID:s.StaID};
		
		recursoCrud.actualizar("ServicioStatus.php", {dato:statusActualizar,ID:staID} ).then(
			function(data) {				
				$mdToast.show($mdToast.simple().textContent(data.mensaje).position('top right').hideDelay(2000));
				if(data.estado)
					recursoCrud.copiar($scope.statusSel,statusActualizar);
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}
		);
	};
	$scope.prepararEditar = function(ev,s) {
		
		$scope.statusSel = s;		
		
		$mdDialog.show({
		  controller: DialogControllerStatus,
		  templateUrl: 'administracion/usuarios/dialogoStatus.html',
		  parent: angular.element(document.body),
		  targetEvent: ev,
		  clickOutsideToClose:true,
		  locals: { status:s }
		})
		.then(function(datos) {
			//guardadno lo cambios hechos
			//alert( datos.ven[1]  );
			$scope.actualizarStatus(datos);
		}, function() {
			//cancelando la funcion
		});
	};

}]);

function DialogControllerStatus($scope, $mdDialog, status) {
	
  $scope.statusSel = JSON.parse(JSON.stringify(status));
  
  $scope.cancelar = function() {
    $mdDialog.cancel();
  };
  $scope.guardarCambios = function() {
    $mdDialog.hide($scope.statusSel);
  };
};

