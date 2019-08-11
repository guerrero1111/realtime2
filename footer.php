<?php 
	if(isset($_SESSION['session'])) {
?>

	</body>
</html>





<?php
}else {
echo'<script type="text/javascript">
	  alert("Registrarse para ver este contenido");
	  window.location="../index.php"
</script>';
}
?>


<!-- css bootstrap-->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" />
<!-- Jquery-->	   
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>

<!-- ajaxsubmit-->	   
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery.form/3.20/jquery.form.min.js"></script>

<!-- Socket.io-->	   
<script src="/node_modules/socket.io-client/dist/socket.io.js"></script>
<!-- js bootstrap -->
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
<!-- javascript conectarse con el server-->
<script type="text/javascript" language="javascript" src="sistema.js"></script>

<!-- javascript simple -->
<script type="text/javascript" language="javascript" src="/admin.js"></script>   






  <!--datatables para el caso de salidas -->
  
  <link rel="stylesheet" type="text/css" href="/media/css/jquery.dataTables.css">
  
  <script type="text/javascript" language="javascript" src="/media/js/jquery.dataTables.js"></script>

  <link rel="stylesheet" type="text/css" href="/extensions/TableTools/css/dataTables.tableTools.css">
  <script type="text/javascript" language="javascript" src="/extensions/TableTools/js/dataTables.tableTools.js"></script>