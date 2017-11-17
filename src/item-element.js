import {Element as PolymerElement} from "../node_modules/@polymer/polymer/polymer-element.js"

export class ItemElement extends PolymerElement {

  static get template(){
    return `
      <style>
      </style>

      <div>

      </div>
    `;
  }

  static get properties(){
    return {
      //Array of items to be listed
      item: {
        type: Object,
        value: []
      }
    }
  }

}
customElements.define('item-element', ItemElement);
