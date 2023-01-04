const tijera = require("url:../../img/tijera.svg");

customElements.define(
   "tipo-tijera",
   class Tijera extends HTMLElement {
      shadow: ShadowRoot;
      constructor() {
         super();
         this.shadow = this.attachShadow({ mode: "open" });
         this.render();
      }
      render() {
         const style = document.createElement("style");
         this.shadow.innerHTML = `
            <img class="tipo-tijera" src="${tijera}">
        `;

         style.innerHTML = `
            .tipo-tijera {
              height:80%;
              width:80%;
            }
            .tipo-tijera:hover{
               transition: 0.20s;
               transform: rotate(45deg);
               cursor:pointer;
            }	
        `;
         this.shadow.appendChild(style);
      }
   }
);