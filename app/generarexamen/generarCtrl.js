'use strict';


//controlador principal de toda la aplicacion
miApp.controller('generarCtrl', ['$scope','$mdDialog','$mdToast','recursoCrud','upload',function($scope,$mdDialog,$mdToast,recursoCrud,upload) {


	$scope.pregunta = {}
	$scope.preguntaImagen = {}
	$scope.justificacion = {}
	$scope.justificacionImagen = {}
	var sizeArregloAlternativas = 5;
	$scope.alternativas = new Array(sizeArregloAlternativas);
	$scope.alternativasImagenes = new Array(sizeArregloAlternativas);


	$scope.iniciarLimpiarData = function(){
		$scope.pregunta = {
			TxtPre : "",
			ImgPre : null,
			fkIdTem : null,
			fkIdTemEsp : null,
			fkIdCur : null,
			fkIdAreSug : null,
			fkIdDif : null,
			fkIdJus: null
		}
		$scope.justificacion = {
			DesJus : "",
			ImgJus : ""
		}
		$scope.justificacionImagen = {}
		$scope.preguntaImagen = {}
		for (let index = 0; index < sizeArregloAlternativas; index++) {
			$scope.alternativas[index] =  {
				DesAlt: "",
				ImgAlt: null,
				fkIdPre: null
			};
		}
		for (let index = 0; index < sizeArregloAlternativas; index++) {
			$scope.alternativasImagenes[index] = {};
		}
		reiniciarImg('mostrarImagenPregunta');

	}

	$scope.iniciarLimpiarData();

	//datos generales

	$scope.listarCursos = [];
	$scope.listaTemas = [];
	$scope.listaTemasEspe = [];
	$scope.listaAreasSujeridas	 = [];
	$scope.listarDificultad	 = [];

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
	}

	$scope.listarAreasSujeridas = function(){
		recursoCrud.listar("AreaService.php", {} ).then(
			function(data) {
				$scope.listaAreasSujeridas = data.data;
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}
		);
	}
	$scope.listarDificultad = function(){
		recursoCrud.listar("DificultadService.php", {} ).then(
			function(data) {
				$scope.listaDificultad = data.data;
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}
		);

	}

	$scope.listaPreguntas = [];

	$scope.listarTemas = function(IdCur){
		recursoCrud.listar("TemaService.php", {} ).then(
			function(data) {
				$scope.listaTemas = data.data;
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}
		);
	}

	$scope.listarTemasEspecificos = function(IdTem){
		recursoCrud.listar("TemaEspecificoService.php", {} ).then(
			function(data) {
				$scope.listaTemasEspe = data.data;
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}
		);
	}

	$scope.cambiarArchivoJustificacion = function(elemento,idImg){
		$scope.justificacionImagen = upload.subirArchivoTemporal(idImg,elemento);
		var ext = getExtencionFileType(	$scope.justificacionImagen.type);
		$scope.justificacion.ImgJus = nuevoNombreFile('',ext);
		$scope.$apply();
	};
	$scope.cambiarArchivoPregunta = function(elemento,idImg){
		$scope.preguntaImagen = upload.subirArchivoTemporal(idImg,elemento);
		var ext = getExtencionFileType(	$scope.preguntaImagen.type);
		$scope.pregunta.ImgPre = nuevoNombreFile('',ext);
		$scope.$apply();
	};
	$scope.elegirImagen = function (idImg){
		document.getElementById(idImg).click();
	};



	$scope.EditarAlternativa = function(ev,index) {
		// $scope.alternativaSel = alternativas[i];
		var alternativaSel = {
			alternativa : $scope.alternativas[index],
			imagen : $scope.alternativasImagenes[index]
		}
		$mdDialog.show({
		  controller: DialogControllerAlternativa,
		  templateUrl: 'pregunta/dialogoEditarPregunta.tmpl.html',
		  parent: angular.element(document.body),
		  targetEvent: ev,
		  clickOutsideToClose:true,
		  locals: { data:alternativaSel,upload }
		})
		.then(function(alternativaSel) {
			//guardadno lo cambios hechos
			$scope.alternativas[index] = alternativaSel.alternativa;
			$scope.alternativasImagenes[index] = alternativaSel.imagen;
			// preguntas[i] = preguntaEditado;
			// $scope.actualizarVentana(preguntaEditado);

		}, function() {
			//cancelando la funcion
		});
	};

	$scope.aceptarUno = function(arr,i){
		arr.forEach(e => e.tipoAlternativa = false);
		arr[i].tipoAlternativa = true;
	}


	$scope.registrarPregunta = async function (){

		var resJustificacion = await recursoCrud.insertar("JustificacionService.php",$scope.justificacion);

		recursoCrud.insertar("PreguntaService.php", $scope.pregunta ).then(
			async function(data) {
				if(data.mensaje){
					$mdToast.show($mdToast.simple().textContent(data.mensaje).position('top right').hideDelay(2000));

					if($scope.preguntaImagen.size && $scope.preguntaImagen.size != 0){
						var nameImg = data.ID+$scope.pregunta.ImgPre;
						var nameMiniImg = "mini-"+nameImg;
						upload.enviarArchivo2($scope.preguntaImagen,"resources/img/bancoPreguntaUnsa/",nameImg,nameMiniImg);
						// $scope.pregunta.ImgPre = nameImg;
					}




					for (let index = 0; index < sizeArregloAlternativas; index++) {
						const e = $scope.alternativas[index];
						e.fkIdPre = data.ID;
						var resAlternativa = await recursoCrud.insertar("AlternativaService.php",e);

						if($scope.alternativasImagenes[index] && $scope.alternativasImagenes[index].size && $scope.alternativasImagenes[index].size != 0){
							var nameImg = data.ID+"-"+resAlternativa.ID+e.ImgAlt;
							var nameMiniImg = "mini-"+nameImg;
							upload.enviarArchivo2($scope.alternativasImagenes[index],"resources/img/bancoPreguntaUnsa/",nameImg,nameMiniImg);
							// $scope.pregunta.ImgPre = nameImg;
						}

					}

					$scope.iniciarLimpiarData();
				}
				else{
					$mdToast.show($mdToast.simple().textContent("error al guardar").position('top right').hideDelay(2000));
				}
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

	$scope.prepararEditar = function(ev,p) {

		recursoCrud.listar("PreguntaService.php", {accion:6,ID:p.IdPre} ).then(
			function(data) {
				var objPregunta = data.data[0];

				$scope.pregunta = {
					IdPre : objPregunta.IdPre,
					TxtPre : objPregunta.TxtPre,
					imagen : {},
					ImgPre : objPregunta.ImgPre,
					fkIdTem : objPregunta.fkIdTem,
					fkIdTemEsp : objPregunta.fkIdTemEsp,
					fkIdCur : objPregunta.fkIdCur,
					fkIdAreSug : objPregunta.fkIdAreSug,
					fkIdDif : objPregunta.fkIdDif
				}

				recursoCrud.subirArchivoTemporal("imagenPreguntra",)

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


	  $scope.eliminarPregunta = function (i,p){
		var preguntaID = {IdPre:p.IdPre};

		recursoCrud.eliminar("PreguntaService.php", preguntaID ).then(
			function(data) {
				$mdToast.show($mdToast.simple().textContent(data.mensaje).position('top right').hideDelay(2000));
				if(data.estado)
					$scope.listaPreguntas.splice(i,1);

			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}
		);
	};

}]);


function DialogControllerAlternativa($scope, $mdDialog,data,upload) {

	$scope.alternativaSel = JSON.parse(JSON.stringify(data.alternativa));
	$scope.alternativaSelImagen = data.imagen;

	$scope.ngInitData = function(){
		if($scope.alternativaSelImagen.size && $scope.alternativaSelImagen.size != 0){
			upload.subirArchivoTemporalLocal('mostrarImagen1',$scope.alternativaSelImagen);
		}
	}
	$scope.cambiarArchivo = function(elemento,idImg){
		$scope.alternativaSelImagen = upload.subirArchivoTemporal(idImg,elemento);
		var ext = getExtencionFileType(	$scope.alternativaSelImagen.type);
		$scope.alternativaSel.ImgAlt = nuevoNombreFile('',ext);
		$scope.$apply();
	};
	$scope.elegirImagen = function (idImg){
		document.getElementById(idImg).click();
	};
    $scope.cancelar = function() {
        $mdDialog.cancel();
    };
    $scope.guardarCambios = function() {
		var alternativaSel = {
			alternativa : $scope.alternativaSel,
			imagen : $scope.alternativaSelImagen
		}
        $mdDialog.hide(alternativaSel);
    };
};
