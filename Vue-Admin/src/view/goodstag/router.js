import Index from './index';
import Detail from './detail';

export default [{
	path: '/goods/tag/index',
	component: Index
}, {
	path: '/goods/tag/add',
	component: Detail
}, {
	path: '/goods/tag/edit/:goodsTagId',
	component: Detail
}];