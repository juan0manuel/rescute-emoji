const ocean = document.querySelectorAll(".ocean");
const timeleft = document.querySelector("#time");

let score = document.getElementById("score");
let hearts = document.getElementById("hearts");
let color = document.getElementById("color");
let heart = 3;
let result = 0;
let currentTime = timeleft.textContent;
let sharkPosition = null;
let emojiPosition = null;
let gameActive = true; // Para controlar si el juego está activo o no

function randomShark() {
    // Elimina el tiburón de cualquier casilla antes de asignar uno nuevo
    ocean.forEach(className => {
        className.classList.remove("shark");
        className.style.backgroundColor = "rgb(0, 13, 248)"; // Resetea el color de fondo
        className.style.borderColor = "rgb(42, 122, 165)"; // Recetea el color de los bordes
    });

    if (gameActive) {
        let randomPosition;
        // Asegurarse de que el tiburón no aparezca en la misma casilla que el emoji
        do {
            randomPosition = ocean[Math.floor(Math.random() * ocean.length)];
        } while (randomPosition === emojiPosition);
        randomPosition.classList.add("shark");
        sharkPosition = randomPosition; // Asigna la posición actual del tiburón
    }
}

function randomEmoji() {
    // Elimina el emoji de cualquier casilla antes de asignar uno nuevo
    ocean.forEach(className => {
        className.classList.remove("emoji");
    });

    if (gameActive) {
        let randomPosition;
        // Asegurarse de que el emoji no aparezca en la misma casilla que el tiburón
        do {
            randomPosition = ocean[Math.floor(Math.random() * ocean.length)];
        } while (randomPosition === sharkPosition);
        randomPosition.classList.add("emoji");
        emojiPosition = randomPosition; // Asigna la posición actual del emoji
    }
}

ocean.forEach(identifier => {
    identifier.addEventListener("click", () => {
        // Solo permitir clics si el juego sigue activo
        if (gameActive) {
            if (identifier === sharkPosition) {
                // Si la casilla donde se hizo clic es la del tiburón
                identifier.style.backgroundColor = "green"; // Cambia el color de fondo a verde
                identifier.style.borderColor = "green";
                result++; // Aumenta el puntaje
                score.textContent = result; // Actualiza el puntaje en pantalla
                sharkPosition = null; // Resetea la posición del tiburón
            } else if (identifier === emojiPosition) {
                // Si se hace clic en el emoji
                identifier.style.backgroundColor = "orange"; // Cambia el color de fondo a naranja
                identifier.style.borderColor = "orange";
                heart--; // Disminuye la cantidad de corazones
                hearts.textContent = heart; // Actualiza los corazones en pantalla
                emojiPosition = null; // Resetea la posición del emoji
            } else {
                identifier.style.backgroundColor = "red"; // Cambia el color de fondo a rojo
                identifier.style.borderColor = "red";
                result--; // Reduce el puntaje si el clic fue en la casilla incorrecta
                if (result < 0) result = 0; // Evita que el puntaje sea negativo
                score.textContent = result; // Actualiza el puntaje en pantalla
            }
        }
    });
});

function moveShark() {
    timeShark = setInterval(randomShark, 600); // Mueve el tiburón cada 600ms
}

function moveEmoji() {
    timeEmoji = setInterval(randomEmoji, 600); // Mueve el emoji cada 600ms
}

moveShark();
moveEmoji();

function countDown() {
    currentTime--;
    timeleft.textContent = currentTime;

    if (currentTime === 0) {
        // Termina el juego cuando el tiempo llega a 0
        clearInterval(timeShark);
        clearInterval(timeEmoji);
        clearInterval(countDownTime);
        gameActive = false; // Desactiva el juego, evitando más clics
        removeShark(); // Elimina al tiburón de la pantalla
        removeEmoji(); // Elimina el emoji de la pantalla
        color.textContent = "Reinicie para volver a jugar 🙂";
        if (result > 0) {
            alert("The game has finished, your score is: " + result + " points, ¡Congratulations!");
        } else {
            alert("Sorry we don't catch any sharks, your score is: " + result + " points");
        }
    } else if (heart === 0) {
        // Termina el juego cuando el jugador pierde todos los corazones
        clearInterval(timeShark);
        clearInterval(timeEmoji);
        clearInterval(countDownTime);
        gameActive = false; // Desactiva el juego, evitando más clics
        removeShark(); // Elimina al tiburón de la pantalla
        removeEmoji(); // Elimina el emoji de la pantalla
        color.textContent = "Reinicie para volver a jugar 🙂";
        alert("Sorry, your emoji has died ☠️");
    }
}

let countDownTime = setInterval(countDown, 1000);

function removeShark() {
    // Elimina el tiburón de cualquier casilla
    ocean.forEach(className => {
        className.classList.remove("shark");
        className.style.backgroundColor = "rgb(0, 13, 248)"; // Limpia cualquier color de fondo
        className.style.borderColor = "rgb(42, 122, 165)";
    });
}

function removeEmoji() {
    // Elimina el emoji de cualquier casilla
    ocean.forEach(className => {
        className.classList.remove("emoji");
    });
}
