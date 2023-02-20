/*
    autor V1: Chapi Suyo Jesús
    Fecha: 17-10-2019
*/

INSERT INTO public.ma_pais(
	"Nom", "EstReg")
	VALUES ( 'Perú', 'A'),
    ( 'Argentina', 'A'),
    ( 'Bolivia', 'A'),
    ( 'Brazil', 'A'),
    ( 'Chile', 'A'),
    ( 'Colombia', 'A'),
    ( 'Ecuador', 'A')
    ;

INSERT INTO public.gzz_organizacion(
	 "NomOrg", "EstReg")
	VALUES ( 'UNSA', 'A'),
	       ( 'UCSM', 'A');

INSERT INTO public.gzz_sucursal(
	"NomSuc", "EstReg", "fkIdOrg")
	VALUES ('Arequipa', 'A', 1),
		   ('Mollendo', 'A', 1),
	       ('Camana', 'A', 1);

INSERT INTO public.ma_sexo(
	 "Des", "Acr", "EstReg")
	VALUES ( "Masculino", "M", "A"),
           ( "Femenino", "F", "A");

INSERT INTO public.ma_estado_civ(
	 "Des", "EstReg")
	VALUES ('Soltero', 'A'),
	('Casado', 'A'),
	('Viudo', 'A');

 INSERT INTO public.ma_ubigeo(
	nombre_ubigeo, codigo_ubigeo, etiqueta_ubigeo, buscador_ubigeo, numero_hijos_ubigeo, nivel_ubigeo, id_padre_ubigeo)
	VALUES

( 'Perú', '', 'Perú', 'perú', 25, 0, 0),
('Amazonas', '01', 'Amazonas, Perú', 'amazonas perú', 7, 1, 2533),
('Chachapoyas', '01', 'Chachapoyas, Amazonas', 'chachapoyas amazonas', 21, 2, 2534),
('Chachapoyas', '01', 'Chachapoyas, Chachapoyas', 'chachapoyas chachapoyas', 0, 3, 2535),
( 'Asuncion', '02', 'Asuncion, Chachapoyas', 'asuncion chachapoyas', 0, 3, 2535),
('Balsas', '03', 'Balsas, Chachapoyas', 'balsas chachapoyas', 0, 3, 2535),
('Cheto', '04', 'Cheto, Chachapoyas', 'cheto chachapoyas', 0, 3, 2535),
('Chiliquin', '05', 'Chiliquin, Chachapoyas', 'chiliquin chachapoyas', 0, 3, 2535);   

INSERT INTO public.ma_ventana(
	"VenID", "Nom", "Url", "Lin", "Ctr", "Ico", "EstReg", "VenPadID")
	VALUES 
(1,'Configuracion Sistema','','','','/config_sis.svg','A',NULL),
(2,'Admin','/admin','app/admin/admin.html','app/admin/adminCtrl.js','/admin.svg','A',1),
(3,'Ventanas','/ventana','app/admin/ventana.html','app/admin/ventanaCtrl.js','/ven.svg','A',1),
(4,'Roles','/roles','app/admin/roles.html','app/admin/rolCtrl.js','/rol.svg','A',1),
(5,'Organization','/empresa','app/admin/empresa.html','app/admin/empresaCtrl.js','/empresa.svg','A',NULL),
(6,'webSite','','','','/nuevo.svg','A',NULL),
(7,'Lista WebSite','/webSite','app/web/webSite.html','app/web/webSiteCtrl.js','/nuevo.svg','A',6),
(8,'Secciones','/container','app/web/container.html','app/web/containerCtrl.js','/nuevo.svg','A',6),
(9,'Tablas','','','','/administra.svg','A',NULL),
(10,'Dificultad','/dificultad','app/tablas/dificultad.html','app/tablas/dificultadCtrl.js','/ven.svg','A',9),
(11,'Libro','/libro','app/tablas/libro.html','app/tablas/libroCtrl.js','/nuePro.svg','A',9),
(12,'Area','/dificultad','app/tablas/area.html','app/tablas/areaCtrl.js','/area.svg','A',9),
(13,'Cursos','/curso','app/tablas/curso.html','app/tablas/cursoCtrl.js','/libro.svg','A',9),
(14,'Tema','/tema','app/tablas/tema.html','app/tablas/temaCtrl.js','/tema4.svg','A',9),
(15,'Pregunta','','','','/pregunta3.svg','A',NULL),
(16,'Pregunta','/pregunta','app/pregunta/pregunta.html','app/pregunta/preguntaCtrl.js','/pregunta4.svg','A',15),
(17,'Estadisticas','/estadisticas','app/pregunta/estadisticas.html','app/pregunta/estadisticasCtrl.js','/estadis.svg','A',15),
(18,'revisoruno','','','','/revisar.svg','A',NULL),
(19,'Revisor','/revisor','app/revisoruno/revisor.html','app/revisoruno/revisorCtrl.js','/revisar.svg','A',18),
(20,'test','/test','app/administracion/usuarios/registroDistribuidor.html','app/administracion/usuarios/registroDistribuidorCtrl.js','/refresh.svg','A',18),
(21,'listaSolicitudes','/listaSolicitudes','app/administracion/usuarios/listaSolicitudes.html','app/administracion/usuarios/listaSolicitudesCtrl.js','/eliminar.svg','A',18),
(22,'estattus','/estatus','app/administracion/usuarios/estatus.html','app/administracion/usuarios/estatusCtrl.js','/encendido.svg','A',18),
(23,'producto','/producto','app/administracion/productos/producto.html','app/administracion/productos/productoCtrl.js','/eliminar.svg','A',18),
(24,'listaPrecios','/listaPrecios','app/administracion/productos/listaPrecios.html','app/administracion/productos/listaPreciosCtrl.js','/right.svg','A',18),
(25,'categorias','/categorias','app/administracion/productos/categorias.html','app/administracion/productos/categoriaCtrl.js','/md-arrow.svg','A',18),
(26,'establecimientos','/establecimientos','app/administracion/establecimientos.html','app/administracion/establecimientosCtrl.js','/search.svg','A',18),
(27,'periodo','/periodo','app/administracion/periodo.html','app/administracion/trabajadorCtrl.js','/ubicar.svg','A',18),
(28,'trabajador','/trabajador','app/administracion/trabajador.html','app/administracion/trabajadorCtrl.js','/search.svg','A',18),
(29,'usuarios','/usuarios','app/usuarios/usuarios.html','app/usuarios/usuariosCtrl.js','/usuario.svg','A',18),
(30,'usuariosNuevo','/usuariosNuevo','app/usuarios/usuariosNuevo.html','app/usuarios/usuariosNuevoCtrl.js','/telefono.svg','A',18),
(31,'aaaaaaa','/aaaaaa','app/admin/administrador.html','app/admin/administradorCtrl.js','/first_page.svg','A',18);

INSERT INTO public.ma_rol(
	"Nom", "Des", "LisVen", "EstReg")
	VALUES ( 'administrador sistema','administrador de usuarios del sistema', 'Configuracion Empresa, Configuracion Sistema,', 'A'),
	( 'administrador','administrador de usuarios del sistema', 'Configuracion Empresa, Configuracion Sistema,', 'A'),
	( 'Comun','Comun', 'Preguntas, Revisor1,', 'A');


INSERT INTO public.ma_rol_ven(
	"RolID", "VenID", "Per", "NumOrd")
	VALUES  (1,1,'T',1),
            (2,5,'T',1),
            (2,6,'T',2),
            (3,15,'T',NULL),
            (3,18,'T',NULL);
	

INSERT INTO public.ma_persona(
	dni, "RUC", "Nom", "PriApe", "SegApe", "FecNac", "CiuPro", "DirAct", "Ema", "Tel", "Img", "FecCre", "EstReg", "SexId", "PaiID", "EstCivID", "Id_ubigeo", "ma_persona_PerID")
	VALUES ( 70845698, 11221, 'sandia', 'sandiape', 'sandiase', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'A', 1, 1, 1, 1, NULL),
    VALUES ( 43213451, 11221, 'tuna', 'sandiape', 'sandiase', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'A', 1, 1, 1, 1, NULL),
    VALUES ( 12345698, 11221, 'membrillo', 'sandiape', 'sandiase', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'A', 1, 1, 1, 1, NULL);

INSERT INTO public.ma_user(
	 "NomUsu", "Pas", "EstReg", "fkIdRol", "fkIdSuc", "fkIdPer")
	VALUES ('admin', 'admin', 'A', 1, 1, 1),
    ('administrador', 'administrador', 'A', 1, 1, 1),
    ('comun', 'comun', 'A', 1, 1, 1);

/*Actualizacion 
    Autor: 
    Fecha
*/
/*Agregando tema especifico*/
INSERT INTO public.ma_ventana(
	"Nom", "Url", "Lin", "Ctr", "Ico", "EstReg", "VenPadID")
	VALUES ('temaEspecifico', '/temaEspecifico', 'app/tablas/temaEspecifico.html', 'app/tablas/temaEspecificoCtrl.js', '/tema4.svg', 'A', 9);
