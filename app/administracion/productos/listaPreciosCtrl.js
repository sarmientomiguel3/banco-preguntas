'use strict';

//controlador principal de toda la aplicacion
miApp.controller('listaPreciosCtrl', ['$scope','$mdDialog','$mdToast','recursoCrud',function($scope, $mdDialog,$mdToast,recursoCrud) {
	
	$scope.listaProductos = [];
	
	$scope.listaProductosPack = [];
	$scope.listaProductosOtros = [];
	
	
	$scope.actualizarCampo = function(miID,miDato){
		recursoCrud.actualizar("ServicioProducto.php", {dato:miDato,ID:miID} ).then(
			function(data) {				
				$mdToast.show($mdToast.simple().textContent(data.mensaje).position('top right').hideDelay(1000));				
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}
		);
	};
	
	$scope.listarProductos = function (){
		recursoCrud.listar("ServicioProducto.php", {accion:2} ).then(
			function(data) {
				//$scope.listaProductos = data.data;
				
				for(var i=0;i< data.data.length ; i++ ){
					if( data.data[i].CatID == 1 ){
						$scope.listaProductosPack.push(data.data[i]);
                    }
					else{
						$scope.listaProductosOtros.push(data.data[i]);
                    }
				}
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}
		);
	};
	
		/*
	$scope.registrarProducto = function (){
		
		$http({
			method: 'POST',
			url: "servidor/servicios/ServicioProducto.php",
			data: $scope.producto
		}).success(function (data) {
			
			if(data.estado){
				
				if($scope.imagen.name){
					upload.uploadFile($scope.imagen).then(function(res){
						console.log(res);
						$scope.imagen = {};
						document.getElementById('mostrarImagen').innerHTML="";
					});
				}
				$scope.productosSel = [];
			}
			$mdToast.show(
				$mdToast.simple()
				.textContent(data.mensaje)
				.position('top right')
				.hideDelay(2000)
			);
			
			//$scope.producto = {};
		}).error(function(data, status, headers, config) {
            if (status === 400) {
                alert("error 400");
            } else {
                throw new Error("Fallo obtener los datos:" + status + "\n" + data);
            }
        });
	};*/
	
	
	$scope.actualizarProducto = function (p){
		/*
		var productoActualizar = {Cod:p.Cod,Nom:p.Nom,Des:p.Des,Can:p.Can,Pre:p.Pre,UniMedID:p.UniMedID,MonID:p.MonID,CatID:p.CatID};
		var productoID = {ProID:p.ProID};
		
		$http({
			method: 'PUT',
			url: "servidor/servicios/ServicioProducto.php",
			data: {
				dato:productoActualizar,
				ID:productoID
			}
		}).success(function (data) {
			$mdToast.show(
				$mdToast.simple()
				.textContent(data)
				.position('top right')
				.hideDelay(2000)
			);
		}).error(function(data, status, headers, config) {
            if (status === 400) {
                alert("error 400");
            } else {
                throw new Error("Fallo obtener los datos:" + status + "\n" + data);
            }
        });*/
	};
	$scope.eliminarProducto = function (p){
		/*var productoID = {ProID:p.ProID};
		$http({
			method: 'DELETE',
			url: "servidor/servicios/ServicioProducto.php",
			data: productoID
		}).success(function (data) {
			//$scope.listarProductos();
			$mdToast.show(
				$mdToast.simple()
				.textContent(data)
				.position('top right')
				.hideDelay(2000)
			);
		}).error(function(data, status, headers, config) {
            if (status === 400) {
                alert("error 400");
            } else {
                throw new Error("Fallo obtener los datos:" + status + "\n" + data);
            }
        });*/
	};
	
	$scope.prepararEditar = function(ev,p) {
		
		alert(p.Pre +"  "+p.Pre2);
		/*$mdDialog.show({
		  controller: DialogControllerListaPrecio,
		  templateUrl: 'administracion/productos/dialogoEditarProducto.tmpl.html',
		  parent: angular.element(document.body),
		  targetEvent: ev,
		  clickOutsideToClose:true,
		  locals: { producto: p , unidades:$scope.listaUnidades,monedas:$scope.listaMonedas,categorias:$scope.listaCategorias}
		})
		.then(function(productoEditado) {
			//guardadno lo cambios hechos
			$scope.actualizarProducto(productoEditado);
			
		}, function() {
			//cancelando la funcion
		});*/
	};
	
	

}]);

function DialogControllerListaPrecio($scope, $mdDialog,producto) {
	/*
  $scope.productoSel = JSON.parse(JSON.stringify(producto));
  $scope.listaUnidades = JSON.parse(JSON.stringify(unidades));
  $scope.listaMonedas = JSON.parse(JSON.stringify(monedas));
  $scope.listaCategorias = JSON.parse(JSON.stringify(categorias));
  $scope.cancelar = function() {
    $mdDialog.cancel();
  };
  $scope.guardarCambios = function() {
    $mdDialog.hide($scope.productoSel);
  };
  
  $scope.elegirCategoria = function(c) {
	for(var i=0;i<$scope.listaCategorias.length;i++){
		if($scope.listaCategorias[i].CatID == c){
			$scope.productoSel.Cod =$scope.listaCategorias[i].Pre + $scope.productoSel.Cod.substr( $scope.productoSel.Cod.indexOf('-'));
			break;
		}
	}
   };*/
}


