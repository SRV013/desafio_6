import { state } from "../../state";
export class PartidaInvitado extends HTMLElement {
    connectedCallback() {
        this.render();
    }
  render() {
   this.innerHTML = ` 
   <div class="container">
   <div class="titulo">Piedra<br> Papel<br> o<br> Tijera !!! </div>  
	<div class="reglas">Inicio de Partida !!!</div>  
	<div class="codigo-color">${state.getState().idSala}</div>  
   <div class="reglas">esperando oponente ..</div>
   </div>  
    `;
}
}
customElements.define("partidai-web", PartidaInvitado);