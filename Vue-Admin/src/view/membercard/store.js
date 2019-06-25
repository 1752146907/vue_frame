export default {
	state: {
		search: {
            memberCardId: '',
            memberCardName: '',
            memberCardType: '',
		    memberCardStatus: ''
		},
		pageIndex: 1,
		pageSize: 10
	},
	mutations: {
		memberCard (state, data) {
			state = Object.assign(state, data)
		}
	}
}
