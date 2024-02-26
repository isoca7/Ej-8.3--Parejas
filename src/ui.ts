import { cartasBarajadas,  tablero, Tablero, numeroIntentos, botonIniciarPartida } from "./modelo"





export const cambiarImagenCarta = (indice: number) => {
  
    const elementoImagen = document.getElementById(
      `img-${indice}`
    ) as HTMLImageElement
    if (elementoImagen !== null && elementoImagen !== undefined) {
      
        elementoImagen.src = cartasBarajadas[indice].imagen
        elementoImagen.classList.add('flipped')
      }
    }
  

export const handleClickIniciarPartida = () => {
   const contenedorJuego = document.getElementById("juego")
    iniciarPartida(tablero)
    if(contenedorJuego !==null && contenedorJuego!==undefined){
      contenedorJuego.classList.remove("hidden")
    }
    muestraNumeroDeIntentos()
    
  }
  export const iniciarPartida = (tablero: Tablero): void => {
    //...
    tablero.estadoPartida = 'CeroCartasLevantadas'
    const contenedorBotones = document.getElementById("contenedor-botones")
    if(contenedorBotones!==null && contenedorBotones!==undefined){
      contenedorBotones.removeChild(botonIniciarPartida)
    }
  }
export const muestraNumeroDeIntentos = () => {
  const contenedorBotones = document.getElementById("contenedor-botones")
  if(contenedorBotones!== null && contenedorBotones!==undefined){
    contenedorBotones.innerHTML= `<p>Numero de Intentos</p><p>${numeroIntentos}</p>`
  }
}

  function unflipCards(cartaA : HTMLDivElement, cartaB : HTMLDivElement) {
    setTimeout(() => {
      cartaA.classList.remove("flipped");
      cartaB.classList.remove("flipped");
      
    }, 1000);
  }
  export const taparCartas = (indiceA: number, indiceB: number) => {
    if (tablero.estadoPartida === 'DosCartasLevantadas') {
      const elementoImagen1 = document.getElementById(
        `img-${indiceA}`
      ) as HTMLImageElement
      const elementoImagen2 = document.getElementById(
        `img-${indiceB}`
      ) as HTMLImageElement
      unflipCards(elementoImagen1, elementoImagen2)
      setTimeout(() => {
        if (elementoImagen1 !== null && elementoImagen1 !== undefined && elementoImagen2 !== null && elementoImagen2 !== undefined  ) {
        elementoImagen1.src = './src/img/digimon.png'
        elementoImagen2.src = './src/img/digimon.png'}
        
      }, 1000);
    }
      tablero.cartas[indiceA].estaVuelta = false
      tablero.cartas[indiceB].estaVuelta = false
      tablero.estadoPartida = 'CeroCartasLevantadas'
    }
  
  
 
