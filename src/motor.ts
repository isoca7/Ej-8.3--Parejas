/*
En el motor nos va a hacer falta un método para barajar cartas
*/
import { Tablero, tablero, Carta, numeroIntentos, setNumeroIntentos } from "./modelo"
import { cambiarImagenCarta, taparCartas,muestraNumeroDeIntentos} from "./ui"
 
const generarNumeroAleatorio = (indiceDelArray: number) =>
  Math.floor(Math.random() * (indiceDelArray + 1));

export const barajarCartas = (cartas: Carta[]): Carta[] => {
  const copiaCartas = [...cartas];
  for (let indice = copiaCartas.length - 1; indice > 0; indice--) {
    let indiceAleatorio = generarNumeroAleatorio(indice);
    [{ ...copiaCartas[indice] }, { ...copiaCartas[indiceAleatorio] }] = [
      copiaCartas[indiceAleatorio],
      copiaCartas[indice],
    ];
  }
  return copiaCartas;
};
  
  /*
      Una carta se puede voltear si no está encontrada y no está ya volteada, o no hay dos cartas ya volteadas
    */
  function voltearPrimeraCarta (indice : number){
    tablero.indiceCartaVolteadaA = indice
    tablero.cartas[indice].estaVuelta = true
  }
  function voltearSegundaCarta (indice : number){
    tablero.indiceCartaVolteadaB = indice
    tablero.cartas[indice].estaVuelta = true
  }
  
  const asignarCartasVolteadas = (tablero: Tablero, indice : number, ) => {
    if (tablero.estadoPartida === 'CeroCartasLevantadas') {
      voltearPrimeraCarta(indice)
      tablero.estadoPartida = 'UnaCartaLevantada'
    } else if (tablero.estadoPartida === 'UnaCartaLevantada') {
      voltearSegundaCarta(indice)
      tablero.estadoPartida = 'DosCartasLevantadas'
    }
  }
  
  const sePuedeVoltearLaCarta = (tablero: Tablero, indice: number): boolean => {
    if (
      tablero.cartas[indice].estaVuelta ||
      tablero.cartas[indice].encontrada ||
      tablero.estadoPartida === 'DosCartasLevantadas' ||
      tablero.estadoPartida === "PartidaNoIniciada"
    ) {
      return false
    }
    return true
  }
  

  

  /*
      Dos cartas son pareja si en el array de tablero de cada una tienen el mismo id
    */
  
  export const sonPareja = (indiceA: number, indiceB: number): boolean => {
    //...
      tablero.indiceCartaVolteadaA= undefined
      tablero.indiceCartaVolteadaB =undefined
      return tablero.cartas[indiceA].idFoto === tablero.cartas[indiceB].idFoto
        ? true
        : false
    
    
  }
  
  /*
      Aquí asumimos ya que son pareja, lo que hacemos es marcarlas como encontradas y comprobar si la partida esta completa.
    */
  const parejaEncontrada = (
    tablero: Tablero,
    indiceA: number,
    indiceB: number
  ): void => {
    //...
  
    tablero.cartas[indiceA].encontrada = true
    tablero.cartas[indiceB].encontrada = true
    tablero.estadoPartida = 'CeroCartasLevantadas'
  }
  
  /*
      Aquí asumimos que no son pareja y las volvemos a poner boca abajo
    */
  const parejaNoEncontrada = (
    tablero: Tablero,
    indiceA: number,
    indiceB: number
  ): void => {
    // ...
    if (tablero.estadoPartida === 'DosCartasLevantadas') {
      tablero.cartas[indiceA].estaVuelta = false
      tablero.cartas[indiceB].estaVuelta = false
      setNumeroIntentos(numeroIntentos+1)
    }
  }
  
  /*
      Esto lo podemos comprobar o bien utilizando every, o bien utilizando un contador (cartasEncontradas)
    */
  export const esPartidaCompleta = (tablero: Tablero): boolean => {
    //...
  
    let result = tablero.cartas.every((carta) => carta.encontrada === true)
    return result
  }
  
  /*
    Iniciar partida
    */
  
  

  
  export const handleClickCartas = (indice : number) => {
    
    if (sePuedeVoltearLaCarta(tablero, indice)) {
      cambiarImagenCarta(indice)
      asignarCartasVolteadas(tablero, indice)
    }
    const indiceA = tablero.indiceCartaVolteadaA
    const indiceB = tablero.indiceCartaVolteadaB
    if(indiceA!==undefined && indiceB!==undefined){
      if (sonPareja(indiceA, indiceB)) {
        parejaEncontrada(tablero, indiceA, indiceB)
      } else if (!sonPareja(indiceA, indiceB)) {
        parejaNoEncontrada(tablero, indiceA, indiceB)
        taparCartas(indiceA, indiceB)
      }
    }
    muestraNumeroDeIntentos()
    if (esPartidaCompleta(tablero)) {
      console.log('Ganaste')
    }
  }
  


  

  