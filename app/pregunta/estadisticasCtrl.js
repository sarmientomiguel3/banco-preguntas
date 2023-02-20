'use strict';

//controlador principal de toda la aplicacion
miApp.controller('estadisticasCtrl', ['$scope','$mdDialog','$mdToast','$location','recursoCrud','upload',function($scope,$mdDialog,$mdToast,$location,recursoCrud,upload) {

	$scope.tema = {};


	$scope.buscar = "";
	
	$scope.temaSel = {};
	$scope.listRegisters = [];

	$scope.listarEstadisticas = [];

	$scope.listarEstadisticas = function (){
		recursoCrud.listar("EstadisticaService.php", {accion:5} ).then(
			function(data) {
				$scope.listaEstadisticas = data.data;
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}
		);
	};
	$scope.listarEstadisticasAceptadas = [];

	$scope.listarEstadisticasAceptadas = function (){
		recursoCrud.listar("EstadisticaService.php", {accion:6} ).then(
			function(data) {
				$scope.listaEstadisticasAceptadas = data.data;
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}
		);
	};

	$scope.listarEstadisticasRechazadas = [];

	$scope.listarEstadisticasRechazadas = function (){
		recursoCrud.listar("EstadisticaService.php", {accion:7} ).then(
			function(data) {
				$scope.listaEstadisticasRechazadas = data.data;
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}
		);
	};

	$scope.listarFitro = function (data){
		console.log(data);
		recursoCrud.listar("PreguntaService.php", {} ).then(
			function(data) {
				$scope.listRegisters = data.data;
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}
		);
	};

	$scope.list = function (){
		recursoCrud.listar("EstadisticasService.php", {} ).then(
			function(data) {
				$scope.listRegisters = data.data;
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}
		);
	};

	$scope.prepareNew = function(ev){
		$mdDialog.show({
			controller: DialogTema2,
			templateUrl: 'tablas/dialogTema.html',
			parent: angular.element(document.body),
			targetEvent: ev,
			clickOutsideToClose:true,
			locals: {title:'Nuevo Tema', data: {}, listaCursos: $scope.listaCursos}
		})
		.then(function(res) {
			//guardadno lo cambios hechos
			$scope.tema = res;
			$scope.newRegister();

		}, function() {
			//cancelando la funcion
		});
	};
	$scope.prepareUpdate = function(ev,r){
		$scope.temaSel = r;
		$mdDialog.show({
			controller: DialogTema2,
			templateUrl: 'tablas/dialogTema.html',
			parent: angular.element(document.body),
			targetEvent: ev,
			clickOutsideToClose:true,
			locals: {title:'Editar Tema', data: r, listaCursos: $scope.listaCursos}
		})
		.then(function(res) {
			//guardadno lo cambios hechos

			$scope.updateRegister(res);

		}, function() {
			//cancelando la funcion
		});
	};


	$scope.newRegister = function (){
		recursoCrud.insertar("TemaService.php", $scope.tema).then(
			function(data) {
				//console.log('entro aca 222');
				console.log('entro 1')
				$mdToast.show($mdToast.simple().textContent(data.mensaje).position('top right').hideDelay(2000));
				if(data.estado){
					console.log('entro 2')
					$scope.tema.IdTem = data.ID;
					$scope.tema.EstReg = 'A';
					$scope.listRegisters.push($scope.tema);
					$scope.tema = {};
					console.log('2')

				}
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}
		);
	};
	$scope.listarPregunta = function (){
		recursoCrud.listar("PreguntaService.php", {} ).then(
			function(data) {
				$scope.listarPregunta = data.data;
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}
		);
	};
	$scope.listarFitro = function (data){
		console.log(data);
		recursoCrud.listar("PreguntaService.php", {} ).then(
			function(data) {
				$scope.listarPregunta = data.data;
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}
		);
	};

	$scope.updateRegister = function (r){

		var register = {DesTem:r.DesTem,fkIdCur:r.fkIdCur};
		var IdTem = {IdTem:r.IdTem};
		recursoCrud.actualizar("TemaService.php", {dato:register,IdTem:IdTem} ).then(

			function(data) {

				$mdToast.show($mdToast.simple().textContent(data.mensaje).position('top right').hideDelay(2000));
				if(data.estado){
					recursoCrud.copiar($scope.temaSel,register);
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
		var IdTem = {IdTem:r.IdTem};

		recursoCrud.eliminar("TemaService.php", IdTem ).then(
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
//Controlador
function DialogTema2($scope, $mdDialog,title,data,listaCursos) {
	$scope.title = title;
  	$scope.temaSel = JSON.parse(JSON.stringify(data));
  	$scope.cancel = function() {
        $mdDialog.cancel();
  	};
  	$scope.save = function() {
		$mdDialog.hide($scope.temaSel);
		console.log('funciona el save')
	};
	  
	$scope.listaCursos2 = listaCursos;

};

