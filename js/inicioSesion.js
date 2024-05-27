document.addEventListener('DOMContentLoaded', () => {

    // Seleccionar formulario en DOM
    const formulario = document.querySelector('form');

    // -----------------------------------------------------------------------------------------
    // Función para validar todo el formulario
    const validarFormulario = () => {
        let validar = true;
        // Validamos correo y password
        validar = validarEmail('email', 'Correo Electrónico no válido') && validar;
        validar = validarCampo('password', 'La contraseña es obligatoria') && validar;
        
        return validar;
    };
    
    // ----------------------------------------------------------------------------------------
        // Evento de Escucha cuando se intente enviar el formulario
        formulario.addEventListener('submit', evento => {
            evento.preventDefault();
            if (!validarFormulario()) {
                // mensaje no válido
                evento.preventDefault(); // evita que el formulario se envíe
                console.log("El formulario no es válido");
            } else {
                // mensaje válido
                evento.preventDefault(); // evita que el formulario se envíe
                console.log("El formulario es válido...");

            }
        });
    

    // ----------------------------------------------------------------------------------------
    // Validar un campo vacío
    function validarCampo (campoId, mensaje) {
        const campo = document.getElementById(campoId);
        const value = campo.value.trim();

        if (value === '') {
            mostrarError(campo, mensaje);
            return false; // indicamos que la validación falló
        } else {
            eliminarError(campo);
            return true; // indicamos que la validación fue exitosa
        }
    }

    // Función validar formato de correo electrónico con expresión regular
    function isEmail(email) {
        // Uso expresión regular para validar la cadena email
        const regEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // Verifica y devuelve true or false
        return regEx.test(email);
    }
    
    // Función para Validar el campo de email
    function validarEmail(campoId, mensaje) {
        // obtenemos elemento mediante su id
        const campo = document.getElementById(campoId)
        const email = campo.value.trim();

        if (email === '') {
            // establecemos mensaje de error
            mostrarError(campo, 'El correo electrónico es obligatorio');
            // indicamos que la validación falló
            return false;
        } else if (!isEmail(email)) {
            // establecemos mensaje de error
            mostrarError(campo, mensaje);
            // indicamos que la validación falló
            return false;
        } else {
            // si es valido eliminamos cualquier error
            eliminarError(campo);
            // indicamos que la validación fue exitosa
            return true;
        }
    }

    // Función mostrar Error
    const mostrarError = (input, mensaje) => {
        // acceder al div Padre
        const divPadre = input.parentNode;
        // encontrar el elemento error-text
        const errorText = divPadre.querySelector('.error-text');
        // agregar la clase error al div Padre para aplicar el estilo
        divPadre.classList.add('error');
        // agregamos un mensaje de error
        errorText.innerText = mensaje;
    };

    const input = document.querySelector('#password');
    const mensaje = 'campo obligatorio CHE';

    // ----------------------------------------------------------------------------------------
    // Eliminar mensaje de Error

    const eliminarError = input => {
        // accedemos a la etiqueta padre
        const divPadre = input.parentNode;
        // eliminar la clase 'error' del padre
        divPadre.classList.remove('error');
        // encontrar el elemento error-text
        const errorText = divPadre.querySelector('.error-text');
        // establecemos el texto vacío
        errorText.innerText = '';
    };

    // ----------------------------------------------------------------------------------------
    // Función para corroborar si los campos están completos para borrar las clases de error
    
    formulario.querySelectorAll('input').forEach(input => {
            // se activa cuando el valor de un elemento del formulario cambia o sale del elemento
            input.addEventListener('change', () => {
            // Obtiene el valor del campo seleccionado
            const valor = input.value.trim(); // elimina cq espacio en blanco al principio y fin del valor obtenido.
            // Si se selecciona una opción, elimina cualquier mensaje de error
            if (valor !== '') {
                eliminarError(input);
            }
        });
    });

});