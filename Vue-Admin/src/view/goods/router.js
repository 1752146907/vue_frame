import Index from './index';
import Detail from './detail';

export default [{
	path: '/goods/index',
	component: Index
}, {
	path: '/goods/add',
	component: Detail
}, {
	path: '/goods/edit/:goodsId',
	component: Detail
}];