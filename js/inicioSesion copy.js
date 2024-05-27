document.addEventListener('DOMContentLoaded', () => {

    // Seleccionar formulario en DOM
    const form = document.querySelector('form');

    // Evento de Escucha cuando se intente enviar el formulario
    form.addEventListener('submit', evento => {
        evento.preventDefault();
        if (validateInicioSesion()) {
            form.submit();
        }
    });

    // Validar todo el formulario
    validateInicioSesion = () => {
        let isValid = true;
        // Validamos correo y password
        isValid = validateEmail('email', 'Correo Electrónico no válido') && isValid;
        isValid = validateField('password', 'La contraseña es obligatoria') && isValid;

        return isValid;
    };

    // Validar un campo vacío
    const validateField = (fieldId, errorMessage) => {
        const field = document.getElementById(fieldId);
        const value = field.value.trim();

        if (value === '') {
            setError(field, errorMessage);
            return false;
        } else {
            setSuccess(field)
            return true;
        }
    };

    // Validar el correo electrónico
    const validateEmail = (fieldId, errorMessage) => {
        const field = document.getElementById(fieldId);
        const email = field.value.trim();

        if (email === '') {
            setError(field, 'El correo electrónico es obligatorio');
            return false;
        } else if (!isEmail(email)) {
            setError(field, errorMessage);
            return false;
        } else {
            setSuccess(field);
            return true;
        }
    };

    // Validar formato de correo electrónico
    const isEmail = (email) => {
        // Uso expresión regular para validar la cadena email
        const regEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // Verifica y devuelve true or false
        return regEx.test(email);
    }

    const setError = (input, message) => {
        const formControl = input.closest('div');
        const errorText = formControl.querySelector('.error-text');
        formControl.classList.add('error');
        errorText.innerText = message;
        input.focus();
    };


    const setSuccess = (input) => {
        const formControl = input.closest('div');
        formControl.classList.remove('error');
        const errorText = formControl.querySelector('.error-text');
        errorText.innerText = '';
    }

    // Eventos para borrar las clases de error cuando se completa el input o se presiona Tab
    form.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', () => {
            // Obtiene el valor del campo y elimina los espacios en blanco al principio y al final
            const value = input.value.trim();
            // Si el campo no está vacío, elimina cualquier mensaje de error
            if (value !== '') {
                setSuccess(input);
            }
        });
    });

    // Eventos para borrar las clases de error cuando se selecciona una opción del select
    form.querySelectorAll('select').forEach(select => {
        select.addEventListener('change', () => {
            // Obtiene el valor seleccionado del campo de selección
            const value = select.value;
            // Si se selecciona una opción, elimina cualquier mensaje de error
            if (value !== '') {
                setSuccess(select);
            }
        });
    });

});