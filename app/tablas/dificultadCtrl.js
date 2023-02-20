'use strict';

//controlador principal de toda la aplicacion
miApp.controller('dificultadCtrl', ['$scope','$mdDialog','$mdToast','$location','recursoCrud','upload',function($scope,$mdDialog,$mdToast,$location,recursoCrud,upload) {

	$scope.dificultad = {};
	$scope.dificultadSel = {};

	$scope.listRegisters = [];

	$scope.prepareNew = function(ev){
		$mdDialog.show({
			controller: DialogDificultad,
			templateUrl: 'tablas/dialogDificultad.html',
			parent: angular.element(document.body),
			targetEvent: ev,
			clickOutsideToClose:true,
			locals: {title:'Nueva Dificultad', data: {}}
		})
		.then(function(res) {
			//guardadno lo cambios hechos
			$scope.dificultad = res;
			$scope.newRegister();

		}, function() {
			//cancelando la funcion
		});
	};
	$scope.prepareUpdate = function(ev,r){
		$scope.dificultadSel = r;
		$mdDialog.show({
			controller: DialogDificultad,
			templateUrl: 'tablas/dialogDificultad.html',
			parent: angular.element(document.body),
			targetEvent: ev,
			clickOutsideToClose:true,
			locals: {title:'Editar Dificultad', data: r}
		})
		.then(function(res) {
			//guardadno lo cambios hechos

			$scope.updateRegister(res);

		}, function() {
			//cancelando la funcion
		});
	};


	$scope.newRegister = function (){
		recursoCrud.insertar("DificultadService.php", $scope.dificultad ).then(

			function(data) {
				console.log('1')
				$mdToast.show($mdToast.simple().textContent(data.mensaje).position('top right').hideDelay(2000));
				if(data.estado){
					$scope.dificultad.IdDif = data.ID;
					$scope.listRegisters.push($scope.dificultad);
					$scope.dificultad = {};
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
		recursoCrud.listar("DificultadService.php", {} ).then(
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

		var register = {DesDif:r.DesDif};
		var IdDif = {IdDif:r.IdDif};
		recursoCrud.actualizar("DificultadService.php", {dato:register,IdDif:IdDif} ).then(

			function(data) {

				$mdToast.show($mdToast.simple().textContent(data.mensaje).position('top right').hideDelay(2000));
				if(data.estado){
					recursoCrud.copiar($scope.dificultadSel,register);
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
		var IdDif = {IdDif:r.IdDif};

		recursoCrud.eliminar("DificultadService.php", IdDif ).then(
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

function DialogDificultad($scope, $mdDialog,title,data) {
	$scope.title = title;
  $scope.dificultadSel = JSON.parse(JSON.stringify(data));
  $scope.cancel = function() {
        $mdDialog.cancel();
  	};
  $scope.save = function() {
		$mdDialog.hide($scope.dificultadSel);
		console.log('funciona el save')
  	};
	};
