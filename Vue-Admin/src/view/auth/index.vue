<template>
	<div></div>
</template>

<script>
	import mixins from '../../common/mixin';

	export default {
		components: {

		},
		mixins: [mixins],
		data: () => ({
			isLoad: false,
			url: ''
		}),
		mounted () {
			this.$notification.emit('main_header_hidden', {});
			this.$notification.emit('main_left_hidden', {});

			window.addEventListener('message', (event) => {
				if (event.data && event.data.action) {
					if (event.data.action == 'handleToken') {
						this.$storage.setToken(event.data.token);
						this.$storage.setProductId(event.data.productId);

						window.parent.postMessage({
							action: 'handleTokenCallback'
						}, "*");
					}
				}
			}, false);
		},
		beforeDestroy () {
			this.$notification.emit('main_header_show', {});
			this.$notification.emit('main_left_show', {});
		},
		methods: {

		}
	}
</script>
