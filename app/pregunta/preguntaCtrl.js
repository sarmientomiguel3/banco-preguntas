'use strict';


//controlador principal de toda la aplicacion
miApp.controller('preguntaCtrl', ['$scope','$mdDialog','$mdToast','recursoCrud','upload','$routeParams','$window',function($scope,$mdDialog,$mdToast,recursoCrud,upload,$routeParams,$window) {


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
			//comentario 2
		});
	};

	$scope.aceptarUno = function(arr,i){
		arr.forEach(e => e.CorAlt = null);
		arr[i].CorAlt = true;
	}

	$scope.actualizarPregunta = async function (){

		var obj = validarDatos({pregunta:$scope.pregunta,alternativas : $scope.alternativas},null);

		if(obj !== ''){
			$mdToast.show($mdToast.simple().textContent(obj).position('top right').hideDelay(2000));
			return;
		}

		if($scope.justificacion && $scope.justificacion.DesJus){
			var registerJus = $scope.justificacion;
			var IdJus = {IdJus:$scope.justificacion.IdJus};
			var resJustificacion = await recursoCrud.actualizar("JustificacionService.php",{dato:registerJus,IdJus:IdJus} );

			if(resJustificacion && resJustificacion.estado){
				if($scope.justificacionImagen && $scope.justificacionImagen.size && $scope.justificacionImagen.size != 0){
					var nameImg = $scope.justificacion.ImgJus;
					var nameMiniImg = "mini-"+nameImg;
					upload.enviarArchivo2($scope.justificacionImagen,"resources/img/bancoPreguntaUnsa/",nameImg,nameMiniImg);
					// $scope.pregunta.ImgPre = nameImg;
				}
			}
		}
		var registerPre = $scope.pregunta;
		var IdPre = {IdPre:$scope.pregunta.IdPre};
		await recursoCrud.actualizar("PreguntaService.php", {dato:registerPre,IdPre:IdPre} ).then(
			function(data){
				if(data.estado && $scope.preguntaImagen && $scope.preguntaImagen.size && $scope.preguntaImagen.size != 0){
					var nameImg = $scope.pregunta.ImgPre;
					var nameMiniImg = "mini-"+nameImg;
					upload.enviarArchivo2($scope.preguntaImagen,"resources/img/bancoPreguntaUnsa/",nameImg,nameMiniImg);
					// $scope.pregunta.ImgPre = nameImg;
				}
			}
		);

		for (let index = 0; index < sizeArregloAlternativas; index++) {
			var registerAlt = $scope.alternativas[index];
			var IdAlt = {IdAlt:$scope.alternativas[index].IdAlt};
			var resAlternativa = await recursoCrud.actualizar("AlternativaService.php",{dato:registerAlt,IdAlt:IdAlt});

			if(resAlternativa.estado && $scope.alternativasImagenes[index] && $scope.alternativasImagenes[index].size && $scope.alternativasImagenes[index].size != 0){
				var nameImg = registerAlt.ImgAlt;
				var nameMiniImg = "mini-"+nameImg;
				upload.enviarArchivo2($scope.alternativasImagenes[index],"resources/img/bancoPreguntaUnsa/",nameImg,nameMiniImg);
				// $scope.pregunta.ImgPre = nameImg;
			}

		}

		$mdToast.show($mdToast.simple().textContent('se actualizo correctamente').position('top right').hideDelay(2000));

		// $window.location.href = '#/pregunta';

	}

	$scope.registrarPregunta = async function (){
		
		var obj = validarDatos({pregunta:$scope.pregunta,alternativas : $scope.alternativas},null);

		if(obj !== ''){
			$mdToast.show($mdToast.simple().textContent(obj).position('top right').hideDelay(2000));
			return;
		}

		if($scope.justificacion){
			var resJustificacion = await recursoCrud.insertar("JustificacionService.php",$scope.justificacion);

			if(resJustificacion && resJustificacion.estado){
				if($scope.justificacionImagen.size && $scope.justificacionImagen.size != 0){
					var nameImg = resJustificacion.ID+'-jus'+$scope.justificacion.ImgJus;
					var nameMiniImg = "mini-"+nameImg;
					upload.enviarArchivo2($scope.justificacionImagen,"resources/img/bancoPreguntaUnsa/",nameImg,nameMiniImg);
					// $scope.pregunta.ImgPre = nameImg;
				}
				$scope.pregunta.fkIdJus = resJustificacion.ID;
			}
		}
		

		recursoCrud.insertar("PreguntaService.php", $scope.pregunta ).then(
			async function(data) {
				if(data.mensaje){
					
					if($scope.preguntaImagen && $scope.preguntaImagen.size != 0){
						var nameImg = data.ID+'-pre'+$scope.pregunta.ImgPre;
						var nameMiniImg = "mini-"+nameImg;
						upload.enviarArchivo2($scope.preguntaImagen,"resources/img/bancoPreguntaUnsa/",nameImg,nameMiniImg);
						// $scope.pregunta.ImgPre = nameImg;
					}

					for (let index = 0; index < sizeArregloAlternativas; index++) {
						const e = $scope.alternativas[index];
						e.fkIdPre = data.ID;
						var resAlternativa = await recursoCrud.insertar("AlternativaService.php",e);

						if($scope.alternativasImagenes[index] && $scope.alternativasImagenes[index].size && $scope.alternativasImagenes[index].size != 0){
							var nameImg = data.ID+"-"+resAlternativa.ID+'-alt'+e.ImgAlt;
							var nameMiniImg = "mini-"+nameImg;
							upload.enviarArchivo2($scope.alternativasImagenes[index],"resources/img/bancoPreguntaUnsa/",nameImg,nameMiniImg);
							// $scope.pregunta.ImgPre = nameImg;
						}

					}

					$scope.iniciarLimpiarData();
					$mdToast.show($mdToast.simple().textContent(data.mensaje).position('top right').hideDelay(2000));
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
					fkIdDif : objPregunta.fkIdDif,
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

	if($routeParams.IdPre){
		var IdPre = $routeParams.IdPre;
		$scope.prepararEditar(null,{IdPre});
	}


}]);


function DialogControllerAlternativa($scope, $mdDialog,data,upload) {

	$scope.alternativaSel = JSON.parse(JSON.stringify(data.alternativa));
	if($scope.alternativaSelImagen && $scope.alternativaSelImagensize && $scope.alternativaSelImagensize != 0){
		$scope.alternativaSelImagen =  data.imagen;
	}
	$scope.ngInitData = function(){
		if($scope.alternativaSelImagen && $scope.alternativaSelImagen.size && $scope.alternativaSelImagen.size != 0){
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

function validarDatos(data,usuario){
	
	var pregunta = data.pregunta;
	var alternativas = data.alternativas;

	if(pregunta.TxtPre == null || pregunta.TxtPre == "" ){
		return 'Ingrese el numero Descripcion Pregunta';
	}
	if(pregunta.fkIdCur == null || pregunta.fkIdCur == "" ){
		return 'Ingrese segundo Curso';
	}
	if(pregunta.fkIdTem == null || pregunta.fkIdTem == "" ){
		return 'Ingrese Tema';
	}
	if(pregunta.fkIdTemEsp == null || pregunta.fkIdTemEsp == "" ){
		return 'Ingrese primer Tema Especifico';
	}
	if(pregunta.fkIdAreSug == null || pregunta.fkIdAreSug == ""){
		return 'Ingrese Area Sugerida';
	}
	if(pregunta.fkIdDif == null || pregunta.fkIdDif == ""){
		return 'Ingrese Dificultad';
	}
	var correctaRespuesta = 0;
	for (let index = 0; index < alternativas.length; index++) {
		const element = alternativas[index];
		if(element.CorAlt) {correctaRespuesta++;}
		else {element.CorAlt = null;}
		if(element.DesAlt == null || element.DesAlt == ""){
			return 'Ingrese Alternativa '+(index+1);
		}
	}
	if(correctaRespuesta!=1){
		return "escoger solo una alternativa";
	}
	// if(usuario){
	// 	if( !usuario.NomUsu || usuario.NomUsu=="" )
	// 		return 'Ingrese Nombre usuario';
	// 	if( !usuario.Pas || usuario.Pas=="" )
	// 		return 'Ingrese Password';
	// }
	
	return "";
};


