
import Index from './index';

export default [{
    path: '/login',
    component: Index,
    meta: {
        requireAuth: false,            // 添加该字段，表示进入这个路由是需要登录的
    }
}];