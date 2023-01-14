import { Router } from "@vaadin/router";
import { state } from "../../state";
export class Anfitrion extends HTMLElement {
    connectedCallback() {
        this.render();
    }
    render() {
        this.innerHTML = ` 
   <div class="container">
    <div class="titulo">Piedra<br> Papel<br> o<br> Tijera !!! </div>  
  	<div class="reglas">esperemos que tu oponente este listo !!!</div>  
	<div class="espera">AGUARDE POR FAVOR..</div>
    </div>  
    `;
        const timeState = setInterval(() => {
            state.valJugadas((e) => {
                if (e.tu_juego =="ninguna" && e.su_juego =="ninguna"){
                    Router.go("/juegonuevo")
                    clearInterval(timeState);
                }
            });
        }, 1000);
    }
}
customElements.define("ang_anfitrion-web", Anfitrion);
