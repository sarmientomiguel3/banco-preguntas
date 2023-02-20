'use strict';

//controlador principal de toda la aplicacion
miApp.controller('cursoCtrl', ['$scope','$mdDialog','$mdToast','$location','recursoCrud','upload',function($scope,$mdDialog,$mdToast,$location,recursoCrud,upload) {

	$scope.curso = {};
	$scope.cursoSel = {};

	$scope.listRegisters = [];

	$scope.prepareNew = function(ev){
		$mdDialog.show({
			controller: DialogCurso,
			templateUrl: 'tablas/dialogCurso.html',
			parent: angular.element(document.body),
			targetEvent: ev,
			clickOutsideToClose:true,
			locals: {title:'Nuevo Curso', data: {}}
		})
		.then(function(res) {
			//guardadno lo cambios hechos
			$scope.curso = res;
			$scope.newRegister();

		}, function() {
			//cancelando la funcion
		});
	};
	$scope.prepareUpdate = function(ev,r){
		$scope.cursoSel = r;
		$mdDialog.show({
			controller: DialogCurso,
			templateUrl: 'tablas/dialogCurso.html',
			parent: angular.element(document.body),
			targetEvent: ev,
			clickOutsideToClose:true,
			locals: {title:'Editar Curso', data: r}
		})
		.then(function(res) {
			//guardadno lo cambios hechos

			$scope.updateRegister(res);

		}, function() {
			//cancelando la funcion
		});
	};


	$scope.newRegister = function (){
		recursoCrud.insertar("CursoService.php", $scope.curso).then(
			function(data) {
				//console.log('entro aca 222');
				console.log('entro 1')
				$mdToast.show($mdToast.simple().textContent(data.mensaje).position('top right').hideDelay(2000));
				if(data.estado){
					console.log('entro 2')
					$scope.curso.IdCur = data.ID;
					$scope.curso.EstReg = 'A';
					$scope.listRegisters.push($scope.curso);
					$scope.curso = {};
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
		recursoCrud.listar("CursoService.php", {} ).then(
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

		var register = {NomCur:r.NomCur};
		var IdCur = {IdCur:r.IdCur};
		recursoCrud.actualizar("CursoService.php", {dato:register,IdCur:IdCur} ).then(

			function(data) {

				$mdToast.show($mdToast.simple().textContent(data.mensaje).position('top right').hideDelay(2000));
				if(data.estado){
					recursoCrud.copiar($scope.cursoSel,register);
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
		var IdCur = {IdCur:r.IdCur};

		recursoCrud.eliminar("CursoService.php", IdCur ).then(
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

function DialogCurso($scope, $mdDialog,title,data) {
	$scope.title = title;
	$scope.cursoSel = JSON.parse(JSON.stringify(data));
	$scope.cancel = function() {
			$mdDialog.cancel();
	};
	$scope.save = function() {
			$mdDialog.hide($scope.cursoSel);
			console.log('funciona el save')
	};
};
