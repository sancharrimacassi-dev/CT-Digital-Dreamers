// Primero debe cargar el html y luego se ejecuta la función
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("formContacto");
    const estado = document.getElementById("estado-form");
    function mostrarError(msg) {
        estado.textContent = msg;
        estado.style.color = "red";
        setTimeout(() => { estado.textContent = ""; }, 6000);
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Evita el envío real del formulario

        // Obtiene los valores de los campos
        const nombres = document.getElementById("nombres").value.trim();
        const apellidos = document.getElementById("apellidos").value.trim();
        const edad = parseInt(document.getElementById("edad").value.trim());
        const grado = document.getElementById("grado").value;
        const ciudad = document.getElementById("ciudad").value.trim();
        const telefono = document.getElementById("telefono").value.trim();
        const correo = document.getElementById("correo").value.trim();
        const mensaje = document.getElementById("mensaje").value.trim();

        // Validación
        const soloLetras = /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/;
        const telRegistro = /^[0-9]{7,15}$/;
        const correoRegistro = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const validaciones = [
            {
                cond: !nombres || !apellidos || !edad || isNaN(edad) || edad < 15 || edad > 45 ||
                    !grado || !ciudad || !telefono || !correo || !mensaje,
                msg: "❌ Por favor, completa todos los campos correctamente."
            },
            {
                cond: !soloLetras.test(nombres) || !soloLetras.test(apellidos),
                msg: "❌ Nombres y apellidos solo deben contener letras."
            },
            {
                cond: !telRegistro.test(telefono),
                msg: "❌ Ingresa un teléfono válido (solo números, 7 a 15 dígitos)."
            },
            {
                cond: !correoRegistro.test(correo),
                msg: "❌ Ingresa un correo electrónico válido. Verifica los espacios, el dominio y el @."
            },
            {
                cond: mensaje.length < 10,
                msg: "❌ El mensaje debe tener al menos 10 caracteres."
            },
        ];

        // Recorremos las validaciones con un bucle
        for (let val of validaciones) {
            if (val.cond) {
                return mostrarError(val.msg);
            }
        }


        // Aquí simulamos envío exitoso
        estado.textContent = "✅ ¡Gracias por contactarnos! Te responderemos pronto.";
        estado.style.color = "var(--morado-oscuro)";

        // Significa: después de 10 segundos, se ejecuta una función que borra el texto del estado.
        setTimeout(() => { estado.textContent = ""; }, 10000);

        // Limpiar los campos el formulario
        form.reset();
    });
});

