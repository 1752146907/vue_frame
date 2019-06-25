export default {
	state: {
		search: {
		    goodsTagName: ''
		},
		pageIndex: 1,
		pageSize: 10
	},
	mutations: {
		goodsTag (state, data) {
			state = Object.assign(state, data)
		}
	}
}
