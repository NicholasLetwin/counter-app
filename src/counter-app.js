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
    this.max = 100;
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
    return [super.styles,
    css`
      :host {
        display: block;
      font-family: var(--counter-app-font-family, sans-serif);
      color: var(--ddd-theme-primary);
      }
      .counter {
      font-size: 48px;
      margin-bottom: 16px;
      text-align: center;
      }
      .buttons {
      display: flex;
      justify-content: center;
      gap: 16px;

      .button-64 {
      align-items: center;
      background-image: linear-gradient(144deg, #AF40FF, #5B42F3 50%, #00DDEB);
      border: 0;
      border-radius: 8px;
      box-shadow: rgba(151, 65, 252, 0.2) 0 15px 30px -5px;
      color: #FFFFFF;
      display: flex;
      font-family: Phantomsans, sans-serif;
      font-size: 20px;
      justify-content: center;
      line-height: 1em;
      min-width: 140px;
      padding: 3px;
      cursor: pointer;
      text-decoration: none;
      user-select: none;
      white-space: nowrap;
    }

    .button-64:active, .button-64:hover {
      outline: 0;
    }

    .button-64 span {
      background-color: rgb(5, 6, 45);
      padding: 16px 24px;
      border-radius: 6px;
      transition: 300ms;
      width: 100%;
      height: 100%;
    }

    .button-64:hover span {
      background: none;
    }

    @media (min-width: 768px) {
      .button-64 {
        font-size: 24px;
        min-width: 196px;
      }
    }
      div {
        padding: 0;
        margin: 0;
      }
      
    
    `];
  }

  updateCounterColor() {
    const counterElement = this.shadowRoot.querySelector('.counter');
    if (this.counter >= 18 && this.counter < 21) {
      counterElement.style.color = "orange";
    } else if (this.counter >= 21) {
      counterElement.style.color = "red";
    } else {
      counterElement.style.color = ""; 
    }
  }

  updated(changedProperties) {
    if (changedProperties.has('counter')) {
      // do your testing of the value and make it rain by calling makeItRain
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
      <button class="button-64" @click="${this.decrement}" ?disabled="${this.counter <= this.min}">
        <span class="text">-</span>
      </button>
      <button class="button-64" @click="${this.increment}" ?disabled="${this.counter >= this.max}">
        <span class="text">+</span>
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