<?php

require_once('vendor/autoload.php');


//require_once('vendor/firebase/php-jwt/src/JWT.php');
require_once('servicios/MiJWT.php');


$jwt = MiJWT::generarJWT();
print_r( $jwt );
echo "<br>";
echo "<br>";
echo "<br>";

print_r( MiJWT::decodificarJWT($jwt) );

/*
$headers = apache_request_headers();

foreach ($headers as $header => $value) {
    echo "$header: $value <br />\n";
}


$tiempo = time();
//$tiempo = 1447689961;
$tiempo2 = $tiempo + 30;


$resource = $_SERVER['REQUEST_URI'];

echo($resource);
echo "<br>";

/*
print_r($tiempo);
echo "<br>";
echo "<br>";


$key = "12";
$token = array(
    "iss" => "http://example.org",
    "aud" => "http://example.com",
    "iat" => $tiempo
    //"exp" => $tiempo2
);

/**
 * IMPORTANT:
 * You must specify supported algorithms for your application. See
 * https://tools.ietf.org/html/draft-ietf-jose-json-web-algorithms-40
 * for a list of spec-compliant algorithms.
 */
 
 /*
$jwt = JWT::encode($token, $key, 'HS256');
print_r($jwt);
echo "<br>";
echo " L : "+strlen($jwt);
echo "<br>";
echo "<br>";

/**
 * You can add a leeway to account for when there is a clock skew times between
 * the signing and verifying servers. It is recommended that this leeway should
 * not be bigger than a few minutes.
 *
 * Source: http://self-issued.info/docs/draft-ietf-oauth-json-web-token.html#nbfDef
 */
 /*
JWT::$leeway = 60; // $leeway in seconds
$decoded = JWT::decode($jwt, $key, array('HS256'));

print_r($decoded);
//*/
?>