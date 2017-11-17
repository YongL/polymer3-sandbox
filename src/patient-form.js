import {Element as PolymerElement} from "../node_modules/@polymer/polymer/polymer-element.js"
import '../node_modules/@polymer/paper-input/paper-input.js';
import '../node_modules/@polymer/paper-material/paper-material.js';
import '../node_modules/@polymer/paper-styles/shadow.js';
import '../node_modules/@polymer/iron-flex-layout/iron-flex-layout.js';
import '../node_modules/@polymer/paper-button/paper-button.js';


export class PatientForm extends PolymerElement {

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

    </style>
        <paper-input id="first" aways-float-label placeholder="First name"></paper-input>
        <paper-input id="last" aways-float-label placeholder="Last name"></paper-input>
        <paper-button on-click="_addPatient" raised>Register</paper-button>
    `;
  }

  static get properties(){
    return {
      patients: {
        notify: true,
        type: Array,
        value: []
      },
      newId: Number,
    }
  }

  _addPatient(){
    //push new a patient
    if(this.$.first.value || this.$.last.value){
        //increment the id
        this.newId = this.patients.length;
        console.log(this.newId)
        // this.notifyPath('patients.'+this.newId, {id: this.newId, first: this.$.first.value, last: this.$.last.value, process: "Incoming"} );
        this.push('patients', {id: this.newId, first: this.$.first.value, last: this.$.last.value, process: "Incoming"} ); //weird, got extra empty array
        // var patient = {id: this.newId, first: this.$.first.value, last: this.$.last.value, process: "Incoming"};
        // var prevPatients = this.patients;
        // this.set('patients', [...prevPatients, patient]); // when mutate somehow it one extra is inserted //underfined ?? this way
        // this.patients.push(patient);
        // this.notifyPath('patients', this.patients);
        console.log(this.patients);
    }
    //Clear the input fields
    //direct to a new page? popup a message? notify user
  }

}
customElements.define('patient-form', PatientForm);
