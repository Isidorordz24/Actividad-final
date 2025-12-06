const tablero = document.getElementById("tablero");
const tiempoElem = document.getElementById("tiempo");
const aciertosElem = document.getElementById("aciertos");
const btnIniciar = document.getElementById("iniciar");
const btnReiniciar = document.getElementById("reiniciar");

let primera = null;
let bloqueo = false;
let aciertos = 0;
let tiempo = 60;
let intervalo;

// ⚡️ RUTA DE IMÁGENES (usa tus propias imágenes)
const imagenes = [
  "img1.jpg",
  "img2.jpg",
  "img3.jpg",
  "img4.jpg",
  "img5.jpg",
  "img6.jpg",
  "img7.jpg",
  "img8.jpg"
];

let cartas = [];

function crearTablero() {
  tablero.innerHTML = "";
  let pares = [...imagenes, ...imagenes];
  cartas = pares.sort(() => Math.random() - 0.5);

  cartas.forEach((imgSrc) => {
    const carta = document.createElement("div");
    carta.classList.add("card");
    carta.innerHTML = `
      <div class="inner">
        <div class="front">
          <img src="img/${imgSrc}" alt="imagen">
        </div>
        <div class="back">❓</div>
      </div>
    `;
    carta.addEventListener("click", () => voltearCarta(carta, imgSrc));
    tablero.appendChild(carta);
  });
}

function voltearCarta(carta, imgSrc) {
  if (bloqueo || carta.querySelector(".inner").classList.contains("flipped")) return;

  carta.querySelector(".inner").classList.add("flipped");

  if (!primera) {
    primera = { carta, imgSrc };
  } else {
    bloqueo = true;
    if (imgSrc === primera.imgSrc) {
      aciertos++;
      aciertosElem.textContent = aciertos;
      primera = null;
      bloqueo = false;

      if (aciertos === imagenes.length) {
        clearInterval(intervalo);
        setTimeout(() => alert("🎉 ¡Ganaste!"), 300);
      }
    } else {
      setTimeout(() => {
        carta.querySelector(".inner").classList.remove("flipped");
        primera.carta.querySelector(".inner").classList.remove("flipped");
        primera = null;
        bloqueo = false;
      }, 800);
    }
  }
}

function iniciarJuego() {
  crearTablero();
  aciertos = 0;
  tiempo = 60;
  aciertosElem.textContent = "0";
  tiempoElem.textContent = tiempo;
  clearInterval(intervalo);

  intervalo = setInterval(() => {
    tiempo--;
    tiempoElem.textContent = tiempo;
    if (tiempo === 0) {
      clearInterval(intervalo);
      alert("⏰ ¡Se acabó el tiempo!");
      deshabilitarCartas();
    }
  }, 1000);
}

function deshabilitarCartas() {
  document.querySelectorAll(".inner").forEach((c) => {
    c.style.pointerEvents = "none";
  });
}

btnIniciar.addEventListener("click", iniciarJuego);
btnReiniciar.addEventListener("click", iniciarJuego);
