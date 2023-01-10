import { Router } from "@vaadin/router";
import { state } from "../../state";
export class ResultadoInvitado extends HTMLElement {
    connectedCallback() {
          this.render();
    }
    render() {
        const cs = state.getState();
        this.innerHTML = `
    <div class="container">
          <div class="tablero">
             <h4>Marcador</h4>
             <p class="maquina">Anfitrion _<b class="resulone"></b> : <b class="countone"> </b></p>
             <p class="vos">Invitado _<b class="resultwo"></b> : <b class="countwo"> </b></p>
             <p class="empates">Empates: <b class="counttre"></b></p>
                <h3 class="btn-mostrar">Mis Juegos</h3>
          </div>
          <div class="resultados">
          <h1 class="ganador"></h1> 
          <div class="tipos">
            <tipo-${cs.jugador_jugada}></tipo-${cs.jugador_jugada}>
            <tipo-${cs.invitado_jugada}></tipo-${cs.invitado_jugada}>
            </div>
          </div>  
          <tipo-boton class="btn-volver">jugar</tipo-boton>
          <tipo-boton class="btn-inicio">salir</tipo-boton>
    </div>`;
        const buttonBack = this.querySelector(".btn-volver") as Element;
        const buttonClean = this.querySelector(".btn-mostrar") as Element;
        const buttonInicio = this.querySelector(".btn-inicio") as Element;
        const ganador = this.querySelector(".ganador") as any;
        const style = document.createElement("style");
        // state.jugadasresultados((e) => {
        this.querySelector(".resulone").innerHTML = cs.jugador_nombre;
        this.querySelector(".resultwo").innerHTML = cs.invitado_nombre;
        this.querySelector(".countone").innerHTML = cs.ganados_anfitrion;
        this.querySelector(".countwo").innerHTML = cs.ganados_invitados;
        this.querySelector(".counttre").innerHTML = cs.empates;
        if (cs.resultado == "ganador invitado") {
            ganador.innerHTML = `GANASTES`;
            style.innerHTML = `
        .resultados::before { content: "😃";} 
        .resultados{color:var(--font-gana)}`;
        }
        if (cs.resultado == "ganador anfitrion") {
            ganador.innerHTML = "PERDISTES";
            style.innerHTML = `
        .resultados::before {content: "😡";} 
        .resultados{color:var(--font-pierde)}`;
        }
        if (cs.resultado == "empates") {
            ganador.innerHTML = "EMPATE";
            style.innerHTML = `
        .resultados::before {content: "🤔";} 
        .resultados{color:var(--font-empate)}`;
        }
        // });
        this.appendChild(style);
        buttonBack.addEventListener("click", () => {
            state.resetear("invitado");
            Router.go("/juegosinvitado");
        });
        buttonClean.addEventListener("click", () => {
            Router.go("/marcdor_invitado");
        });
        buttonInicio.addEventListener("click", () => {
            Router.go("/inicio");
        });
        state.pausa("invitado");
    }
}
customElements.define("resultadosi-web", ResultadoInvitado);
