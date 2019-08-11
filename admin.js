jQuery(document).ready(function($) {

	var opts = {
		lines: 13, 
		length: 20, 
		width: 10, 
		radius: 30, 
		corners: 1, 
		rotate: 0, 
		direction: 1, 
		color: '#E8192C',
		speed: 1, 
		trail: 60,
		shadow: false,
		hwaccel: false,
		className: 'spinner',
		zIndex: 2e9, 
		top: '50%', // Top position relative to parent
		left: '50%' // Left position relative to parent		
	};

var target = document.getElementById('foo');



jQuery('body').on('click','.nuevo_comentario', function (e) {
	var id_user= $('#id_user').val();
	var destino= $(this).attr('identif');
	//console.log($(this).attr('identif'));
	mensaje= (  $('input.mensaje_usuario[identif="'+$(this).attr("identif")+'"]').val()  );
	
	tipo = (destino=='') ? 'msg_publico' : 'msg_privado';
	 MY_Socket.enviandoMessage(tipo,mensaje , id_user, destino);
	 //borrando el msg de la bandeja de entrada
	 $('input.mensaje_usuario[identif="'+$(this).attr("identif")+'"]').val('');

});

		



////////////////////pana//////////////////////

jQuery('body').on('submit','#form_agregar', function (e) {
	//e.preventDefault();

	
			jQuery(this).ajaxSubmit({
				success: function(data){
					if(data != true){
						console.log(data);
						alert("Lo sentimos, el registro falló. Por favor, vuelva a intentarlo.");
					}else{
						
						var id_user= $('#id_user').val();
						destino='nada';
						mensaje='nuevo elemento';
						tipo = 'msg_publico';

						 MY_Socket.enviandoMessage(tipo,mensaje , id_user, destino);

						alert("El producto ha sido guardado con éxito.");


						window.location.href = '/principal.php';	
					}
				} 
			});
			return false;

});		

		
	jQuery('#tabla_catalogo').dataTable( {
	
	  "pagingType": "full_numbers",
		
		"processing": true,
		"serverSide": true,
		"ajax": {
	            	"url" : "/gestion_usuarios/procesando_catalogo.php",
	         		"type": "POST",
	         		
	     },   

		"language": {  //tratamiento de lenguaje
			"lengthMenu": "Mostrar _MENU_ registros por página",
			"zeroRecords": "No hay registros",
			"info": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
			"infoEmpty": "No hay registros disponibles",
			"infoFiltered": "(Mostrando _TOTAL_ de _MAX_ registros totales)",  
			"emptyTable":     "No hay registros",
			"infoPostFix":    "",
			"thousands":      ",",
			"loadingRecords": "Leyendo...",
			"processing":     "Procesando...",
			"search":         "Buscar:",
			"paginate": {
				"first":      "Primero",
				"last":       "Último",
				"next":       "Siguiente",
				"previous":   "Anterior"
			},
			"aria": {
				"sortAscending":  ": Activando para ordenar columnas ascendentes",
				"sortDescending": ": Activando para ordenar columnas descendentes"
			},
		},


		"columnDefs": [
			    	
			    	{ 
		                "render": function ( data, type, row ) {
		                		return row[1]; //codigo
		                },
		                "targets": [0] 
		            },

			    	{ 
		                "render": function ( data, type, row ) {
		                		return row[2]; //producto
		                },
		                "targets": [1] 
		            },

			    	{ 
		                "render": function ( data, type, row ) {
		                		return row[3]; //categoría
		                },
		                "targets": [2] 
		            },	             

			    	{ 
		                "render": function ( data, type, row ) {
		                		return row[4]; //stock
		                },
		                "targets": [3] 
		            },	             
			    	{ 
		                "render": function ( data, type, row ) {
		                		return row[5]; //Precio
		                },
		                "targets": [4] 
		            },	             


		            {
		                "render": function ( data, type, row ) {

						texto='<td>';
							texto+='<a href="/editar_catalogo.php/'+(row[0])+'" type="button"'; 
							texto+=' class="btn btn-warning btn-sm btn-block" >';
								texto+=' <span class="glyphicon glyphicon-edit"></span>';
							texto+=' </a>';
						texto+='</td>';


							return texto;	
		                },
		                "targets": 5
		            },

		            
		            {
		                "render": function ( data, type, row ) {

	   							texto='	<fieldset disabled> <td>';								
									texto+=' <a href="#"'; 
									texto+=' class="btn btn-danger btn-sm btn-block">';
									texto+=' <span class="glyphicon glyphicon-remove"></span>';
									texto+=' </a>';
								texto+=' </td></fieldset>';	

							return texto;	
		                },
		                "targets": 6
		            },

	            
		           
		            
		        ],
	});	




});
