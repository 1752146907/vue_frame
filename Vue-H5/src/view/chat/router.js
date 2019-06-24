
import Chat from './chat';
import Index from './index';

export default [{
    path: '/chat/index',
    component: Index,
    meta: {
        requireAuth: true,            // 添加该字段，表示进入这个路由是需要登录的
    }
},{
    path: '/chat/chat',
    component: Chat,
    meta: {
        requireAuth: true,            // 添加该字段，表示进入这个路由是需要登录的
    }
}];