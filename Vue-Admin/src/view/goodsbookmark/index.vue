<template>
	<div>
		<div class="header">
			<Row type="flex"
				 align="middle">
				<Col :xs="24"
					 :sm="12"
					 :md="12"
					 :lg="12">
					<div class="breadcrumb">
						<Breadcrumb>
							<BreadcrumbItem>首页</BreadcrumbItem>
							<BreadcrumbItem>商品收藏</BreadcrumbItem>
						</Breadcrumb>
					</div>
					<div class="title">
						商品收藏
					</div>
				</Col>
				<Col :xs="24"
					 :sm="12"
					 :md="12"
					 :lg="12"
					 class="action">
					<Button class="action-margin"
							custom-icon="iconfont icon-search"
							size="large"
							:loading="isLoad"
							@click="handleSearch">
						查询
					</Button>
					<Button class="action-margin"
							custom-icon="iconfont icon-delete"
							size="large"
							:loading="isLoad"
							@click="handleConfirm">
						删除
					</Button>
					<Button type="primary"
							custom-icon="iconfont icon-plus-circle"
							size="large"
							@click="handleAdd">
						新增
					</Button>
				</Col>
			</Row>
		</div>
		<div class="main">
			<div class="content">
				<Spin fix
					  v-if="isLoad"
					  size="large"/>
				<div class="tab">
					<div class="tab-title">
						搜索条件
					</div>
					<Form ref="form"
						  :model="search"
						  class="tab-form"
						  :label-width="100"
						  @keydown.native.enter.prevent="handleSearch">
						<Row class="tab-form-row"
							 type="flex"
							 align="middle">

                            <Col :xs="24"
                                                             :sm="12"
                                                             :md="8"
                                                             :lg="8">
                                <FormItem label="商品编号"
                                          prop="goodsId"
                                          :rules="[]">
                                    <Input v-model="search.goodsId"
                                           type="text"
                                           placeholder=""/>
                                </FormItem>
                            </Col>
                            <Col :xs="24"
                                                             :sm="12"
                                                             :md="8"
                                                             :lg="8">
                                <FormItem label="会员编号"
                                          prop="memberId"
                                          :rules="[]">
                                    <Input v-model="search.memberId"
                                           type="text"
                                           placeholder=""/>
                                </FormItem>
                            </Col>
						</Row>
					</Form>
				</div>
				<div class="tab tab-margin-top">
					<div class="tab-title">
						数据列表
					</div>
					<div class="tab-table">
						<Table ref="table"
							   size="large"
							   :columns="[{
								type: 'selection',
								width: 60,
								align: 'center'
							},
							{
								key: 'goodsId',
								title: '商品编号'
							},
							{
								key: 'memberId',
								title: '会员编号'
							},
							{
								key: 'action',
								title: '操作',
								width: 150,
								align: 'center',
								render: (h, params) => {
									return h('div', [
										h('Button', {
											props: {
												size: 'default'
											},
											on: {
												click: () => {
													this.handleEdit(params.row.goodsBookmarkId);
												}
											}
										}, '修改')
									]);
								}
							}]"
							   :data="list"
							   :border="true"
							   @on-selection-change="handleSelectionChange"></Table>
						<div class="tab-table-page">
							<Page show-total
								  show-sizer
								  :current="pageIndex"
								  :page-size="pageSize"
								  :total="total"
								  @on-change="handleChangePageIndex"
								  @on-page-size-change="handleChangePageSize"/>
						</div>
					</div>
				</div>
			</div>
		</div>
		<Modal v-model="isDelete" width="360">
			<p slot="header"
			   class="delete-title">
				<span>删除确认</span>
			</p>
			<div class="delete-content">
				<p>本次数据删除后将无法恢复。</p>
				<p>是否继续删除？</p>
			</div>
			<div slot="footer">
				<Button type="error"
						size="large"
						long
						@click="handleDelete">
					删除
				</Button>
			</div>
		</Modal>
	</div>
</template>

<style src="./index.css" scoped></style>

<script>
	import {Row, Col, Breadcrumb, BreadcrumbItem, Button, Form, FormItem, Input, Table, Page} from 'iview';

	import mixins from '../../common/mixin';

	export default {
		components: {
			'Row': Row,
			'Col': Col,
			'Breadcrumb': Breadcrumb,
			'BreadcrumbItem': BreadcrumbItem,
			'Button': Button,
			'Form': Form,
			'FormItem': FormItem,
			'Input': Input,
			'Table': Table,
			'Page': Page
		},
		mixins: [mixins],
		data: () => ({
			isLoad: false,
			isDelete: false,
			search: {},
			pageIndex: 0,
			pageSize: 0,
			total: 0,
			list: [],
			goodsBookmarkIdList: []
		}),
		mounted () {
			this.search = this.$store.state.goodsBookmark.search;
			this.pageIndex = this.$store.state.goodsBookmark.pageIndex;
			this.pageSize = this.$store.state.goodsBookmark.pageSize;

			this.handleLoad();
		},
		methods: {
			handleLoad: function () {
				this.isLoad = true;

				var data = this.$store.state.goodsBookmark.search;
				data = Object.assign(data, {
					pageIndex: this.$store.state.goodsBookmark.pageIndex,
					pageSize: this.$store.state.goodsBookmark.pageSize
				});

				this.request({
					url: '/ec/goods/bookmark/admin/v1/list',
					data: data,
					success: (response) => {
						this.total = response.data.total;
						this.list = response.data.list;
					},
					error: (response) => {
						this.$Message.error(response.message);
					},
					complete: () => {
						this.isLoad = false;
					}
				});
			},
			handleSearch: function () {
				this.$store.commit('goodsBookmark', {
					search: this.search,
					pageIndex: 1
				});

				this.$refs.form.validate((valid) => {
					if (valid) {
						this.handleLoad();
					}
				});
			},
			handleAdd: function () {
				this.$router.push({
					path: '/goods/bookmark/add',
					query: {}
				});
			},
			handleEdit: function (goodsBookmarkId) {
				this.$router.push({
					path: '/ec/goods/bookmark/edit/' + goodsBookmarkId,
					query: {}
				});
			},
			handleDelete: function () {
				this.isLoad = true;
				this.isDelete = false;

				this.request({
					url: '/ec/goods/bookmark/admin/v1/delete',
					data: {
						goodsBookmarkIdList: this.goodsBookmarkIdList
					},
					success: (response) => {
						this.$refs.table.selectAll(false);

						this.handleLoad();
					},
					error: (response) => {
						this.isLoad = false;

						this.$Message.error(response.message);
					},
					complete: () => {

					}
				});
			},
			handleConfirm: function () {
				if (this.goodsBookmarkIdList.length == 0) {
					this.$Message.warning('请选择数据');

					return;
				}

				this.isDelete = true;
			},
			handleSelectionChange: function (list) {
				var goodsBookmarkIdList = [];

				for (var item of list) {
					goodsBookmarkIdList.push(item.goodsBookmarkId);
				}

				this.goodsBookmarkIdList = goodsBookmarkIdList;
			},
			handleChangePageIndex: function (pageIndex) {
				this.$store.commit('goodsBookmark', {
					pageIndex: pageIndex
				});

				this.handleLoad();
			},
			handleChangePageSize: function (pageSize) {
				this.$store.commit('goodsBookmark', {
					pageSize: pageSize
				});

				this.handleLoad();
			}
		}
	}
</script>
