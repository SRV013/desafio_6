import { state } from "../../state";
export function init(params) {
    state.jugadasresultados();
    const cs = state.getState();
    const div = document.createElement("div");
    div.className = "resultado-datos";
    div.classList.add("container");
    div.innerHTML = `
    <div class="tablero">
    <h4>Marcador</h4>
    <p class="maquina">Anfitrion _<b>${cs.jugador_nombre}</b>: ${cs.ganados_anfitrion}</p>
    <p class="vos">Invitado _<b>${cs.invitado_nombre}</b>: ${cs.ganados_invitados}</p>
    <p class="empates">Empates: ${cs.empates}</p>
    <h3>Ultimas Jugadas</h3>
    <div class="manos"></div> 
    </div>
     <tipo-boton class="btn-volver">Volver</tipo-boton>
     `;
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
      max-height:550px;
      overflow: scroll;
    }
    .tablero > h4 {
        font-size: 24px;
        margin: 0 auto;
        text-align: center;
      }
      .tablero > p {
          margin: 10px 0px 0px 0;
          font-size: 20px;
          text-align: center;
      }
      .tablero > h3 {
        font-size: 20px;
        padding:0 20px ;
        text-align: center;
        background:var(--boton-fondo);
      }
      .manos{
        display: flex;
        flex-direction: column-reverse;
    }
    
      .tipos{
        display: inherit;
        height: 60px;
      }
      .manos-resultados{
        display: flex;
        width: 100%;
        justify-content: space-evenly;
      }
      .mano_pierde{
        filter:grayscale(1);
      }
      .vs {
        padding:16px ;
        color:var(--boton-fondo);
      }
      `;
    const padre =   div.querySelector(".manos") as Element;
    state.manos(() => {
        const mano = cs.manos;
        if (mano) {
            for (var i = 0; i < mano.length; i++) {
                const manos = document.createElement("_jugadas");
                manos.className = "manos-resultados";
                const su_juego = mano[i].su_juego;
                const tu_juego = mano[i].tu_juego;
                manos.innerHTML = `
                <div class="tipos">
                <tipo-${su_juego}></tipo-${su_juego}>
                <div class="vs"> = </div>
                <tipo-${tu_juego}></tipo-${tu_juego}>
                </div>`;
                padre.appendChild(manos);
            }
        } else {
            alert("error al leer datos");
        }
    });
    const buttonBack = div.querySelector(".btn-volver") as Element;
    buttonBack.addEventListener("click", () => {
        params.goTo("/resultados");
    });
    div.appendChild(style);
    return div;
}
