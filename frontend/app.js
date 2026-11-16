const API_URL = "http://192.168.1.145:8000";

async function cargarTareas(){
    const respuesta = await fetch(API_URL + "/tareas.php");
    const tareas = await respuesta.json();

    const lista = document.getElementById("lista-tareas");

    for(const tarea of tareas){
        const elemento = document.createElement("li");
        elemento.textContent = tarea.fecha + " - " + tarea.titulo;
        lista.appendChild(elemento);
    }
}

cargarTareas();

