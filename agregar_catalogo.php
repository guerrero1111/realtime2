<?php

include 'header.php'; 
//print_r('sdas');die;
?>
<!-- Pana-->
<?php 
	if(isset($_SESSION['session'])) {
?>

	
<form method="post" accept-charset="utf-8" action="/gestion_usuarios/validar_agregar.php"
class="form_agregar" id="form_agregar">

	<div class="row">
		<div class="col-sm-8 col-md-8"><h4>Nueva Composición</h4></div>
	</div>
	<br>

	<div class="container">
		<div class="col-md-6">
			
			<div class="form-group">
				<label for="codigo" class="col-sm-3 col-md-2 control-label">Código</label>
				<div class="col-sm-9 col-md-10">
					<input type="text" class="form-control" id="codigo" name="codigo" placeholder="codigo">
				</div>
			</div>
			<div class="form-group">
				<label for="producto" class="col-sm-3 col-md-2 control-label">Producto</label>
				<div class="col-sm-9 col-md-10">
					<input type="text" class="form-control" id="producto" name="producto" placeholder="producto">
				</div>
			</div>

			<div class="form-group">
				<label for="categoria" class="col-sm-3 col-md-2 control-label">Categoría</label>
				<div class="col-sm-9 col-md-10">
					<input type="text" class="form-control" id="categoria" name="categoria" placeholder="categoria">
				</div>
			</div>


		</div>	

		<div class="col-md-6">

			<div class="form-group">
				<label for="stock" class="col-sm-3 col-md-2 control-label">Stock</label>
				<div class="col-sm-9 col-md-10">
					<input type="text" class="form-control" id="stock" name="stock" placeholder="stock">
				</div>
			</div>

			<div class="form-group">
				<label for="precio" class="col-sm-3 col-md-2 control-label">Precio</label>
				<div class="col-sm-9 col-md-10">
					<input type="text" class="form-control" id="precio" name="precio" placeholder="precio">
				</div>
			</div>


		</div>		


		<div  class="col-md-12">
			<div class="col-sm-4 col-md-4"></div>
			<div class="col-sm-4 col-md-4">
				<a href="/principal.php" type="button" class="btn btn-danger btn-block">Cancelar</a>
			</div>
			<div class="col-sm-4 col-md-4">
				<input type="submit" class="btn btn-success btn-block" value="Guardar"/>
			</div>
		</div>


	</div>	



</form>

<?php
 }
?>

<?php
include 'footer.php'; 
?>
