import Index from './index';
import Follow from './follow';
export default [{
	path: '/my/index',
	component: Index,
    meta: {
        requireAuth: true,            // 添加该字段，表示进入这个路由是需要登录的
    }
}, {
    path: '/my/follow',
    component: Follow,
    meta: {
        requireAuth: true,            // 添加该字段，表示进入这个路由是需要登录的
    }
}];