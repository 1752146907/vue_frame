<template>
	<div>
		<div class="header-cell">
			<div class="user-data">
				<van-row>
					<van-col span="4">
						<img class="avatar-img" src="../my/image/author.jpeg" />
					</van-col>
					<van-col span="20">
						<div class="user-data-content">
							<div class="user-name-box">
								<div class="user-name">西楚霸王-项羽</div>
							</div>
							<div class="user-department">学历：官二代</div>
							<div class="user-department">职务：大将军</div>
							<div class="user-label">
								<div class="label">力气大</div>
								<div class="label">长得帅</div>
								<div class="label">成绩突出</div>
								<div class="label">打仗一流</div>
								<div class="label">大元帅</div>
								<div class="label">官二代</div>
							</div>
						</div>
					</van-col>
				</van-row>
			</div>
			<div class="consult-situation">
				<div class="consult-count-item">
					<div class="consult-count">22</div>次
					<div class="consult-count-text">咨询人数</div>
				</div>
				<div class="consult-count-item">
					<div class="consult-count">100</div>%
					<div class="consult-count-text">好评率</div>
				</div>
				<div class="consult-count-item">
					<div class="consult-count">2323</div>分
					<div class="consult-count-text">同行认可</div>
				</div>
			</div>
		</div>
		<div class="body-content">
			<div class="hot-consult">
				<div class="hot-consult-title">
					<div class="hot-consult-title-text">热度咨询</div>
				</div>
				<div class="hot-consult-label">
					<div class="hot-consult-label-box">爱马乌骓</div>
					<div class="hot-consult-label-box">团灭</div>
					<div class="hot-consult-label-box">美人虞姬</div>
					<div class="hot-consult-label-box">坦克王</div>
					<div class="hot-consult-label-box">战士</div>
					<div class="hot-consult-label-box">西楚</div>
					<div class="hot-consult-label-box">乌江</div>
				</div>
			</div>
			<div class="pay-list">
				<div class="pay-list-item" >
					<div class="pay-list-item-name">138****8000</div>
					<img class="pay-list-item-img" src="../my/image/author.jpeg" />
					<div class="pay-list-item-price">2323元</div>
					<div class="pay-time">2018/10/21</div>
				</div>
				<div class="pay-list-item" >
					<div class="pay-list-item-name">138****8000138****8000</div>
					<img class="pay-list-item-img" src="../my/image/author.jpeg" />
					<div class="pay-list-item-price">2323元</div>
					<div class="pay-time">2018/10/21</div>
				</div>
				<div class="pay-list-item" >
					<div class="pay-list-item-name">138****8000</div>
					<img class="pay-list-item-img" src="../my/image/author.jpeg" />
					<div class="pay-list-item-price">2323元</div>
					<div class="pay-time">2018/10/21</div>
				</div>
			</div>
			<div class="hospital">
				<div class="hospital-title">执业医院</div>
				<div class="hospital-title-name">楚国</div>
			</div>
			<div class="hospital">
				<div class="hospital-title">医生擅长</div>
				<div class="hospital-title-name">打架</div>
			</div>
			<div class="hospital">
				<div class="hospital-title">医生寄语</div>
				<div class="hospital-title-name">天不容我，我必逆天</div>
			</div>
			<div class="message">
				<div class="message-title">学术研究成果、获奖介绍</div>
				<div class="message-text">你猜啊哈哈</div>
			</div>
		</div>
		<div class="body-footer">
			<div class="body-footer-item body-footer-item-acitve">
				<img class="body-footer-item-img" src="./image/love-active.png" alt="">
				送心意
			</div>
			<div class="body-footer-item">
				<img class="body-footer-item-img" src="./image/follow.png" alt="">
				关注
			</div>
			<div class="body-footer-item-sublime">
				图文咨询（￥0.01元/次）
			</div>
		</div>
		<!--<van-goods-action>-->
			<!--<van-goods-action-mini-btn icon="like-o" text="送心意" @click="onClickMiniBtn" />-->
			<!--<van-goods-action-mini-btn icon="like-o" icon-class="icon-active" text="送心意" @click="onClickMiniBtn" />-->
			<!--<van-goods-action-big-btn text="图文咨询（￥0.01元/次）" @click="onClickBigBtn" primary />-->
		<!--</van-goods-action>-->
	</div>
</template>

<style src="./detail.css" scoped></style>

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

        }
    }
</script>
