function agregarComentario() {
    // Obtenemos el comentario ingresado por el usuario
    var comentario = document.getElementById("comentario").value;
    
    // Creamos un nuevo elemento <p> para mostrar el comentario
    var p = document.createElement("p");

    // Aquí agregamos el comentario directamente sin sanitizar, simulando la vulnerabilidad XSS
    p.innerHTML = comentario;
    
    // Agregamos el comentario al div de comentarios
    document.getElementById("comentarios").appendChild(p);

    // Limpiamos el campo de entrada
    document.getElementById("comentario").value = "";
}
