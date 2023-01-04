const piedra = require("url:../../img/piedra.svg");
customElements.define(
   "tipo-piedra",
   class Piedra extends HTMLElement {
      shadow: ShadowRoot;
      constructor() {
         super();
         this.shadow = this.attachShadow({ mode: "open" });
         this.render();
      }
      render() {
         const style = document.createElement("style");
         this.shadow.innerHTML = `
            <img class="tipo-piedra" src="${piedra}">
        `;
         style.innerHTML = `
            .tipo-piedra {
              height:80%;
              width:80%;
            }
            .tipo-piedra:hover{
               transition: 0.20s;
               transform: rotate(45deg);
               cursor:pointer;
            }	
        `;
         this.shadow.appendChild(style);
      }
   }
);