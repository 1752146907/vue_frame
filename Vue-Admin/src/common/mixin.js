import reqwest from 'reqwest';
import application from './application';

export default {
	data () {
		return {
			application: application
		}
	},
	created () {

	},
	methods: {
		request (config) {
			if (!config.data.appId) {
				config.data.appId = application.appId;
			}
			config.data.token = this.$storage.getToken();
			config.data.platform = application.platform;
			config.data.version = application.version;
			config.data.timestamp = Math.round(new Date().getTime() / 1000);

			config.data.sign = '';

			if (!config.url.startsWith('http')) {
				config.url = application.host + config.url;
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
					config.error({
						message: '网络出现问题，请稍后再尝试！'
					});
				},
				complete: () => {
					config.complete();
				}
			});
		},
		handleActiveMenu: function (url) {
			this.$notification.emit('main_menu_active', {
				url: url
			});
		},
		handleBack: function () {
			this.$router.back(-1);
		}
	}
}