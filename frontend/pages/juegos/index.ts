import { state } from "../../state";
export function init(params) {    
    const div = document.createElement("div");
    div.classList.add("container");
    const style = document.createElement("style");
    div.innerHTML = ` 
    <p class="hola">Hola ${state.getState().nombre}</p>
    <div class="tipo-top">
      <tipo-piedra class="piedra-top  tipo-top-bloqueado"></tipo-piedra>
      <tipo-papel class="papel-top  tipo-top-bloqueado"></tipo-papel >
      <tipo-tijera class="tijera-top  tipo-top-bloqueado"></tipo-tijera>
   </div>
    <div class="turno"><a class="turno-a">su turno</a></div>
    <div class="tipos">
    <tipo-piedra class="piedra"></tipo-piedra>
    <tipo-papel class="papel"></tipo-papel>
    <tipo-tijera class="tijera"></tipo-tijera>
    </div>
    `;
    style.innerHTML = `
   .container {
      height: 100vh;
      padding-top: 100px;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: space-around;
      align-content: space-around;
      flex-wrap: wrap;
    }
    .turno {
        width:180px;
        height:180px;
        border-radius:50%;
        border:2px solid #5a5a5a;
        display:flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        border-left-color:var(--boton-font);
        border-right-color:var(--boton-font);
    }    
    .hola{
        font-size: 24px;
        color: var(--boton-font);  
    }
    .turno-a{
        font-size: 20px;
        color: var(--boton-font);  
        animation-name: anim;
		animation-duration: 1s;
		animation-iteration-count: infinite;      
    }
    @keyframes anim{
         0% { opacity: 1.0; }
        50% { opacity: 0.7; }
     }
    .tipos {
      display: flex;
	   justify-content:center;
    } 
    .tipo-bloqueado{
      transition: all 1s ease-in-out;
      filter: blur(4px);
   }
   .tipo-activos {
      display: inherit;
      transform: translateY(-30px);
      transition: all 0.5s;
    }
    .tipo-desactivos {
      transform: translateY(30px);
      transform: scale(0.5);
    }
    .tipo-top {
      display: flex;
	   justify-content:center;
    } 
    .tipo-top-bloqueado{
      transition: all 1s ease-in-out;
      filter: blur(4px);
      transform: scale(0.7);
   }
   .tipo-top-activos {
      display: inherit;
      transform: translateY(80px);
      transition: all 0.5s;
      filter:none;
    }`;
    // LEER CLASES
    const tiposCont = div.querySelector(".tipos") as Element;
    const mensaje =   div.querySelector(".turno-a") as Element;
    const tipotijera = div.querySelector(".tijera") as Element;
    const tipopiedra = div.querySelector(".piedra") as Element;
    const tipopapel = div.querySelector(".papel") as Element;
    const tipopiedraTop = div.querySelector(".piedra-top") as Element;
    const tipopapelTop = div.querySelector(".papel-top") as Element;
    const tipotijeraTop = div.querySelector(".tijera-top") as Element;
    // PASA FUNCION A LO ELEGIDO POR EL USUARIO
    for (const creador of tiposCont.children) {
        creador.addEventListener("click", () => {
            const type = creador.getAttribute("class");
            if (type == "tijera") {
                state.jugadaCreador("tijera");
                activetipos("tijera");
            } else if (type == "piedra") {
                state.jugadaCreador("piedra");
                activetipos("piedra");
            } else if (type == "papel") {
                state.jugadaCreador("papel");
                activetipos("papel");
            }
        });
    }
    // SELECCION DE LO ELEGIDO POR CREADOR
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
        //     // TIMER Q DISPARA A RESULTADO
        const timeCreador = setInterval(() => {
            state.ganador();
            const cs = state.getState();
            mensaje.innerHTML = "AGUARDE ...";        
            if ((
                cs.resultado == "ganador anfitrion" ||
                cs.resultado == "ganador invitado" ||
                cs.resultado == "empates")
                && cs.invitado_pase == true
            ) {
                if (cs.invitado_jugada == "tijera") {
                    tipotijeraTop.classList.add("tipo-top-activos");
                }
                if (cs.invitado_jugada == "piedra") {
                    tipopiedraTop.classList.add("tipo-top-activos");
                }
                if (cs.invitado_jugada == "papel") {
                    tipopapelTop.classList.add("tipo-top-activos");
                }
                function jugadarival() {
                    state.guardaresultado();
                    params.goTo("/resultados");
                }
                setTimeout(jugadarival, 1000);
                clearInterval(timeCreador);
            }
        }, 2000);
    }
    div.appendChild(style);
    return div;
}
