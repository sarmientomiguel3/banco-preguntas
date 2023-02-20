<?php


function completar(){
	
}

echo rand(100000000,1000000000) . "<br>";
echo mt_rand (100000000,1000000000 ) ."<br>";
echo "<br>";
echo "<br>";

for($i = 1; $i<10; $i++ ){
	echo mt_rand (100000000,1000000000 ) ."<br>";
}
echo "<br>";
echo "<br>";
echo mt_rand (10000,100000 )." ".mt_rand (10000,100000 )."<br>";
echo "<br>";
echo "<br>";


date_default_timezone_set('America/Lima');
echo date("Y-m-d H:i:s")."<br>";


?>