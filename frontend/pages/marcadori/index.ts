import { Router } from "@vaadin/router";
import { state } from "../../state";
export class MarcadorInvitado extends HTMLElement {
    connectedCallback() {
        this.render();
    }
    render() {
        this.innerHTML = `
    <div class="container">
          <div class="tablero">
            <h4>Marcador</h4>
              <p class="maquina">Anfitrion _<b class="resulone"></b>: <i class="countone"> </i></p>
              <p class="vos">Invitado _<b class="resultwo"></b>: <i class="countwo"> </i></p>
              <p class="empates">Empates: <b class="counttre"> </b></p>
              <h3>Ultimas Jugadas</h3>
            <div class="manos"></div> 
          </div>
          <tipo-boton class="btn-volver">Volver</tipo-boton>
    </div>`;
        const padre = this.querySelector(".manos") as Element;
        state.jugadasresultados((e) => {
            this.querySelector(".resulone").innerHTML = e.tu_nombre;
            this.querySelector(".resultwo").innerHTML = e.su_nombre;
            this.querySelector(".countone").innerHTML = e.Victoria;
            this.querySelector(".countwo").innerHTML = e.Derrotas;
            this.querySelector(".counttre").innerHTML = e.Empates;
        });
        const cs = state.getState();
        state.manos(() => {
            const mano = cs.manos;
            if (mano) {
                for (var i = 0; i < mano.length; i++) {
                    const manos = document.createElement("_jugadas");
                    manos.className = "manos-resultados";
                    const su_juego = mano[i].su_juego;
                    const tu_juego = mano[i].tu_juego;
                    manos.innerHTML = `
                <div class="marcador">
                <tipo-${su_juego}></tipo-${su_juego}>
                <div class="vs"> = </div>
                <tipo-${tu_juego}></tipo-${tu_juego}>
                </div>`;
                    padre.appendChild(manos);
                }
            } else {
                alert("error al leer datos");
            }
        });
        const buttonBack = this.querySelector(".btn-volver") as Element;
        buttonBack.addEventListener("click", () => {
            Router.go("/resultados_invitado");
        });
    }
}
customElements.define("marcadori-web", MarcadorInvitado);
