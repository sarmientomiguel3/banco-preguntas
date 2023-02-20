'use strict';

//controlador principal de toda la aplicacion
miApp.controller('revisordosCtrl', ['$scope','$mdDialog','$mdToast','recursoCrud','upload','$window',function($scope,$mdDialog,$mdToast,recursoCrud,upload,$window) {



	$scope.listaCursos = [];
	$scope.listaAreasSujeridas = [];
	$scope.listaDificultad = [];
	$scope.listaTemas = [];
	$scope.listaTemasEspe = [];
	
	$scope.listaPreguntas = [];
	



	$scope.listarPregunta = function(){
		recursoCrud.listar("RevisordosService.php", {accion:1} ).then(
			function(data) {
				$scope.listaPreguntas = data.data;
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}
		);
	}


	$scope.prepararUbicar = function(ev,p) {



		$mdDialog.show({
		  controller: DialogController2,
		  templateUrl: 'revisordos/viewPregunta.html',
		  parent: angular.element(document.body),
		  targetEvent: ev,
		  clickOutsideToClose:true,
		  locals: { preguntaID:p.IdPre,'$mdToast':$mdToast,recursoCrud }
		})
		.then(function(ventanaEditado) {
			//guardadno lo cambios hechos
			$scope.actualizarVentana(ventanaEditado);

		}, function() {
			//cancelando la funcion
		});
	};

	$scope.prepararEditar = function(ev,p) {

		$window.location.href = '#/pregunta/'+p.IdPre;

	}

	// //calendario
	// $scope.data = {
	// 	date: new Date()
	//   };

	//   //$scope.submit = function() {
	// 	//$scope.data.dateString = moment($scope.data.date).format("YYYY-MM-DD");
	//   //}
	  
	//Boton Aceptar
	$scope.Aceptar = function(ev,r){
		$scope.revisor1Sel = r;
		$mdDialog.show({
			controller: DialogRevisor1Aceptar,
			templateUrl: 'revisoruno/dialogoRevisor1Aceptar.html',
			parent: angular.element(document.body),
			targetEvent: ev,
			clickOutsideToClose:true,
			locals: {title:'Aceptar Pregunta', data: r}
		})
		.then(function(res) {
			//guardadno lo cambios hechos

			$scope.updateRegisterAceptar(res);

		}, function() {
			//cancelando la funcion
		});
	};
	$scope.updateRegisterAceptar = function (r){

		var register = {Obs:r.Obs,EstRev2:'Aceptada'};
		
		var IdPreUsu = {IdPreUsu:r.IdPreUsu};
		recursoCrud.actualizar("RevisordosService.php", {dato:register,IdPreUsu:IdPreUsu} ).then(

			function(data) {

				$mdToast.show($mdToast.simple().textContent(data.mensaje).position('top right').hideDelay(2000));
				if(data.estado){
					recursoCrud.copiar($scope.revisor1Sel,register);
					//console.log("entro aca 2")
          }
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}
		);
	};
	//Boton Rechazar

	$scope.Rechazar = function(ev,r){
		$scope.revisor1Sel = r;
		$mdDialog.show({
			controller: DialogRevisor1Rechazar,
			templateUrl: 'revisoruno/dialogoRevisor1Rechazar.html',
			parent: angular.element(document.body),
			targetEvent: ev,
			clickOutsideToClose:true,
			locals: {title:'Rechazar Pregunta', data: r}
		})
		.then(function(res) {
			//guardadno lo cambios hechos

			$scope.updateRegister1(res);

		}, function() {
			//cancelando la funcion
		});
	};

	$scope.updateRegister1 = function (r){

		var register = {Obs:r.Obs};
		var register2 = {EstRev1:r.EstRev1};
		var IdPreUsu = {IdPreUsu:r.IdPreUsu};
		recursoCrud.actualizar("RevisorService.php", {dato:register,IdPreUsu:IdPreUsu} ).then(

			function(data) {

				$mdToast.show($mdToast.simple().textContent(data.mensaje).position('top right').hideDelay(2000));
				if(data.estado){
					recursoCrud.copiar($scope.revisor1Sel,register);
					//console.log("entro aca 2")
          }
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}
		);
	};

}]);

function DialogController2($scope, $mdDialog, preguntaID,$mdToast,recursoCrud) {
	$scope.pregunta = {}
	$scope.preguntaImagen = null
	$scope.justificacion = {}
	$scope.justificacionImagen = null
	var sizeArregloAlternativas = 5;
	$scope.alternativas = new Array(sizeArregloAlternativas);
	$scope.alternativasImagenes = new Array(sizeArregloAlternativas);


	$scope.iniciarLimpiarData = function(){
		$scope.pregunta = {
			TxtPre : "",
			ImgPre : null,
			DesTem : null,
			DesTemEsp : null,
			NomCur : null,
			DesAreSug : null,
			DesDif : null,
			fkIdJus: null
		}
		$scope.justificacion = {
			DesJus : "",
			ImgJus : ""
		}
		$scope.justificacionImagen = null
		$scope.preguntaImagen = null
		for (let index = 0; index < sizeArregloAlternativas; index++) {
			$scope.alternativas[index] =  {
				DesAlt: "",
				ImgAlt: null,
				fkIdPre: null,
				CorAlt: null
			};
		}
		for (let index = 0; index < sizeArregloAlternativas; index++) {
			$scope.alternativasImagenes[index] = {};
		}
		if(document.getElementById('mostrarImagenPregunta')) reiniciarImg('mostrarImagenPregunta');
		if(document.getElementById('mostrarImagenJustificacion')) reiniciarImg('mostrarImagenJustificacion');
	}
	
    

	$scope.iniciarLimpiarData();



	recursoCrud.listar("PreguntaService.php", {accion:7,ID:preguntaID} ).then(
		function(data) {
			var objPregunta = data.data[0];

			$scope.pregunta = {
				IdPre : objPregunta.IdPre,
				TxtPre : objPregunta.TxtPre,
				imagen : {},
				ImgPre : objPregunta.ImgPre,
				DesTem : objPregunta.DesTem,
				DesTemEsp : objPregunta.DesTemEsp,
				NomCur : objPregunta.NomCur,
				DesAreSug : objPregunta.DesAreSug,
				DesDif : objPregunta.DesDif,
				fkIdJus : objPregunta.fkIdJus
			}
			recursoCrud.listar("JustificacionService.php", {accion:2,ID:$scope.pregunta.fkIdJus}).then(
				function(data) {
					var objJus = data.data[0];
					$scope.justificacion = {
						IdJus : objJus.IdJus,
						DesJus : objJus.DesJus,
						ImgJus : objJus.ImgJus
					}
				}
			);
			recursoCrud.listar("AlternativaService.php",{accion:2,ID:$scope.pregunta.IdPre}).then(
				function(data){
					if(data.data){
						var arr = data.data;
						var size = arr.length;
						for (let index = 0; index < size; index++) {
							$scope.alternativas[index] =  {
								IdAlt: arr[index].IdAlt,								
								DesAlt: arr[index].DesAlt,
								ImgAlt: arr[index].ImgAlt,
								fkIdPre: arr[index].fkIdPre,
								CorAlt: arr[index].CorAlt
							};
						}
					}
				}
			)

		}, function(data) {
			$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
		}, function(data) {
			$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
		}
	);
		


    $scope.cancelar = function() {
        $mdDialog.cancel();
    };

};



function DialogRevisor1Rechazar($scope, $mdDialog,title,data) {
	$scope.title = title;
  $scope.revisor1Sel = JSON.parse(JSON.stringify(data));
  $scope.cancel = function() {
        $mdDialog.cancel();
  	};
  $scope.save = function() {
		$mdDialog.hide($scope.revisor1Sel);
		console.log('funciona el save')
  	};
	};
function DialogRevisor1Aceptar($scope, $mdDialog,title,data) {
		$scope.title = title;
	  $scope.revisor1Sel = JSON.parse(JSON.stringify(data));
	  $scope.cancel = function() {
			$mdDialog.cancel();
		  };
	  $scope.save = function() {
			$mdDialog.hide($scope.revisor1Sel);
			console.log('funciona el save')
		  };
		};




