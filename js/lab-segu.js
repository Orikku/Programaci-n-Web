function agregarComentario() {
    // Obtenemos el comentario ingresado por el usuario
    var comentario = document.getElementById("comentario").value;
    
    // Creamos un nuevo elemento <p> para mostrar el comentario
    var p = document.createElement("p");

    // Usamos textContent en lugar de innerHTML para evitar XSS
    p.textContent = comentario;
    
    // Agregamos el comentario al div de comentarios
    document.getElementById("comentarios").appendChild(p);

    // Limpiamos el campo de entrada
    document.getElementById("comentario").value = "";
}
