import {Element as PolymerElement} from "../node_modules/@polymer/polymer/polymer-element.js"

export class FilderHolder extends PolymerElement {

  static get template(){
      return`
        <input type="file" id="input" multiple/>
        <img id="imageHolder"/>
      `;
  }



  constructor(){
    super();
    //default value??;

  }

  connectedCallback(){
    super.connectedCallback();
    this.$.input.addEventListener('change', ()=> this.readURL(this.$.input));
  }

  ready() {
    super.ready();
    // this.querySelector('#input').addEventListener('input', ()=> this.readURL());
    // this.$.input.addEventListener('input', ()=> this.readURL());
  }

  readURL(input){
      //check input
      console.log(input)
      if(input.files && input.files[0]){
        var reader = new FileReader();
        reader.onload = e => this.$.imageHolder.setAttribute('src', e.target.result);
        reader.readAsDataURL(input.files[0]);
      }
  }
}
customElements.define('file-holder', FilderHolder);
