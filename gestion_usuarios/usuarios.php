<?php

$consultas=new myDBC();

$log = $consultas->listado_usuarios($_SESSION['session']['id']);
return $log;
//print_r('aaa'); die;
?>
