import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

export class counterApp extends DDDSuper(LitElement) {

  static get tag() {
    return "counter-app";
  }

  constructor() {
    super();
    this.title = "";
    this.counter = 0;
    this.min = 0;
    this.max = 25;
  }

  static get properties() {
    return {
      title: { type: String },
      counter: { type: Number },
      min: { type: Number },
      max: { type: Number },
    };
  }

  increment() {
    if (this.counter < this.max) {
      this.counter++;
    }
  }

  decrement() {
    if (this.counter > this.min) {
      this.counter--;
    }
  }

  
  static get styles() {
    return [super.styles, css`
      :host {
        display: block;
        font-family: var(--counter-app-font-family, sans-serif);
        color: var(--ddd-theme-primary);
      }
      .counter {
        font-size: 48px;
        margin-bottom: 16px;
        text-align: center;
        color: gray;
      }
      .buttons {
        display: flex;
        justify-content: center;
        gap: 16px;
        padding: 16px;
      }
      .button-62 {
        background: linear-gradient(to bottom right, #EF4765, #FF9A5A);
        border: 0;
        border-radius: 12px;
        color: #FFFFFF;
        cursor: pointer;
        display: inline-block;
        font-family: -apple-system, system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        font-size: 16px;
        font-weight: 500;
        line-height: 2.5;
        outline: transparent;
        padding: 0 1rem;
        text-align: center;
        text-decoration: none;
        transition: box-shadow .2s ease-in-out;
        user-select: none;
        -webkit-user-select: none;
        touch-action: manipulation;
        white-space: nowrap;

      }
      
      .button-62:not([disabled]):focus {
        box-shadow: 0 0 .25rem rgba(0, 0, 0, 0.5), -.125rem -.125rem 1rem rgba(239, 71, 101, 0.5), .125rem .125rem 1rem rgba(255, 154, 90, 0.5);
      }
      .button-62:not([disabled]):hover {
        box-shadow: 0 0 .25rem rgba(0, 0, 0, 0.5), -.125rem -.125rem 1rem rgba(239, 71, 101, 0.5), .125rem .125rem 1rem rgba(255, 154, 90, 0.5);
      }
      .button-62:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    `];
  }
  
  updated(changedProperties) {
    if (changedProperties.has('counter')) {
      console.log(this.counter); 
      this.updateCounterColor();
    }
  }

  updateCounterColor() {
    const counterElement = this.shadowRoot.querySelector('.counter');
    if (this.counter >= 18 && this.counter < 21) {
      counterElement.style.color = "orange";
    } else {
      counterElement.style.color = ""; 
    }
  }

  makeItRain() {
    import("@haxtheweb/multiple-choice/lib/confetti-container.js").then(
      (module) => {
        setTimeout(() => {
          this.shadowRoot.querySelector("#confetti").setAttribute("popped", "");
        }, 0);
      }
    );
  }

  render() {
    return html`
      <div class="counter">${this.counter}</div>
      <div class="buttons">
        <button class="button-62" @click="${this.decrement}" ?disabled="${this.counter <= this.min}">
          -
        </button>
        <button class="button-62" @click="${this.increment}" ?disabled="${this.counter >= this.max}">
          +
        </button>
      </div>
      <slot></slot>
    `;
  }

  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(counterApp.tag, counterApp);