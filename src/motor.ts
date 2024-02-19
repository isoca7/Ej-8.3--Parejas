/*
En el motor nos va a hacer falta un método para barajar cartas
*/
import { Tablero, Carta } from "./modelo"

const barajarCartas = (cartas : Carta[]): Carta[] => {
       return cartas.sort(() => Math.random() - 0.5)
  }

const cambiarEstadoPartida = ()=> {
  
}
  
  /*
    Una carta se puede voltear si no está encontrada y no está ya volteada, o no hay dos cartas ya volteadas
  */
  const sePuedeVoltearLaCarta = (tablero: Tablero, indice: number ): boolean => {
    if(tablero.cartas[indice].estaVuelta || !tablero.cartas[indice].encontrada || tablero.estadoPartida!=="DosCartasLevantadas"){
      return false;
    } 
    return true
  }
  
  const voltearLaCarta = (tablero: Tablero, indice: number) : void => {
    //...
    if(!tablero.cartas[indice].estaVuelta){
      tablero.cartas[indice].estaVuelta = true
      
    } 
  }
  
  /*
    Dos cartas son pareja si en el array de tablero de cada una tienen el mismo id
  */

   

  export const sonPareja = (indiceA: number, indiceB: number, tablero: Tablero): boolean => {
    //...
    tablero.indiceCartaVolteadaA = indiceA;
    tablero.indiceCartaVolteadaB = indiceB;
    if(indiceB===indiceA){
      return true;
    } 
    return false
  }
  
  /*
    Aquí asumimos ya que son pareja, lo que hacemos es marcarlas como encontradas y comprobar si la partida esta completa.
  */
  const parejaEncontrada = (tablero: Tablero, indiceA: number, indiceB: number) : void => {
    //...
  }
  
  /*
    Aquí asumimos que no son pareja y las volvemos a poner boca abajo
  */
  const parejaNoEncontrada = (tablero: Tablero, indiceA :number, indiceB : number) : void => {
    // ...
  }
  
  /*
    Esto lo podemos comprobar o bien utilizando every, o bien utilizando un contador (cartasEncontradas)
  */
  export const esPartidaCompleta=(tablero: Tablero) : boolean => {
    //...
    
    let result = tablero.cartas.every((carta)=> carta.encontrada===true)
    return result
  }
  
  /*
  Iniciar partida
  */
  
  export const iniciaPartida = (tablero: Tablero): void => {
    //...
  };