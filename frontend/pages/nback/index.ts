import { Router } from "@vaadin/router";
import { state } from "../../state";
export class JuegoInvitado extends HTMLElement {
    connectedCallback() {
        this.render();
    }
    render() {
   this.innerHTML = ` 
   <div class="container">
   <div class="titulo">Piedra<br> Papel<br> o<br> Tijera !!! </div>  
   <div class="reglas">Ingresu su nombre y el numero de sala para poder jugar !!!</div>  
   <form class="form">
   <input type="text" class="input" name="nombre" placeholder="Ingrese Nombre" required autocomplete="off"/>
   <input type="text" class="input" name="codigosala" placeholder="Codigo" required autocomplete="off" />
   <tipo-boton class="btn-crear">SIGUIENTE</tipo-boton>
   </form>
   </div>
    `;
    const buttonEl = this.querySelector(".btn-crear");
    buttonEl?.addEventListener("click", (e) => {
        e.preventDefault();
        form?.dispatchEvent(new Event("submit"));
    });

    const form: any = this.querySelector(".form");
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const target = e.target as any;
        const idsala = target.codigosala.value;
        const nombre = target.nombre.value;
        const estadoActual = state.getState();
        estadoActual.idSala = idsala;
        estadoActual.nombre = nombre;
        state.nuevoParticipante(() => {
            state.buscarSalaId(() => {
              state.valJugadas();
                   Router.go("/juegosinvitado");
            });
        });
    });
}
}
customElements.define("nback-web", JuegoInvitado);