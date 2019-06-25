export default {
	state: {
		search: {
		    goodsAttributeLibraryName: ''
		},
		pageIndex: 1,
		pageSize: 10
	},
	mutations: {
		goodsAttributeLibrary (state, data) {
			state = Object.assign(state, data)
		}
	}
}
