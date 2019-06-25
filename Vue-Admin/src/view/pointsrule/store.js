export default {
	state: {
		search: {
		    pointsCustomRuleId: ''
		},
		pageIndex: 1,
		pageSize: 10
	},
	mutations: {
		pointsCustomRule (state, data) {
			state = Object.assign(state, data)
		}
	}
}
