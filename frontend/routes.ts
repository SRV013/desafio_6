import { init as initInicio } from "./pages/inicio";
import { init as initJuegosNuevo } from "./pages/juegos";
import { init as initJuegosInv } from "./pages/juegosi";
import { init as initPartida } from "./pages/partida";
import { init as initInvitado } from "./pages/partidai";
import { init as initNFront } from "./pages/nfront";
import { init as initNBack } from "./pages/nback";
import { init as initResultadosCreador } from "./pages/resultados";
import { init as resulinvitado } from "./pages/resultadosi";
import { init as initMarcador } from "./pages/marcador";
import { init as initMarcadorInvitado } from "./pages/marcadori";
const routes = [
    {
        path: /\/inicio/,
        component: initInicio,
    },
    {
        path: /\/juegonuevo/,
        component: initJuegosNuevo,
    },
    {
        path: /\/juegosinvitado/,
        component: initJuegosInv,
    },
    {
        path: /\/nuevo_front/,
        component: initNFront,
    },
    {
        path: /\/nuevo_back/,
        component: initNBack,
    },
    {
        path: /\/partida/,
        component: initPartida,
    },
    {
        path: /\/invitado/,
        component: initInvitado,
    },
    {
        path: /\/resultados/,
        component: initResultadosCreador,
    },
    {
        path: /\/resul_invitado/,
        component: resulinvitado,
    },
    {
        path: /\/marcador/,
        component: initMarcador,
    },
    {
        path: /\/marcdor_invitado/,
        component: initMarcadorInvitado,
    },
];
export function initRouter(container: Element) {
    function goTo(path) {
        history.pushState({}, "", path);
        handleRoute(path);
    }

    function handleRoute(route) {
        container.innerHTML = ``;
        routes.find((r) => {
            if (r.path.test(route)) {
                const el = r.component({ goTo: goTo });
                container.appendChild(el);
            }
        });
    }
    
    goTo("/inicio");
    handleRoute(location.pathname);
}
