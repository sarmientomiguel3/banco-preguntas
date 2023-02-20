'use strict';

//controlador principal de toda la aplicacion
miApp.controller('usuariosNuevoCtrl', ['$scope', '$mdDialog', '$mdToast', '$location', 'recursoCrud', 'upload', function ($scope, $mdDialog, $mdToast, $location, recursoCrud, upload) {

    // var $scope = $scope;

    $scope.paises = [{ PaiID: 1, Nom: "peru" }, { PaiID: 2, Nom: "argentina" }, { PaiID: 3, Nom: "bolivia" }, { PaiID: 4, Nom: "brasil" }, { PaiID: 5, Nom: "chile" }, { PaiID: 6, Nom: "colombia" }, { PaiID: 7, Nom: "ecuador" }];

    $scope.listRoles = [];

    $scope.nuevoUsuario = {
        persona: {
            Img: "",
            dni: "",
            Nom: "",
            PriApe: "",
            SegApe: "",
            FecNac: "",
            SexId: "",
            Tel: "",
            Ema: "",
            PaiID: "",
            CiuPro: "",
            DirAct: ""
        },
        User: {
            NomUsu: "",
            pasNuevo: "",
            confirmacionPas: "",
            IdRol: ""
        }
    };

    $scope.pasAnterior = "";
    $scope.pasNuevo = "";
    $scope.NomUsu = "";
    $scope.imagen = {};

    $scope.cargarRoles = function () {
        recursoCrud.listar("ServicioRoles.php", { accion: 1, usuario: {} }).then(
            function (data) {
                $scope.listRoles = data.data;
            }
        )
    }

    $scope.cambiarContrasena = function (ev) {

        if ($scope.pasAnterior == "") {
            $mdToast.show($mdToast.simple().textContent("Ingrese Password Anterior").position('top right').hideDelay(2000));
            return;
        }
        if ($scope.pasNuevo == "") {
            $mdToast.show($mdToast.simple().textContent("Ingrese el Nuevo Password").position('top right').hideDelay(2000));
            return;
        }

        if ($scope.confirmacionPas !== $scope.pasNuevo) {
            $mdToast.show($mdToast.simple().textContent("la contraseña ingresada no coincide, ingrese de nuevo").position('top right').hideDelay(1000));
            $scope.confirmacionPas = "";
            return;
        }
        var confirm = $mdDialog.confirm()
            .title('Mensaje de Confirmacion?')
            .textContent('Esta seguro que desea cambiar su contraseña')
            .ariaLabel('Lucky day')
            .targetEvent(ev)
            .ok('Aceptar')
            .cancel('Cancelar');

        $mdDialog.show(confirm).then(function () {
            var u = { PasAnt: $scope.pasAnterior, Pas: $scope.pasNuevo, NomUsu: $scope.NomUsu };

            recursoCrud.actualizar("ServicioUsuario.php", { accion: 1, usuario: u }).then(
                function (data) {
                    $mdToast.show($mdToast.simple().textContent(data.mensaje).position('top right').hideDelay(2000));
                    if (data.estado) {
                        $scope.pasNuevo = "";
                        $scope.pasAnterior = "";
                        $scope.confirmacionPas = "";
                    }
                    //$scope.usuario.Pas = usuActualizar.Pas;
                }, function (data) {
                    $mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
                }, function (data) {
                    $mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
                }
            );
        }, function () {
        });

    };
    $scope.copiarDatos = function (u) {

        // $scope.usuario = {};
        // $scope.usuario.CiuPro = u.CiuPro;
        // $scope.usuario.dni = u.dni;
        // $scope.usuario.DirAct = u.DirAct;
        // $scope.usuario.Ema = u.Ema;
        // $scope.usuario.EstCivID = u.EstCivID;
        // $scope.usuario.FecNac = new Date(u.FecNac);
        // $scope.usuario.Nom = u.Nom;
        // $scope.usuario.PaiID = u.PaiID;
        // $scope.usuario.PriApe = u.PriApe;
        // $scope.usuario.RUC = u.RUC;
        // $scope.usuario.SegApe = u.SegApe;
        // $scope.usuario.SexId = u.SexId;
        // $scope.usuario.Tel = u.Tel;
        // $scope.usuario.Img = u.Img;

        // $scope.NomUsu = u.NomUsu;
    };
    $scope.actualizarDatos = function (u) {
        // u.CiuPro = $scope.usuario.CiuPro;
        // u.dni = $scope.usuario.dni;
        // u.DirAct = $scope.usuario.DirAct;
        // u.Ema = $scope.usuario.Ema;
        // u.EstCivID = $scope.usuario.EstCivID;
        // u.FecNac = $scope.usuario.FecNac;
        // u.Nom = $scope.usuario.Nom;
        // u.PaiID = $scope.usuario.PaiID;
        // u.PriApe = $scope.usuario.PriApe;
        // u.RUC = $scope.usuario.RUC;
        // u.SegApe = $scope.usuario.SegApe;
        // u.SexId = $scope.usuario.SexId;
        // u.Tel = $scope.usuario.Tel;
        // u.Img = $scope.usuario.Img;
        // localStorage.setItem("usuario", JSON.stringify(u));
    };
    // $scope.persona = {};
    $scope.persona = { Nom: "", PriApe: "", SegApe: "", FecNac: "", SexId: 'F', EstCivID: 1, Tel: "", Ema: "", CiuPro: "", PaiID: 0, DirAct: "", dni: "", RUC: "", EstReg: 'A' };
    $scope.usuario = {};

    $scope.guardarCambios = function (ev, u) {
        // console.log($scope.nuevoUsuario);
        var confirm = $mdDialog.confirm()
            .title('Mensaje de Confirmacion?')
            .textContent('Esta seguro que desea crear nuevo Usuario')
            .ariaLabel('Lucky day')
            .targetEvent(ev)
            .ok('Aceptar')
            .cancel('Cancelar');
        $mdDialog.show(confirm).then(function () {
            debugger;
            var personaID = { PerID: u.UseId };
            console.log("----------------------");
            console.log(u.persona);
            recursoCrud.insertar("ServicioPersona.php", { persona: $scope.nuevoUsuario.persona , usuario: $scope.nuevoUsuario.User }).then(
                function (res) {
                    if (res.estado) {

                        // if ($scope.imagen.name) {
                        //     upload.enviarArchivo2($scope.imagen, "archivos/usuarios/", $scope.usuario.Img, true).then(function (res2) {
                        //         $scope.imagen = {};
                        //         $scope.actualizarDatos(u);
                        //         $mdToast.show($mdToast.simple().textContent(res.mensaje).position('top right').hideDelay(2000));

                        //     });
                        // }
                        // else {
                        //     $scope.actualizarDatos(u);
                        //     $mdToast.show($mdToast.simple().textContent(res.mensaje).position('top right').hideDelay(2000));
                        // }
                        recursoCrud.insertar("")
                    }
                }, function (res) {
                    $mdToast.show($mdToast.simple().textContent(res).position('top right').hideDelay(6000));
                }, function (res) {
                    $mdToast.show($mdToast.simple().textContent(res).position('top right').hideDelay(6000));
                }
            );
        }, function () {
        });
    };

}]);


function validarDatos(persona, usuario) {

    // if(persona.dni == null || persona.dni == "" ){
    // 	return 'Ingrese el numero dni';
    // }
    // if( isNaN(persona.dni) || persona.dni.length != 8 ){
    // 	return 'El dni debe ser un numero de 8 digitos';
    // }
    // if(persona.Nom == null || persona.Nom == "" ){
    // 	return 'Ingrese nombre';
    // }
    // if(persona.PriApe == null || persona.PriApe == "" ){
    // 	return 'Ingrese primer apellido';
    // }
    // if(persona.SegApe == null || persona.SegApe == "" ){
    // 	return 'Ingrese segundo apellido';
    // }
    // if(persona.FecNac == null || persona.FecNac == ""){
    // 	return 'Ingrese fecha de nacimiento';
    // }
    // if(persona.SexId == 0 ){
    // 	return 'Elija el sexo de la persona';
    // }		
    // if(persona.EstCivID == 0 ){
    // 	return 'Elija el estado civil de la persona';
    // }
    // if(persona.Tel == null || persona.Tel == "" ){
    // 	return 'Ingrese numero de contacto';
    // }
    // if(persona.Ema == null || persona.Ema == "" ){
    // 	return 'Ingrese correo electronico';
    // }
    // if(persona.PaiID == 0 ){
    // 	return 'Elija pais de origen';
    // }
    // if(persona.CiuPro == null || persona.CiuPro == "" ){
    // 	return 'Ingrese ciudad o provincia';
    // }

    // if(usuario){
    // 	if( !usuario.NomUsu || usuario.NomUsu=="" )
    // 		return 'Ingrese Nombre usuario';
    // 	if( !usuario.Pas || usuario.Pas=="" )
    // 		return 'Ingrese Password';
    // }

    return "";
};