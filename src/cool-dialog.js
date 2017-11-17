import {Element as PolymerElement} from "../node_modules/@polymer/polymer/polymer-element.js"
import {Polymer} from "../node_modules/@polymer/polymer/lib/legacy/polymer-fn.js"//legacy for polymer mixin

import { PaperDialogBehavior } from '../node_modules/paper-dialog-behavior/paper-dialog-behavior.js';
import {IronResizableBehavior} from '../node_modules/iron-resizable-behavior/iron-resizable-behavior.js'




export class CoolDialog extends Polymer.mixinBehaviors([PaperDialogBehavior, IronResizableBehavior ], PolymerElement) { //hybrid way, to combine multiple behaviors

  static get template(){
    return`
      <slot></slot>
    `;
  }

}
customElements.define('cool-dialog', CoolDialog);
