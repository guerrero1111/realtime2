<?php

require_once("../gestion_usuarios/myDBC.php");

if(isset($_SESSION['session']))
{
	$consultas=new myDBC();
	$data=$_POST;

	$resultado = $consultas->anadir_catalogo($data);

	echo ($resultado);


/*
$data['codigo']
$data['producto']
$data['categoria']
$data['stock']
$data['precio']

*/

	
	//
	//echo $resultado;


}
						


?>
