import { Router } from "@vaadin/router";
import { state } from "../../state";
export class PartidaAnfitrion extends HTMLElement {
    connectedCallback() {
        this.render();
    }
  render() {
   this.innerHTML = ` 
   <div class="container">
    <div class="titulo">Piedra<br> Papel<br> o<br> Tijera !!! </div>  
  	<div class="reglas">Comparta el numero de sala o aguarda a que algun oponente se conecte para poder jugar !!!</div>  
	  <div class="codigo-color">${state.getState().idSala}</div>  
    <div class="reglas">esperando oponente ..</div>
    </div>  
    `;
    const timeState = setInterval(() => {
      const cs = state.getState()
      state.valJugadas();     
        if (cs.salaSet == false) {
            Router.go("/juegonuevo");
            clearInterval(timeState);
        }
    }, 3000);
}
}
customElements.define("partida-web", PartidaAnfitrion);