export default {
	state: {
		search: {
            goodsId: '',
		    memberId: ''
		},
		pageIndex: 1,
		pageSize: 10
	},
	mutations: {
		goodsBookmark (state, data) {
			state = Object.assign(state, data)
		}
	}
}
