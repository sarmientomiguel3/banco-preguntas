<?php


function abrirImagen($tipo,$ruta_imagen){
    switch ( $tipo ){
        case "image/jpg":
        case "image/jpeg":
            $imagen = imagecreatefromjpeg( $ruta_imagen );
            return $imagen;
        case "image/png":
            $imagen = imagecreatefrompng( $ruta_imagen );
            return $imagen;
        case "image/gif":
            $imagen = imagecreatefromgif( $ruta_imagen );
            return $imagen;
    }
};
function redimensionar($ruta_imagen){
    $tamaño = getimagesize($ruta_imagen);
    
    $ancho = $tamaño[0];
    $alto = $tamaño[1];
    $tipo = $tamaño['mime'];
    
    $nuevo_ancho = 48;
    $nuevo_alto = $nuevo_ancho*$alto/$ancho;
    
    $imagen_r = imagecreatetruecolor($nuevo_ancho, $nuevo_alto);
    $imagen = abrirImagen($tipo,$ruta_imagen);
    imagecopyresampled($imagen_r, $imagen, 0, 0, 0, 0, $nuevo_ancho, $nuevo_alto, $ancho, $alto);
    return $imagen_r;
};

/*
$file = $_FILES["file"]["name"];
if(!is_dir("archivos/"))
	mkdir("archivos/", 0777);
if($file && move_uploaded_file($_FILES["file"]["tmp_name"], "archivos/".$file))
{
	echo $file;
}
*/
try {

if(!isset($_SERVER["HTTP_DIRECCION"]) || empty($_SERVER["HTTP_DIRECCION"])){
	echo "no se encontro la direccion destino";
	return;
}

if(!isset($_SERVER["HTTP_NOMBRE"]) || empty($_SERVER["HTTP_NOMBRE"])){
    
    $nombre = $_FILES["file"]["name"];
    // $nombre = uniqid('BancoPregunta-',true);
}
else{
    $nombre = "".$_SERVER["HTTP_NOMBRE"];
}

if(!isset($_SERVER["HTTP_MINI"]) || empty($_SERVER["HTTP_MINI"]))
	$mini = false;
else
	$mini = true;

$direccion = "".$_SERVER["HTTP_DIRECCION"];

if(!is_dir($direccion))
	mkdir($direccion, 0777);
if($nombre && move_uploaded_file($_FILES["file"]["tmp_name"], $direccion.$nombre)){
    
    if($mini){
        
        $img_original = redimensionar($direccion.$nombre);        
        imagepng($img_original,$direccion."mini_".$nombre);
        imagedestroy($img_original);
        
    }
	echo $nombre;
	return;
}
else{
    http_response_code(417);
	echo "no se pudo subir la imagen ".$direccion.$nombre;
}

    //code...
} catch (Throwable $th) {
    echo "error interno";
}

?>


<?php

/*

//$resource = $_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'];
$host = $_SERVER['HTTP_HOST'];
//echo($resource);

$color_texto = imagecolorallocate($img_original, 233, 14, 91);
        imagestring($img_original, 4, 5, 5,  "A Simple Text String", $color_texto);


$file = $_FILES["file"]["name"];
if(!is_dir($host."/smtaured/archivos/"))
	mkdir($host."/smtaured/archivos/", 0777);
if($file && move_uploaded_file($_FILES["file"]["tmp_name"], $host."/smtaured/archivos/".$file))
{
	echo $file;
}*/
?>