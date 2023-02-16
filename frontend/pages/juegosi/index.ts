import { Router } from "@vaadin/router";
import { state } from "../../state";
export class JugadaInvitado extends HTMLElement {
    connectedCallback() {
        state.valJugadas((e) => {
            this.querySelector(".hola").innerHTML = "Hola , " + e.su_nombre;
        });
        this.render();
    }
    render() {
        this.innerHTML = ` 
    <div class="container">
        <p class="hola"></p>
        <div class="reglas">tenes 10 segundos para jugar o la CPU lo Hara por ti !!!</div>  
        <div class="tipo-top">
            <tipo-piedra class="piedra-top  tipo-top-bloqueado"></tipo-piedra>
            <tipo-papel class="papel-top  tipo-top-bloqueado"></tipo-papel >
            <tipo-tijera class="tijera-top  tipo-top-bloqueado"></tipo-tijera>
       </div>
       <div class="turno"><a class="turno-a">SU TURNO</a></div>
         <div class="tipos">
                <tipo-piedra class="piedra"></tipo-piedra>
                <tipo-papel class="papel"></tipo-papel>
                <tipo-tijera class="tijera"></tipo-tijera>
         </div>
    </div>`;
        // LEER CLASES
        const tiposCont = this.querySelector(".tipos") as Element;
        const mensaje = this.querySelector(".turno-a") as Element;
        const tipotijera = this.querySelector(".tijera") as Element;
        const tipopiedra = this.querySelector(".piedra") as Element;
        const tipopapel = this.querySelector(".papel") as Element;
        const tipopiedraTop = this.querySelector(".piedra-top") as Element;
        const tipopapelTop = this.querySelector(".papel-top") as Element;
        const tipotijeraTop = this.querySelector(".tijera-top") as Element;
        const counterEl = this.querySelector(".turno-a") as any;
        // CUENTA
        let counter = 10;
        const contadorTime = setInterval(() => {
            counter--;
            counterEl.style.fontSize = "80px";
            counterEl.style.color = "#a4c006";
            counterEl.textContent = String(counter);
            if (counter < 1) {
                const manos = ["piedra", "papel", "tijera"];
                const eligio = manos[Math.floor(Math.random() * 3)];
                state.jugada("invitado", eligio);
                activetipos(eligio);
                clearInterval(contadorTime);
            }
        }, 1000);

        // PASA FUNCION A LO ELEGIDO POR EL USUARIO
        for (const creador of tiposCont.children) {
            creador.addEventListener("click", () => {
                clearInterval(contadorTime);
                counterEl.style.color = "";
                counterEl.style.fontSize = "20px";
                mensaje.innerHTML = "AGUARDE ...";
                const type = creador.getAttribute("class");
                if (type == "tijera") {
                    state.jugada("invitado", "tijera");
                    activetipos("tijera");
                } else if (type == "piedra") {
                    state.jugada("invitado", "piedra");
                    activetipos("piedra");
                } else if (type == "papel") {
                    state.jugada("invitado", "papel");
                    activetipos("papel");
                }
            });
        }
        // SELECCION DE LO ELEGIDO POR USUARIO
        function activetipos(param) {
            for (const tipo of tiposCont.children) {
                tipo.classList.add("tipo-desactivos");
            }
            if (param == "tijera") {
                tipotijera.classList.add("tipo-activos");
                tipotijera.classList.remove("tipo-desactivos");
                tipopiedra.classList.add("tipo-bloqueado");
                tipopapel.classList.add("tipo-bloqueado");
            }
            if (param == "piedra") {
                tipopiedra.classList.add("tipo-activos");
                tipopiedra.classList.remove("tipo-desactivos");
                tipotijera.classList.add("tipo-bloqueado");
                tipopapel.classList.add("tipo-bloqueado");
            }
            if (param == "papel") {
                tipopapel.classList.add("tipo-activos");
                tipopapel.classList.remove("tipo-desactivos");
                tipotijera.classList.add("tipo-bloqueado");
                tipopiedra.classList.add("tipo-bloqueado");
            }
            //  TIMER Q DISPARA A RESULTADO
            const timeInvidado = setInterval(() => {
                const ganador = localStorage.getItem("ganador");
                state.valJugadas((e) => {
                        if (e.pase ==true){
                        if (e.tu_juego != "ninguna" && e.su_juego != "ninguna"){
                            if (e.tu_juego == "tijera") {
                                tipotijeraTop.classList.add("tipo-top-activos");
                            }
                            if (e.tu_juego == "piedra") {
                                tipopiedraTop.classList.add("tipo-top-activos");
                            }
                            if (e.tu_juego == "papel") {
                                tipopapelTop.classList.add("tipo-top-activos");
                            }
                            Router.go("/resultados_invitado");
                            clearInterval(timeInvidado);
                        }
                    }
                    });
            }, 1000);
        }
    }
}
customElements.define("juegosi-pagina", JugadaInvitado);
