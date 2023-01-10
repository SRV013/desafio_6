import { Router } from "@vaadin/router";
export class Inicio extends HTMLElement {
    connectedCallback() {
        this.render();
    }
    render() {
    this.innerHTML = `
	<div class="container">
	<div class="titulo">Piedra<br> Papel<br> o<br> Tijera !!! </div>  
	<div class="reglas">Presioná crear para comenzar una nueva partida o unirse para entrar a otras salas ...</div>  
	<div class="reglas-flecha">⬇</div>  
 		  <tipo-boton class="btn-crear">Crear</tipo-boton>
  	  	  <tipo-boton class="btn-unirse">Unirse</tipo-boton>
	<div class="tipo_muestra">
	    <tipo-piedra></tipo-piedra>
  	    <tipo-papel></tipo-papel>
		<tipo-tijera></tipo-tijera>
	</div>
	</div>
	`;
    const crear = this.querySelector(".btn-crear") as Element;
    const unirse = this.querySelector(".btn-unirse") as Element;
    crear.addEventListener("click", () => {
		Router.go("/nuevo_front");
    });
    unirse.addEventListener("click", () => {
        Router.go("/nuevo_back");
    });
}
}
customElements.define("inicio-web", Inicio);