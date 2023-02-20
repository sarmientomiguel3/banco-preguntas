'use strict';

//controlador principal de toda la aplicacion
miApp.controller('preguntaCtrl', ['$scope','$mdDialog','$mdToast','recursoCrud','upload',function($scope,$mdDialog,$mdToast,recursoCrud,upload) {

	$scope.ventana = {Nom:"",Url:"",Lin:"",Ctr:"",Ico:"",EstReg:'A'};
	$scope.pregunta = {formulador:"",proceso:"",fase:"",
	curso:"",fecha:"",
	area:"",nomPre:"",titBal:'',temEsp:''
	,dificultad:'',txtPre:'',tomo:'',pagina:''
	,areasug:'',
	enunciado:'',
	temEsp:'',temEsp:''
	,p1:'',p2:'',p3:'',p4:'',p5:''};

	$scope.listaCursos = [];
	$scope.listaLibros = [];
	$scope.listaAreaSug = [];
	$scope.listaPreguntas = [];

	$scope.ventanaSel = {};

  	$scope.listaVentanasPadres = [];
	$scope.listaVentanas = [];

	$scope.imagen = {};

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
					,dificultad:'',txtPre:'',tomo:'',pagina:''
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

		recursoCrud.listar("PreguntaService.php", {accion:1} ).then(
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

function DialogController2($scope, $mdDialog,ventana,ventanasPadres) {
    $scope.ventanasPadres = ventanasPadres;
    $scope.ventanaSel = JSON.parse(JSON.stringify(ventana));
    $scope.cancelar = function() {
        $mdDialog.cancel();
    };
    $scope.guardarCambios = function() {
        $mdDialog.hide($scope.ventanaSel);
    };
};







