import {Element as PolymerElement} from "../node_modules/@polymer/polymer/polymer-element.js"
// import {DomRepeat} "../node_modules/@polymer/polymer/lib/elements/dom-repeat.js" // may need to use ${} string template expression
// import { Polymer } from '../node_modules/@polymer/polymer/lib/legacy/polymer-fn.js'; //legacy dom-repeat??
// import { MutableData } from '../node_modules/@polymer/polymer/lib/mixins/mutable-data.js';
// import {DomRepeat} "../node_modules/@polymer/polymer/lib/elements/dom-repeat.js"
import "../node_modules/@polymer/polymer/lib/elements/dom-repeat.js"


import '../node_modules/@polymer/paper-material/paper-material.js';
import '../node_modules/@polymer/paper-styles/shadow.js';
import '../node_modules/@polymer/iron-flex-layout/iron-flex-layout.js';
import '../node_modules/@polymer/paper-button/paper-button.js';
import '../node_modules/@polymer/iron-ajax/iron-ajax.js';

import {CoolMixin} from './cool-mixin.js'; //class mixin ~ to behavior in 1.x

import './list-element.js';

export class FrontDesk extends CoolMixin(PolymerElement) {

  static get template(){
    return `
    <style>
      :host {
          @apply --layout;
          @apply --layout-vertical;
          margin: 20px;
          /*@apply --shadow-elevation-3dp;*/
      }
      paper-button {
        margin-top: 10px;
        max-width: 65px;

      }
      .front-desk-chart {
        @apply --layout;
        @apply --layout-horizontal;
      }
      .incoming, .checkin, .checkout {
        @apply --layout-flex;
      }

      .checkin, .checkout {
        border-left: solid .5px;
        padding-left: 10px;
      }

      .title {
        @apply --layout;
        border-bottom: solid .5px gray;
        font-size: 18px;
      }
      .title >*{
        @apply --layout-center-center;
      }

    </style>

     <iron-ajax url="./src/data/patients.json" auto
                  last-response="{{patients}}"
                  on-response="_handleResponse"
                  zdebounce-duration="500"></iron-ajax>


          <div class="front-desk-chart">
            <div class="incoming">
              <div class="title"><span>Incoming</span></div>
              <list-element data="[[incomingPatients]]" process="Check_In" button-text="Check In"></list-element>
            </div>
            <div class="checkin">
              <div class="title">Check In</div>
              <list-element data="[[checkInPatients]]" process="Check_Out" button-text="Check Out"></list-element>
            </div>
            <div class="checkout">
              <div class="title">Check Out</div>
              <list-element data="[[checkOutPatients]]" process="Revert" buttonText="Revert"></list-element>
            </div>
          </div>




    `;
  }

  ready(){
    super.ready();
    this.addEventListener("list-element-button-process-changed", this._captureEventFromListElement);
  }

  _captureEventFromListElement(e){
    console.log(e.detail)
    //find the the id of the patient
    var patient = e.detail;
    // update the patient
    // this.set('patients.'+ (patient.id), patient);
    this.patients.forEach(p=>{
      if(p.id === patient.id) {
        this.set('patients.'+ (p.id), patient);
      }
    });

  }

  static get observers(){
    return ['_patientsChanged(patients.*)'];
  }

  _patientsChanged(patients){
    console.log("front-desk", patients)
    if(patients.value){ //need a better way
      //get incoming patients, checkin and checkout patients
      this.incomingPatients = this._getPatients(this.patients, "Incoming");
      this.checkInPatients = this._getPatients(this.patients, "Check_In");
      this.checkOutPatients = this._getPatients(this.patients, "Check_Out");
    }
    console.log("incoming", this.incomingPatients);
    console.log("checkin", this.checkInPatients);
    console.log("checkout", this.checkOutPatients);

  }

  _getPatients(patients, processType){
      // return patients.filter(patient => patient.process === processType);
      return patients.filter(function(patient){
        console.log(patient)
        return patient.process === processType;
      });
  }

  _handleResponse(e){
    console.log(e.detail.response);
  }

  static get properties(){
    return {
      patients: {
        type: Array,
        notify: true,
      },

      incomingPatients: Array,

      checkInPatients: {
        type: Array,
      },

      checkOutPatients: {
        type: Array,
      },
    }
  }

}
customElements.define('front-desk', FrontDesk);
