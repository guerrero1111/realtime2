<?php

require_once("../gestion_usuarios/myDBC.php");

if(isset($_SESSION['session']))
{
	$consultas=new myDBC();
	$data=$_POST;

	$resultado = $consultas->buscador_catalogo($data);
	echo $resultado;

}
						


?>
