'use strict';

//controlador principal de toda la aplicacion
miApp.controller('libroCtrl', ['$scope','$mdDialog','$mdToast','$location','recursoCrud','upload',function($scope,$mdDialog,$mdToast,$location,recursoCrud,upload) {

	$scope.libro = {};
	$scope.libroSel = {};

	$scope.listRegisters = [];

	$scope.prepareNew = function(ev){
		$mdDialog.show({
			controller: DialogLibro,
			templateUrl: 'tablas/dialogLibro.html',
			parent: angular.element(document.body),
			targetEvent: ev,
			clickOutsideToClose:true,
			locals: {title:'Nuevo Libro', data: {}}
		})
		.then(function(res) {
			//guardadno lo cambios hechos
			$scope.libro = res;
			$scope.newRegister();

		}, function() {
			//cancelando la funcion
		});
	};
	$scope.prepareUpdate = function(ev,r){
		$scope.libroSel = r;
		$mdDialog.show({
			controller: DialogLibro,
			templateUrl: 'tablas/dialogLibro.html',
			parent: angular.element(document.body),
			targetEvent: ev,
			clickOutsideToClose:true,
			locals: {title:'Editar libro', data: r}
		})
		.then(function(res) {
			//guardadno lo cambios hechos

			$scope.updateRegister(res);

		}, function() {
			//cancelando la funcion
		});
	};


	$scope.newRegister = function (){
		recursoCrud.insertar("LibroService.php", $scope.libro).then(
			function(data) {
				//console.log('entro aca 222');
				console.log('entro 1')
				$mdToast.show($mdToast.simple().textContent(data.mensaje).position('top right').hideDelay(2000));
				if(data.estado){
					console.log('entro 2')
					$scope.libro.IDLib = data.ID;
					$scope.listRegisters.push($scope.libro);
					$scope.libro = {};
					console.log('2')

				}
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}
		);
	};
	$scope.list = function (){
		recursoCrud.listar("LibroService.php", {} ).then(
			function(data) {
				$scope.listRegisters = data.data;
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}
		);
	};

	$scope.updateRegister = function (r){

		var register = {NomLib:r.NomLib, AutLib:r.AutLib, EdiLib:r.EdiLib};
		var IDLib = {IDLib:r.IDLib};
		recursoCrud.actualizar("LibroService.php", {dato:register,IDLib:IDLib} ).then(

			function(data) {

				$mdToast.show($mdToast.simple().textContent(data.mensaje).position('top right').hideDelay(2000));
				if(data.estado){
					recursoCrud.copiar($scope.libroSel,register);
					//console.log("entro aca 2")
          }
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}
		);
	};

	$scope.deleteRegister = function (i,r){
		var IDLib = {IDLib:r.IDLib};

		recursoCrud.eliminar("LibroService.php", IDLib ).then(
			function(data) {
				$mdToast.show($mdToast.simple().textContent(data.mensaje).position('top right').hideDelay(2000));
				if(data.estado)
					$scope.listRegisters.splice(i,1);
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}
		);
	};

}]);

function DialogLibro($scope, $mdDialog,title,data) {
	$scope.title = title;
  $scope.libroSel = JSON.parse(JSON.stringify(data));
  $scope.cancel = function() {
        $mdDialog.cancel();
  	};
  $scope.save = function() {
		$mdDialog.hide($scope.libroSel);
		console.log('funciona el save')
  	};
	};
