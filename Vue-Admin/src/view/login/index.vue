<template>
	<div class="body">
		<div class="window">
			<a-spin :spinning="isLoad">
				<a-icon class="indicator"
						slot="indicator"
						type="loading"
						spin/>
				<div class="mask"></div>
				<div class="window-main">
					<h1 class="content-label-title">Vue总控平台</h1>


					<Row>
						<Col span="4" offset="10">
							<Button type="info"
									@click="handleLoginSubmit">登录</Button>
						</Col>
					</Row>
				</div>
			</a-spin>
		</div>
	</div>
</template>

<style src="./index.css" scoped></style>

<script>
	import mixin from '../../common/mixin';

	export default {
		components: {},
		mixins: [mixin],
		data: () => ({
			isLoad: false
		}),
		beforeCreate () {
			this.loginForm = this.$form.createForm(this);
			this.registerForm = this.$form.createForm(this);
		},
		mounted () {
			this.$notification.emit('main_header_hidden', {});
			this.$notification.emit('main_left_hidden', {});

			// this.handleLoad();
		},
		beforeDestroy () {
			this.$notification.emit('main_header_show', {});
			this.$notification.emit('main_left_show', {});
		},
		methods: {
			handleGetCode: function () {
				this.handleLoad();
			},
			handleLoad: function () {
				if (this.isLoad) {
					return;
				}

				this.isLoad = true;

				this.$util.request({
					url: '/code/developer/admin/v1/image/captcha',
					data: {},
					success: (response) => {
						this.codeImage = response.data.imageBase64;
						this.captchaToken = response.data.captchaToken
					},
					error: (response) => {

						this.$message.error(response.message);
					},
					complete: () => {
						this.isLoad = false;
					}
				});
			},
			handleLoginSubmit: function (event) {

				event.preventDefault();

				if (this.isLoad) {
					return;
				}

				this.loginForm.validateFields((error, data) => {
					if (!error) {
						this.isLoad = true;

						this.$util.request({
							url: '/partner.php?action=login',
							data: data,
							success: (response) => {
								this.$storage.setToken(response.data.token);

								this.$message.success('登录成功');

								setTimeout(() => {
									this.$router.push({path: this.application.homePath});
								}, 500);
							},
							error: (response) => {
								// this.developer.captcha = "";
								// this.handleLoad();
								this.$message.error(response.message);
							},
							complete: () => {
								this.isLoad = false;
							}
						});
					}
				})
			}
		}
	}
</script>
