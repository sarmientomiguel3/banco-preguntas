'use strict';

//controlador principal de toda la aplicacion
miApp.controller('ventanaCtrl', ['$scope','$mdDialog','$mdToast','recursoCrud','upload',function($scope,$mdDialog,$mdToast,recursoCrud,upload) {

	$scope.ventana = {Nom:"",Url:"",Lin:"",Ctr:"",Ico:"",EstReg:'A'};
	$scope.ventanaSel = {};

  $scope.listaVentanasPadres = [];
	$scope.listaVentanas = [];

	$scope.imagen = {};

	$scope.cambiarArchivo = function(elemento){
		debugger;
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


	$scope.registrarVentana = function (){

		if( !$scope.imagen.name ){
			alert("seleccione un icono para la funcion");
			return;
		}
		debugger;
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

                $scope.listaVentanas.forEach(function (item, index) {
                    if(!item.VenPadID)
                        $scope.listaVentanasPadres.push(item);
                    //demoP.innerHTML = demoP.innerHTML + "index[" + index + "]: " + item + "<br />";
                });
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
