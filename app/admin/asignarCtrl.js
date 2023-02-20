'use strict';

//controlador principal de toda la aplicacion
miApp.controller('asignarCtrl', ['$scope','$mdDialog','$mdToast','recursoCrud','upload',function($scope,$mdDialog,$mdToast,recursoCrud,upload) {

	$scope.pregunta = {	}

	$scope.alternativaSel = {
		descripcionPregunta : "",
		tipoAlternativa : "",
		imagen : {}
	};
	
	//datos generales

	$scope.listarCursos = [];
	$scope.listaTemas = [];
	$scope.listaTemasEspe = [];
	$scope.listaAreasSujeridas	 = [];
	$scope.listarDificultad	 = [];
	$scope.curso=0;


	$scope.listarCursos = function(){

		recursoCrud.listar("CursoService.php", {} ).then(
			function(data) {
				$scope.listaCursos = data.data;
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}
		);
	};
	//console.log(curso);
	$scope.listarRevisor1 = function(IdCurso){
		recursoCrud.listar("RevisorUnoService.php", {accion:1,IdCur:$scope.pregunta.IdCur} ).then(
			function(data) {
				$scope.listaRevisores1 = data.data;
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}
		);
	};
	$scope.listarRevisor2 = function(IdCurso){
		recursoCrud.listar("RevisorUnoService.php", {accion:2,IdCur:$scope.pregunta.IdCur} ).then(
			function(data) {
				$scope.listaRevisores2 = data.data;
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}
		);
	};

	$scope.listaPreguntas = [];

	$scope.changeCurso = function(IdCur){
		recursoCrud.listar("TemaService.php", {accion:2,IdCur} ).then(
			function(data) {
				$scope.listaTemas = data.data;
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}
		);
	};

	$scope.listarPreguntas = function (){
		recursoCrud.listar("PreguntaService.php", {accion:4} ).then(
			function(data) {
				$scope.listaPreguntas = data.data;
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}
		);
	};

	$scope.listarPreguntasCursos = function (){
		recursoCrud.listar("PreguntaUsuarioService.php", {accion:5, IdCur:$scope.pregunta.IdCur}).then(
			function(data) {
				$scope.listaPreguntasCurso = data.data;
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}
		);
	};
	$scope.listarPreguntasCursos2 = function (){
		recursoCrud.listar("PreguntaUsuarioService.php", {accion:6, IdCur:$scope.pregunta.IdCur}).then(
			function(data) {
				$scope.listaPreguntasCurso2 = data.data;
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}
		);
	};
	

	$scope.selected = [];

	$scope.toggle = function (item, list) {
	  var idx = list.indexOf(item);
	  if (idx > -1) {
		list.splice(idx, 1);
	  }
	  else {
		list.push(item);
	  }
	};

	$scope.exists = function (item, list) {
	  return list.indexOf(item) > -1;
	};
	$scope.limpiarSelect = function () {
		$scope.selected = [];
	  };
	  
	
	$scope.asignarPreguntasR1 = function(){
		console.log($scope.selected);
		recursoCrud.actualizar("PreguntaUsuarioService.php", {accion:1,list:$scope.selected,IdRev1:$scope.usuario.revisor1} ).then(
			function(data) {
				$mdToast.show($mdToast.simple().textContent(data.mensaje).position('top right').hideDelay(2000));
				if(data.estado){
					$scope.listarPreguntasCursos();
          }
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}
		);
	};
	$scope.asignarPreguntasR2 = function(){
		console.log($scope.selected);
		recursoCrud.actualizar("PreguntaUsuarioService.php", {accion:2,list:$scope.selected,IdRev2:$scope.usuario.revisor2} ).then(
			function(data) {
				$mdToast.show($mdToast.simple().textContent(data.mensaje).position('top right').hideDelay(2000));
				if(data.estado){
					$scope.listarPreguntasCursos();
          }
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}
		);
	};

	//calendario
	$scope.data = {
		date: new Date()
	  };
	  //$scope.submit = function() {
		//$scope.data.dateString = moment($scope.data.date).format("YYYY-MM-DD");
	  //}


}]);



