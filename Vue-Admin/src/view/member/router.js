import Index from './index';
import Detail from './detail';

export default [{
	path: '/member/index',
	component: Index
}, {
	path: '/member/add',
	component: Detail
}, {
	path: '/member/edit/:memberId',
	component: Detail
}];