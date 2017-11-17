// import {Polymer} from "../node_modules/@polymer/polymer/lib/legacy/polymer-fn.js"//legacy for polymer mixin
import {mixinBehaviors} from "../node_modules/@polymer/polymer/lib/legacy/class.js"//legacy for polymer mixin

import { PaperDialogBehavior } from '../node_modules/@polymer/paper-dialog-behavior/paper-dialog-behavior.js';
import {IronResizableBehavior} from '../node_modules/@polymer/iron-resizable-behavior/iron-resizable-behavior.js'

export const CoolMixin = (superClass) => class extends mixinBehaviors([PaperDialogBehavior, IronResizableBehavior], superClass){

    constructor(){
      super();
      this.addEventListener('keypress', e => this.handlePress(e));
    }

    handlePress(e) {
      console.log('key pressed: ' + e.charCode);
      if(e.keyCode === 32){
        var div = document.createElement('div');
        div.innHTML = this.coolDialog;
        this.apendChild(div);
      }
    }

    // ready(){
    //   super.ready();
    // }

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
        }

      }
    }
}
