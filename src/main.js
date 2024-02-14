const carta = document.querySelectorAll('#carta')
const digimones = [
  'tailmon',
  'tailmon',
  'agumon',
  'agumon',
  'devimon',
  'devimon',
  'angewomon',
  'angewomon',
  'piyomon',
  'piyomon',
  'patamon',
  'patamon',
]

const shuffle = (array) => {
  return array.sort(() => Math.random() - 0.5)
}

const cambiarImagenCarta = () => {
  const imagenCarta = document.getElementById('img-carta')
  imagenCarta.src = '/img/Agumon.webp'
}
carta.forEach(carta => carta.addEventListener('click', cambiarImagenCarta))

carta.addEventListener('click', cambiarImagenCarta)
