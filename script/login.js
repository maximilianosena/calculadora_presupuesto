
document.addEventListener("DOMContentLoaded", function() {

let input_user = document.getElementById("user")
let input_pass = document.getElementById("pass")
let formulario = document.getElementById("datos")

formulario.addEventListener("submit", async function (e){
    e.preventDefault();
    const user = input_user.value.trim()
    const pass = input_pass.value.trim()
    
    if (user!=="" && pass!=="" ){
        const obj= {usuario: `${user}`,
            código: `${pass}`
            }

    try { 
        // Hacer una solicitud POST usando fetch
        const response = await fetch('https://backend-presupuestadora.vercel.app/login', {
        method: 'POST',  // Tipo de solicitud
        headers: {
        'Content-Type': 'application/json', 
        'Accept': 'application/json' 
        },
        body: JSON.stringify( obj ),  
        });

     if (response.ok) {
        const result = await response.json();
        console.log('Respuesta del servidor:', result);
        localStorage.setItem("token", result.token)
        localStorage.setItem("user", user)
        location.replace("index.html")
      } else if (response.status===401){
        alert("Usuario y/o Contraseña inválidas")
      } else {
        console.error('Error en la solicitud:', response.status);
      }
    } catch (error) {
      console.error('Error al hacer la solicitud:', error);
    }

}})
})