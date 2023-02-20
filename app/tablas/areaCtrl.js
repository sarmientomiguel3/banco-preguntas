'use strict';

//controlador principal de toda la aplicacion
miApp.controller('areaCtrl', ['$scope','$mdDialog','$mdToast','$location','recursoCrud','upload',function($scope,$mdDialog,$mdToast,$location,recursoCrud,upload) {

	$scope.area = {};
	$scope.areaSel = {};

	$scope.listRegisters = [];

	$scope.prepareNew = function(ev){
		$mdDialog.show({
			controller: DialogArea,
			templateUrl: 'tablas/dialogArea.html',
			parent: angular.element(document.body),
			targetEvent: ev,
			clickOutsideToClose:true,
			locals: {title:'Nueva area', data: {}}
		})
		.then(function(res) {
			//guardadno lo cambios hechos
			$scope.area = res;
			$scope.newRegister();

		}, function() {
			//cancelando la funcion
		});
	};
	$scope.prepareUpdate = function(ev,r){
		$scope.areaSel = r;
		$mdDialog.show({
			controller: DialogArea,
			templateUrl: 'tablas/dialogArea.html',
			parent: angular.element(document.body),
			targetEvent: ev,
			clickOutsideToClose:true,
			locals: {title:'Editar Area', data: r}
		})
		.then(function(res) {
			//guardadno lo cambios hechos

			$scope.updateRegister(res);

		}, function() {
			//cancelando la funcion
		});
	};


	$scope.newRegister = function (){
		recursoCrud.insertar("AreaService.php", $scope.area).then(
			function(data) {
				//console.log('entro aca 222');
				console.log('entro 1')
				$mdToast.show($mdToast.simple().textContent(data.mensaje).position('top right').hideDelay(2000));
				if(data.estado){
					console.log('entro 2')
					$scope.area.IdAreSug = data.ID;
					$scope.area.EstReg = 'A';
					$scope.listRegisters.push($scope.area);
					$scope.area = {};
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
		recursoCrud.listar("AreaService.php", {} ).then(
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

		var register = {DesAreSug:r.DesAreSug};
		var IdAreSug = {IdAreSug:r.IdAreSug};
		recursoCrud.actualizar("AreaService.php", {dato:register,IdAreSug:IdAreSug} ).then(

			function(data) {

				$mdToast.show($mdToast.simple().textContent(data.mensaje).position('top right').hideDelay(2000));
				if(data.estado){
					recursoCrud.copiar($scope.areaSel,register);
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
		var IdAreSug = {IdAreSug:r.IdAreSug};

		recursoCrud.eliminar("AreaService.php", IdAreSug ).then(
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

function DialogArea($scope, $mdDialog,title,data) {
	$scope.title = title;
  $scope.areaSel = JSON.parse(JSON.stringify(data));
  $scope.cancel = function() {
        $mdDialog.cancel();
  	};
  $scope.save = function() {
		$mdDialog.hide($scope.areaSel);
		console.log('funciona el save')
  	};
	};
