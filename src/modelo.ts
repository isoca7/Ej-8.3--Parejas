
export interface Carta {
  idFoto: number // id del 1 al 6 para 12 cartas, así identificamos rápido si es un gatito ,un perrito...
  // el ID se repete 2 veces en el array de cartas (hay dos cartas de un perro, hay dos cartas de un gato)
  imagen: string // por comodidad repetimos la url de la imagen
  estaVuelta: boolean
  encontrada: boolean
}

interface InfoCarta {
  idFoto: number
  imagen: string
}

const infoCartas: InfoCarta[] = [
  /* Aquí ponemos seis cartas siguiendo la interfaz de InfoCarta */
  {
    idFoto: 1,
    imagen: './src/img/agumon.png',
  },
  {
    idFoto: 2,
    imagen: './src/img/angewomon.png',
  },
  {
    idFoto: 3,
    imagen: './src/img/devimon.jpg',
  },
  {
    idFoto: 4,
    imagen: './src/img/patamon.png',
  },
  {
    idFoto: 5,
    imagen: './src/img/tailmon.jpg',
  },
  {
    idFoto: 6,
    imagen: './src/img/gabumon.png',
  },
]

const crearCartaInicial = (idFoto: number, imagen: string): Carta => ({
  idFoto,
  imagen,
  estaVuelta: false,
  encontrada: false,
})

const crearColeccionDeCartasInicial = (infoCartas: InfoCarta[]): Carta[] => {
  /* Aquí crearemos un array de cartas a partir de un array de infoCartas
     y duplicaremos las cartas para que haya dos de cada tipo.
  */let carta : Carta[] = []
  for (let i = 0; i < infoCartas.length; i++) {
   carta.push(crearCartaInicial(infoCartas[i].idFoto, infoCartas[i].imagen))
   carta.push(crearCartaInicial(infoCartas[i].idFoto, infoCartas[i].imagen))
  }
  return carta
}

const barajarCartas = (cartas : Carta[]): Carta[] => {
  return cartas.sort(() => Math.random() - 0.5)
}
export let cartas: Carta[] = crearColeccionDeCartasInicial(infoCartas)
let cartasBarajadas =  barajarCartas(cartas)
/*
  Aquí definimos el tipo de estado de la partida, la idea es que cuando empiece la partida todas las cartas estén boca abajo y si se hacen click sobre ellas no se volteen.
  EstadoPartida = "PartidaNoIniciada", una vez que se pulse Iniciar partida el estado de la partida cambiaría a "CeroCartasLevantadas" y así sucesivamente.
*/

const asignarCartasVolteadas = (tablero : Tablero[]) => {
  for(let i=0; i<=cartasBarajadas.length; i++){
    const carta = document.getElementById(`${i}`) as HTMLImageElement
    if(carta !==null && carta !== undefined){
      carta.addEventListener('click', ()=>{
        tablero.indiceCartaVolteadaA = i
      })
    }
 }   
}


type EstadoPartida =
  | 'PartidaNoIniciada'
  | 'CeroCartasLevantadas'
  | 'UnaCartaLevantada'
  | 'DosCartasLevantadas'
  | 'PartidaCompleta'

export interface Tablero {
  cartas: Carta[]
  estadoPartida: EstadoPartida
  indiceCartaVolteadaA?: number
  indiceCartaVolteadaB?: number
}

const crearTableroInicial = (): Tablero => ({
  cartas: cartas,
  estadoPartida: 'PartidaNoIniciada',
})

export let tablero: Tablero = crearTableroInicial()

const cambiarImagenCarta = () => {
   for(let i=0; i<=cartasBarajadas.length; i++){
      const elementoImagen = document.getElementById(`img-${i}`) as HTMLImageElement
      if(elementoImagen !==null && elementoImagen !== undefined){
        elementoImagen.addEventListener('click', ()=>{
          elementoImagen.src = cartasBarajadas[i].imagen
          elementoImagen.classList.add("flipped")
        })
      }
   }   
}

cambiarImagenCarta()

