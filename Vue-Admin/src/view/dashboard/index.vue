<template>
	<div>
		概况空白页
	</div>
</template>

<style src="./index.css" scoped></style>

<script>
	import {Button, Input} from 'iview';

	import mixin from '../../common/mixin';

	export default {
		components: {
			'Button': Button,
			'Input': Input,
		},
		mixins: [mixin],
		data: () => ({
			isLoad: false
		}),
		mounted () {
		},
		methods: {
			handleLoad: function () {
				this.isLoad = true;
				this.request({
					url: '/chuangshi/image/captcha/admin/v1/get',
					data: {},
					success: (response) => {
						this.codeImage = response.data.imageBase64;
						this.captchaToken = response.data.captchaToken
					},
					error: (response) => {

						this.$Message.error(response.message);
					},
					complete: () => {
						this.isLoad = false;
					}
				});
			}
		}
	}
</script>
