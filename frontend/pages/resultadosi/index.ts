import { state } from "../../state";
export function init(params) {
  state.jugadasresultados();
    const cs = state.getState();
    let ganador;
    if (cs.resultado == "ganador invitado") {
      ganador = "ganastes";      
    }
    if (cs.resultado == "ganador anfitrion") {
      ganador = "perdistes";
    }
    if (cs.resultado == "empates") {
      ganador = "empate";
    }
    const div = document.createElement("div");
    div.className = "resultado-invitado";
    div.classList.add("container");
    const estiloResul = document.createElement("style");
    if (cs.resultado == "ganador invitado") {
        estiloResul.innerHTML = `
        .resultados::before { content: "😃";} 
        .resultados{color:var(--font-gana)}`;
    }
    if (cs.resultado == "ganador anfitrion") {
        estiloResul.innerHTML = `
        .resultados::before {content: "😡";}
        .resultados{color:var(--font-pierde)}`;
    } else if (cs.resultado == "empates") {
        estiloResul.innerHTML = `
        .resultados::before {content: "🤔";}
        .resultados{color:var(--font-empate)}`;
    }
    div.innerHTML = `
  <div class="tablero">
  <h4>Marcador</h4>
  <p class="maquina">Anfitrion _<b>${cs.jugador_nombre}</b>: ${cs.ganados_anfitrion}</p>
  <p class="vos">Invitado _<b>${cs.invitado_nombre}</b>: ${cs.ganados_invitados}</p>
  <p class="empates">Empates: ${cs.empates}</p>
  <h3 class="btn-mostrar">Mis Juegos</h3>
  </div>
  <div class="resultados">
  <h1>${ganador}</h1> 
  <div class="tipos">
    <tipo-${cs.jugador_jugada}>
    </tipo-${cs.jugador_jugada}>
    <tipo-${cs.invitado_jugada}>
    </tipo-${cs.invitado_jugada}>
  </div>
  </div>  
   <tipo-boton class="btn-volver">jugar</tipo-boton>
   <tipo-boton class="btn-inicio">salir</tipo-boton>
   `;
    const buttonBack = div.querySelector(".btn-volver") as Element;
    buttonBack.addEventListener("click", () => {
        state.resetear("invitado");
        params.goTo("/juegosinvitado");
    });
    const buttonClean = div.querySelector(".btn-mostrar") as Element;
    buttonClean.addEventListener("click", () => {
        params.goTo("/marcdor_invitado");
    });
    const buttonInicio = div.querySelector(".btn-inicio") as Element;
    buttonInicio.addEventListener("click", () => {
        params.goTo("/inicio");
    });
    const style = document.createElement("style");
    style.innerHTML = `
.container {
    height: 100vh;
    padding-top: 100px;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-around;
    }
  .tablero {
      color: var(--resultados-font);
      background: var(--resultados-fondo);
      display: flex;
      border: 2px solid var(--resultados-borde);
      border-radius: 8px;
    flex-direction: column;
    padding:10px 60px 10px 60px;
    font-family:monospace;
  }
  .tablero > h4 {
      font-size: 24px;
      margin: 0 auto;
      text-align: center;
    }
  .tablero > h3 {
      font-size: 24px;
      margin: 0 auto;
      text-align: center;
      color:blue;
      padding-top:20px;
    }
    .tablero > h3:hover{
      cursor:pointer;
      transition:0.5s;
      transform:scale(1.1);
    }
    .tablero > p {
        margin: 10px 0px 0px 0;
        font-size: 20px;
        text-align: center;
    }
    .resultados {
        display: flex;
        width: 220px;
        height: 220px;
        border-radius: 50%;
        font-family: monospace;
        align-items: center;
        justify-content: center;
        align-content: space-around;
        flex-direction: column;
        box-shadow: 0px 0px 10px 10px white;
        background-color:white;
    }
    .resultados > h1 {
        font-size: 34px;
        margin: 0 auto;
        text-align: center;
        font-family: 'Fredoka One';
      }
    .resultados::before{font-size:40px;}
    .tipos{
      display: flex;
      height: 50px;
      justify-content: center;
      flex-direction: row;
      filter: drop-shadow(1px 2px 4px);
      gap: 10px;
    }`;
    state.pausa("invitado");
    div.appendChild(estiloResul);
    div.appendChild(style);
    return div;
}
