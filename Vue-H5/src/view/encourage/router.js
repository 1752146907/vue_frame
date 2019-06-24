
import Index from './index';

export default [{
    path: '/encourage/index',
    component: Index,
    meta: {
        requireAuth: true,            // 添加该字段，表示进入这个路由是需要登录的
    }
}];