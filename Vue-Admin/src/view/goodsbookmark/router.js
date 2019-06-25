import Index from './index';
import Detail from './detail';

export default [{
	path: '/goods/bookmark/index',
	component: Index
}, {
	path: '/goods/bookmark/add',
	component: Detail
}, {
	path: '/goods/bookmark/edit/:goodsBookmarkId',
	component: Detail
}];