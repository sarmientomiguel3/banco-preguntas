'use strict';

//controlador principal de toda la aplicacion
miApp.controller('usuariosCtrl', ['$scope','$mdDialog','$mdToast','$location','recursoCrud','upload',function($scope,$mdDialog,$mdToast,$location,recursoCrud,upload) {

	$scope.usuario = {};

	$scope.listRegisters = [];

	$scope.listRoles = [];

    $scope.cargarRoles = function(){
		recursoCrud.listar("ServicioRoles.php", {accion:1,usuario:{}} ).then(
			function(data) {
				$scope.listRoles = data.data;
			}
		)
	}

	$scope.list = function (){
		recursoCrud.listar("ServicioUsuario.php",{accion:6}).then(
			function(data) {
				$scope.listRegisters = data;
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}
		);
	};
	$scope.prepareUpdate = function(ev,r){
		var usuario = {UseId:r.UseId,NomUsu:r.NomUsu,fkIdRol:r.RolID};
		$mdDialog.show({
			controller: DialogTema,
			templateUrl: 'usuarios/dialogUsuarios.html',
			parent: angular.element(document.body),
			targetEvent: ev,
			clickOutsideToClose:true,
			locals: {title:'Editar Usuarios', data: usuario, listRoles:$scope.listRoles}
		})
		.then(function(res) {
			//guardadno lo cambios hechos

			$scope.updateRegister(res);

		}, function() {
			//cancelando la funcion
		});
	};

	$scope.prepareNew = function(ev,r){
		$mdDialog.show({
			controller: DialogTema,
			templateUrl: 'usuarios/dialogUsuarios.html',
			parent: angular.element(document.body),
			targetEvent: ev,
			clickOutsideToClose:true,
			locals: {title:'Nuevo Usuarios', data: {}, listRoles:$scope.listRoles}
		})
		.then(function(res) {
			//guardadno lo cambios hechos

			$scope.newRegister(res);

		}, function() {
			//cancelando la funcion
		});
	};
	$scope.updateRegister = function (r){

		var register = {fkIdRol:r.fkIdRol};
		var UseId = {UseId:r.UseId};
		recursoCrud.actualizar("ServicioUsuario.php", {dato:register,ID:UseId} ).then(
			function(data) {
				$mdToast.show($mdToast.simple().textContent(data.mensaje).position('top right').hideDelay(2000));
				if(data.estado){
					$scope.list();
          }
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}
		);
	};
	$scope.newRegister = function (r){
		r.Pas = r.NomUsu;
		recursoCrud.insertar("ServicioUsuario.php", {persona:{Nom:"usuario",dni:11111111},usuario:r}).then(
			function(data) {
				$mdToast.show($mdToast.simple().textContent(data.mensaje).position('top right').hideDelay(2000));
				if(data.estado){
                    $scope.list();
				}
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}
		);

	};
	$scope.deleteRegister = function(i,t) {
		var UseId = {UseId:t.UseId};
		recursoCrud.eliminar("ServicioUsuario.php", UseId ).then(
			function(data) {
				$mdToast.show($mdToast.simple().textContent(data.mensaje).position('top right').hideDelay(2000));
				if(data.estado)
					$scope.listRegisters.splice(i,1);
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}
		);
	}
      $scope.toggle = function (item, list) {
        var idx = list.indexOf(item);
        if (idx > -1) {
          list.splice(idx, 1);
        }
        else {
          list.push(item);
        }
      };

      $scope.exists = function (item, list) {
        return list.indexOf(item) > -1;
    };
}]);

function DialogTema($scope, $mdDialog,title,data,listRoles) {
	$scope.title = title;
	$scope.listRoles = listRoles;
	$scope.usuarioSel = JSON.parse(JSON.stringify(data));
	console.log(data);
	$scope.cancel = function() {
		$mdDialog.cancel();
	};
	$scope.save = function() {
		$mdDialog.hide($scope.usuarioSel);
		console.log('funciona el save')
	};
};