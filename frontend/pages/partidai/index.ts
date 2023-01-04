import { state } from "../../state";
export function init(params) {
    const div = document.createElement("div");
    div.classList.add("container");
    const style = document.createElement("style");
    div.innerHTML = `
   <div class="titulo">Piedra<br> Papel<br> o<br> Tijera !!! </div>  
	<div class="reglas">Inicio de Partida !!!</div>  
	<div class="codigo-color">${state.getState().idSala}</div>  
   <div class="reglas">esperando oponente ..</div>  
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
      border: 5px solid var(--boton-borde);;
      border-radius: 10px;
      font-size: 34px;
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
	.codigo-color{
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
   .codigo-color:hover{color:#09fe09; cursor:copy;animation-name:none}
`;

    div.appendChild(style);
    return div;
}
