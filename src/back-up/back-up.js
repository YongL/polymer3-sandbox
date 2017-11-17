import {Element as PolymerElement} from "../node_modules/@polymer/polymer/polymer-element.js"
// import {Base as Polymer} from "../node_modules/@polymer/polymer/polymer.js"
import {microTask, timeOut, animationFrame, idlePeriod} from "../node_modules/@polymer/polymer/lib/utils/async.js"

import '../node_modules/@polymer/app-layout/helpers/helpers.js';
import '../node_modules/@polymer/app-layout/app-drawer/app-drawer.js';
import '../node_modules/@polymer/app-layout/app-drawer-layout/app-drawer-layout.js';
import '../node_modules/@polymer/app-layout/app-grid/app-grid-style.js';
import '../node_modules/@polymer/app-layout/app-header/app-header.js';
import '../node_modules/@polymer/app-layout/app-toolbar/app-toolbar.js';
import '../node_modules/@polymer/app-layout/app-box/app-box.js';
import '../node_modules/@polymer/iron-pages/iron-pages.js';
import '../node_modules/@polymer/iron-flex-layout/iron-flex-layout.js';
import '../node_modules/@polymer/paper-icon-button/paper-icon-button.js'

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
        padding-bottom: 40px;
        font-size: 60px;
        font-weight: 800;
      }
      .category-page {
        min-height: 100vh;
      }
      article-headline {
        @apply --shadow-transition;
        @apply --shadow-elevation-2dp;
        cursor: pointer;
      }
      article-detail {
        max-width: 736px;
        margin: 64px auto;
        background-color: #fff;
        @apply --shadow-elevation-2dp;
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
      /* narrow layout */
      @media (max-width: 808px) {
        article-detail {
          max-width: none;
          margin: 0;
        }
      }
    </style>

    <!-- setup routes -->
    <app-location route="{{route}}" use-hash-as-path></app-location>
    <app-route
        route="{{route}}"
        pattern="/:category"
        data="{{categoryData}}"
        tail="{{subRoute}}"></app-route>
    <app-route
        route="{{subRoute}}"
        pattern="/:page"
        data="{{pageData}}"
        tail="{{subsubRoute}}"></app-route>
    <app-route
        route="{{subsubRoute}}"
        pattern="/:id"
        data="{{idData}}"></app-route>

    <app-drawer-layout drawer-width="288px" responsive-width="1280px" narrow="{{narrow}}">

      <!-- nav panel -->
      <app-drawer id="drawer" slot="drawer">
        <app-header-layout has-scrolling-region>

          <app-header fixed slot="header">

            <!-- top toolbar -->
            <app-toolbar></app-toolbar>

            <!-- bottom toolbar -->
            <app-toolbar class="title-toolbar nav-title-toolbar">
              <div class="title">ZUPERK&Uuml;LBLOG</div>
            </app-toolbar>

          </app-header>

          <!-- nav menu -->
          <iron-selector
              class="nav-menu"
              selected="[[categoryData.category]]"
              attr-for-selected="name"
              on-iron-activate="_drawerSelected">
            <template is="dom-repeat" items="[[articles]]">
              <a name="[[item.name]]" href="#/[[item.name]]/list">{{item.title}}</a>
            </template>
          </iron-selector>

        </app-header-layout>
      </app-drawer>

      <!-- main panel -->
      <app-header-layout>

        <app-header fixed effects="waterfall" class="main-header" slot="header">

          <!-- top toolbar -->
          <app-toolbar>
            <!-- menu button -->test
            <paper-icon-button
                drawer-toggle
                icon="app:menu"
                hidden$="[[_shouldHideMenuButton(pageData.page, narrow)]]"></paper-icon-button>

            <!-- back button -->
            <a
                href="#/[[categoryData.category]]/list"
                hidden$="[[_equal(pageData.page, 'list')]]">
              <paper-icon-button icon="app:arrow-back"></paper-icon-button>
            </a>
          </app-toolbar>

          <!-- bottom toolbar -->
          <app-toolbar class="title-toolbar main-title-toolbar">
            <div class="title">ZUPERK&Uuml;LBLOG</div>
          </app-toolbar>

        </app-header>

        <!-- list/detail pages -->
        <iron-pages selected="[[pageData.page]]" attr-for-selected="name">

          <!-- list page -->
          <iron-pages name="list" selected="[[categoryData.category]]" attr-for-selected="name">

            <template is="dom-repeat" items="[[articles]]" as="category">
              <section class="category-page" name="[[category.name]]">
                <!-- 2-columns grid -->
                <two-columns-grid column-width="396" gutter="4">
                  <template is="dom-repeat" items="[[category.items]]" as="article">
                    <article-headline href="#/[[category.name]]/detail/[[article.id]]"
                        article="[[article]]"></article-headline>
                  </template>
                </two-columns-grid>
              </section>
            </template>

          </iron-pages>

          <!-- detail page -->
          <article-detail name="detail" article="[[article]]"></article-detail>
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
        // articles: Object,
        // route: Object,
        // subRoute: Object,

        articles: {
          type: Object,
          value: {}
        },
        route: {
          type: Object,
          value: {}
        },
        subRoute: {
          type: Object,
          value: {}
        },
        subsubRoute: {
          type: Object,
          observer: '_subsubrouteChanged'
        },

        yo: {
          type: String,
          value: "yo!"
        },
        categoryData: Object,
        pageData: Object,
        idData: Object,
        _scrollPositionMap: {
          type: Object,
          value: function() {
            return {};
          }
        }
    };
  }

  static get observers(){
      return [
        '_updateArticle(articles, categoryData.category, idData.id)'
      ];
  }

  connectedCallback(){
    super.connectedCallback();
    console.log(this.yo);
    microTask.run(()=>{
      console.log(this.route)
      if (!this.route.path) {
        // this.set('route.path', '/art/list');
        this.route.path = '/art/list';
      }
    });
  }


  _equal(value1, value2) {
      return value1 === value2;
  }

  _updateArticle(articles, category, id) {
    if (!articles) {
      return;
    }
    for (var i=0, cat; cat=articles[i]; i++) {
      if (cat.name === category) {
        for (var j=0, article; article=cat.items[j]; j++) {
          if (article.id === id) {
            this.article = article;
            return;
          }
        }
      }
    }
  }

  _drawerSelected() {
    if (!this.$.drawer.persistent) this.$.drawer.close();
  }

  _shouldHideMenuButton(page, narrow) {
    return page === 'detail' || !narrow;
  }

  /**
   * Preserves the document scroll position, so
   * it can be restored when returning to a page.
   */
  _subsubrouteChanged(subroute, oldSubroute) {
    var map = this._scrollPositionMap;
    if (oldSubroute != null && oldSubroute.prefix != null) {
      // Don't reset the scroll position in the detail page.
      if (oldSubroute.prefix.indexOf('detail') == -1) {
        map[oldSubroute.prefix] = window.pageYOffset;
      }
    }
    if (map[subroute.prefix] != null) {
      Polymer.AppLayout.scroll({ top: map[subroute.prefix], behavior: 'silent' });
    } else if (this.isAttached) {
      Polymer.AppLayout.scroll({ top: 0, behavior: 'silent' });
    }
  }


}
customElements.define('custom-container', CustomContainer);
