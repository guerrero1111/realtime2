$(function(){

  window.MY_Socket = { 
  // 1- Instanciar al "cliente Socket.IO" y conectar con el servidor
  socket : io.connect(location.host+':8080'),
  //socket : io.connect('http://ligadelajusticia.dev.com:8080', { 'forceNew': false }),

  // Configurar los controladores de eventos iniciales para el cliente Socket.IO
  // estos son los que inicializan los controladores para cada evento que ocurra,
  //en este caso esta escuchando constantemente si sucede
  //una  this.socket.on('conexion' : para disparar el mensaje de "estoy trabajando"
  /*
    todos los que tienes  "this.socket.on" son eventos que estan en espera de ser llamados
  */
    bindEvents : function() {
      this.socket.on('conexion',MY_Socket.callback_conexionMessage);   //llama a la funcion  conexionMessage

      //Llamar a la funcion para unir usuario a una sala
      MY_Socket.unir_user_sala();

      //cuando le transmiten el nuevo mensaje, al equipo del que envia el mensaje
      //this.socket.on('broadcastNewPost',MY_Socket.updateMessages);

      this.socket.on('chat_publico',MY_Socket.dibujar_sala_publica);

      this.socket.on('chat_privado',MY_Socket.dibujar_sala_privada);

      

      this.socket.on('error',MY_Socket.error);

      //MY_Socket.socket.emit('msg_publico',"mensaje1", "usuario1","");
      //MY_Socket.socket.emit('msg_privado',"mensaje1", "usuario1","48c13c57-7602-11e7-bcff-040148d84993");

    },

  //este es el callback de la llamada "conexion" y muestra el mensaje
    callback_conexionMessage : function(data) {
      console.log(data.message);   //variable message fue la que envio
    },

    unir_user_sala : function(){
      
      var sessionId = readCookie('PHPSESSID');  //extrae el valor de session 
      var id_user = $('#id_user').val();

        if(sessionId) {
            // Envía el "sessionID" al servidor Node en un esfuerzo para unirse a un "room"
                      MY_Socket.socket.emit('unirSala',sessionId, id_user);
           
          } else {
            // Si no existe sessionID, no trata de unirse a un room.
            console.log('No encuentra la session id. Broadcast desabilitado.');
           // esperamos cerrar la sesión url? (//forward to logout url?)
          }

    } ,





  // En la actualización 'broadcastNewPost' la lista de mensajes de otros usuarios
    dibujar_sala_publica : function(data) {
       jQuery('#tabla_catalogo').dataTable().fnDraw();
    },

    dibujar_sala_privada : function(data) {
     
    },


error : function(data) {
   console.log(data);
},    

//MY_Socket.enviandoMessage('msg_privado',"msg33", id_user, destino);

 //MY_Socket.enviandoMessage('msg_publico','nuevo elemento', '21c13c57-7602-11e7-bcff-040148d84901', 'nada');

 enviandoMessage : function(tipo,msg,id_user,destino) {  
    MY_Socket.socket.emit(tipo,msg,id_user,destino);
 },  
 
} // end window.MY_Socket
  

  // Comenzando !! Start it up!
  
  MY_Socket.bindEvents();

 

  //MY_Socket.sendNewPost( "mi primer mensaje", "3");
  //MY_Socket.sendNewPost( "mi primer mensaje");

  // Read a cookie. http://www.quirksmode.org/js/cookies.html#script
  function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
  }
   
/* Este buscará la insignia(badge) 'Admin' en la ventana actual.
   Este es un método super-hacky "para determinar si el usuario es un administrador"
   Para que los mensajes desde el usuario del mismo equipo que el administrador no se
   dupliquen en el flujo de mensajes(message stream). */
   
  function userIsAnAdmin(){
    var val = false;
    $('.userTeamBadge').children().each(function(i,el){
       if ($(el).text() == 'Admin'){
         val = true;
       }
    });
    return val;
    
  }
});
