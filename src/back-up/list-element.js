import {Element as PolymerElement} from "../node_modules/@polymer/polymer/polymer-element.js"

export class ListElement extends PolymerElement {

  static get template(){
    return `
      <ul>
        <template is="dom-repeat" items="[[data]]">
              <li>[[item.first]] [[item.last]]</li>checked
        </template>
      </ul>
    `;
  }

  static get properties(){
    return {
      //Array of items to be listed
      data: {
        type: Array,
        value: []
      }
    }
  }

}
customElements.define('list-element', ListElement);
