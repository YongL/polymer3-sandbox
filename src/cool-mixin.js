// import {Polymer} from "../node_modules/@polymer/polymer/polymer.js"
import {Polymer} from "../node_modules/@polymer/polymer/lib/legacy/polymer-fn.js"//legacy for polymer mixin //not work??
// import {mixinBehaviors} from "../node_modules/@polymer/polymer/lib/legacy/class.js"//legacy for polymer mixin

import { PaperDialogBehavior } from '../node_modules/@polymer/paper-dialog-behavior/paper-dialog-behavior.js';
import {IronResizableBehavior} from '../node_modules/@polymer/iron-resizable-behavior/iron-resizable-behavior.js'

// console.log(Polymer)
// export const CoolMixin = (superClass) => class extends Polymer.mixinBehaviors([PaperDialogBehavior, IronResizableBehavior], superClass){//not work in 3.0 but work fine in 2.0
export const CoolMixin = (superClass) => class extends  superClass{

    constructor(){
      super();
      // this.addEventListener('keypress', e => this.handlePress(e));
    }

    handlePress(e) {
      // console.log('key pressed: ' + e.charCode);
      // if(e.keyCode === 32){
        // var div = document.createElement('div');
        // console.log(this)
        // this.appendChild(div);
        // div.innHTML = this.coolDialog;
      // }
    }

    ready(){
      super.ready();
      this.addEventListener('dblclick', e => this.handlePress(e));
    }

    static get properties(){
      return {

        coolDialog: {
          type: Object,
          value: `
            <paper-dialog opened with-backdrop>
              <h2>Cool Mixin!!</h2>
              <div class="buttons">
                <paper-button dialog-dismiss>Cancel</paper-button>
                <paper-button dialog-confirm autofocus>Accept</paper-button>
              </div>
            </paper-dialog>
          `,
        },

        coolProp: {
          type: String,
          value: "Coolbean!"
        }



      }
    }
}
