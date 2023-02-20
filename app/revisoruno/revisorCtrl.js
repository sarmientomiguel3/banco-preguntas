'use strict';

//controlador principal de toda la aplicacion
miApp.controller('revisorCtrl', ['$scope','$mdDialog','$mdToast','recursoCrud','upload',function($scope,$mdDialog,$mdToast,recursoCrud,upload) {

	$scope.revisor1Sel = {};
	$scope.revisor1 = {};
	$scope.ventana = {Nom:"",Url:"",Lin:"",Ctr:"",Ico:"",EstReg:'A'};
	$scope.pregunta = {formulador:"",proceso:"",fase:"",
	curso:"",fecha:"",
	area:"",nomPre:"",titBal:'',temEsp:''
	,revisor1:'',txtPre:'',tomo:'',pagina:''
	,areasug:'',
	enunciado:'',
	temEsp:'',temEsp:''
	,p1:'',p2:'',p3:'',p4:'',p5:''};

	$scope.listaCursos = [];
	$scope.listaLibros = [];
	$scope.listaAreaSug = [];
	$scope.listaRevisor = [];

	$scope.ventanaSel = {};

  	$scope.listaVentanasPadres = [];
	$scope.listaVentanas = [];

	$scope.imagen = {};
	$scope.listarRevisor = [];

	$scope.listarRevisor = function (){
		recursoCrud.listar("RevisorService.php", {accion:5} ).then(
			function(data) {
				$scope.listaRevisor = data.data;
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}
		);
	};

	//Boton Aceptar
	$scope.Aceptar = function(ev,r){
		var register = {Obs:r.Obs};
		var register2 = {EstRev1:r.EstRev1};
		var IdPreUsu = {IdPreUsu:r.IdPreUsu};
		recursoCrud.actualizar("RevisorService.php", {dato:register,IdPreUsu:IdPreUsu,accion:2} )
		.then(
			function(data) {
				$mdToast.show($mdToast.simple().textContent(data.mensaje).position('top right').hideDelay(2000));
				if(data.estado){
					register.EstRev1 = 'Aceptada';
					recursoCrud.copiar($scope.revisor1Sel,register);
					// console.log("entro aca 2")
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
		recursoCrud.actualizar("RevisorService.php", {dato:register,IdPreUsu:IdPreUsu,accion:1} ).then(

			function(data) {

				$mdToast.show($mdToast.simple().textContent(data.mensaje).position('top right').hideDelay(2000));
				if(data.estado){
					register.EstRev1 = 'Rechazada';
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

	


	$scope.cambiarArchivo = function(elemento){

		$scope.imagen = upload.subirArchivoTemporal("mostrarImagen1",elemento);
		$scope.ventana.Ico = "";
		if( $scope.imagen ){
			$scope.ventana.Ico = "/"+$scope.imagen.name;
		}
		$scope.$apply();

	};
	$scope.elegirImagen = function (){
		document.getElementById('imagen1').click();
	};

	$scope.registrarPregunta = function (){

		console.log('regintaaa')

		recursoCrud.insertar("PreguntaService.php", $scope.pregunta ).then(
			
			function(data) {
				console.log('insertarxfx');
				console.log($scope.pregunta);
				//console.log($scope.listaVentanasPadres);
				console.log($scope.listaCursos);
				console.log($scope.listaLibros);
				console.log($scope.listaAreaSug);
				console.log(data);

				$mdToast.show($mdToast.simple().textContent(data.mensaje).position('top right').hideDelay(2000));
				if(1){
					$scope.pregunta.IdPre = data.ID;
					$scope.listaPreguntas.push($scope.pregunta);

					$scope.pregunta = {formulador:"",proceso:"",fase:"",
					curso:"",fecha:"",
					area:"",nomPre:"",titBal:'',temEsp:''
					,revisor1:'',txtPre:'',tomo:'',pagina:''
					,areasug:'',
					enunciado:'',
					temEsp:'',temEsp:''
					,p1:'',p2:'',p3:'',p4:'',p5:''};
				}


			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}
		);

	};

	$scope.listarTablas = function (){

		recursoCrud.listar("PreguntaService.php", {accion:2} ).then(
			function(data) {
				$scope.listaCursos = data.data;


			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}
		);

		recursoCrud.listaRevisor("RevisorService.php", {accion:1} ).then(
			function(data) {
				$scope.listaLibros = data.data;


			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}
		);	
		//listaAreaSug

		recursoCrud.listar("PreguntaService.php", {accion:3} ).then(
			function(data) {
				$scope.listaAreaSug = data.data;


			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}
		);

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

	$scope.registrarVentana = function (){

		if( !$scope.imagen.name ){
			alert("seleccione un icono para la funcion");
			return;
		}
		recursoCrud.insertar("ServicioVentanas.php", $scope.ventana ).then(

			function(data) {
				$mdToast.show($mdToast.simple().textContent(data.mensaje).position('top right').hideDelay(2000));
				if(data.estado){
					$scope.ventana.VenID = data.ID;
					$scope.listaVentanas.push($scope.ventana);
                    if(!$scope.ventana.VenPadID)
                        $scope.listaVentanasPadres.push($scope.ventana);
					$scope.ventana = {Nom:"",Url:"",Lin:"",Ctr:"",Ico:"",EstReg:'A'};

					upload.enviarArchivo($scope.imagen,"resources/img/menu/").then(function(res){
						console.log(res);
						$scope.imagen = {};
						document.getElementById('mostrarImagen1').innerHTML="";
					});
				}
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}
		);
	};
	$scope.listarVentanas = function (){
		recursoCrud.listar("ServicioVentanas.php", {} ).then(
			function(data) {
				$scope.listaVentanas = data.data;


			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}
		);
	};

	$scope.actualizarVentana = function (v){

		var ventanaActualizar = {Nom:v.Nom,Url:v.Url,Lin:v.Lin,Ctr:v.Ctr,Ico:v.Ico,VenPadID:v.VenPadID};
		var ventanaID = {VenID:v.VenID};

		recursoCrud.actualizar("ServicioVentanas.php", {dato:ventanaActualizar,ID:ventanaID} ).then(
			function(data) {
				$mdToast.show($mdToast.simple().textContent(data.mensaje).position('top right').hideDelay(2000));
				if(data.estado){
					recursoCrud.copiar($scope.ventanaSel,ventanaActualizar);

                    $scope.listaVentanasPadres = [];
                    $scope.listaVentanas.forEach(function (item) {
                        if(!item.VenPadID)
                            $scope.listaVentanasPadres.push(item);
                    });
                }
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}
		);
	};
	$scope.eliminarVentana = function (i,v){
		var ventanaID = {VenID:v.VenID};

		recursoCrud.eliminar("ServicioVentanas.php", ventanaID ).then(
			function(data) {
				$mdToast.show($mdToast.simple().textContent(data.mensaje).position('top right').hideDelay(2000));
				if(data.estado)
					$scope.listaVentanas.splice(i,1);

                $scope.listaVentanasPadres = [];
                    $scope.listaVentanas.forEach(function (item) {
                        if(!item.VenPadID)
                            $scope.listaVentanasPadres.push(item);
                    });
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}
		);
	};

	$scope.prepararEditar = function(ev,v) {

		$scope.ventanaSel = v;
		$mdDialog.show({
		  controller: DialogController2,
		  templateUrl: 'admin/dialogoEditarVentana.html',
		  parent: angular.element(document.body),
		  targetEvent: ev,
		  clickOutsideToClose:true,
		  locals: { ventana: v,ventanasPadres:$scope.listaVentanasPadres }
		})
		.then(function(ventanaEditado) {
			//guardadno lo cambios hechos
			$scope.actualizarVentana(ventanaEditado);

		}, function() {
			//cancelando la funcion
		});
	};


	//calendario
	$scope.data = {
		date: new Date()
	  };

	  //$scope.submit = function() {
		//$scope.data.dateString = moment($scope.data.date).format("YYYY-MM-DD");
	  //}
	  


}]);

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








