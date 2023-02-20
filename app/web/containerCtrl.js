'use strict';

//controlador principal de toda la aplicacion
miApp.controller('containerCtrl', ['$scope','$mdDialog','$mdToast','recursoCrud','upload',function($scope,$mdDialog,$mdToast,recursoCrud,upload) {
	
	$scope.website = JSON.parse( localStorage.getItem('website') );	
	$scope.con = {};
	$scope.regSel = {};
    
	$scope.listRegisters = [];
	
	$scope.list = function (){	
		
		recursoCrud.listar("ContainerService.php", {accion:1,WebSitID:$scope.website.WebSitID} ).then(
			function(data) {
				$scope.listRegisters = data.data;
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}
		);
	};
	
	
	$scope.prepareNew = function(ev){
		$mdDialog.show({
			controller: DialogContainer,
			templateUrl: 'web/dialogContainer.html',
			parent: angular.element(document.body),
			targetEvent: ev,
			clickOutsideToClose:true,
			locals: {title:'Nueva Seccion', data: {}}
		})
		.then(function(res) {
			//guardadno lo cambios hechos
			$scope.con = res;
			$scope.newRegister();
			
		}, function() {
			//cancelando la funcion
		});
	};
	$scope.prepareUpdate = function(ev,r){
		$scope.regSel = r;
		$mdDialog.show({
			controller: DialogContainer,
			templateUrl: 'web/dialogContainer.html',
			parent: angular.element(document.body),
			targetEvent: ev,
			clickOutsideToClose:true,
			locals: {title:'Editar Seccion', data: r}
		})
		.then(function(res) {
			//guardadno lo cambios hechos
			
			$scope.updateRegister(res);
			
		}, function() {
			//cancelando la funcion
		});
	};
	
	
	$scope.newRegister = function (){
		
		$scope.con.WebSitID = $scope.website.WebSitID;
		
		recursoCrud.insertar("ContainerService.php", $scope.con ).then(		
		
			function(data) {
				$mdToast.show($mdToast.simple().textContent(data.mensaje).position('top right').hideDelay(2000));
				if(data.estado){
					$scope.con.ConID = data.ID;
					$scope.listRegisters.push($scope.con);
					
					$scope.con = {};	
				
				}
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}
		);
	};
	
	$scope.updateRegister = function (r){
		
		var register = {Tit:r.Tit,Url:r.Url,Ord:r.Ord};
		var ID = {ConID:r.ConID,WebSitID: $scope.website.WebSitID};
		
		recursoCrud.actualizar("ContainerService.php", {dato:register,ID:ID} ).then(
			function(data) {				
				$mdToast.show($mdToast.simple().textContent(data.mensaje).position('top right').hideDelay(2000));
				if(data.estado){
					recursoCrud.copiar($scope.regSel,register);
                }
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}
		);
	};
	$scope.deleteRegister = function (r){
		var ID = {ConID:r.ConID,WebSitID: $scope.website.WebSitID};
		
		recursoCrud.eliminar("ContainerService.php", ID ).then(
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
	};

}]);

function DialogContainer($scope, $mdDialog,title,data) {
	$scope.title = title;
    $scope.regSel = JSON.parse(JSON.stringify(data));
    $scope.cancel = function() {
        $mdDialog.cancel();
    };
    $scope.save = function() {
        $mdDialog.hide($scope.regSel);
    };
};
