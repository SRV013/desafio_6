customElements.define(
    "tipo-boton",
    class Button extends HTMLElement {
       shadow: ShadowRoot;
       constructor() {
          super();
          this.shadow = this.attachShadow({ mode: "open" });
          this.render();
       }
       render() {
          const button = document.createElement("button");
          const style = document.createElement("style");
          button.className = "boton-el";
          style.innerHTML = `
         .boton-el {
            color: var(--boton-font);
            height: 80px;
            font-size: 34px;
            text-align: center;
            border-radius: 10px;
            text-transform: uppercase;
            background: var(--boton-fondo);
            border:5px solid var(--boton-borde);
            padding:0px 50px 0px 50px;
            font-family:Fredoka One;
         }
         .boton-el:hover{
            transition: 0.25s;
            transform: scale(1.2);
            cursor: pointer;
         }
         @media (max-width:500px) {
            .boton-el {
               font-size: 20px;
            }
          }
         `; 
          button.textContent = this.textContent;
          this.shadow.appendChild(button);
          this.shadow.appendChild(style);
       }
    }
 );