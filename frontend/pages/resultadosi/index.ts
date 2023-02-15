import { Router } from "@vaadin/router";
import { state } from "../../state";
export class ResultadoInvitado extends HTMLElement {
    connectedCallback() {
        this.render();
    }
    render() {
        localStorage.removeItem("ganador");
        this.innerHTML = `
    <div class="container">
        <div class="tablero">
              <h4>Marcador</h4>
              <p class="maquina">Anfitrion _<b class="resulone"></b> : <b class="countone"> </b></p>
              <p class="vos">Invitado _<b class="resultwo"></b> : <b class="countwo"> </b></p>
              <p class="empates">Empates: <b class="counttre"></b></p>
              <h3 class="btn-mostrar">Ver Jugadas</h3>
        </div>
              <div class="resultados">
                <h1 class="ganador"></h1> 
                <div class="tipos"></div>
              </div>  
        <tipo-boton class="btn-volver">jugar</tipo-boton>
        <tipo-boton class="btn-inicio">salir</tipo-boton>
  </div>`;
        const buttonBack = this.querySelector(".btn-volver") as Element;
        const buttonClean = this.querySelector(".btn-mostrar") as Element;
        const buttonInicio = this.querySelector(".btn-inicio") as Element;
        const ganador = this.querySelector(".ganador") as any;
        const style = document.createElement("style");
        state.marcador((e) => {
            this.querySelector(".resulone").innerHTML = e.tu_nombre;
            this.querySelector(".resultwo").innerHTML = e.su_nombre;
            this.querySelector(".countone").innerHTML = e.victorias;
            this.querySelector(".countwo").innerHTML = e.derrotas;
            this.querySelector(".counttre").innerHTML = e.empates;
            const tipo = document.querySelector(".tipos");
            tipo.innerHTML =
                `<tipo-` + e.tu_juego + `></tipo-` + e.tu_juego + `>
                 <tipo-` + e.su_juego + `></tipo-` + e.su_juego + `>`;
            if (e.ganador == "invitado") {
                ganador.innerHTML = `GANASTES`;
                style.innerHTML = `
        .resultados::before { content: "😃";} 
        .resultados{color:var(--font-gana)}`;
            }
            if (e.ganador == "anfitrion") {
                ganador.innerHTML = "PERDISTES";
                style.innerHTML = `
        .resultados::before {content: "😡";} 
        .resultados{color:var(--font-pierde)}`;
            }
            if (e.ganador == "empates") {
                ganador.innerHTML = "EMPATE";
                style.innerHTML = `
        .resultados::before {content: "🤔";} 
        .resultados{color:var(--font-empate)}`;
            }
        });
        this.appendChild(style);
        buttonBack.addEventListener("click", () => {
            state.jugada("invitado", "ninguna");
            Router.go("/ang_invitado");
        });
        buttonClean.addEventListener("click", () => {
            Router.go("/marcdor_invitado");
        });
        buttonInicio.addEventListener("click", () => {
            Router.go("/inicio");
        });
    }
}
customElements.define("resultadosi-web", ResultadoInvitado);
