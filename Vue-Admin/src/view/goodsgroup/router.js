import Index from './index';
import Detail from './detail';
import Addsgroup from './addsgroup';

export default [{
	path: '/goods/group/index',
	component: Index
}, {
	path: '/goods/group/add',
	component: Detail
}, {
	path: '/goods/group/edit/:goodsGroupId',
	component: Detail
}, {
    path: '/goods/add/sgroup/:goodsGroupId',
    component: Addsgroup
}];