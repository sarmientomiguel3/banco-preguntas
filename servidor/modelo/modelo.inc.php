<?php
	//librerias requerudas
	require_once("../bd/coneccionBD.php");
    function clases_autoload($name) {
        $fullpath = '../modelo/'.$name.'.class.php';
        if(file_exists($fullpath)) include($fullpath);
    }
?>