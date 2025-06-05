//Dirección del END POINT generado en RETOOL
const API_URL = "https://retoolapi.dev/03wkDd/Integrantes";

//Creamos la función que llama a la API y realiza una solicitud GET
async function ObtenerRegistros(){
    //Hacemos GET a la API y obtenemos la respuesta (response)
    const respuesta = await fetch(API_URL);
    //Obtenemos los datos en formato JSON a partir de la respuesta
    const data = await respuesta.json(); //Esto ya es un JSON
    //Llamamos a MostrarRegistros y le enviamos el JSON
    MostrarRegistros(data);
}

//Función para generar las filas de la tabla
//Datos que representa al JSON
function MostrarRegistros(datos){
    //Se llama al elemento tbody dentro de la tabla con el id "tabla"
    const tabla = document.querySelector("#tabla tbody");

    //Para inyectar código HTML usamos innerHTML
    tabla.innerHTML = ""; //Vaciamos el contenido de la tabla

    datos.forEach(persona => {
        tabla.innerHTML += `
            <tr>
                <td>${persona.id}</td>
                <td>${persona.Nombre}</td>
                <td>${persona.Apellido}</td>
                <td>${persona.Correo}</td>
                <td>
                    <button>Editar</button>
                    <button>Eliminar</button>
                </td>
            </tr>
        `;
    });
}

ObtenerRegistros();

//proceso para agregar registros
const modal = document.getElementById("mdAgregar"); //Cuadro de dialogo
const btnAgregar = document.getElementById("btnAgregar"); //boton para abrir
const btnCerrar = document.getElementById("btnCerrarModal"); //boton cerrar

btnAgregar.addEventListener("click" , ()=>{
    modal.showModal(); //abre modal cuando btnAgregr se le hace clic
});

btnCerrar.addEventListener("click" , ()=>{
    modal.close(); //Cierra el modal cuando btnCerrar se le hace click
})

//Agregar un nuevo integrante desde el formulario 
document.getElementById("frmAgregar").addEventListener("submit", async e => {
    e.preventDefault(); //evita que los datos se envien por defecto

    //capturar los valores del formulario
    const Nombre = document.getElementById("txtNombre").value.trim();
    const Apellido = document.getElementById("txtApellido").value.trim();
    const Correo = document.getElementById("txtEmail").value.trim();

    
//Validacion basica
if(!Nombre || !Apellido || !Correo){
    alert("Complete todos los campos");
    return; //Evita que el codig se siga ejecutando
}

//Llamar a la API para enviar datos
const respuesta = await fetch(API_URL, {
    method: "POST",
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({Nombre,Apelido,Correo})
});
 if(respuesta.ok){
    //mensaje de confirmacion
    alert("El registro fue agregado correctamente");
    //limpiar el formulario
    document.getElementById("frmAgregar").reset();

    //Cerrar el modal (dialog)
    modal.close();
    //recargar la tabla

    ObtenerRegistros();
 }
 else{
    alert("Hubo un error al guardar");
 }

});
