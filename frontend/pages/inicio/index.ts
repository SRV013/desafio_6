import { state } from "../../state";

export function init(params) {
    const div = document.createElement("div");
    div.classList.add("container");
    const style = document.createElement("style");
    div.innerHTML = `
	<div class="titulo">Piedra<br> Papel<br> o<br> Tijera !!! </div>  
	<div class="reglas">Presioná crear para comenzar una nueva partida o unirse para entrar a otras salas ...</div>  
	<div class="reglas-flecha">⬇</div>  
   <tipo-boton class="btn-crear">Crear</tipo-boton>
   <tipo-boton class="btn-unirse">Unirse</tipo-boton>
	<div class="tipos">
	    <tipo-piedra></tipo-piedra>
  	    <tipo-papel></tipo-papel>
		<tipo-tijera></tipo-tijera>
	</div>`;
    style.innerHTML = `
	.container {
		height: 100vh;
    	padding-top: 100px;
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: space-around;
		align-content: flex-start;
		flex-wrap: wrap;
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
	.reglas-flecha{
		font-size: 36px;
		position: relative;
		animation-name: anim;
		animation-duration: 1s;
		animation-iteration-count: infinite;
	}
	@keyframes anim{
	   0% {color: #40dcff;transform:translateY(1px);}
	   25% {color: #40dcff;transform:translateY(2px);}
	   50% {color: #40dcff;transform:translateY(4px);}
	   75% {color: #ff85ff;transform:translateY(2px);}
	   100% {color: #ff85ff;transform:translateY(1px);}
	}
	.tipos {
		display: flex;
		justify-content:center;
		align-items:center;	
	    width: 50%;
			}	
	.tipos:hover{
		filter: drop-shadow(2px 4px 6px black);
	}		
	`;
    const crear = div.querySelector(".btn-crear") as Element;
    const unirse = div.querySelector(".btn-unirse") as Element;
    crear.addEventListener("click", () => {
      params.goTo("/nuevo_front");
    });

    unirse.addEventListener("click", () => {
        params.goTo("/nuevo_back");
    });

    div.appendChild(style);
    return div;
}
