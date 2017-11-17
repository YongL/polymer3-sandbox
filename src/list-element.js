import {Element as PolymerElement} from "../node_modules/@polymer/polymer/polymer-element.js"

import '../node_modules/@polymer/iron-flex-layout/iron-flex-layout.js';
import '../node_modules/@polymer/paper-button/paper-button.js';

export class ListElement extends PolymerElement {

  static get template(){
    return `
      <style>
        :host{
          @apply --layout;
          @apply --layout-vertical;
        }
        .item {
          @apply --layout-horizontal;
          @apply --layout-justified;
          border-bottom: solid .5px grey;
          @apply --shadow-elevation-2dp;
        }
        .item:hover{
          background-color: lightgrey;
        }
        .name {
          padding: 14px;
        }
        .message {
          padding: 10px;
        }

      </style>
      <template is="dom-if" if="[[!data.length]]">
          <span class="message">No patient record!</span>
      </template>
      <template is="dom-repeat" items="[[data]]">
        <div class="item">
          <div class="name">[[item.first]] [[item.last]]</div>
          <paper-button raised data-patient$="[[item]]" on-tap="_buttonTapped">[[buttonText]]</paper-button>
        </div>
      </template>
    `;
  }

  static get properties(){
    return {
      //Array of items to be listed
      data: {
        type: Array,
        value: []
      },
      process: {
        type: String,
        value: "No_Process"
      },
      buttonText: {
        type: String,
        value: "Next"
      }
    }
  }

  _buttonTapped(e){
    console.log(e.currentTarget.getAttribute('data-patient'));
    var patient = JSON.parse(e.currentTarget.getAttribute('data-patient'));
    this.dispatchEvent(new CustomEvent('list-element-button-process-changed',
                                        {
                                          detail:{
                                            id: patient.id,
                                            first: patient.first,
                                            last: patient.last,
                                            process: this._validProcess(this.process),
                                          },
                                          bubbles: true,
                                          composed: true
                                        }
                                      ));
  }

  _validProcess(process){
    switch(process){
      case 'Icoming': return 'Incoming';
      case 'Check_In': return 'Check_In';
      case 'Check_Out': return 'Check_Out';
      case 'Revert' : return 'Check_In';
    }
  }

}
customElements.define('list-element', ListElement);
