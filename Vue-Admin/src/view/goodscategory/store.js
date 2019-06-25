export default {
	state: {
		search: {
		    goodsCategoryName: ''
		},
		pageIndex: 1,
		pageSize: 10
	},
	mutations: {
		goodsCategory (state, data) {
			state = Object.assign(state, data)
		}
	}
}
