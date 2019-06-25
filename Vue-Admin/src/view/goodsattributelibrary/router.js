import Index from './index';
import Detail from './detail';

export default [{
	path: '/goods/attribute/library/index',
	component: Index
}, {
	path: '/goods/attribute/library/add',
	component: Detail
}, {
	path: '/goods/attribute/library/edit/:goodsAttributeLibraryId',
	component: Detail
}];