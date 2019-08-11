var express = require('express'),
    http = require('http');
    var mysql   =     require("mysql");
var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);

server.listen(8080);


// Conectando a mysql
var con    =    mysql.createPool({
      connectionLimit   :   100,
      host              :   'localhost',
      user              :   'root',
      password          :   'root',
      database          :   'chat',
      debug             :   false
});

var nombre ='';



io.on('connection',function(socket){  
	socket.emit('conexion', { message: 'Soy el servidor, Que quieres??' });


	socket.on('unirSala', function(sessionId,id_user){

    console.log(id_user);
		var hab;

        hab = 2;
           con.getConnection(function(err,connection){
                    //console.log(connection);
                if (err) console.log(err);

                con.query("SELECT * FROM  usuarios where id='"+id_user+"'",function(err,filas, campos){
                      
                      connection.release();
                      if(!err) {
                      //  callback(true);
                      }

                      //nombre = filas[0].nombre;
                      //si es administrador "se unira a la habitación admin"
                      if (filas[0].perfil==1)  {
                         socket.join('admin');
                      } 

                      //se unirá a la habitación 2
                      socket.join(hab.toString());
                      //se unira a la habitación de su usuario
                      socket.join(id_user.toString());  
                      
                  });
          }); 

	});	




    
    socket.on('msg_publico',function(msg,id_user,destino){

       con.getConnection(function(err,connection){
                if (err) console.log(err);
                con.query("SELECT * FROM  usuarios where id='"+id_user+"'",function(err,filas, campos){
                      connection.release();
                      if(!err) {
                      //  callback(true);
                      }
                      nombre = filas[0].nombre;
                       var valores = {msg: msg, id_user: id_user, status:'p',  destino:destino, nombre:nombre};
                       var hab=2;
                       addComentario(valores,function(res){
                        if(res){
                            socket.emit('chat_publico',valores);  //para el usuario actual
                            socket.broadcast.to(hab.toString()).emit('chat_publico',valores); //para el resto que esta en hab.
                        } else {
                            io.emit('error');
                        }
                      });
   
                  });






          }); 


     
       
    });


    




    socket.on('msg_privado',function(msg,id_user,destino){

           con.getConnection(function(err,connection){
                if (err) console.log(err);
                con.query("SELECT * FROM  usuarios where id='"+id_user+"'",function(err,filas, campos){
                      connection.release();
                      if(!err) {
                      //  callback(true);
                      }
                      nombre = filas[0].nombre;


                 
                      var valores = {msg: msg, id_user: id_user, status:'v',destino:destino, nombre:nombre};
                       
                      addComentario(valores,function(res){
                        if(res){
                            socket.emit('chat_privado',valores);  //para el usuario actual
                            socket.broadcast.to(destino.toString()).emit('chat_privado',valores); //para el resto que esta en hab.
                        } else {
                            io.emit('error');
                        }
                      });




                  });






          }); 


     
       
    });


    
});


var addComentario = function (valores,callback) {
  //console.log(valores.msg);
        con.getConnection(function(err,connection){
            if (err) {
              //console.log(valores.msg);
              connection.release();
              callback(false);
              return;
            }
       
        connection.query("INSERT INTO mensajes (mensaje,id_usuario, status, id_destino) VALUES ('"+valores.msg+"'"+",'"+valores.id_user+"'"+",'"+valores.status+"'"+",'"+valores.destino+"')", function(err,rows){ //Insertando nuestro comentario
                connection.release();
                //console.log(valores.msg);
                if(!err) {
                  callback(true);
                }
            });
         connection.on('error', function(err) {
                  callback(false);
                  return;
            });
        });
}

