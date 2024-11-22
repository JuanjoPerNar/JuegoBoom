const numeroUsuario = document.getElementById('userInput');
const cuentaAtras = document.getElementById('countdown');
const resultado = document.getElementById('result');
const btnReiniciar = document.getElementById('restart');

const juego = () => {
    cuentaAtras.textContent = '';
    resultado.textContent = '';    

    const promesaJuego = new Promise((resolve) => {
        const numeroAleatorio = Math.floor(Math.random() * 3) + 1;
        const duracionCuenta = 5;
        let tiempoRestante = duracionCuenta;
    
        const intervalo = setInterval(() => {
            cuentaAtras.textContent = `Cuenta atrás: ${tiempoRestante}`;
            tiempoRestante--;
            if (tiempoRestante < 0) {
                clearInterval(intervalo);
                resolve(numeroAleatorio);
            }
        }, 1000);
    });

    promesaJuego
    .then((numeroCorrecto) => {
        const numeroUsuarioCreado = parseInt(numeroUsuario.value)

        if (isNaN(numeroUsuarioCreado) || numeroUsuarioCreado < 1 || numeroUsuarioCreado > 3) {
            resultado.innerHTML = `<p class='numerosResultados'>Introduce un número válido entre 1 y 3</p>`;
            return;
        }
        if (parseInt(numeroUsuario.value) === numeroCorrecto) {
            resultado.innerHTML = `
                <h2 class='green'>¡ENHORABUENA! Has salvado el mundo. <i class="fa-solid fa-earth-americas"></i></h2>
                <p class='numerosResultados'>Tu número ${numeroUsuario.value} es igual que el número correcto ${numeroCorrecto}</p>
                `;
        } else {
            resultado.innerHTML = `
                <h2 class='red'>¡LO SIENTO! La bomba ha estallado. <i class="fa-solid fa-bomb"></i></h2>
                <p class='numerosResultados'>Tu número ${numeroUsuario.value} no es igual al número correcto ${numeroCorrecto}</p>
                `;
        };
    });
};

btnReiniciar.addEventListener('click', () => {
    numeroUsuario.value = '';
    resultado.textContent = '';
    cuentaAtras.textContent = '';
    juego();
});

juego();
