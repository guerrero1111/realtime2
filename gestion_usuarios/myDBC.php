<?php
ini_set('display_errors', 0);
session_start();
// My database Class called myDBC
class myDBC {
	// our mysqli object instance
	public $mysqli = null;
 	
 	// Class constructor override
	public function __construct() {
  
		include_once "dbconfig.php";        
    	$this->mysqli = new mysqli(DB_SERVER, DB_USER, DB_PASS, DB_NAME);
 
		if ($this->mysqli->connect_errno) {
			echo "Error MySQLi: ("&nbsp. $this->mysqli->connect_errno.") " . $this->mysqli->connect_error;
			exit();
		}
		$this->mysqli->set_charset("utf8"); 
	}
 
	// Class deconstructor override
	public function __destruct() {
		$this->CloseDB();
	}
 
	// runs a sql query
    public function runQuery($qry) {
        $result = $this->mysqli->query($qry);
        return $result;
    }
  
	// Close database connection
    public function CloseDB() {
        $this->mysqli->close();
    }
 
	// Escape the string get ready to insert or update
    public function clearText($text) {
        $text = trim($text);
        return $this->mysqli->real_escape_string($text);
    } 
	
	public function logueo($usuario, $contrasenia){
		//El password obtenido se le aplica el crypt
		//Posteriormente se compara en el query
		
		
		$pass_c = $contrasenia; // crypt($contrasenia, '_er#.lop');
		$q = "select * from usuarios where nombre='$usuario' and password='$pass_c'";
		
		$result = $this->mysqli->query($q);


		//Si el resultado obtenido no tiene nada 
		//Muestra el error y redirige al index
		if( $result->num_rows == 0)
		{
			echo'<script type="text/javascript">
				alert("Usuario o Contraseña Incorrecta");
				window.location="/index.php"
				</script>';
		}
		
		//En otro caso
		//En $reg se guarda el resultado de la consulta
		//Al segundo posición de SESION se le asigna el id del usuario
		//Redirige a página logueada 
		else{
			$reg = mysqli_fetch_assoc($result);
			$_SESSION["session"]['id'] = $reg["id"];
			$_SESSION["session"]['nombre'] = $reg["nombre"];
			$_SESSION["session"]['apellidos'] = $reg["apellidos"];
			$_SESSION["session"]['perfil'] = $reg["perfil"];
			//$_SESSION["session"][]  = "duvi alex fe";
			header("location:/principal.php");
		}
		
	}

	public function listado_usuarios($usuario){
	
		
		
		$q = "select * from usuarios where id<>'$usuario'";
		
		$result = $this->mysqli->query($q);


		//Si el resultado obtenido no tiene nada 
		//Muestra el error y redirige al index
		if( $result->num_rows == 0)
		{

			/*echo'<script type="text/javascript">
				alert("Usuario o Contraseña Incorrecta");
				window.location="/index.php"
				</script>';
				*/
		}
		
		else{
			return $result;
			
		}
		
	}


    public function consulta_chat_privado($data){
	
		
		
		//$q = "select * from usuarios where id<>'$usuario'";
		$q = "
			select id, mensaje, nombre from (
			select m.id, m.mensaje, u.nombre from mensajes m INNER JOIN usuarios u WHERE u.id = m.id_usuario AND ((id_usuario='".$data['id']."') AND (id_destino='".$_SESSION['session']['id']."') ) union 

			select m.id, m.mensaje, u.nombre from mensajes m INNER JOIN usuarios u WHERE u.id = m.id_usuario AND ((id_destino='".$data['id']."') AND (id_usuario='".$_SESSION['session']['id']."') )
			) todo
			order by id ASC
		";
		
		$result = $this->mysqli->query($q);


		//Si el resultado obtenido no tiene nada 
		//Muestra el error y redirige al index
		if( $result->num_rows == 0)
		{

			
		}
		
		else{
			return $result;
			
		}
		
	}


	public function consulta_chat_publico(){
	
		
		
		//$q = "select * from usuarios where id<>'$usuario'";
		$q = "
			select id, mensaje, nombre from (
			select m.id, m.mensaje, u.nombre from mensajes m INNER JOIN usuarios u WHERE u.id = m.id_usuario AND ( (id_destino='') ) 

			
			) todo
			order by id ASC
		";
		
		$result = $this->mysqli->query($q);


		//Si el resultado obtenido no tiene nada 
		//Muestra el error y redirige al index
		if( $result->num_rows == 0)
		{

			
		}
		
		else{
			return $result;
			
		}
		
	}

	  public function anadir_catalogo( $data ){


	  	    $sql = "INSERT INTO tblprod( prod_code, prod_name, prod_ctry, prod_qty, price) VALUES ('".$data['codigo']."','".$data['producto']."','".$data['categoria']."',".$data['stock'].",".$data['precio'].")";

	  	    	//return json_encode($sql);

	  	    	//$query = mysqli_query($con,$sql);

	  	    	$result = $this->mysqli->query($sql);

	  	    	if ( $result ) {
	  	    		return (true);
	  	    	} else {
	  	    		return (false);
	  	    	}	

	  		/*
          $id_session = $this->session->userdata('id');
          $this->db->set( 'id_usuario',  $id_session );
          $this->db->set( 'medida', $data['medida'] );  

            $this->db->insert($this->unidades_medidas );
            if ($this->db->affected_rows() > 0){
                    return TRUE;
                } else {
                    return FALSE;
                }
                $result->free_result();
                */
        }  


	 public function buscador_catalogo($data){

	          $cadena = addslashes($data['search']['value']);
	          $inicio = $data['start'];
	          $largo = $data['length'];
	          	
	                                     

	          $query = "
				select  
					SQL_CALC_FOUND_ROWS *,
					id, prod_code, prod_name, prod_ctry, prod_qty, price
				 from  tblprod t

				order by id desc
				limit ".$inicio.",".$largo." 
			";

			
			$result = $this->mysqli->query($query);

			
			$dato =array();	
			 if ( $result->num_rows > 0 ) {
			 		//https://es.stackoverflow.com/questions/233194/select-found-rows-as-total-me-devuelve-0-por-qu%C3%A9
 					$cantidad_consulta = $this->mysqli->query('SELECT FOUND_ROWS() as cantidad'); 
                    $registros_filtrados= ( (int) mysqli_fetch_assoc($cantidad_consulta)['cantidad']);
                    

			 		foreach ($result as $row) {
						//$dato[] = $row['id'];
						//$result->free();
			 					$dato[]= array(
                                      0=>$row['id'],
                                      1=>$row['prod_code'],
                                      2=>$row['prod_name'],
                                      3=>$row['prod_ctry'],
                                      4=>$row['prod_qty'],
                                      5=>$row['price'],
                                      
                                    );
			 		};	 //fin del foreach
                      return json_encode ( array(
	                        "draw"            => intval( $data['draw'] ),
	                        "recordsTotal"    => $registros_filtrados, //intval( self::total_cat_composiciones() ), 
	                        "recordsFiltered" =>   $registros_filtrados, //$registros_filtrados, 
	                        "data"            =>  $dato 
                      ));

	

			 }	 else {

			 		
 				  $output = array(
                  	 "draw" =>  intval( $data['draw'] ),
                  	 "recordsTotal" => 0,
                     "recordsFiltered" =>0,
                      "aaData" => array()
                  );
                  
                  return json_encode($output);

			 }

			
	}		





	
}
	
?>
