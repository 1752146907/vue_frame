import Vue from 'vue';
import Router from 'vue-router';
import Vuex from 'vuex';
import iView from 'iview';

import Main from './view/main/index.vue';

import application from './common/application';
import notification from './common/notification';
import storage from './common/storage';
import util from './common/util';

import 'iview/dist/styles/iview.css';
import './font/iconfont.css';
import './css/style.css';

Vue.config.productionTip = false;

Vue.use(iView);

Vue.prototype.$notification = notification;
Vue.prototype.$storage = storage;
Vue.prototype.$util = util;

Vue.use(Router);
var routes = [];
var routerContexts = require.context('./view/', true, /^.*\/router\.js$/);
routerContexts.keys().map(fileName => {
    routes = routes.concat(routerContexts(fileName).default);
});
var router = new Router({
	mode: 'hash',
	base: process.env.BASE_URL,
	routes: routes
});

router.beforeEach((to, from, next) => {
	if (storage.getToken() == '') {
		if (to.path == application.loginPath) {
			next();
		} else {
			next({
				path: application.loginPath
			});
		}
	} else {
	if (to.path == '/') {
		next({
			path: application.homePath
		});
	} else {
		next();
		}
	}
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
