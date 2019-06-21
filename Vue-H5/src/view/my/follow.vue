<template>
	<div class="follow">
		<div class="no-data">
			<img src="../../image/empty.svg" class="no-data-image-icon"/>
			<div class="no-data-text">当前没有数据</div>
		</div>
		<!--<div class="follow-item" @click="handleDetail">-->
			<!--<img src="./image/author.jpeg" class="follow-item-author" alt="" />-->
			<!--<div class="follow-item-content">-->
				<!--<div class="follow-item-content-title text-truncate">-->
					<!--Mr.Li-->
					<!--<span class="follow-item-content-tab">妙手回春</span>-->
				<!--</div>-->
				<!--<div class="follow-item-content-text text-truncate">月光吧，闪爆他们。</div>-->
			<!--</div>-->
		<!--</div>-->
		<!--<div class="follow-item" @click="handleDetail">-->
			<!--<img src="./image/author.jpeg" class="follow-item-author" alt="" />-->
			<!--<div class="follow-item-content">-->
				<!--<div class="follow-item-content-title text-truncate">-->
					<!--Mr.Li-->
					<!--<span class="follow-item-content-tab">妙手回春</span>-->
				<!--</div>-->
				<!--<div class="follow-item-content-text text-truncate">喜欢的依然喜欢，只是学会了隐藏。不喜欢的依然不喜欢，只是学会了面对。</div>-->
			<!--</div>-->
		<!--</div>-->
	</div>
</template>

<style src="./follow.css" scoped></style>

<script>

	import mixins from '../../common/mixin';

	export default {
		components: {

		},
		mixins: [mixins],
		data: () => ({

		}),
		created () {

		},
		methods: {
			handleDetail: function() {
				this.$router.push({
					path: '/my/detail',
					query: {}
				});
			}
		}
	}
</script>
