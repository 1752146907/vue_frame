export default {
	state: {
		search: {
		    goodsGroupName: ''
		},
		pageIndex: 1,
		pageSize: 10
	},
	mutations: {
		goodsGroup (state, data) {
			state = Object.assign(state, data)
		}
	}
}
