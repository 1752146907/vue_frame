import reqwest from 'reqwest';

export default {
	data () {
		return {
			host: 'http://10.31.25.157:8088',
			imageHost: 'http://localhost:8088',
			appId: '1003604205986484225',
			version: '1.0.0',
			platform: 'Admin'
		}
	},
	created () {

	},
	methods: {
		request (config) {
			config.data.appId = this.appId;
			config.data.token = '';
			config.data.platform = this.platform;
			config.data.version = this.version;
			config.data.timestamp = Math.round(new Date().getTime() / 1000);

			config.data.sign = '';

			if (!config.url.startsWith('http')) {
				config.url = this.host + config.url;
			}

			reqwest({
				url: config.url,
				type: 'json',
				method: 'POST',
				crossOrigin: true,
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				data: JSON.stringify(config.data),
				success: (response) => {
					if (response.code === 200) {
						config.success(response);
					} else {
						config.error(response);
					}
				},
				error: () => {
					this.$Message.error('网络出现问题，请稍后再尝试！');
				},
				complete: () => {
					config.complete();
				}
			});
		},
		handleBack: function () {
			this.$router.back(-1);
		}
	}
}
