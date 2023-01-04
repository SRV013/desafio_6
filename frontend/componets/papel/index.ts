const papel = require("url:../../img/papel.svg");

customElements.define(
   "tipo-papel",
   class Papel extends HTMLElement {
      shadow: ShadowRoot;
      constructor() {
         super();
         this.shadow = this.attachShadow({ mode: "open" });
         this.render();
      }
      render() {
         const style = document.createElement("style");
         this.shadow.innerHTML = `
            <img class="tipo-papel" src="${papel}">
        `;

         style.innerHTML = `
            .tipo-papel {
              height: 80%;
              width:80%;
            }
            .tipo-papel:hover{
               transition: 0.20s;
               transform: rotate(45deg);
               cursor:pointer;
            }	
        `;
         this.shadow.appendChild(style);
      }
   }
);