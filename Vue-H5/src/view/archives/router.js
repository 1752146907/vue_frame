
import Index from '../archives/index';
import Add from '../archives/add';
import Modify from '../archives/modify';
import Simple from '../archives/simple';

export default [{
    path: '/archives/index',
    component: Index
}, {
    path: '/archives/add',
    component: Add
}, {
    path: '/archives/modify',
    component: Modify
}, {
    path: '/archives/simple',
    component: Simple
}];