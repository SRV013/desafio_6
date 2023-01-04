import { initRouter } from "./routes";
import "./componets/piedra";
import "./componets/papel";
import "./componets/tijera";
import "./componets/boton";
(function () {
    const root = document.querySelector(".root") as Element;
    initRouter(root);
})(); 