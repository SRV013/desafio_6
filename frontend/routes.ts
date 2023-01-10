import { Router } from "@vaadin/router";
const router = new Router(document.querySelector(`.root`));
router.setRoutes([
    { path: `/`, component: `inicio-web` },
    { path: `/inicio`, component: `inicio-web` },
    { path: `/juegonuevo`, component: `juegos-pagina` },
    { path: `/juegosinvitado`, component: `juegosi-pagina` },
    { path: `/partida`, component: `partida-web` },
    { path: `/invitado`, component: `partidai-web` },
    { path: `/nuevo_front`, component: `nfront-web` },
    { path: `/nuevo_back`, component: `nback-web` },
    { path: `/marcador`, component: `marcador-web` },
    { path: `/marcdor_invitado`, component: `marcadori-web` },
    { path: `/resultados`, component: `resultados-web` },
    { path: `/resultados_invitado`, component: `resultadosi-web` },
]);