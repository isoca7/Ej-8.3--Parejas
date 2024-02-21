export interface Carta {
  idFoto: number; // id del 1 al 6 para 12 cartas, así identificamos rápido si es un gatito ,un perrito...
  // el ID se repete 2 veces en el array de cartas (hay dos cartas de un perro, hay dos cartas de un gato)
  imagen: string; // por comodidad repetimos la url de la imagen
  estaVuelta: boolean;
  encontrada: boolean;
}

interface InfoCarta {
  idFoto: number;
  imagen: string;
}

const infoCartas: InfoCarta[] = [
  /* Aquí ponemos seis cartas siguiendo la interfaz de InfoCarta */
  {
    idFoto: 1,
    imagen: "./src/img/agumon.png",
  },
  {
    idFoto: 2,
    imagen: "./src/img/angewomon.png",
  },
  {
    idFoto: 3,
    imagen: "./src/img/devimon.jpg",
  },
  {
    idFoto: 4,
    imagen: "./src/img/patamon.png",
  },
  {
    idFoto: 5,
    imagen: "./src/img/tailmon.jpg",
  },
  {
    idFoto: 6,
    imagen: "./src/img/gabumon.png",
  },
];
export const botonIniciarPartida = document.getElementById(
  "iniciar-partida"
) as HTMLButtonElement;

const crearCartaInicial = (idFoto: number, imagen: string): Carta => ({
  idFoto,
  imagen,
  estaVuelta: false,
  encontrada: false,
});

const crearColeccionDeCartasInicial = (infoCartas: InfoCarta[]): Carta[] => {
  /* Aquí crearemos un array de cartas a partir de un array de infoCartas
     y duplicaremos las cartas para que haya dos de cada tipo.
     const CARTASTRANSFORMADAS = INFOCARTAS.MAP((CARTA) => CREARCARTAINICIAR(CARTA.IDFOTO, CARTA.IMAGEN))
     RETURN [...CARTASTRANSFORMADAS, ...CARTASTRANS];
  */
  const cartasTransformadas = infoCartas.map((carta) =>
    crearCartaInicial(carta.idFoto, carta.imagen)
  )
 const cartasTransformadas2 = infoCartas.map((carta) =>
    crearCartaInicial(carta.idFoto, carta.imagen)
  )
  return [...cartasTransformadas, ...cartasTransformadas2];
};

export let cartas: Carta[] = crearColeccionDeCartasInicial(infoCartas);

/*
  Aquí definimos el tipo de estado de la partida, la idea es que cuando empiece la partida todas las cartas estén boca abajo y si se hacen click sobre ellas no se volteen.
  EstadoPartida = "PartidaNoIniciada", una vez que se pulse Iniciar partida el estado de la partida cambiaría a "CeroCartasLevantadas" y así sucesivamente.
*/

type EstadoPartida =
  | "PartidaNoIniciada"
  | "CeroCartasLevantadas"
  | "UnaCartaLevantada"
  | "DosCartasLevantadas"
  | "PartidaCompleta";

export interface Tablero {
  cartas: Carta[];
  estadoPartida: EstadoPartida;
  indiceCartaVolteadaA?: number;
  indiceCartaVolteadaB?: number;
}
const barajarCartas = (cartas: Carta[]): Carta[] => {
  return cartas.sort(() => Math.random() - 0.5);
};

let cartasBarajadas = barajarCartas(cartas);

const crearTableroInicial = (): Tablero => ({
  cartas: cartasBarajadas,
  estadoPartida: "PartidaNoIniciada",
});

export let tablero: Tablero = crearTableroInicial();

/*-----------------------------------------------------------------------------------------------*/

let indice: number = 0;

/*
    Una carta se puede voltear si no está encontrada y no está ya volteada, o no hay dos cartas ya volteadas
  */

let indiceA = 0;
let indiceB = 0;
const asignarCartasVolteadas = (tablero: Tablero) => {
  if (tablero.estadoPartida === "CeroCartasLevantadas") {
    tablero.indiceCartaVolteadaA = indice;
    indiceA = tablero.indiceCartaVolteadaA;
    tablero.estadoPartida = "UnaCartaLevantada";
  } else if (tablero.estadoPartida === "UnaCartaLevantada") {
    tablero.indiceCartaVolteadaB = indice;
    indiceB = tablero.indiceCartaVolteadaB;
    tablero.estadoPartida = "DosCartasLevantadas";
  }
};

const sePuedeVoltearLaCarta = (tablero: Tablero, indice: number): boolean => {
  if (
    tablero.cartas[indice].estaVuelta ||
    tablero.cartas[indice].encontrada ||
    tablero.estadoPartida === "DosCartasLevantadas" ||
    tablero.estadoPartida === "PartidaNoIniciada"
  ) {
    return false;
  }
  return true;
};

const voltearLaCarta = (tablero: Tablero, indice: number): void => {
  //...
  console.log(tablero.cartas[indice])
  tablero.cartas[indice].estaVuelta = true;
};

/*
    Dos cartas son pareja si en el array de tablero de cada una tienen el mismo id
  */

export const sonPareja = (indiceA: number, indiceB: number): boolean => {
  //...
  if (tablero.estadoPartida === "DosCartasLevantadas") {
    return tablero.cartas[indiceA].idFoto === tablero.cartas[indiceB].idFoto
      ? true
      : false;
  }
  return false;
};

/*
    Aquí asumimos ya que son pareja, lo que hacemos es marcarlas como encontradas y comprobar si la partida esta completa.
  */
const parejaEncontrada = (
  tablero: Tablero,
  indiceA: number,
  indiceB: number
): void => {
  //...
  
    tablero.cartas[indiceA].encontrada = true;
    tablero.cartas[indiceB].encontrada = true;
    tablero.estadoPartida = "CeroCartasLevantadas";
  
};

/*
    Aquí asumimos que no son pareja y las volvemos a poner boca abajo
  */
const parejaNoEncontrada = (
  tablero: Tablero,
  indiceA: number,
  indiceB: number
): void => {
  // ...
  if (tablero.estadoPartida === "DosCartasLevantadas") {
  tablero.cartas[indiceA].estaVuelta = false;
  tablero.cartas[indiceB].estaVuelta = false;}
};

/*
    Esto lo podemos comprobar o bien utilizando every, o bien utilizando un contador (cartasEncontradas)
  */
export const esPartidaCompleta = (tablero: Tablero): boolean => {
  //...

  let result = tablero.cartas.every((carta) => carta.encontrada === true);
  return result;
};

/*
  Iniciar partida
  */

export const taparCartas = (indiceA: number, indiceB: number) => {
  if (tablero.estadoPartida === "DosCartasLevantadas") {
    const elementoImagen1 = document.getElementById(
      `img-${indiceA}`
    ) as HTMLImageElement;
    const elementoImagen2 = document.getElementById(
      `img-${indiceB}`
    ) as HTMLImageElement;
    setTimeout(() => {
      elementoImagen1.src =
        "https://i.pinimg.com/originals/ca/5b/a7/ca5ba7d121989a03a9e22518a3ccaab1.png";
      elementoImagen2.src =
        "https://i.pinimg.com/originals/ca/5b/a7/ca5ba7d121989a03a9e22518a3ccaab1.png";
    }, 1000);
    tablero.cartas[indiceA].estaVuelta = false;
    tablero.cartas[indiceB].estaVuelta = false;
    tablero.estadoPartida = "CeroCartasLevantadas";
  }
  
};

export const iniciarPartida = (tablero: Tablero): void => {
  //...
  tablero.estadoPartida = "CeroCartasLevantadas";
};

const cambiarImagenCarta = (tablero: Tablero, indice: number) => {
  const elementoImagen = document.getElementById(
    `img-${indice}`
  ) as HTMLImageElement;
  const carta = document.getElementById(`${indice}`)
  if (elementoImagen !== null && elementoImagen !== undefined) {
    elementoImagen.src = tablero.cartas[indice].imagen;
  }
  if(carta!==null && carta !==undefined){
    carta.classList.add("flipped");
  }
  
};

const handleClickIniciarPartida = () => {
  iniciarPartida(tablero);
};

const handleClickCartas = () => {
  if (sePuedeVoltearLaCarta(tablero, indice)) {
    cambiarImagenCarta(tablero, indice);
    voltearLaCarta(tablero, indice);
    asignarCartasVolteadas(tablero);
  }

  if (sonPareja(indiceA, indiceB)) {
    parejaEncontrada(tablero, indiceA, indiceB);
  } else if (!sonPareja(indiceA, indiceB)) {
    parejaNoEncontrada(tablero, indiceA, indiceB);
    taparCartas(indiceA, indiceB);
  }
  if (esPartidaCompleta(tablero)) {
    console.log("Ganaste");
  }
};

for (let i = 0; i <= cartasBarajadas.length; i++) {
  const carta = document.getElementById(`${i}`) as HTMLElement;
  if (carta !== null && carta !== undefined) {
    carta.addEventListener("click", () => {
      indice = i;
      handleClickCartas();
      
    });
  }
}

botonIniciarPartida.addEventListener("click", handleClickIniciarPartida);
