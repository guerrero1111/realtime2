
            //this function can remove a array element.
            Array.remove = function(array, from, to) {
                var rest = array.slice((to || from) + 1 || array.length);
                array.length = from < 0 ? array.length + from : from;
                return array.push.apply(array, rest);
            };
        
            //this variable represents the total number of popups can be displayed according to the viewport width
            var total_popups = 0;
            
            //arrays of popups ids
            var popups = [];
        
            //this is used to close a popup
            function close_popup(id)
            {
                for(var iii = 0; iii < popups.length; iii++)
                {
                    if(id == popups[iii])
                    {
                        Array.remove(popups, iii);
                        
                        document.getElementById(id).style.display = "none";
                        
                        calculate_popups();
                        
                        return;
                    }
                }   
            }
        
            //displays the popups. Displays based on the maximum number of popups that can be displayed on the current viewport width
            function display_popups()
            {
                var right = 220;
                
                var iii = 0;
                for(iii; iii < total_popups; iii++)
                {
                    if(popups[iii] != undefined)
                    {
                        var element = document.getElementById(popups[iii]);
                        element.style.right = right + "px";
                        right = right + 320;
                        element.style.display = "block";
                    }
                }
                
                for(var jjj = iii; jjj < popups.length; jjj++)
                {
                    var element = document.getElementById(popups[jjj]);
                    element.style.display = "none";
                }
            }
            
            //creates markup for a new popup. Adds the id to popups array.
            function register_popup(id, name) {
                
                for(var iii = 0; iii < popups.length; iii++)
                {   
                    //already registered. Bring it to front.
                    if(id == popups[iii])
                    {
                        Array.remove(popups, iii);
                    
                        popups.unshift(id);
                        
                        calculate_popups();
                        
                        
                        return;
                    }
                }      

                /*
                require_once("/gestion_usuarios/myDBC.php");
                $resultado=require_once("../gestion_usuarios/usuarios.php");         
                
                var contenido='';

                
                            
                            while ($fila = mysqli_fetch_assoc($resultado)) {
                                    contenido = contenido + '<br/>'+ $fila["nombre"];
                            }
                        
                */


                var contenido='';
               // 
                function cambiar(){
                /*                   
                    var xhr = new XMLHttpRequest();
                 
                    xhr.open("GET","educado.txt",true);
                    xhr.send();
                    
                    //http://xitrus.es/blog/112/Seleccionar_elementos_con_querySelector_de_JavaScript
                    xhr.onreadystatechange = function(){
                        if(xhr.readyState == 4 && xhr.status == 200){
                           // document.getElementById("parrafo").innerHTML = xhr.responseText;
                            //document.getElementsByClassName("ventana")[0].innerHTML = xhr.responseText;    
                            document.querySelector('.ventana[identif="'+ id +'"]').innerHTML= xhr.responseText;   
                          
                        }
                    }
                    */
                    //https://cybmeta.com/ajax-con-json-y-php-con-javascript-puro
                    // El JSON a enviar
                    console.log(id);
                    var myjson = '{ "id" : "'+id+'" }';
                    var ajax_request = new XMLHttpRequest();
                    var ajax_url = "/gestion_usuarios/consulta.php";
                    ajax_request.open( "POST", ajax_url, true );
                    // Establecer la cabecera Content-Type apropiada
                    ajax_request.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
                    // Enviar la solicitud
                    ajax_request.send( myjson );


                    // Definimos una función a ejecutar cuándo la solicitud Ajax tiene alguna información
                        ajax_request.onreadystatechange = function() {

                            // readyState es 4
                            if (ajax_request.readyState == 4 ) {

                                // Analizaos el responseText que contendrá el JSON enviado desde el servidor
                               var jsonObj = JSON.parse( ajax_request.responseText );
                                // La variable jsonObj ahora contiene un objeto con los datos recibidos
                                //console.log(jsonObj);
                                resultado='';
                                for (var i in jsonObj) {
                                    resultado +=  jsonObj[i].nombre+': '+jsonObj[i].mensaje + "<br/>";
                                 }   
                                 console.log(resultado);
                                document.querySelector('.ventana[identif="'+ id +'"]').innerHTML= resultado; //jsonObj; 

                            }
                        }


                }

//https://cybmeta.com/ajax-con-json-y-php-con-javascript-puro
                var element = '<div class="popup-box chat-popup chateando" id="'+ id +'">';
                element = element + '<div class="popup-head">';
                element = element + '<div class="popup-head-left">'+ name +'</div>';
                element = element + '<div class="popup-head-right"><a href="javascript:close_popup(\''+ id +'\');">&#10005;</a></div>';
                element = element + '<div style="clear: both;"></div></div><div class="popup-messages ventana" identif="'+ id +'" style="height:80%">';
                //element = element + cambiar();
                element = element + '</div>';
                        
                        element = element + '<div class="form-group">';
                            element = element + '<div class="input-group">';
                                element = element + '<input type="text" class="form-control mensaje_usuario"  identif="'+ id +'" placeholder="Escribe algo." />';
                                element = element + '<span class="input-group-btn">';
                                    element = element + '<button class="btn btn-default nuevo_comentario" identif="'+ id +'" type="button">Enviar!</button>';
                                element = element + '</span>';
                            element = element + '</div>';
                        element = element + '</div>';

                //element = element + '</div><textarea style="width: 100%;" rows="4" class="chatboxtextarea"></textarea>';
                element = element + '</div>';

                
                document.getElementsByTagName("body")[0].innerHTML = document.getElementsByTagName("body")[0].innerHTML + element;  

                cambiar();
        
                popups.unshift(id);
                        
                calculate_popups();
                
            }
            
            //calculate the total number of popups suitable and then populate the toatal_popups variable.
            function calculate_popups()
            {
                var width = window.innerWidth;
                if(width < 540)
                {
                    total_popups = 0;
                }
                else
                {
                    width = width - 200;
                    //320 is width of a single popup box
                    total_popups = parseInt(width/320);
                }
                
                display_popups();
                
            }
            
            //recalculate when window is loaded and also when window is resized.
            window.addEventListener("resize", calculate_popups);
            window.addEventListener("load", calculate_popups);

  