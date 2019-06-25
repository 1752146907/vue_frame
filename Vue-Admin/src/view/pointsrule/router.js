import Index from './index';
import Detail from './detail';

export default [{
	path: '/points/rule/index',
	component: Index
}, {
	path: '/points/rule/add',
	component: Detail
}, {
	path: '/points/custom/rule/edit/:pointsCustomRuleId',
	component: Detail
}];