window.Event = new Vue();

import Vue from 'vue'
import App from './App.vue'

import './assets/css/main.scss';
import './vendor/fontawesome-free-5.0.6/svg-with-js/js/fontawesome-all.min.js';

new Vue({
    el: '#app',
    render: h => h(App)
});
