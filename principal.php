<?php

include 'header.php'; 
//print_r('sdas');die;
?>
<!-- Pana-->
<?php 
	if(isset($_SESSION['session'])) {
?>
					<div class="row">
						<a href="/agregar_catalogo.php" class="btn btn-success" data-toggle="modal"><i class="material-icons">&#xE147;</i> <span>Agregar nuevo producto</span></a>
					</div>	    	
					<br/>

	    <div class="container">
				<div class="table-responsive">
					<section>
						<table id="tabla_catalogo" class="display table table-striped table-bordered table-responsive" cellspacing="0" width="100%">
							<thead>
								<tr>
									<th class="text-center cursora" >Código</th>
									<th class="text-center cursora" >Producto</th>
									<th class="text-center cursora" >Categoría</th>
									<th class="text-center cursora" >Stock</th>
									<th class="text-center cursora" >Precio</th>
									<th class="text-center " width="10%"><strong>Editar</strong></th>
									<th class="text-center " width="10%"><strong>Eliminar</strong></th>
								</tr>
							</thead>
						</table>
					</section>
				</div>
		        
		        
	    </div>

<?php
 }
?>

<?php
include 'footer.php'; 
?>
