export default {
	state: {
		search: {
			tradeId: '',
			tradeStatus: ''
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
