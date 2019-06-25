<template>
	<div class="body">
		<div class="header"
			 v-if="isHeader">
			<div class="logo">
				<img :src="require('../../image/logo.png')"
					 alt=""/>
			</div>
			<div class="title">
				Vue后台系统
			</div>
			<div class="product"></div>
			<div class="user">
				<img class="user-author" :src="application.imageHost + user.memberAvatarPath" alt="">
				<span class="user-name">{{user.merchantName}}</span>
			</div>
			<div class="logout"
				 @click="handleExit">
				<Icon custom="iconfont icon-poweroff"
					  size="22"
					  color="#ffffff"/>
			</div>
		</div>
		<div :class="isHeader ? 'main main-top' : 'main'">
			<div class="left" v-if="isLeft">
				<div :class="menu.active ? 'menu menu-active' : 'menu'"
					 v-for="(menu, index) in menuList"
					 :key="index"
					 @click="handleMenu(index, true)">
					<Icon :custom="'iconfont ' + menu.icon"
						  size="22"
						  :color="menu.active ? '#000000' : '#ffffff'"/>
					<span :class="menu.active ? 'menu-title-acitve' : 'menu-title'">{{menu.name}}</span>
				</div>
			</div>
			<div class="sideBar"
				 v-if="subMenuList.length > 0">
				<Menu ref="menu"
					  width="130"
					  theme="light"
					  :active-name="subMenuIndex">
					<MenuItem :name="index"
							  :to="subMenu.url"
							  v-for="(subMenu, index) in subMenuList"
							  :key="index">
						<Icon :custom="'iconfont ' + subMenu.icon"/>
						{{subMenu.name}}
					</MenuItem>
				</Menu>
			</div>
			<div :class="subMenuList.length > 0 ? 'right right-width-active' : (isLeft ? 'right right-width' : 'right')">
				<router-view/>
			</div>
		</div>
		<Modal v-model="isExit"
			   title="退出提示"
			   @on-ok="handleExitOk"
			   @on-cancel="isExit = false">
			<p>您确定要退出登录吗？</p>
		</Modal>
	</div>
</template>

<style src="./index.css" scoped></style>

<script>
	import {Icon, Menu, MenuItem} from 'iview';
	import mixin from '../../common/mixin';

	export default {
		components: {
			'Icon': Icon,
			'Menu': Menu,
			'MenuItem': MenuItem
		},
		mixins: [mixin],
		data: () => ({
			isLoad: false,
			isExit: false,
			isHeader: true,
			isLeft: true,
			menuList: [{
				name: '概况',
				icon: 'icon-filedone',
				active: false,
				url: '/dashboard/index',
				children: [{
					name: '基本概况',
					icon: 'icon-database',
					active: false,
					url: '/dashboard/index'
				}]
			}, {
				name: '订单',
				icon: 'icon-filedone',
				active: false,
				children: [{
					name: '所有订单',
					icon: 'icon-database',
					active: false,
					url: '/goods/order/index'
				}]
			}, {
				name: '网店',
				icon: 'icon-team',
				active: false,
				url: '/goods/index',
				children: [{
					name: '商品管理',
					icon: 'icon-database',
					active: false,
					url: '/goods/index'
				}, {
					name: '商品分组',
					icon: 'icon-database',
					active: false,
					url: '/goods/group/index'
				}, {
					name: '商品分类',
					icon: 'icon-database',
					active: false,
					url: '/goods/category/index'
				}]
			}, {
				name: '会员',
				icon: 'icon-team',
				active: false,
				url: '/member/index',
				children: [{
					name: '会员列表',
					icon: 'icon-database',
					active: false,
					url: '/member/index'
				}, {
					name: '会员等级',
					icon: 'icon-database',
					active: false,
					url: '/member/add'
				}]
			}, {
				name: '营销',
				icon: 'icon-appstore',
				active: false,
				url: '',
				children: [{
					name: '优惠券',
					icon: 'icon-database',
					active: false,
					url: ''
				}]
			}, {
				name: '设置',
				icon: 'icon-setting',
				active: false,
				url: '/shop/edit',
				children: [{
					name: '总部设置',
					icon: 'icon-database',
					active: false,
					url: '/shop/edit'
				}]
			}],
			subMenuIndex: 0,
			subMenuList: [],
			user: {}
		}),
		created () {
			this.$notification.on('main_header_show', this, function () {
				this.isHeader = true;
			});
			this.$notification.on('main_header_hidden', this, function () {
				this.isHeader = false;
			});
			this.$notification.on('main_left_show', this, function () {
				this.isLeft = true;
			});
			this.$notification.on('main_left_hidden', this, function () {
				this.isLeft = false;

				this.subMenuList = [];
			});
			this.$notification.on('main_menu_active', this, function (data) {
				var index = -1;

				for (var i = 0; i < this.menuList.length; i++) {
					var menu = this.menuList[i];

					for (var j = 0; j < menu.children.length; j++) {
						var children = menu.children[j];
						if (data.url == children.url) {
							index = i;
							this.subMenuIndex = j;

							this.$nextTick(() => {
								this.$refs.menu.updateActiveName();
							});

							break;
						}
					}
				}

				this.handleMenu(index, false);
			});

			this.user = this.$storage.getUser()
		},
		methods: {
			handleExit: function () {
				this.isExit = true;
			},
			handleExitOk: function () {
				this.$router.push({path: this.application.loginPath});

				this.$storage.removeToken();
			},
			handleMenu: function (index, isPush) {
				if (index < 0) {
					this.subMenuList = [];
				}
				for (var i = 0; i < this.menuList.length; i++) {
					if (i == index) {
						this.menuList[i].active = true;

						if (typeof (this.menuList[i].children) === 'undefined') {
							this.subMenuList = [];
						} else {
							this.subMenuList = this.menuList[i].children;

							if (this.subMenuList.length > 0 && this.$router.history.current.path != this.menuList[i].url && isPush) {
								this.$router.push({path: this.subMenuList[0].url});
							}
						}
					} else {
						this.menuList[i].active = false;
					}
				}
			}
		}
	}
</script>