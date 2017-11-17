import {Element as PolymerElement} from "../node_modules/@polymer/polymer/polymer-element.js"
// import {Base as Polymer} from "../node_modules/@polymer/polymer/polymer.js"

import { Polymer } from '../node_modules/@polymer/polymer/lib/legacy/polymer-fn.js'; // use for the legacy polymer and mixin


import {microTask, timeOut, animationFrame, idlePeriod} from "../node_modules/@polymer/polymer/lib/utils/async.js"

import '../node_modules/@polymer/app-layout/helpers/helpers.js';
import '../node_modules/@polymer/app-layout/app-drawer/app-drawer.js';
import '../node_modules/@polymer/app-layout/app-drawer-layout/app-drawer-layout.js';
import '../node_modules/@polymer/app-layout/app-grid/app-grid-style.js';
import '../node_modules/@polymer/app-layout/app-header/app-header.js';
import '../node_modules/@polymer/app-layout/app-toolbar/app-toolbar.js';
import '../node_modules/@polymer/app-layout/app-box/app-box.js';

import '../node_modules/@polymer/app-route/app-route.js';
import '../node_modules/@polymer/app-route/app-location.js';

import '../node_modules/@polymer/iron-pages/iron-pages.js';
import '../node_modules/@polymer/iron-selector/iron-selector.js';
import '../node_modules/@polymer/iron-flex-layout/iron-flex-layout.js';

import '../node_modules/@polymer/paper-icon-button/paper-icon-button.js'

import './patient-form.js';
import './front-desk.js';
console.log(Polymer)
export class CustomContainer extends PolymerElement {

  static get template(){
    return `
    <style>
      :host {
        --app-primary-color: #404040;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      }
      app-drawer {
        --app-drawer-content-container: {
          background-color: var(--app-primary-color);
          overflow-x: hidden;
        };
      }
      app-drawer app-header {
        background-color: var(--app-primary-color);
      }
      .nav-menu {
        background-color: var(--app-primary-color);
        color: #fff;
      }
      a {
        text-decoration: none;
        color: inherit;
        font-size: inherit;
      }
      .nav-menu > a {
        display: block;
        padding: 12px 16px;
        font-size: 20px;
        font-weight: 500;
      }
      .nav-menu > a.iron-selected {
        background-color: #888;
      }

      .main-header {
        border-bottom: 1px solid #ddd;
        background-color: #fff;
        color: #444;
      }
      .title-toolbar {
        @apply --layout-center-center;
        box-sizing: border-box;
      }
      .nav-title-toolbar {
        color: #fff;
        width: 100vw;
      }
      .main-title-toolbar {
        width: 100%;
      }
      .title {
        padding-bottom: 0px;
        font-size: 60px;
        font-weight: 800;
      }

      [hidden] {
        display: none;
      }
      @media (max-width: 580px) {
        /* make title smaller to fit on screen */
        .title {
          font-size: 40px;
          padding-bottom: 16px;
        }
      }
    </style>

    <!-- setup routes -->
    <app-location route="{{route}}"></app-location>
    <app-route
        route="{{route}}"
        pattern="/:page"
        data="{{routeData}}"
        tail="{{subroute}}"></app-route>

    <app-drawer-layout drawer-width="288px" responsive-width="1280px" narrow="{{narrow}}">

      <!-- nav panel -->
      <app-drawer id="drawer" slot="drawer">
        <app-header-layout has-scrolling-region>

          <app-header fixed slot="header">

            <!-- top toolbar -->
            <app-toolbar></app-toolbar>

            <!-- bottom toolbar -->
            <app-toolbar class="title-toolbar nav-title-toolbar">
              <div class="title">ChiroTouch</div>
            </app-toolbar>

          </app-header>

          <!-- nav menu -->
          <iron-selector
              class="nav-menu"
              selected="[[routeData]]"
              attr-for-selected="name">
                <a name="patient-form" href="/patient-form">Patient form</a>
                <a name="front-desk" href="/front-desk">Front desk</a>
          </iron-selector>

        </app-header-layout>
      </app-drawer>

      <!-- main panel -->
      <app-header-layout>

        <app-header fixed effects="waterfall" class="main-header" slot="header">
          <app-toolbar class="title-toolbar main-title-toolbar">
            <div class="title">ChiroTouch</div>
          </app-toolbar>

        </app-header>

        <!-- list/detail pages -->
        <iron-pages selected="{{routeData.page}}" attr-for-selected="name" selected-attribute="visible">
          <patient-form name="patient-form" visible></patient-form>
          <front-desk name="front-desk"></front-desk>
        </iron-pages>


      </app-header-layout>

    </app-drawer-layout>


    `;
  }

  static get properties(){
    return {
      /**
         * Articles data.
         */
         //it strict, you can't use property: object, or property: String?
        // example articles: Object,
        // route: Object,
        // subRoute: Object,
        page: {
         type: String,
         reflectToAttribute: true,
         observer: '_pageChanged'
       },

        route: {
          type: Object,
          value: {}
        },

        yo: {
          type: String,
          value: "yo!"
        },
        routeData: Object,

        subroute: {
          type: Object,
          value: {}
        },

        patients: {
          type: Array,
          value: []
        }

    };
  }

  static get observers(){
      return [
        '_routeDateChanged(routeData)'
      ];
  }

  _routeDateChanged(routeData){
    // console.log(this.routeData);
    // console.log(this.page);
    // console.log(this.route);
  }

  _pageChanged(e){
    console.log(e);
  }

  connectedCallback(){
    super.connectedCallback();
    // console.log(this.route);
    microTask.run(()=>{
      // console.log(this.route);
      // console.log(this.page);
      if (!this.route.path || this.route.path === "/") {
        // this.set('route.path', '/art/list');
        this.route.path = '/patient-form';
        // console.log(this.route);
        // this.routeData.page = 'patient-form';
      }
    });
  }




}

customElements.define('custom-container', CustomContainer);
