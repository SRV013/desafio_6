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
   <input type="text" class="input" name="nombrecamp" placeholder="Ingrese su nombre" required autocomplete="off"/>
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
        const salaId = target.codigosala.value;
        const nombre = target.nombrecamp.value;
        state.nuevoParticipante(nombre, (e) => {            
            state.buscarSala(salaId,nombre,e.idParticipante, (e) => {
                Router.go("/juegosinvitado");
            });
        });
    });
}
}
customElements.define("nback-web", JuegoInvitado);