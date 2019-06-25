import Index from './index';
import Detail from './detail';

export default [{
	path: '/member/card/index',
	component: Index
}, {
	path: '/member/card/add',
	component: Detail
}, {
	path: '/member/card/edit/:memberCardId',
	component: Detail
}];