<template>
	<div>
		<div class="header-top">
			<img class="header-top-author" src="./image/author.jpeg" />
			<div class='header-top-author-name'>小钟</div>
			<div class='header-top-author-school'>广东工商职业学院</div>
		</div>

		<van-cell-group>
			<van-cell title="优惠券"
					  icon="points"
					  @click="handleCoupon"/>
			<van-cell title="健康档案"
					  icon="idcard"
					  @click="handleArchives"
					  is-link />
			<van-cell title="关注列表"
					  icon="like-o"
					  url="/my/follow"
					  is-link />
			<van-cell title="设置与帮助"
					  icon="edit"
					  @click="handleSetUp"/>
		</van-cell-group>

		<Footer :active="2" />
	</div>
</template>

<style src="./index.css" scoped></style>

<script>
    import { Toast } from 'vant';

	import mixins from '../../common/mixin';
    import Footer from '../../component/footer';

	export default {
		components: {
            Toast,
            Footer
		},
		mixins: [mixins],
		data: () => ({

		}),
		created () {
		},
		methods: {
            handleArchives: function() {
                this.$router.push({
                    path: '/archives/index',
                    query: {}
                });
			},
            handleCoupon: function() {
                Toast('暂无优惠活动');
			},
            handleSetUp: function() {
                Toast('功能内测中，敬请期待');
            }
		}
	}
</script>
