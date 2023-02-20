'use strict';

//controlador principal de toda la aplicacion
miApp.controller('webSiteCtrl', ['$scope','$mdDialog','$mdToast','$location','recursoCrud','upload',function($scope,$mdDialog,$mdToast,$location,recursoCrud,upload) {
	
	$scope.web = {};
	$scope.webSel = {};
    
	$scope.listRegisters = [];
	
	$scope.prepareNew = function(ev){
		$mdDialog.show({
			controller: DialogWebSite,
			templateUrl: 'web/dialogWebSite.html',
			parent: angular.element(document.body),
			targetEvent: ev,
			clickOutsideToClose:true,
			locals: {title:'Nuevo WebSite', data: {}}
		})
		.then(function(res) {
			//guardadno lo cambios hechos
			$scope.web = res;
			$scope.newRegister();
			
		}, function() {
			//cancelando la funcion
		});
	};
	$scope.prepareUpdate = function(ev,r){
		$scope.webSel = r;
		$mdDialog.show({
			controller: DialogWebSite,
			templateUrl: 'web/dialogWebSite.html',
			parent: angular.element(document.body),
			targetEvent: ev,
			clickOutsideToClose:true,
			locals: {title:'Editar WebSite', data: r}
		})
		.then(function(res) {
			//guardadno lo cambios hechos
			
			$scope.updateRegister(res);
			
		}, function() {
			//cancelando la funcion
		});
	};
	
	
	$scope.newRegister = function (){
		recursoCrud.insertar("WebSiteService.php", $scope.web ).then(		
		
			function(data) {
				$mdToast.show($mdToast.simple().textContent(data.mensaje).position('top right').hideDelay(2000));
				if(data.estado){
					$scope.web.WebSitID = data.ID;
					$scope.listRegisters.push($scope.web);
					$scope.web = {};	
				
				}
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}
		);
	};
	$scope.list = function (){
		recursoCrud.listar("WebSiteService.php", {} ).then(
			function(data) {
				$scope.listRegisters = data.data;
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}
		);
	};
	$scope.updateRegister = function (r){
		
		var register = {Dom:r.Dom,Tit:r.Tit,Des:r.Des};
		var ID = {WebSitID:r.WebSitID};
		
		recursoCrud.actualizar("WebSiteService.php", {dato:register,ID:ID} ).then(
			function(data) {				
				$mdToast.show($mdToast.simple().textContent(data.mensaje).position('top right').hideDelay(2000));
				if(data.estado){
					recursoCrud.copiar($scope.webSel,register);
                    
                }
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}
		);
	};
	$scope.deleteRegister = function (i,r){
		var ID = {WebSitID:r.WebSitID};
		
		recursoCrud.eliminar("WebSiteService.php", ID ).then(
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

function DialogWebSite($scope, $mdDialog,title,data) {
	$scope.title = title;
    $scope.webSel = JSON.parse(JSON.stringify(data));
    $scope.cancel = function() {
        $mdDialog.cancel();
    };
    $scope.save = function() {
        $mdDialog.hide($scope.webSel);
    };
};
