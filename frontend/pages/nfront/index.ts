import { Router } from "@vaadin/router";
import { state } from "../../state";
export class JuegoAnfitrion extends HTMLElement {
    connectedCallback() {
        this.render();
    }
    render() {
   this.innerHTML = ` 
   <div class="container">
   <div class="titulo">Piedra<br> Papel<br> o<br> Tijera !!! </div>  
   <div class="reglas">Ingrese su nombre y haga click en siguiente para comenzar a jugar !!!</div>  
   <form class="form">
     <input type="text" class="input" name="nombrecamp" placeholder="Ingrese su nombre" required autocomplete="off"/>
     <tipo-boton class="btn-crear">Siguiente</tipo-boton>
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
            const nombre = target.nombrecamp.value;
            state.nuevoParticipante(nombre, (e) => {
                Router.go("/partida");
            });
        });
    }
}
customElements.define("nfront-web", JuegoAnfitrion);
