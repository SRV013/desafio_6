import { state } from "../../state";
export function init(params) {
    const div = document.createElement("div");
    div.classList.add("container");
    const style = document.createElement("style");
    div.innerHTML = `
   <div class="titulo">Piedra<br> Papel<br> o<br> Tijera !!! </div>  
	<div class="reglas">Ingrese su nombre y haga click en siguiente para comenzar a jugar !!!</div>  
   <form class="form">
   <input type="text" class="input" name="nombrecamp" placeholder="Ingrese su nombre" required autocomplete="off"/>
   <tipo-boton class="btn-crear">Siguiente</tipo-boton>
   </form>
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
    .form {
      display: flex;
      flex-direction: column;
      display:contents;
    }
    .input {
      height: 80px;
      width:290px;
      border: 5px solid var(--boton-borde);;
      border-radius: 10px;
      font-size: 17px;
      text-transform: uppercase;
      padding: 0px 20px 0px 20px;
      text-align: center;
    }
    .titulo {
		width: 100%;
		display: flex;
		justify-content: space-evenly;
		font-size:42px;
		text-align:center;
		color:var(--titulo-color);
	}
	.reglas {
	   width: 100%;
    	display: flex;
   	justify-content: space-evenly;
   	font-size: 18px;
		text-align: center;
		font-weight:300;
		font-family:monospace;
		color:var(--sub-titulo-color);
		padding:0px 40px 0px 40px;
		}
`;
    const buttonEl = div.querySelector(".btn-crear");
    buttonEl?.addEventListener("click", (e) => {
        e.preventDefault();
        form?.dispatchEvent(new Event("submit"));
    });

    const form: any = div.querySelector(".form");
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const target = e.target as any;
        const nombre = target.nombrecamp.value;
        const estadoActual = state.getState();
        estadoActual.nombre = nombre;
        state.nuevoParticipante(() => {
            state.nuevaSala(() => {
                state.valJugadas();
                params.goTo("/partida");
            });
        });
    });

    div.appendChild(style);
    return div;
}
