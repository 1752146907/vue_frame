export default {
	state: {
		search: {
            memberId: '',
            merchantId: '',
            memberMobile: '',
            memberNickName: '',
		    memberFrom: ''
		},
		pageIndex: 1,
		pageSize: 10
	},
	mutations: {
		member (state, data) {
			state = Object.assign(state, data)
		}
	}
}
