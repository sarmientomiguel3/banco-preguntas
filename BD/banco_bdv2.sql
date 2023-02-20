/*
Created: 24/10/2017
Modified: 18/06/2019
Model: iamd_db
Database: MySQL 5.5
*/


-- Create tables section -------------------------------------------------

-- Table WS_WEBSITE

CREATE TABLE `WS_WEBSITE`
(
  `OrgID` Int NOT NULL
 COMMENT 'ID Organization own',
  `WebSitID` Int NOT NULL
 COMMENT 'id of the website',
  `Dom` Varchar(64)
 COMMENT 'Domain name of the website',
  `Des` Varchar(256)
 COMMENT 'Description of the website',
  `Tit` Varchar(64)
 COMMENT 'Tittle of the website',
  `CreDat` Datetime NOT NULL
 COMMENT 'data of create the regyster',
  `CreByID` Int NOT NULL
 COMMENT 'Created by, especific ID the user that create of register',
  `UpdDat` Timestamp NULL
 COMMENT 'Update Date of the actualization of the register',
  `UpdByID` Int
 COMMENT 'Update By, ID user that updating the register',
  `RegSta` Char(1) NOT NULL
 COMMENT 'Register State'
)
;

ALTER TABLE `WS_WEBSITE` ADD  PRIMARY KEY (`WebSitID`,`OrgID`)
;

-- Table MA_ORGANIZATION

CREATE TABLE `MA_ORGANIZATION`
(
  `OrgID` Int NOT NULL
 COMMENT 'id of the organization own',
  `Nam` Varchar(64)
 COMMENT 'Organization name',
  `Des` Varchar(256)
 COMMENT 'Description of the organization',
  `Ema` Varchar(64) NOT NULL
 COMMENT 'Email ofice the organization',
  `CreDat` Datetime NOT NULL
 COMMENT 'data of create the regyster',
  `CreByID` Int
 COMMENT 'Created by, especific ID the user that create of register',
  `UpdDat` Timestamp NULL
 COMMENT 'Update Date of the actualization of the register',
  `UpdByID` Int
 COMMENT 'Update By, ID user that updating the register',
  `RegSta` Char(1) NOT NULL
 COMMENT 'Register State'
)
;

ALTER TABLE `MA_ORGANIZATION` ADD  PRIMARY KEY (`OrgID`)
;

ALTER TABLE `MA_ORGANIZATION` ADD UNIQUE `Ema` (`Ema`)
;

-- Table WS_CONTAINER

CREATE TABLE `WS_CONTAINER`
(
  `ConID` Int NOT NULL
 COMMENT 'id of the container',
  `Tit` Varchar(64)
 COMMENT 'Organization title',
  `Url` Varchar(32)
 COMMENT 'Url of the container',
  `Ord` Smallint
 COMMENT 'Orden or priority in show',
  `CreDat` Datetime NOT NULL
 COMMENT 'data of create the regyster',
  `CreByID` Int NOT NULL
 COMMENT 'Created by, especific ID the user that create of register',
  `UpdDat` Timestamp NULL
 COMMENT 'Update Date of the actualization of the register',
  `UpdByID` Int
 COMMENT 'Update By, ID user that updating the register',
  `RegSta` Char(1) NOT NULL
 COMMENT 'Register State',
  `WebSitID` Int NOT NULL
 COMMENT 'ID of the website',
  `OrgID` Int NOT NULL
 COMMENT 'ID of the organization'
)
;

CREATE INDEX `IX_Relationship4` ON `WS_CONTAINER` (`WebSitID`,`OrgID`)
;

ALTER TABLE `WS_CONTAINER` ADD  PRIMARY KEY (`ConID`)
;

-- Table WS_SECTION

CREATE TABLE `WS_SECTION`
(
  `SecID` Int NOT NULL
 COMMENT 'id of the section',
  `Title` Varchar(64)
 COMMENT 'Section title',
  `Tit2` Varchar(64)
 COMMENT 'Title second',
  `Img` Varchar(32)
 COMMENT 'Imagen main',
  `Img2` Varchar(32)
 COMMENT 'Image second',
  `CreDat` Datetime NOT NULL
 COMMENT 'data of create the regyster',
  `CreByID` Int NOT NULL
 COMMENT 'Created by, especific ID the user that create of register',
  `UpdDat` Timestamp NULL
 COMMENT 'Update Date of the actualization of the register',
  `UpdByID` Int
 COMMENT 'Update By, ID user that updating the register',
  `RegSta` Char(1) NOT NULL
 COMMENT 'Register State'
)
;

ALTER TABLE `WS_SECTION` ADD  PRIMARY KEY (`SecID`)
;

-- Table WS_CONTENT_INF

CREATE TABLE `WS_CONTENT_INF`
(
  `ConInfID` Int NOT NULL
 COMMENT 'id of the content information',
  `Tit` Varchar(64)
 COMMENT 'Title main',
  `Tit2` Varchar(64)
 COMMENT 'Title second',
  `Img` Varchar(32)
 COMMENT 'Image 1 do item',
  `Img2` Varchar(32)
 COMMENT 'Image 2 do item',
  `Img3` Varchar(32)
 COMMENT 'Image 3 do item',
  `CreDat` Datetime NOT NULL
 COMMENT 'data of create the regyster',
  `CreByID` Int NOT NULL
 COMMENT 'Created by, especific ID the user that create of register',
  `UpdDat` Timestamp NULL
 COMMENT 'Update Date of the actualization of the register',
  `UpdByID` Int
 COMMENT 'Update By, ID user that updating the register',
  `RegSta` Char(1) NOT NULL
 COMMENT 'Register State',
  `ConParID` Int
 COMMENT 'Id of the content parent',
  `WebSitID` Int NOT NULL,
  `OrgID` Int NOT NULL,
  `ConID` Int NOT NULL
)
;

CREATE INDEX `IX_Relationship6` ON `WS_CONTENT_INF` (`ConParID`)
;

CREATE INDEX `IX_Relationship8` ON `WS_CONTENT_INF` (`WebSitID`,`OrgID`)
;

CREATE INDEX `IX_Relationship9` ON `WS_CONTENT_INF` (`ConID`)
;

ALTER TABLE `WS_CONTENT_INF` ADD  PRIMARY KEY (`ConInfID`)
;

-- Table WS_LINK

CREATE TABLE `WS_LINK`
(
  `LinkID` Int NOT NULL
 COMMENT 'id of the link',
  `Url` Varchar(64)
 COMMENT 'Url destination',
  `Typ` Char(1)
 COMMENT 'Type of link I: inner E: outner',
  `Tit` Varchar(32)
 COMMENT 'Title of the link',
  `Lab` Varchar(32)
 COMMENT 'Label for show in the link',
  `CreDat` Datetime NOT NULL
 COMMENT 'data of create the regyster',
  `CreByID` Int NOT NULL
 COMMENT 'Created by, especific ID the user that create of register',
  `UpdDat` Timestamp NULL
 COMMENT 'Update Date of the actualization of the register',
  `UpdByID` Int
 COMMENT 'Update By, ID user that updating the register',
  `RegSta` Char(1) NOT NULL
 COMMENT 'Register State',
  `ConInfID` Int NOT NULL
)
;

CREATE INDEX `IX_Relationship5` ON `WS_LINK` (`ConInfID`)
;

ALTER TABLE `WS_LINK` ADD  PRIMARY KEY (`LinkID`)
;

-- Table WS_CONTENT_SPE

CREATE TABLE `WS_CONTENT_SPE`
(
  `ConInfID` Int NOT NULL,
  `Tit` Varchar(64)
 COMMENT 'Section title',
  `Tit2` Varchar(64)
 COMMENT 'Title second',
  `Des` Text
 COMMENT 'Description of the content',
  `Des2` Text
 COMMENT 'Description second of the content',
  `Phr` Varchar(128)
 COMMENT 'same phrase for show',
  `CreDat` Datetime NOT NULL
 COMMENT 'data of create the regyster',
  `CreByID` Int NOT NULL
 COMMENT 'Created by, especific ID the user that create of register',
  `UpdDat` Timestamp NULL
 COMMENT 'Update Date of the actualization of the register',
  `UpdByID` Int
 COMMENT 'Update By, ID user that updating the register',
  `RegSta` Char(1) NOT NULL
 COMMENT 'Register State'
)
;

ALTER TABLE `WS_CONTENT_SPE` ADD  PRIMARY KEY (`ConInfID`)
;

-- Table MA_USER

CREATE TABLE `MA_USER`
(
  `UseId` Int NOT NULL,
  `NomUsu` Varchar(16) NOT NULL
 COMMENT 'nombre de usuario para acceder al sistema',
  `Pas` Varchar(16)
 COMMENT 'password para acceder al sistema',
  `EstReg` Char(1),
  `RolID` Tinyint UNSIGNED NOT NULL,
  `OrgID` Int NOT NULL,
  `PerID` Int NOT NULL
)
;

CREATE INDEX `IX_Relationship41` ON `MA_USER` (`RolID`)
;

CREATE INDEX `IX_Relationship42` ON `MA_USER` (`OrgID`)
;

CREATE INDEX `IX_Relationship44` ON `MA_USER` (`PerID`)
;

ALTER TABLE `MA_USER` ADD  PRIMARY KEY (`UseId`)
;

ALTER TABLE `MA_USER` ADD UNIQUE `NomUsu` (`NomUsu`)
;

-- Table MA_SEXO

CREATE TABLE `MA_SEXO`
(
  `SexId` Char(1) NOT NULL,
  `Des` Char(9)
 COMMENT 'nombre descripcion de la sexualidad'
)
;

ALTER TABLE `MA_SEXO` ADD  PRIMARY KEY (`SexId`)
;

-- Table MA_VENTANA

CREATE TABLE `MA_VENTANA`
(
  `VenID` Tinyint UNSIGNED NOT NULL AUTO_INCREMENT,
  `Nom` Varchar(32),
  `Url` Varchar(32),
  `Lin` Varchar(64),
  `Ctr` Varchar(64)
 COMMENT 'controlador de la ventana',
  `Ico` Varchar(16)
 COMMENT 'imagen asociada al menu',
  `EstReg` Char(1),
  `VenPadID` Tinyint UNSIGNED,
  PRIMARY KEY (`VenID`)
)
;

CREATE INDEX `IX_Relationship78` ON `MA_VENTANA` (`VenPadID`)
;

-- Table MA_ESTADO_CIV

CREATE TABLE `MA_ESTADO_CIV`
(
  `EstCivID` Tinyint NOT NULL AUTO_INCREMENT,
  `Des` Varchar(16),
  PRIMARY KEY (`EstCivID`)
)
;

-- Table MA_ROL_VEN

CREATE TABLE `MA_ROL_VEN`
(
  `RolID` Tinyint UNSIGNED NOT NULL,
  `VenID` Tinyint UNSIGNED NOT NULL,
  `Per` Char(1),
  `NumOrd` Tinyint
)
;

ALTER TABLE `MA_ROL_VEN` ADD  PRIMARY KEY (`VenID`,`RolID`)
;

-- Table MA_PAIS

CREATE TABLE `MA_PAIS`
(
  `PaiID` Tinyint UNSIGNED NOT NULL AUTO_INCREMENT,
  `Nom` Varchar(16),
  PRIMARY KEY (`PaiID`)
)
;

-- Table MA_ROL

CREATE TABLE `MA_ROL`
(
  `RolID` Tinyint UNSIGNED NOT NULL AUTO_INCREMENT,
  `Nom` Varchar(24),
  `Des` Varchar(256),
  `LisVen` Varchar(256),
  `EstReg` Char(1),
  PRIMARY KEY (`RolID`)
)
;

-- Table MA_REGISTER_LOG

CREATE TABLE `MA_REGISTER_LOG`
(
  `RegLogID` Int NOT NULL AUTO_INCREMENT,
  `FecIniSes` Datetime
 COMMENT 'Fecha de inicio de la session del usuario',
  `FecFinSes` Datetime
 COMMENT 'Fecha de finalizacion de la session del usuario',
  `UsuID` Int,
  `UseId` Int NOT NULL,
  PRIMARY KEY (`RegLogID`)
)
;

CREATE INDEX `IX_Relationship43` ON `MA_REGISTER_LOG` (`UseId`)
;

-- Table MA_PERSONA

CREATE TABLE `MA_PERSONA`
(
  `PerID` Int NOT NULL AUTO_INCREMENT,
  `dni` Bigint,
  `RUC` Bigint,
  `Nom` Varchar(64),
  `PriApe` Varchar(32),
  `SegApe` Varchar(32),
  `FecNac` Date,
  `CiuPro` Varchar(32)
 COMMENT 'ciuddad o provincia de la persona',
  `DirAct` Varchar(64),
  `Ema` Varchar(64)
 COMMENT 'direccion de correo electronico',
  `Tel` Varchar(64)
 COMMENT 'numeros de telefonos separadaos por ,',
  `Img` Varchar(16)
 COMMENT 'imagen que identifica a la persona',
  `FecCre` Datetime,
  `EstReg` Char(1),
  `SexId` Char(1) NOT NULL,
  `PaiID` Tinyint UNSIGNED NOT NULL,
  `EstCivID` Tinyint NOT NULL,
  `id_ubigeo` Int,
  PRIMARY KEY (`PerID`)
)
;

CREATE INDEX `IX_Relationship25` ON `MA_PERSONA` (`PaiID`)
;

CREATE INDEX `IX_Relationship58` ON `MA_PERSONA` (`id_ubigeo`)
;

-- Table EG4_EXAMEN

CREATE TABLE `EG4_EXAMEN`
(
  `OrgID` Int NOT NULL,
  `IdExa` Int NOT NULL
 COMMENT 'Identificador de Examen',
  `FecExa` Date NOT NULL
 COMMENT 'Fecha de Examen',
  `CreDat` Datetime NOT NULL,
  `CreByID` Int NOT NULL,
  `UpdByID` Int
 COMMENT 'Actualizado por = ID',
  `UpdDat` Timestamp NULL
 COMMENT 'Fecha de actualizacion de registro',
  `EstReg` Char(1) NOT NULL
 COMMENT 'Estado de registro',
  `IDFasExa` Int NOT NULL,
  `IDProExam` Int(4) NOT NULL,
  `IDAre` Int(2) NOT NULL
)
;

ALTER TABLE `EG4_EXAMEN` ADD  PRIMARY KEY (`IdExa`,`OrgID`,`IDFasExa`,`IDProExam`,`IDAre`)
;

ALTER TABLE `EG4_EXAMEN` ADD UNIQUE `IdExa` (`IdExa`)
;

-- Table EG4_EXAMEN_DETALLE

CREATE TABLE `EG4_EXAMEN_DETALLE`
(
  `CreDat` Datetime NOT NULL
 COMMENT 'Fecha de creacion de la pregunta',
  `CreByID` Int NOT NULL
 COMMENT 'Identificador del que creo la pregunta',
  `UpdDat` Timestamp NULL
 COMMENT 'Fecha de actualizacion de la pregunta',
  `UpdByID` Int
 COMMENT 'ID del que actualizo el registro',
  `EstReg` Char(1) NOT NULL,
  `IdExa` Int NOT NULL,
  `OrgID` Int NOT NULL,
  `IdPre` Int(6) NOT NULL,
  `IdAreSug` Int(2) NOT NULL,
  `IdDif` Int(2) NOT NULL,
  `IDLib` Int(4) NOT NULL,
  `IdCur` Int(4) NOT NULL,
  `IdTem` Int(4) NOT NULL,
  `IDEstRev` Int NOT NULL,
  `IDFasExa` Int NOT NULL,
  `IDProExam` Int(4) NOT NULL,
  `IDAre` Int(2) NOT NULL
)
;

ALTER TABLE `EG4_EXAMEN_DETALLE` ADD  PRIMARY KEY (`IdExa`,`OrgID`,`IdPre`,`IdAreSug`,`IdDif`,`IDLib`,`IdCur`,`IdTem`,`IDEstRev`,`IDFasExa`,`IDProExam`,`IDAre`)
;

-- Table G2_PREGUNTA

CREATE TABLE `G2_PREGUNTA`
(
  `IdPre` Int(6) NOT NULL
 COMMENT 'Identificador de la Pregunta',
  `TxtPre` Varchar(2024) NOT NULL
 COMMENT 'Texto Referencial de Pregunta',
  `CreDat` Datetime NOT NULL
 COMMENT 'Fecha de creacion',
  `CreByID` Int NOT NULL
 COMMENT 'identificador del creador del registro',
  `UpdDat` Timestamp NULL
 COMMENT 'Fecha de actualizacion del registro',
  `UpdByID` Int
 COMMENT 'ID del que actualizo el registro',
  `EstReg` Char(1) NOT NULL
 COMMENT 'Estado de registro de la pregunta (A, E, I)',
  `IdAreSug` Int(2) NOT NULL,
  `IdDif` Int(2) NOT NULL,
  `IDLib` Int(4) NOT NULL,
  `IdCur` Int(4) NOT NULL,
  `IdTem` Int(4) NOT NULL,
  `IDEstRev` Int NOT NULL
)
;

ALTER TABLE `G2_PREGUNTA` ADD  PRIMARY KEY (`IdPre`,`IdAreSug`,`IdDif`,`IDLib`,`IdCur`,`IdTem`,`IDEstRev`)
;

ALTER TABLE `G2_PREGUNTA` ADD UNIQUE `IdPre` (`IdPre`)
;

-- Table G2_ALTERNATIVAS

CREATE TABLE `G2_ALTERNATIVAS`
(
  `IDAlt` Int NOT NULL,
  `DesAlt` Varchar(200) NOT NULL
 COMMENT 'Descripcion de la alternativa',
  `TipAlt` Varchar(15) NOT NULL
 COMMENT 'Tipo de alternativa (verdadera o falsa)',
  `AcrAlt` Char(1) NOT NULL
 COMMENT 'Acronimo de la alternativa (V, F)',
  `CreDat` Datetime NOT NULL
 COMMENT 'Fecha de creacion del registro',
  `CreByID` Int NOT NULL
 COMMENT 'ID del creador de la alternativa',
  `UpdDat` Timestamp NULL
 COMMENT 'Fecha de actualizacion del registro',
  `UpdByID` Int
 COMMENT 'ID de actualizacion del registro',
  `EstReg` Char(1) NOT NULL
 COMMENT 'Estado de registro (A, E, I)',
  `IdPre` Int(6) NOT NULL,
  `IdAreSug` Int(2) NOT NULL,
  `IdDif` Int(2) NOT NULL,
  `IDLib` Int(4) NOT NULL,
  `IdCur` Int(4) NOT NULL,
  `IdTem` Int(4) NOT NULL,
  `IDEstRev` Int NOT NULL
)
;

ALTER TABLE `G2_ALTERNATIVAS` ADD  PRIMARY KEY (`IDAlt`,`IdPre`,`IdAreSug`,`IdDif`,`IDLib`,`IdCur`,`IdTem`,`IDEstRev`)
;

ALTER TABLE `G2_ALTERNATIVAS` ADD UNIQUE `IdAlt` (`IDAlt`)
;

-- Table GZZ_TEMA_ESPECIFICO

CREATE TABLE `GZZ_TEMA_ESPECIFICO`
(
  `IdTem` Int(4) NOT NULL
 COMMENT 'Codigo del tema de una pregunta',
  `DesTem` Varchar(120) NOT NULL
 COMMENT 'Descripcion del tema de la pregunta',
  `CreDat` Datetime NOT NULL
 COMMENT 'Fecha de creacion del registro',
  `CreByID` Int NOT NULL
 COMMENT 'ID de creador del registro',
  `UpdDat` Timestamp NULL
 COMMENT 'Fecha de actualizacion del registro',
  `UpdByID` Int
 COMMENT 'ID del que actulizo el registro',
  `EstReg` Char(1) NOT NULL
 COMMENT 'Estado de registro (A,I,E)'
)
;

ALTER TABLE `GZZ_TEMA_ESPECIFICO` ADD  PRIMARY KEY (`IdTem`)
;

ALTER TABLE `GZZ_TEMA_ESPECIFICO` ADD UNIQUE `IdTem` (`IdTem`)
;

-- Table GZZ_AREA_SUGERIDA

CREATE TABLE `GZZ_AREA_SUGERIDA`
(
  `IdAreSug` Int(2) NOT NULL
 COMMENT 'codigo de  area sugerida',
  `DesAreSug` Varchar(50) NOT NULL
 COMMENT 'descripcion area sugerida',
  `CreDat` Datetime NOT NULL
 COMMENT 'Fecha de creacion',
  `CreByID` Int NOT NULL
 COMMENT 'ID del creador',
  `UpdDat` Timestamp NULL
 COMMENT 'Fecha de actualizacion',
  `UpdByID` Int
 COMMENT 'ID del que actualizo el registro',
  `EstReg` Char(1) NOT NULL
 COMMENT 'estado del area sugerida'
)
;

ALTER TABLE `GZZ_AREA_SUGERIDA` ADD  PRIMARY KEY (`IdAreSug`)
;

ALTER TABLE `GZZ_AREA_SUGERIDA` ADD UNIQUE `IdAreSug` (`IdAreSug`)
;

-- Table GZZ_DIFICULTAD

CREATE TABLE `GZZ_DIFICULTAD`
(
  `IdDif` Int(2) NOT NULL
 COMMENT 'id de la dificultad de pregunta',
  `DesDif` Varchar(50) NOT NULL
 COMMENT 'descripcion de la dificultad ',
  `CreDat` Datetime NOT NULL
 COMMENT 'Fecha de creacion',
  `CreByID` Int NOT NULL
 COMMENT 'ID del que creo el registro',
  `UpdDat` Timestamp NULL
 COMMENT 'Fecha de actualizacion del registro',
  `UpdByID` Int
 COMMENT 'ID del que actualizo el registro',
  `EstReg` Char(1) NOT NULL
)
;

ALTER TABLE `GZZ_DIFICULTAD` ADD  PRIMARY KEY (`IdDif`)
;

ALTER TABLE `GZZ_DIFICULTAD` ADD UNIQUE `IdDif` (`IdDif`)
;

-- Table GZZ_FASE_EXAMEN

CREATE TABLE `GZZ_FASE_EXAMEN`
(
  `IDFasExa` Int NOT NULL
 COMMENT 'codigo de fase del Examen',
  `DesFasExa` Varchar(80) NOT NULL
 COMMENT 'descripcion de fase del examen',
  `CreDat` Datetime NOT NULL
 COMMENT 'Fecha de creacion',
  `CreByID` Int NOT NULL
 COMMENT 'Identificador del creador',
  `UpdDat` Timestamp NULL
 COMMENT 'Fecha de actualizacion',
  `UpdByID` Int
 COMMENT 'Id del que actualizo el registro',
  `EstReg` Char(1) NOT NULL
 COMMENT 'Estado de fase del examen'
)
;

ALTER TABLE `GZZ_FASE_EXAMEN` ADD  PRIMARY KEY (`IDFasExa`)
;

ALTER TABLE `GZZ_FASE_EXAMEN` ADD UNIQUE `IdFasExa` (`IDFasExa`)
;

-- Table GZZ_PROCESO_EXAMEN

CREATE TABLE `GZZ_PROCESO_EXAMEN`
(
  `IDProExam` Int(4) NOT NULL
 COMMENT 'codigo del proceso del examen',
  `NomProcExam` Varchar(50) NOT NULL
 COMMENT 'nombre del proceso del examen',
  `CreDat` Datetime NOT NULL
 COMMENT 'Fecha de creacion del registro',
  `CreByID` Int NOT NULL
 COMMENT 'ID del creador del registro',
  `UpdDat` Timestamp NULL
 COMMENT 'Fecha de actualizacion del registro',
  `UpdByID` Int
 COMMENT 'ID del que actualizo el registro',
  `EstReg` Char(1) NOT NULL
 COMMENT 'estado del proceso de examen'
)
;

ALTER TABLE `GZZ_PROCESO_EXAMEN` ADD  PRIMARY KEY (`IDProExam`)
;

ALTER TABLE `GZZ_PROCESO_EXAMEN` ADD UNIQUE `IdProExam` (`IDProExam`)
;

-- Table GZZ_AREA_EXAMEN

CREATE TABLE `GZZ_AREA_EXAMEN`
(
  `IDAre` Int(2) NOT NULL
 COMMENT 'codigo de  area (sociales, biomedicas, ingenieria ...)',
  `DesAre` Varchar(50) NOT NULL
 COMMENT ' Descripcion del area (sociales, biomedicas, ingenieria ...)',
  `CreDat` Datetime NOT NULL
 COMMENT 'Fecha de creacion del registro',
  `CreByID` Int NOT NULL
 COMMENT 'ID del que creo el registro',
  `UpdDat` Timestamp NULL
 COMMENT 'Fecha de la actualizacion del registro',
  `UpdByID` Int
 COMMENT 'ID del que actualizo el registro',
  `EstReg` Char(1) NOT NULL
 COMMENT ' Estado de registro del area (sociales, biomedicas, ingenieria ...)'
)
;

ALTER TABLE `GZZ_AREA_EXAMEN` ADD  PRIMARY KEY (`IDAre`)
;

ALTER TABLE `GZZ_AREA_EXAMEN` ADD UNIQUE `idAre` (`IDAre`)
;

-- Table GZZ_CURSO

CREATE TABLE `GZZ_CURSO`
(
  `IdCur` Int(4) NOT NULL
 COMMENT 'Codigo del curso',
  `NomCur` Varchar(50) NOT NULL
 COMMENT 'nombre del curso',
  `CreDat` Datetime NOT NULL
 COMMENT 'Fecha de creacion del registro',
  `CreByID` Int NOT NULL
 COMMENT 'ID del creador del registro',
  `UpdDat` Timestamp NULL
 COMMENT 'Fecha de actualizacion del registro',
  `UpdByID` Int
 COMMENT 'ID del que actualizo el registro',
  `EstReg` Char(1) NOT NULL
)
;

ALTER TABLE `GZZ_CURSO` ADD  PRIMARY KEY (`IdCur`)
;

ALTER TABLE `GZZ_CURSO` ADD UNIQUE `IdCur` (`IdCur`)
;

-- Table GZZ_LIBRO

CREATE TABLE `GZZ_LIBRO`
(
  `IDLib` Int(4) NOT NULL
 COMMENT 'Id del libro',
  `NomLib` Varbinary(128) NOT NULL
 COMMENT 'Nombre del libro a utilizar en la pregunta',
  `AutLib` Varbinary(60) NOT NULL
 COMMENT 'Autor del libro',
  `EdiLib` Varbinary(20) NOT NULL
 COMMENT 'Edicion del libro',
  `CreDat` Datetime NOT NULL
 COMMENT 'Fecha de creacion del registro',
  `CreByID` Int NOT NULL
 COMMENT 'ID del creador del registro',
  `UpdDat` Timestamp NULL
 COMMENT 'Fecha de actualizacion del registro',
  `UpdByID` Int
 COMMENT 'ID del que actualizo el registro',
  `EstReg` Char(1) NOT NULL
 COMMENT 'Estado de registro del libro'
)
;

ALTER TABLE `GZZ_LIBRO` ADD  PRIMARY KEY (`IDLib`)
;

ALTER TABLE `GZZ_LIBRO` ADD UNIQUE `IdLib` (`IDLib`)
;

-- Table GZZ_ESTADO_REVISION

CREATE TABLE `GZZ_ESTADO_REVISION`
(
  `IDEstRev` Int NOT NULL
 COMMENT 'ID del estado de revision',
  `AcrEstRev` Char(2) NOT NULL
 COMMENT 'Acronimo del estado de revison (A,B,C,D...)',
  `DesEstRev` Varchar(40) NOT NULL
 COMMENT 'Descripcion del estado de revision',
  `CreDat` Datetime NOT NULL
 COMMENT 'Fecha de creacion del registro',
  `CreByID` Int NOT NULL
 COMMENT 'ID del creador del registro',
  `UpdDat` Timestamp NULL
 COMMENT 'Fecha de actualizacion del registro',
  `UpdByID` Int
 COMMENT 'ID del que actualizo el registro',
  `EstReg` Char(1) NOT NULL
 COMMENT 'Estado de registro (A, E, I)'
)
;

ALTER TABLE `GZZ_ESTADO_REVISION` ADD  PRIMARY KEY (`IDEstRev`)
;

ALTER TABLE `GZZ_ESTADO_REVISION` ADD UNIQUE `IDEstRev` (`IDEstRev`)
;

-- Table MA_UBIGEO

CREATE TABLE `MA_UBIGEO`
(
  `id_ubigeo` Int NOT NULL,
  `nombre_ubigeo` Varchar(80) NOT NULL,
  `codigo_ubigeo` Varchar(2) NOT NULL,
  `etiqueta_ubigeo` Varchar(200),
  `buscador_ubigeo` Varchar(200),
  `numero_hijos_ubigeo` Int,
  `nivel_ubigeo` Smallint(6),
  `id_padre_ubigeo` Int
)
;

ALTER TABLE `MA_UBIGEO` ADD  PRIMARY KEY (`id_ubigeo`)
;

ALTER TABLE `MA_UBIGEO` ADD UNIQUE `id_ubigeo` (`id_ubigeo`)
;

-- Create relationships section -------------------------------------------------

ALTER TABLE `WS_WEBSITE` ADD CONSTRAINT `Relationship3` FOREIGN KEY (`OrgID`) REFERENCES `MA_ORGANIZATION` (`OrgID`) ON DELETE RESTRICT ON UPDATE RESTRICT
;

ALTER TABLE `WS_CONTAINER` ADD CONSTRAINT `Relationship4` FOREIGN KEY (`WebSitID`, `OrgID`) REFERENCES `WS_WEBSITE` (`WebSitID`, `OrgID`) ON DELETE RESTRICT ON UPDATE RESTRICT
;

ALTER TABLE `WS_LINK` ADD CONSTRAINT `Relationship5` FOREIGN KEY (`ConInfID`) REFERENCES `WS_CONTENT_INF` (`ConInfID`) ON DELETE RESTRICT ON UPDATE RESTRICT
;

ALTER TABLE `WS_CONTENT_INF` ADD CONSTRAINT `Relationship6` FOREIGN KEY (`ConParID`) REFERENCES `WS_CONTENT_INF` (`ConInfID`) ON DELETE RESTRICT ON UPDATE RESTRICT
;

ALTER TABLE `WS_CONTENT_SPE` ADD CONSTRAINT `Relationship7` FOREIGN KEY (`ConInfID`) REFERENCES `WS_CONTENT_INF` (`ConInfID`) ON DELETE RESTRICT ON UPDATE RESTRICT
;

ALTER TABLE `WS_CONTENT_INF` ADD CONSTRAINT `Relationship8` FOREIGN KEY (`WebSitID`, `OrgID`) REFERENCES `WS_WEBSITE` (`WebSitID`, `OrgID`) ON DELETE RESTRICT ON UPDATE RESTRICT
;

ALTER TABLE `WS_CONTENT_INF` ADD CONSTRAINT `Relationship9` FOREIGN KEY (`ConID`) REFERENCES `WS_CONTAINER` (`ConID`) ON DELETE RESTRICT ON UPDATE RESTRICT
;

ALTER TABLE `MA_VENTANA` ADD CONSTRAINT `grupo_ventana` FOREIGN KEY (`VenPadID`) REFERENCES `MA_VENTANA` (`VenID`) ON DELETE RESTRICT ON UPDATE RESTRICT
;

ALTER TABLE `MA_ROL_VEN` ADD CONSTRAINT `Relationship40` FOREIGN KEY (`RolID`) REFERENCES `MA_ROL` (`RolID`) ON DELETE RESTRICT ON UPDATE RESTRICT
;

ALTER TABLE `MA_ROL_VEN` ADD CONSTRAINT `Relationship19` FOREIGN KEY (`VenID`) REFERENCES `MA_VENTANA` (`VenID`) ON DELETE RESTRICT ON UPDATE RESTRICT
;

ALTER TABLE `MA_USER` ADD CONSTRAINT `Relationship41` FOREIGN KEY (`RolID`) REFERENCES `MA_ROL` (`RolID`) ON DELETE RESTRICT ON UPDATE RESTRICT
;

ALTER TABLE `MA_USER` ADD CONSTRAINT `Relationship42` FOREIGN KEY (`OrgID`) REFERENCES `MA_ORGANIZATION` (`OrgID`) ON DELETE RESTRICT ON UPDATE RESTRICT
;

ALTER TABLE `MA_PERSONA` ADD CONSTRAINT `Relationship26` FOREIGN KEY (`EstCivID`) REFERENCES `MA_ESTADO_CIV` (`EstCivID`) ON DELETE RESTRICT ON UPDATE RESTRICT
;

ALTER TABLE `MA_PERSONA` ADD CONSTRAINT `Relationship25` FOREIGN KEY (`PaiID`) REFERENCES `MA_PAIS` (`PaiID`) ON DELETE RESTRICT ON UPDATE RESTRICT
;

ALTER TABLE `MA_PERSONA` ADD CONSTRAINT `Relationship23` FOREIGN KEY (`SexId`) REFERENCES `MA_SEXO` (`SexId`) ON DELETE RESTRICT ON UPDATE RESTRICT
;

ALTER TABLE `MA_REGISTER_LOG` ADD CONSTRAINT `Relationship43` FOREIGN KEY (`UseId`) REFERENCES `MA_USER` (`UseId`) ON DELETE RESTRICT ON UPDATE RESTRICT
;

ALTER TABLE `MA_USER` ADD CONSTRAINT `Relationship44` FOREIGN KEY (`PerID`) REFERENCES `MA_PERSONA` (`PerID`) ON DELETE RESTRICT ON UPDATE RESTRICT
;

ALTER TABLE `EG4_EXAMEN` ADD CONSTRAINT `Relationship45` FOREIGN KEY (`OrgID`) REFERENCES `MA_ORGANIZATION` (`OrgID`) ON DELETE RESTRICT ON UPDATE RESTRICT
;

ALTER TABLE `G2_PREGUNTA` ADD CONSTRAINT `Relationship46` FOREIGN KEY (`IdAreSug`) REFERENCES `GZZ_AREA_SUGERIDA` (`IdAreSug`) ON DELETE RESTRICT ON UPDATE RESTRICT
;

ALTER TABLE `G2_PREGUNTA` ADD CONSTRAINT `Relationship47` FOREIGN KEY (`IdDif`) REFERENCES `GZZ_DIFICULTAD` (`IdDif`) ON DELETE RESTRICT ON UPDATE RESTRICT
;

ALTER TABLE `G2_PREGUNTA` ADD CONSTRAINT `Relationship48` FOREIGN KEY (`IDLib`) REFERENCES `GZZ_LIBRO` (`IDLib`) ON DELETE RESTRICT ON UPDATE RESTRICT
;

ALTER TABLE `G2_PREGUNTA` ADD CONSTRAINT `Relationship49` FOREIGN KEY (`IdCur`) REFERENCES `GZZ_CURSO` (`IdCur`) ON DELETE RESTRICT ON UPDATE RESTRICT
;

ALTER TABLE `G2_PREGUNTA` ADD CONSTRAINT `Relationship50` FOREIGN KEY (`IdTem`) REFERENCES `GZZ_TEMA_ESPECIFICO` (`IdTem`) ON DELETE RESTRICT ON UPDATE RESTRICT
;

ALTER TABLE `G2_ALTERNATIVAS` ADD CONSTRAINT `Relationship51` FOREIGN KEY (`IdPre`, `IdAreSug`, `IdDif`, `IDLib`, `IdCur`, `IdTem`, `IDEstRev`) REFERENCES `G2_PREGUNTA` (`IdPre`, `IdAreSug`, `IdDif`, `IDLib`, `IdCur`, `IdTem`, `IDEstRev`) ON DELETE RESTRICT ON UPDATE RESTRICT
;

ALTER TABLE `EG4_EXAMEN_DETALLE` ADD CONSTRAINT `Relationship52` FOREIGN KEY (`IdExa`, `OrgID`, `IDFasExa`, `IDProExam`, `IDAre`) REFERENCES `EG4_EXAMEN` (`IdExa`, `OrgID`, `IDFasExa`, `IDProExam`, `IDAre`) ON DELETE RESTRICT ON UPDATE RESTRICT
;

ALTER TABLE `EG4_EXAMEN_DETALLE` ADD CONSTRAINT `Relationship53` FOREIGN KEY (`IdPre`, `IdAreSug`, `IdDif`, `IDLib`, `IdCur`, `IdTem`, `IDEstRev`) REFERENCES `G2_PREGUNTA` (`IdPre`, `IdAreSug`, `IdDif`, `IDLib`, `IdCur`, `IdTem`, `IDEstRev`) ON DELETE RESTRICT ON UPDATE RESTRICT
;

ALTER TABLE `G2_PREGUNTA` ADD CONSTRAINT `Relationship54` FOREIGN KEY (`IDEstRev`) REFERENCES `GZZ_ESTADO_REVISION` (`IDEstRev`) ON DELETE RESTRICT ON UPDATE RESTRICT
;

ALTER TABLE `EG4_EXAMEN` ADD CONSTRAINT `Relationship55` FOREIGN KEY (`IDFasExa`) REFERENCES `GZZ_FASE_EXAMEN` (`IDFasExa`) ON DELETE RESTRICT ON UPDATE RESTRICT
;

ALTER TABLE `EG4_EXAMEN` ADD CONSTRAINT `Relationship56` FOREIGN KEY (`IDProExam`) REFERENCES `GZZ_PROCESO_EXAMEN` (`IDProExam`) ON DELETE RESTRICT ON UPDATE RESTRICT
;

ALTER TABLE `EG4_EXAMEN` ADD CONSTRAINT `Relationship57` FOREIGN KEY (`IDAre`) REFERENCES `GZZ_AREA_EXAMEN` (`IDAre`) ON DELETE RESTRICT ON UPDATE RESTRICT
;

ALTER TABLE `MA_PERSONA` ADD CONSTRAINT `Relationship58` FOREIGN KEY (`id_ubigeo`) REFERENCES `MA_UBIGEO` (`id_ubigeo`) ON DELETE RESTRICT ON UPDATE RESTRICT
;
