import { Router } from "@vaadin/router";
import { state } from "../../state";
export class PartidaAnfitrion extends HTMLElement {
    connectedCallback() {
        const id = localStorage.getItem("IdA");
        const nameA = localStorage.getItem("nameA");
        state.nuevaSala(id, nameA, (e) => {
            this.querySelector(".codigo-color").innerHTML = e.salaId;
        });
        this.render();
    }
    render() {
        this.innerHTML = ` 
   <div class="container">
    <div class="titulo">Piedra<br> Papel<br> o<br> Tijera !!! </div>  
  	<div class="reglas">Comparta el numero de sala o aguarda a que algun oponente se conecte para poder jugar !!!</div>  
	  <div class="codigo-color"></div>  
    <div class="espera">esperando oponente ..</div>
    </div>  
    `;
        const timeState = setInterval(() => {
            state.valJugadas((e) => {
                if (e.sala_disponible == false) {
                    Router.go("/juegonuevo");
                    clearInterval(timeState);
                }
            });
        }, 1000);
    }
}
customElements.define("partida-web", PartidaAnfitrion);
