'use strict';

//controlador principal de toda la aplicacion
miApp.controller('temaEspecificoCtrl', ['$scope','$mdDialog','$mdToast','$location','recursoCrud','upload',function($scope,$mdDialog,$mdToast,$location,recursoCrud,upload) {

	$scope.temaEsp = {
        DesTemEsp:"",
        fkIdTem:null,
        fkIdCur:null
    };
	$scope.temaEspSel = {
        DesTemEsp:"",
        fkIdTem:null,
        fkIdCur:null
    };

    $scope.listRegisters = [];
    $scope.listaTemas = [];
    $scope.listaCursos = [];
    $scope.idCur = "";
    $scope.idTem = "";
	$scope.listaTemasEspe = [];

    $scope.listarCursos = function(){
		recursoCrud.listar("CursoService.php", {} ).then(
			function(data) {
				console.log("modalTema");
				$scope.listaCursos =data.data;	
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}
		);
	}

    $scope.listarTemas = function(IdCur){
		recursoCrud.listar("TemaService.php", {} ).then(
			function(data) {
				$scope.listaTemas = data.data;
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}
		);
	}

	$scope.listarTemasEspecificos = function(IdTem){
		recursoCrud.listar("TemaEspecificoService.php", {} ).then(
			function(data) {
				$scope.listaTemasEspe = data.data;
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}
		);
	}


	$scope.changeCurso = function(IdCur){

    }

 //DialogTema especifico
	$scope.prepareNew = function(ev){
		$mdDialog.show({
			controller: dialogTemaEspecifico,
			templateUrl: 'tablas/dialogTemaEspecifico.html',
			parent: angular.element(document.body),
			targetEvent: ev,
			clickOutsideToClose:true,
			locals: {title:'Nuevo Tema Especifico', data: {}, listaCursos: $scope.listaCursos, listaTemas: $scope.listaTemas}
		})
		.then(function(res) {
			//guardadno lo cambios hechos
			$scope.temaEsp = res;
			$scope.newRegister();

		}, function() {
			//cancelando la funcion
		});
	};
	$scope.prepareUpdate = function(ev,r){
		$scope.temaEspSel = r;
		$mdDialog.show({
			controller: dialogTemaEspecifico,
			templateUrl: 'tablas/dialogTemaEspecifico.html',
			parent: angular.element(document.body),
			targetEvent: ev,
			clickOutsideToClose:true,
			locals: {title:'Editar Tema Especifico', data: r, listaCursos: $scope.listaCursos, listaTemas: $scope.listaTemas}
		})
		.then(function(res) {
			//guardadno lo cambios hechos

			$scope.updateRegister(res);

		}, function() {
			//cancelando la funcion
		});
	};


	$scope.newRegister = function (){
		recursoCrud.insertar("TemaEspecificoService.php", $scope.temaEsp).then(
			function(data) {
				//console.log('entro aca 222');
				console.log('entro 1')
				$mdToast.show($mdToast.simple().textContent(data.mensaje).position('top right').hideDelay(2000));
				if(data.estado){
					console.log('entro 2')
					$scope.temaEsp.IdTemEsp = data.ID;
					$scope.listRegisters.push($scope.temaEsp);
					$scope.temaEsp = {};
					console.log('2')

				}
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}
		);
	};
	$scope.list = function (){
		recursoCrud.listar("TemaEspecificoService.php", {accion:3} ).then(
			function(data) {
				$scope.listRegisters = data.data;
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}
		);
    };
    
    
    $scope.listarFitro = function (data){
        console.log(data);
        recursoCrud.listar("TemaService.php", {} ).then(
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

        // DesTemEsp:"tema esp 1345523"
        // EstReg:"A"
        // fkIdCur:4
        // fkIdTem:11
        // IdTemEsp:9

		var register = {DesTemEsp:r.DesTemEsp,fkIdTem:r.fkIdTem,fkIdCur:r.fkIdCur};
		var IdTemEsp = {IdTemEsp:r.IdTemEsp};
		recursoCrud.actualizar("TemaEspecificoService.php", {dato:register,IdTemEsp:IdTemEsp} ).then(
			function(data) {
				$mdToast.show($mdToast.simple().textContent(data.mensaje).position('top right').hideDelay(2000));
				if(data.estado){
					recursoCrud.copiar($scope.temaEspSel,register);
					//console.log("entro aca 2")
          }
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}
		);
	};

	$scope.deleteRegister = function (i,r){
		var IdTemEsp = {IdTemEsp:r.IdTemEsp};

		recursoCrud.eliminar("TemaEspecificoService.php", IdTemEsp ).then(
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

function dialogTemaEspecifico($scope, $mdDialog,title,data,listaCursos,listaTemas) {
	$scope.title = title;
    $scope.listaCursos2 = listaCursos;
    $scope.listaTemas2 = listaTemas;
    $scope.temaEspSel = JSON.parse(JSON.stringify(data));
    $scope.cancel = function() {
        $mdDialog.cancel();
    };
    $scope.save = function() {
        $mdDialog.hide($scope.temaEspSel);
        console.log('funciona el save')
    };
};
 
