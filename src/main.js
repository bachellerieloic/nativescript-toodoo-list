import Vue from 'nativescript-vue'
import routes from '~/router'
import store from '~/store/index'
import sideDrawer from '~/components/sideDrawer'
import drawerContent from '~/components/drawerContent'

// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production')

Vue.registerElement('RadSideDrawer', () => require('nativescript-ui-sidedrawer').RadSideDrawer)

// Set up routes as a prototype to use throuhout the app.
Vue.prototype.$routes = routes

// Font Awesome
import {TNSFontIcon, fonticon} from 'nativescript-fonticon';
TNSFontIcon.debug = true;
TNSFontIcon.paths = {
    'fa': './assets/font-awesome.min.css'
};
TNSFontIcon.loadCss();
Vue.filter('fonticon', fonticon);

import {firebase} from '@nativescript/firebase';
// var firebase = require("nativescript-plugin-firebase");

firebase.init({
    persist: true
    // Optionally pass in properties for database, authentication and cloud messaging,
    // see their respective docs.
}).then(
    function () {
        console.log("firebase.init done");
    },
    function (error) {
        console.log("firebase.init error: " + error);
    }
);

Vue.prototype.$firebase = firebase;

new Vue({
    store,
    render (h) {
        return h(
            sideDrawer,
            [
                h(drawerContent, { slot: 'drawerContent' }),
                h(routes.Home, { slot: 'mainContent' })
            ]
        )
    }
}).$start()