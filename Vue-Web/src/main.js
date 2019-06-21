import Vue from 'vue';
import Router from 'vue-router';
import Vuex from 'vuex';

import Main from './view/main.vue';

import './font/iconfont.css';
import './css/style.css';

Vue.config.productionTip = false;

Vue.use(Router);
var routes = [];
var routerContexts = require.context('./view/', true, /^.*\/router\.js$/);
routerContexts.keys().map(fileName => {
    routes = routes.concat(routerContexts(fileName).default);
});
var router = new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: routes
});

var homePath = '/home/index';
router.beforeEach((to, from, next) => {
	if (to.path == homePath) {
		next();
	} if (to.path == '/') {
		next({
			path: homePath
		});
	}

	next();
});

Vue.use(Vuex);
var modules = {};
var storeContexts = require.context('./view/', true, /^.*\/store\.js$/);
storeContexts.keys().map(fileName => {
	for (var name in storeContexts(fileName).default.mutations) {
		modules[name] = storeContexts(fileName).default;
	}
});
var store = new Vuex.Store({
	modules: modules
});

new Vue({
	router,
	store,
	render: h => h(Main)
}).$mount('#app');
