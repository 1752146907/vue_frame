import List from './list';
import Detail from './detail';
import Category from './category'

export default [{
    path: '/doctor/list',
    component: List,
    meta: {
        requireAuth: true,            // 添加该字段，表示进入这个路由是需要登录的
    }
}, {
    path: '/doctor/detail',
    component: Detail,
    meta: {
        requireAuth: true,            // 添加该字段，表示进入这个路由是需要登录的
    }
}, {
    path: '/doctor/category',
    component: Category,
    meta: {
        requireAuth: true,            // 添加该字段，表示进入这个路由是需要登录的
    }
}];