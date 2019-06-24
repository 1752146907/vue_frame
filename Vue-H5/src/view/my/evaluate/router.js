import Evaluate from './evaluate';
export default [{
    path: '/my/evaluate',
    component: Evaluate,
    meta: {
        requireAuth: true,            // 添加该字段，表示进入这个路由是需要登录的
    }
}];