import Vue from 'vue';
import Router from 'vue-router';
import Vuex from 'vuex';

import Main from './view/main.vue';

import './font/iconfont.css';
import './css/style.css';

import storage from './common/storage.js';

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
	if (to.path == '/') {            //默认跳到首页
		next({
			path: homePath
		});
	}

	if(to.meta.requireAuth) {
		if (storage.getToken()) {            //有token,或者token未过期，跳过登录
			next();
		} else {
			next('/login');      //没有登陆过，或者token 过期，跳转到登录页
		}
	} else {                           //不需要跳转，直接往下走
		next();
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
