import Index from './index';
import Detail from './detail';

export default [{
	path: '/goods/category/index',
	component: Index
}, {
	path: '/goods/category/add',
	component: Detail
}, {
	path: '/goods/category/edit/:goodsCategoryId',
	component: Detail
}];