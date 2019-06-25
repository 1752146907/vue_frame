import Index from './index';
import Detail from './detail';

export default [{
	path: '/goods/order/index',
	component: Index
}, {
	path: '/goods/order/detail/:tradeId',
	component: Detail
}];