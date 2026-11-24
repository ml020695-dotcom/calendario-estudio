const API_URL = "http://192.168.1.145:8000";

const lista = document.getElementById("lista-tareas");
const formulario = document.getElementById("form-tarea");
const mensaje = document.getElementById("mensaje");

async function cargarTareas(){
    const respuesta = await fetch(API_URL + "/tareas.php");
    const tareas = await respuesta.json();

    lista.innerHTML = "";

    for (const tarea of tareas){
        const elemento = document.createElement("li");
        elemento.textContent = tarea.fecha + " - " + tarea.titulo;
        lista.appendChild(elemento);

    }
}

formulario.addEventListener("submit", async function (evento) {
    evento.preventDefault();

    const nuevaTarea = {
        titulo: document.getElementById("titulo").value,
        fecha: document.getElementById("fecha").value,
        descripcion: document.getElementById("descripcion").value
    };

    const respuesta = await fetch(API_URL + "/crear_tarea.php",{
        method: "POST",
        headers: { "content-Type": "application/json" },
        body: JSON.stringify(nuevaTarea)
    });

    if (respuesta.ok){
        mensaje.textContent = "tarea añadida";
        formulario.reset();
        cargarTareas();
    }else{
        const error = await  respuesta.json();
        mensaje.textContent = "Error: " + error.error;
    }
    
});

cargarTareas();