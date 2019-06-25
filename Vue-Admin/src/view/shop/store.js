export default {
	state: {
		search: {
		    shopName: ''
		},
		pageIndex: 1,
		pageSize: 10
	},
	mutations: {
		shop (state, data) {
			state = Object.assign(state, data)
		}
	}
}
