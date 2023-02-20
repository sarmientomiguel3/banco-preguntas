'use strict';

//controlador principal de toda la aplicacion
miApp.controller('adminCtrl', ['$scope','$mdDialog','$mdToast','recursoCrud',function($scope,$mdDialog,$mdToast,recursoCrud) {
	
	$scope.usuario = {};
	
	
	$scope.listarAdmin = function (){
		recursoCrud.get("ServicioUsuario.php", {accion:3} ).then(
			function(data) {
                if(data.estado)
                    $scope.usuario = data.resultado;
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}
		);
	};
    $scope.cambiarPassword = function (ev){
        
        if( !$scope.usuario.Pas || $scope.usuario.Pas=="" ){
			$mdToast.show($mdToast.simple().textContent("Ingrese Password").position('top right').hideDelay(2000));
			return;
		}
        
        var confirm = $mdDialog.confirm()
			.title('Mensaje de Confirmacion?')
			.textContent('Esta seguro que desea cambiar la contraseña del administrador del sistema')
			.ariaLabel('Lucky day')
			.targetEvent(ev)
			.ok('Aceptar')
			.cancel('Cancelar');
			  
		$mdDialog.show(confirm).then(function() {
            var usuActualizar = {Pas:$scope.usuario.Pas};
            var UseId = {UseId:$scope.usuario.UseId};
            
            recursoCrud.actualizar("ServicioUsuario.php", {dato:usuActualizar,ID:UseId} ).then(
                function(data) {				
                    $mdToast.show($mdToast.simple().textContent(data.mensaje).position('top right').hideDelay(2000));
                    if(data.estado)
                        $scope.usuario.Pas = usuActualizar.Pas;
                }, function(data) {
                    $mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
                }, function(data) {
                    $mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
                }
            );
			
		}, function() {
            $scope.listarAdmin();		  
		});
	};
	

}]);
