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

header('Content-Type: image/*');

if(!isset($_GET["nombre"]) || empty($_GET["nombre"])){
	echo "no se encontro la direccion destino";
	return;
}
    $nombre = $_GET["nombre"];
    
        
    $img_original = redimensionar("archivos/".$nombre);        
    imagepng($img_original,"archivos/mini_".$nombre);
    imagedestroy($img_original);
    //echo "se redimensiono";
?>