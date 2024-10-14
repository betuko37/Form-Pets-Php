document.addEventListener("DOMContentLoaded", function () {
    let mascotasArray = []; // Variable para almacenar las mascotas
    GetMascotas();
    let editMode = false;
    let idToEdit;
    
  
    // Modal
    const modal = document.getElementById("edit-modal");
    const closeModalBtn = document.getElementById("close-modal");
  
    // Función para abrir el modal
    function openModal() {
      modal.style.display = "block"; // Muestra el modal
    }
  
    // Función para cerrar el modal
    function closeModal() {
      modal.style.display = "none"; // Oculta el modal
    }
  
    // GET MASCOTAS
    function GetMascotas() {
      fetch("./php/get.php", {
        method: "GET",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error en la solicitud: " + response.statusText);
          }
          return response.json();
        })
        .then((mascotas) => {
          if (Array.isArray(mascotas)) {
            mascotasArray = mascotas; // Almacenar el array de mascotas
            let template = "";
            mascotas.forEach((mascota) => {
              template += `
                          <tr taskId="${mascota.id}">
                              <td class="titles id">${mascota.id}</td> 
                              <td class="titles nombre">${mascota.nombre}</td> 
                              <td class="titles acciones">
                                  <button class="edit-btn" data-id="${mascota.id}">Editar</button>
                                  <button class="delete-btn" data-id="${mascota.id}">Eliminar</button>
                              </td>
                          </tr>
                      `;
            });
            document.getElementById("tasks").innerHTML = template;
  
            // Vincular los botones "Editar" y "Eliminar"
            document.querySelectorAll(".edit-btn").forEach((button) => {
              button.addEventListener("click", handleEdit);
            });
  
            document.querySelectorAll(".delete-btn").forEach((button) => {
              button.addEventListener("click", handleDelete);
            });
          } else if (mascotas.error) {
            console.error("Error:", mascotas.error);
          }
        })
        .catch((error) => {
          console.error("Error al cargar las mascotas:", error.message);
        });
    }
  
    // ADD
    // Agregar mascota
    document
      .getElementById("pet-form")
      .addEventListener("submit", function (event) {
        event.preventDefault(); // Prevenir el comportamiento por defecto del formulario
  
        // Obtener los valores de los campos del formulario
        var nombre = document.getElementById("pet-name").value;
        var edad = document.getElementById("pet-age").value;
        var genero = document.getElementById("pet-gender").value;
        var fecha_nacimiento = document.getElementById("birth-date").value;
  
        // Construir los datos a enviar
        var data = `nombre=${encodeURIComponent(
          nombre
        )}&edad=${encodeURIComponent(edad)}&sexo=${encodeURIComponent(
          genero
        )}&fecha_nacimiento=${encodeURIComponent(fecha_nacimiento)}`;
  
        // Enviar los datos al servidor
        fetch("./php/guardar.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: data,
        })
          .then((response) => response.text())
          .then((responseData) => {
            console.log(responseData); // Mostrar respuesta en la consola
            document.getElementById("pet-form").reset(); // Resetear el formulario
            GetMascotas(); // Actualizar la lista de mascotas
          })
          .catch((error) => {
            console.error("Error al agregar mascota:", error);
          });
      });
  
      
      
      // EDIT
      document
          .getElementById("edit-pet-form")
          .addEventListener("submit", function (event) {
              event.preventDefault(); // Prevenir el comportamiento por defecto del formulario
      
              // Obtener los valores de los campos del formulario
              var nombre = document.getElementById("edit-pet-name").value;
              var edad = document.getElementById("edit-pet-age").value;
              var genero = document.getElementById("edit-pet-gender").value;
              var fecha_nacimiento = document.getElementById("edit-birth-date").value;
      
              // Construir los datos a enviar
              var data = `nombre=${encodeURIComponent(nombre)}&edad=${encodeURIComponent(edad)}&sexo=${encodeURIComponent(genero)}&fecha_nacimiento=${encodeURIComponent(fecha_nacimiento)}`;
      
              if (editMode) {
                  // Si estamos en modo edición, agregamos el ID
                  data += `&id=${encodeURIComponent(idToEdit)}`; // Usa idToEdit
              }
      
              // Enviar los datos al servidor
              fetch("./php/editar.php", {
                  method: "POST",
                  headers: {
                      "Content-Type": "application/x-www-form-urlencoded",
                  },
                  body: data,
              })
                  .then((response) => response.text())
                  .then((responseData) => {
                      console.log(responseData); // Mostrar respuesta en la consola
                      document.getElementById("edit-pet-form").reset(); // Resetear el formulario
                      editMode = false; // Salir del modo edición
                      closeModal(); // Cierra el modal
                      GetMascotas(); // Actualizar la lista de mascotas
                  })
                  .catch((error) => {
                      console.error("Error al actualizar mascota:", error);
                  });
          });
      
      // HANDLE EDIT
      function handleEdit(event) {
          const id = event.target.getAttribute("data-id");
          const mascota = mascotasArray.find((m) => m.id == id);
          if (mascota) {
              document.getElementById("edit-pet-name").value = mascota.nombre || "";
              document.getElementById("edit-pet-age").value = mascota.edad || "";
              document.getElementById("edit-pet-gender").value = mascota.sexo.toLowerCase() || "";
              document.getElementById("edit-birth-date").value = mascota.fecha_nacimiento || "";
              
              idToEdit = mascota.id; // Asignar el ID aquí
              editMode = true; // Entramos en modo edición
              openModal(); // Abre el modal
          }
      }
      
  
    // HANDLE DELETE
    function handleDelete(event) {
      const id = event.target.getAttribute("data-id");
      if (confirm("¿Estás seguro de que deseas eliminar esta mascota?")) {
        fetch(`./php/eliminar.php?id=${id}`, {
          method: "GET",
        })
          .then((response) => response.text())
          .then((responseData) => {
            console.log(responseData);
            GetMascotas(); // Actualizar la lista después de eliminar
          })
          .catch((error) => {
            console.error("Error al eliminar la mascota:", error);
          });
      }
    }
  
    // Cerrar el modal
    closeModalBtn.addEventListener("click", closeModal);
    window.addEventListener("click", function (event) {
      if (event.target === modal) {
        closeModal();
      }
    });
  });
  