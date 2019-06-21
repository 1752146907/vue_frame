<template>
	<div class="archives">
		<!--<div class="no-data">-->
			<!--<img src="../../image/empty.svg" class="no-data-image-icon"/>-->
			<!--<div class="no-data-text">当前没有数据</div>-->
		<!--</div>-->
		<div class="archives-item"
			 @click="handleModify"
			 v-for="item in 20"
			 :key="item">
			<img src="../my/image/author.jpeg" class="archives-item-author" alt="" />
			<div class="archives-item-content">
				<div class="archives-item-content-title text-truncate">
					Mr.Li
				</div>
				<div class="archives-item-content-text text-truncate">自己</div>
			</div>
		</div>
		<div class="archives-footer"
			 @click="handleAdd">新增</div>
	</div>
</template>

<style src="./index.css" scoped></style>

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
			handleModify: function() {
				this.$router.push({
					path: '/archives/modify',
					query: {}
				});
			},
            handleAdd: function() {
                this.$router.push({
                    path: '/archives/add',
                    query: {}
                });
            }
		}
	}
</script>
