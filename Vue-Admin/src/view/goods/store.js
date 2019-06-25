export default {
	state: {
		search: {
            goodsCategoryId: '',
            goodsName: '',
            goodsCode: '',
            goodsStatus: ''
		},
		pageIndex: 1,
		pageSize: 10
	},
	mutations: {
		goods (state, data) {
			state = Object.assign(state, data)
		}
	}
}
