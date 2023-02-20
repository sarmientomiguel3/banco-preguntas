'use strict';

//controlador principal de toda la aplicacion
miApp.controller('containerCtrl', ['$scope','$mdDialog','$mdToast','recursoCrud','upload',function($scope,$mdDialog,$mdToast,recursoCrud,upload) {
	
	$scope.website = JSON.parse( localStorage.getItem('website') );	
	$scope.web = {};
	$scope.webSel = {};
    
    $scope.listaVentanasPadres = [];
	$scope.listaVentanas = [];
	
	$scope.imagen = {};
	
	$scope.cambiarArchivo = function(elemento){
		
		$scope.imagen = upload.subirArchivoTemporal("mostrarImagen1",elemento);
		$scope.web.Ico = "";
		if( $scope.imagen ){
			$scope.web.Ico = "/"+$scope.imagen.name;
		}
		$scope.$apply();
		
	};
	$scope.elegirImagen = function (){
		document.getElementById('imagen1').click();
	};
	
	$scope.prepareNew = function(ev){
		$mdDialog.show({
			controller: DialogContainer,
			templateUrl: 'web/dialogContainer.html',
			parent: angular.element(document.body),
			targetEvent: ev,
			clickOutsideToClose:true,
			locals: {title:'Nuevo Seccion', ventana: {}}
		})
		.then(function(ventanaEditado) {
			//guardadno lo cambios hechos
			$scope.web = ventanaEditado;
			$scope.registrarVentana();
			
		}, function() {
			//cancelando la funcion
		});
		
	};
	$scope.prepareUpdate = function(ev,v){
		$scope.webSel = v;
		$mdDialog.show({
			controller: DialogContainer,
			templateUrl: 'web/dialogContainer.html',
			parent: angular.element(document.body),
			targetEvent: ev,
			clickOutsideToClose:true,
			locals: {title:'Editar Seccion', ventana: v}
		})
		.then(function(ventanaEditado) {
			//guardadno lo cambios hechos
			
			$scope.actualizarVentana(ventanaEditado);
			
		}, function() {
			//cancelando la funcion
		});
		
	};
	
	
	$scope.registrarVentana = function (){
		/*
		if( !$scope.imagen.name ){
			alert("seleccione un icono para la funcion");
			return;
		}*/
		recursoCrud.insertar("WebSiteService.php", $scope.web ).then(		
		
			function(data) {
				$mdToast.show($mdToast.simple().textContent(data.mensaje).position('top right').hideDelay(2000));
				if(data.estado){
					$scope.web.WebSitID = data.ID;
					$scope.listaVentanas.push($scope.web);
                    if(!$scope.web.VenPadID)
                        $scope.listaVentanasPadres.push($scope.web);
					$scope.web = {};	
				
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
	$scope.listWebSites = function (){
		recursoCrud.listar("WebSiteService.php", {} ).then(
			function(data) {
				$scope.listaVentanas = data.data;
                /*
                $scope.listaVentanas.forEach(function (item, index) {
                    if(!item.VenPadID)
                        $scope.listaVentanasPadres.push(item);
                    //demoP.innerHTML = demoP.innerHTML + "index[" + index + "]: " + item + "<br />"; 
                });*/
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
		
		recursoCrud.actualizar("WebSiteService.php", {dato:ventanaActualizar,ID:ventanaID} ).then(
			function(data) {				
				$mdToast.show($mdToast.simple().textContent(data.mensaje).position('top right').hideDelay(2000));
				if(data.estado){
					recursoCrud.copiar($scope.webSel,ventanaActualizar);
                    
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
		
		recursoCrud.eliminar("WebSiteService.php", ventanaID ).then(
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

}]);

function DialogContainer($scope, $mdDialog,title,ventana) {
	$scope.title = title;
    $scope.webSel = JSON.parse(JSON.stringify(ventana));
    $scope.cancelar = function() {
        $mdDialog.cancel();
    };
    $scope.guardarCambios = function() {
        $mdDialog.hide($scope.webSel);
    };
};
