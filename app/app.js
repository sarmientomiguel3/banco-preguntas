'use strict';

/**
 * @name aplicacionn BancoUnsa
 * @autor	virex technology
 */
//Creando mi aplicacion
var menus = JSON.parse(localStorage.getItem('menu'));
var usr = localStorage.getItem('usuario');
var miApp = angular.module('miApp', [
	'ngRoute',		// cargando el módulo enrutador
	'ngMaterial'	//cargando nmaterial
]);


//enrutando los link de la aplicacion
miApp.config(['$routeProvider', '$mdThemingProvider', function ($routeProvider, $mdThemingProvider) {

	$mdThemingProvider.theme('default')
		.accentPalette('blue-grey', {
			'default': '500'
		});

	cargaRuteoApp($routeProvider, menus, usr);

	$routeProvider
		//login
		.when('/', {
		})
		//cualquier otro link vamos a la raiz
		.otherwise({
			redirectTo: '/'
		});
}]);
var ROL = 1;
//metodo run
miApp.run(['$rootScope', '$location', '$mdSidenav', '$mdDialog', 'recursoCrud', function ($rootScope, $location, $mdSidenav, $mdDialog, recursoCrud) {

	recursoCrud.validarToken();

	$rootScope.usuario = {};
	$rootScope.sectionSelect = {};
	$rootScope.menuSelect = {};
	$rootScope.secciones = [];
	$rootScope.ocultar = true;
	$rootScope.cargar = 0;

	if (usr) {
		$rootScope.usuario = JSON.parse(usr);
		$rootScope.usuario.Sim = $rootScope.usuario.Nom.substr(0, 1);
		$rootScope.secciones = JSON.parse(localStorage.getItem('menu'));
		$rootScope.periodo = JSON.parse(localStorage.getItem('periodo'));

		$rootScope.menuSelect = JSON.parse(localStorage.getItem('menuSelect'));
		$rootScope.sectionSelect = JSON.parse(localStorage.getItem('sectionSelect'));
		if (!$rootScope.menuSelect) {
			if ($rootScope.secciones[0].menus) {
				//$rootScope.sectionSelect = ($rootScope.sectionSelect === $rootScope.secciones[0].VenID ? null : $rootScope.secciones[0].VenID);
				$rootScope.menuSelect = $rootScope.secciones[0].menus[0].VenID;

				//document.getElementById("ven-"+$rootScope.sectionSelect).style.height = 39*$rootScope.secciones[0].menus.length+"px";
				localStorage.setItem('menuSelect', JSON.stringify($rootScope.menuSelect));
				localStorage.setItem('sectionSelect', JSON.stringify($rootScope.sectionSelect));

				$location.path($rootScope.secciones[0].menus[0].Url);
			}
			else {
				$rootScope.menuSelect = $rootScope.secciones[0].VenID;
				$location.path($rootScope.secciones[0].Url);
			}
		}
	};


	$rootScope.seleccionarMenu = function (menu) {
		//$rootScope.toggleSidenav('left');
		$rootScope.menuSelect = menu.VenID;
		localStorage.setItem('menuSelect', JSON.stringify($rootScope.menuSelect));

		//si no tengo padre cerramos los toggles
		if (menu.VenPadID == null) {
			$rootScope.sectionSelect = null;
			localStorage.setItem('sectionSelect', null);
		}

	};
	$rootScope.cerrarSession = function () {
		//reiniciando los atributos de la variable usuario
		recursoCrud.cerrarSession(function () {
			$rootScope.usuario = { nombreUsuario: "", rol: "" };
			localStorage.clear();
			$rootScope.menuSelect = null;
			//dirigiendonos al raiz de la aplicacion
			location.replace('/BancoUnsa/');//*/
		}, function () {
			$rootScope.usuario = { nombreUsuario: "", rol: "" };
			localStorage.clear();
			$rootScope.menuSelect = null;
			//dirigiendonos al raiz de la aplicacion
			location.replace('/BancoUnsa/');//*/

		});


	};

	$rootScope.toggleSidenav = function (name) {
		$mdSidenav(name).toggle();
	};

	$rootScope.isOpen = function (section) {
		return ($rootScope.sectionSelect === section.VenID);
	};
	$rootScope.toggleOpen = function (section) {
		document.getElementById("ven-" + section.VenID).style.height = 39 * section.menus.length + "px";
		$rootScope.sectionSelect = ($rootScope.sectionSelect === section.VenID ? null : section.VenID);
		localStorage.setItem('sectionSelect', JSON.stringify($rootScope.sectionSelect));
	};

	$rootScope.editarPerfil = function () {
		if ($rootScope.usuario.RolID > ROL) {
			//$mdSidenav("left").toggle();
			$location.path("/perfil");
		}
	};

	//tablas
	$rootScope.prevDificultad = function () {
		$location.path("/dificultad");
		localStorage.setItem('dificultad', null);

		//FALTA
		$rootScope.menuSelect = 5;
		localStorage.setItem('menuSelect', JSON.stringify($rootScope.menuSelect));
	};

	//LIBRO
	$rootScope.prevLibro = function () {
		$location.path("/libro");
		localStorage.setItem('libro', null);

		//FALTA
		$rootScope.menuSelect = 5;
		localStorage.setItem('menuSelect', JSON.stringify($rootScope.menuSelect));
	};

	//CURSO
	$rootScope.prevCurso = function () {
		$location.path("/curso");
		localStorage.setItem('curso', null);

		//FALTA
		$rootScope.menuSelect = 5;
		localStorage.setItem('menuSelect', JSON.stringify($rootScope.menuSelect));
	};

	//AREA
	$rootScope.prevArea = function () {
		$location.path("/area");
		localStorage.setItem('area', null);

		//FALTA
		$rootScope.menuSelect = 5;
		localStorage.setItem('menuSelect', JSON.stringify($rootScope.menuSelect));
	};

	//TEMA
	// $rootScope.prevTema = function () {
	// 	$location.path("/tema");
	// 	localStorage.setItem('tema', null);

	// 	//FALTA
	// 	$rootScope.menuSelect = 5;
	// 	localStorage.setItem('menuSelect', JSON.stringify($rootScope.menuSelect));
	// };

	//PREGUNTA
	//TEMA
	$rootScope.prevPregunta = function () {
		$location.path("/pregunta");
		localStorage.setItem('pregunta', null);

		//FALTA
		$rootScope.menuSelect = 5;
		localStorage.setItem('menuSelect', JSON.stringify($rootScope.menuSelect));
	};

	//Hechas
	$rootScope.prevEstadisticas = function () {
		$location.path("/estadisticas");
		localStorage.setItem('estadisticas', null);

		//FALTA
		$rootScope.menuSelect = 5;
		localStorage.setItem('menuSelect', JSON.stringify($rootScope.menuSelect));
	};



	//Revisor
	$rootScope.prevRevisor = function () {
		$location.path("/revisor");
		localStorage.setItem('revisor', null);

		//FALTA
		$rootScope.menuSelect = 5;
		localStorage.setItem('menuSelect', JSON.stringify($rootScope.menuSelect));
	};
	//REVISOR 1
	$rootScope.prevRevisor1 = function () {
		$location.path("/revisor");
		localStorage.setItem('revisor', null);

		//FALTA
		$rootScope.menuSelect = 5;
		localStorage.setItem('menuSelect', JSON.stringify($rootScope.menuSelect));
	};
	//Asignar
	$rootScope.prevRevisor1 = function () {
		$location.path("/asignar");
		localStorage.setItem('asignar', null);

		//FALTA
		$rootScope.menuSelect = 5;
		localStorage.setItem('menuSelect', JSON.stringify($rootScope.menuSelect));
	};

	// de la pagina
	$rootScope.prevWebSite = function () {
		$location.path("/webSite");
		localStorage.setItem('website', null);

		//FALTA
		$rootScope.menuSelect = 5;
		localStorage.setItem('menuSelect', JSON.stringify($rootScope.menuSelect));
	};
	$rootScope.showWebSite = function (webID) {
		var win = window.open('../website/#' + webID, '_blank');
		win.focus();
	};
	$rootScope.prepareConfig = function (website) {
		//FALTA
		localStorage.setItem('website', JSON.stringify(website));
		$location.path("/container");

		//FALTA
		$rootScope.menuSelect = 6;
		localStorage.setItem('menuSelect', JSON.stringify($rootScope.menuSelect));
	};
	$rootScope.verify = function (website) {
		if (!website) {
			//FALTA
			$rootScope.menuSelect = 5;
			localStorage.setItem('menuSelect', JSON.stringify($rootScope.menuSelect));
			$location.path("/webSite");
			//FALTA
			alert('cree o seleccione una WebSite');
			return false;
		}

		return true;
	};
//ASIGNACION
	$rootScope.prevAsignacion = function () {
		$location.path("/asignacion");
		localStorage.setItem('asignacion', null);

		//FALTA
		$rootScope.menuSelect = 5;
		localStorage.setItem('menuSelect', JSON.stringify($rootScope.menuSelect));
	};

	// de la pagina

	/*
	//funcion que se llama antes de cambiar la ruta (link)
	$rootScope.$on('$routeChangeStart', function(event, next, current) {

		if ( localStorage.getItem('usuario') == null ) {
			$location.path('/');
		}
		else {
			var usuario = localStorage.getItem('usuario');

			if( next.templateUrl == 'app/login.html' )
				$location.path('/');


			//if(next.templateUrl == 'views/inicio.html' || usuario.puesto != 1) {
				//$location.path('/tareas');
			//}
		}
	});*/
    /*
    var texto = "C++ eh, mais do que legal, muito legal";
	var padrao = "legal";

	miBusqueda(texto, padrao);*/

}]);
cargaArchivosJavascript(menus);
function cargaArchivosJavascript(menus) {

	if (menus)
		for (var i = 0; i < menus.length; i++) {
			if (menus[i].menus)
				cargaArchivosJavascriptSubMenu(menus[i].menus);
			else
				document.write('<script src="../' + menus[i].Ctr + '"></script>');
		}
	if (usr) {
		var usuario = JSON.parse(usr);
		if (usuario.RolID > ROL)
			document.write("<scr" + "ipt language=\"JavaScript\" src=\"administracion/perfil.js\"></scr" + "ipt>");
		//if(usuario.RolID==2)
		document.write("<scr" + "ipt language=\"JavaScript\" src=\"../resources/js/chart.js\"></scr" + "ipt>");
	}
};
function cargaArchivosJavascriptSubMenu(submenus) {
	for (var i = 0; i < submenus.length; i++) {
		document.write('<script src="../' + submenus[i].Ctr + '"></script>');
	}
};
function cargaRuteoApp(router, menus, usr) {
	if (menus)
		for (var k = 0; k < menus.length; k++) {
			if (menus[k].menus) {
				console.log(menus[k].Nom);
				cargaSubMenus(router, menus[k].menus);
			}
			else {
				var pi = menus[k].Ctr.lastIndexOf("/") + 1;
				var pf = menus[k].Ctr.lastIndexOf(".");

				var menu = menus[k].Ctr.substr(pi, pf - pi);

				console.log(menu);

				router.when(menus[k].Url, {
					templateUrl: "../" + menus[k].Lin,
					controller: menu,
					controllerAs: menu
				});
			}
		}
	if (usr) {
		var usuario = JSON.parse(usr);
		if (usuario.RolID > ROL){
			router.when("/perfil", {
				templateUrl: "administracion/perfil.html",
				controller: "perfilCtrl",
				controllerAs: "vm"
			});
			router.when("/pregunta/:IdPre", {
				templateUrl: "pregunta/pregunta.html",
				controller: "preguntaCtrl",
				controllerAs: "vm"
			});
		}
	}

};
function cargaSubMenus(router, submenus) {
	for (var k = 0; k < submenus.length; k++) {
		var pi = submenus[k].Ctr.lastIndexOf("/") + 1;
		var pf = submenus[k].Ctr.lastIndexOf(".");

		var submenu = submenus[k].Ctr.substr(pi, pf - pi);

		console.log("\t" + submenu);

		router.when(submenus[k].Url, {
			templateUrl: "../" + submenus[k].Lin,
			controller: submenu,
			controllerAs: 'ctrl'
		});
	}
};
