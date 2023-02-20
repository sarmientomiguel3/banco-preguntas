'use strict';

//controlador principal de toda la aplicacion
miApp.controller('categoriaCtrl', ['$scope','$mdDialog','$mdToast','recursoCrud',function($scope,$mdDialog,$mdToast,recursoCrud) {
	
	$scope.categoria = {Pre:"",Nom:"",Des:"",EstReg:'A'};
	$scope.categoriaSel = {};
	$scope.listaCategorias = [];
	
	$scope.registrarCategoria = function (){
		
		var men = validarDatos($scope.categoria);
		if( men!="" ){
			$mdToast.show($mdToast.simple().textContent(men).position('top right').hideDelay(2000));
			return;
		}
		
		recursoCrud.insertar("ServicioCategoria.php", $scope.categoria ).then(		
		
			function(data) {
				$mdToast.show($mdToast.simple().textContent(data.mensaje).position('top right').hideDelay(2000));
				if(data.estado){
					$scope.categoria.CatID = data.ID;
					$scope.listaCategorias.push($scope.categoria);
					$scope.categoria = {Pre:"",Nom:"",Des:"",EstReg:'A'};
				}
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}
		);
	};
	$scope.listarCategorias = function (){
		recursoCrud.listar("ServicioCategoria.php", {} ).then(
			function(data) {
				$scope.listaCategorias = data.data;
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}
		);
	};
	$scope.actualizarCategoria = function (c){
		
		var categoriaActualizar = {Nom:c.Nom,Des:c.Des};
		var categoriaID = {CatID:c.CatID};
		
		recursoCrud.actualizar("ServicioCategoria.php", {dato:categoriaActualizar,ID:categoriaID} ).then(
			function(data) {				
				$mdToast.show($mdToast.simple().textContent(data.mensaje).position('top right').hideDelay(2000));
				if(data.estado)
					recursoCrud.copiar($scope.categoriaSel,categoriaActualizar);
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}
		);
	};
	$scope.eliminarCategoria = function (ev,i,c){
        var confirm = $mdDialog.confirm()
			.title('Mensaje de Confirmacion?')
			.textContent('Esta seguro que desea eliminar la categoria')
			.ariaLabel('Lucky day')
			.targetEvent(ev)
			.ok('Aceptar')
			.cancel('Cancelar');
			  
		$mdDialog.show(confirm).then(function() {
            recursoCrud.eliminar("ServicioCategoria.php", {CatID:c.CatID} ).then(
                function(data) {				
                    $mdToast.show($mdToast.simple().textContent(data.mensaje).position('top right').hideDelay(2000));
                    if(data.estado)
                        $scope.listaCategorias.splice(i,1);
                }, function(data) {
                    $mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
                }, function(data) {
                    $mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
                }
            );
        }, function() {	  
		});
	};
	
	$scope.prepararEditar = function(ev,c) {
		
		$scope.categoriaSel = c;
		$mdDialog.show({
		  controller: DialogControllerCategoria,
		  templateUrl: 'administracion/productos/dialogoEditarCategoria.tmpl.html',
		  parent: angular.element(document.body),
		  targetEvent: ev,
		  clickOutsideToClose:true,
		  locals: { categoria: c }
		})
		.then(function(categoriaEditado) {
			//guardadno lo cambios hechos
			$scope.actualizarCategoria(categoriaEditado);
			
		}, function() {
			//cancelando la funcion
		});
	};
	
	function validarDatos(categoria){
		
	
		if(categoria.Pre == null || categoria.Pre == "" ){
			return 'Ingrese el Prefijo';
		}
		if(categoria.Nom == null || categoria.Nom == "" ){
			return 'Ingrese nombre de la categoria ';
		}
		if(categoria.Des == null || categoria.Des == "" ){
			return 'Ingrese una descripcion de la categoria';
		}
		
		return "";
	}

}]);

function DialogControllerCategoria($scope, $mdDialog,categoria) {
	
  $scope.categoriaSel = JSON.parse(JSON.stringify(categoria));
  $scope.cancelar = function() {
    $mdDialog.cancel();
  };
  $scope.guardarCambios = function() {
    $mdDialog.hide($scope.categoriaSel);
  };
}
