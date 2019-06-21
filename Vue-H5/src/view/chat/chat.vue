<template>
	<div>
		<router-link  to="/">
			<div class="doctor-item">
				<img class="chat-item-author-image"
					 src="http://img5.imgtn.bdimg.com/it/u=745294792,745980739&fm=26&gp=0.jpg" />
				<div class="doctor-item-name text-truncate">
					<span>赵云</span>
					<span class="doctor-item-name-category">长坂坡之战</span>
				</div>
				<div class="doctor-item-name-category-state">
					<span class="category-state">状态：待评价</span>
					<span class="category-state">0.01元/次</span>
				</div>
			</div>
		</router-link>
		<div class="main">
			<div class='chat'>
				<div class='chat-item'>
					<span class='chat-item-time'>2018/11/12 18:08</span>
					<!-- 他人 -->
					<div class='chat-item-body'>
						<div class='chat-item-body-author'>
							<router-link to="/my/detail">
								<img class="chat-item-body-author-image"
									   src="../my/image/author.jpeg" />
							</router-link>
						</div>
						<div class='chat-item-body-content'>
							<span class='chat-item-body-content-text'
								  selectable="true">来来来 说出你的故事</span>
							<div class='chat-item-body-text-arrow'></div>
						</div>
						<div class='chat-item-body-null'></div>
					</div>
					<div class='chat-item-body'>
						<div class='chat-item-body-author'>
							<router-link to="/my/detail">
								<img class="chat-item-body-author-image"
									 src="../my/image/author.jpeg" />
							</router-link>
						</div>
						<div class='chat-item-body-content'>
							<div class='chat-transverse'>
								<img class='chat-transverse-image'
									 @click="handleImgpPreview"
									 src="../my/image/author.jpeg"
									 style='float:left' />
							</div>
							<div class='chat-item-body-text-arrow'></div>
						</div>
						<div class='chat-item-body-null'></div>
					</div>
					<!-- 自己 -->
					<div class='chat-item-body-slef' v-for="item in 10" :key="item">
						<div class='chat-item-body-slef-null'></div>
						<div class='chat-item-body-slef-content'>
							<span class='chat-item-body-slef-content-text'
								  selectable="true">喜欢的依然喜欢，只是学会了隐藏。不喜欢的依然不喜欢，只是学会了面对。</span>
							<div class='chat-item-body-slef-text-arrow'></div>
						</div>
						<div class='chat-item-body-slef-author'>
							<router-link to="/">
								<img class="chat-item-body-author-slef-image"
									   src="../my/image/author.jpeg" />
							</router-link>
						</div>
					</div>
					<div class='chat-item-body-slef'>
						<div class='chat-item-body-slef-null'></div>
						<div class='chat-item-body-slef-content'>
							<div class='chat-transverse'>
								<img class='chat-transverse-image'
									 mode="aspectFit"
									 @click="handleImgpPreview"
									 src="../my/image/author.jpeg" />
							</div>
							<div class='chat-item-body-slef-text-arrow'></div>
						</div>
						<div class='chat-item-body-slef-author'>
							<router-link to="/">
								<img class="chat-item-body-author-slef-image"
									 src="../my/image/author.jpeg" />
							</router-link>
						</div>
					</div>
				</div>
				<div class='evaluate'
					 @click="handleEnd">
					<div class='evaluate-title'>结束对话</div>
					<div class='evaluate-body'>
						咨询完毕，停止当前对话！
					</div>
				</div>
				<br>
				<div class='evaluate'
					 @click="handleEvaluate">
					<div class='evaluate-title'>待评价</div>
					<div class='evaluate-body'>
						对话已结束，待用户评价！
					</div>
				</div>
			</div>
			<div class="fixed">
				<div class='sending'>
					<input class='sending-input'
						   placeholder="输入对话"
						   maxlength='4000' />
					<span class='sending-buttom'>发送</span>
				</div>
				<div class="tool-cell">
					<div class="tool-cell-item"
						 @click="handleProduct">
						<img class="tool-cell-img"
							   src="../../image/file-icon.png" />
					</div>
					<div class="tool-cell-item">
						<van-uploader accept="image"
									  :after-read="handleUploader">
							<img class="tool-cell-img"
								 src="../my/image/picture-icon.png" />
						</van-uploader>
					</div>
					<div class="tool-cell-item"
						 @click="handleMoney">
						<img class="tool-cell-img"
							 src="../../image/money-love-icon.png" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style src="./chat.css" scoped></style>

<script>
    import { Dialog } from 'vant';
    import { ImagePreview } from 'vant';
    import { Uploader } from 'vant';
    import { Toast } from 'vant';

	import mixins from '../../common/mixin';

	export default {
		components: {
            Dialog,
            ImagePreview,
            Uploader,
            Toast
		},
		mixins: [mixins],
		data: () => ({
            active: 1
		}),
		created () {

		},
		methods: {
            handleEnd: function () {
                Dialog.confirm({
                    title: '确认结束',
                    message: '该操作不可逆，您确定要结束当前对话吗？',
                    confirmButtonText: '我已确认',
                    cancelButtonText: '再想想',
                    closeOnClickOverlay: true,
                    className: 'dialog-confirm'
                }).then(() => {
                    // on confirm
                }).catch(() => {
                    // on cancel
                });
            },

            handleMoney: function () {
				this.$router.push({
					path: '/encourage/index',
					query: {}
				});
			},
            handleEvaluate: function () {
                this.$router.push({
                    path: '/my/evaluate',
                    query: {}
                });
			},
            handleProduct: function () {
                this.$router.push({
                    path: '/product/index',
                    query: {}
                });
			},
            handleImgpPreview: function () {
                ImagePreview([
                    'https://img.yzcdn.cn/2.jpg'
                ]);
            },
            handleUploader: function (e) {
                Toast.loading({
                    mask: true,
                    duration: 1000,
                    message: '正在上传...'
                });
				console.log(e)
            }
		}
	}
</script>
