
import Index from '../archives/index';
import Add from '../archives/add';
import Modify from '../archives/modify';
import Simple from '../archives/simple';

export default [{
    path: '/archives/index',
    component: Index,
    meta: {
        requireAuth: true,            // 添加该字段，表示进入这个路由是需要登录的
    }
}, {
    path: '/archives/add',
    component: Add,
    meta: {
        requireAuth: true,            // 添加该字段，表示进入这个路由是需要登录的
    }
}, {
    path: '/archives/modify',
    component: Modify,
    meta: {
        requireAuth: true,            // 添加该字段，表示进入这个路由是需要登录的
    }
}, {
    path: '/archives/simple',
    component: Simple,
    meta: {
        requireAuth: true,            // 添加该字段，表示进入这个路由是需要登录的
    }
}];