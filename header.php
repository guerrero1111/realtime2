<?php


require_once("gestion_usuarios/myDBC.php");
//print_r('sad');die;

if(isset($_SESSION['session'])) {
?>


<!DOCTYPE html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>..:PAGINA PRINCIPAL:..</title>
		
	</head>

	<body bgcolor="#F5A9F2">
		
		<input type="hidden" id="id_user" name="id_user" value="<?php echo $_SESSION['session']['id'] ; ?>">

		<center>
			<h2>BIENVENIDO <?php echo $_SESSION['session']['nombre'].' '.$_SESSION['session']['apellidos'] ; ?></h2>
		</center>

		<a href="../gestion_usuarios/salir.php"><h4>CERRAR SESSION</h4></a>

<?php } ?>