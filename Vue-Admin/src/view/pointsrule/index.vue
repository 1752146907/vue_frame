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
							<BreadcrumbItem>会员管理</BreadcrumbItem>
							<BreadcrumbItem>积分规则</BreadcrumbItem>
						</Breadcrumb>
					</div>
					<div class="title">
						积分规则
					</div>
				</Col>
			</Row>
		</div>
		<div class="main">
			<div class="content">
				<Spin fix
					  v-if="isLoad"
					  size="large"/>
				<div class="tab">
					<div class="tab-card">
						<Row type="flex"
							 align="middle">
							<Col :xs="24"
								 :sm="12"
								 :md="6"
								 :lg="6" align="middle">可使用积分<br/>0</Col>
							<Col :xs="24"
								 :sm="12"
								 :md="6"
								 :lg="6" align="middle">保护期内积分<br/>0</Col>
							<Col :xs="24"
								 :sm="12"
								 :md="6"
								 :lg="6" align="middle">累计发放积分<br/>0</Col>
							<Col :xs="24"
								 :sm="12"
								 :md="6"
								 :lg="6" align="middle">累计消耗积分<br/>0</Col>
						</Row>
					</div>
				</div>
				<div class="tab tab-margin-top">
					<div class="tab-title">
						积分通用规则
					</div>
					<div class="tab-form">
						<Row type="flex"
							 align="middle">
							<Col :xs="24"
								 :sm="24"
								 :md="24"
								 :lg="24" >
								<Button type="primary"
										size="large"
										@click="handleAdd">
									设置通用规则
								</Button>
								<!--<Modal-->
									<!--v-model="isSetCommonRule"-->
									<!--title="设置通用规则"-->
									<!--@on-ok="handleSetCommonRule"-->
									<!--@on-cancel="handleSetCommonRulenCancel">-->
								<!--<Form ref="commonRuleForm"-->
									  <!--:model="pointsCommonRule"-->
									  <!--class="tab-form"-->
									  <!--:label-width="100"-->
									  <!--@keydown.native.enter.prevent="handleSetCommonRule">-->
									<!--<Row class="tab-form-row"-->
										 <!--type="flex"-->
										 <!--align="middle">-->
										<!--<Col :xs="24"-->
											 <!--:sm="24"-->
											 <!--:md="24"-->
											 <!--:lg="24">-->
											<!--<FormItem label="通用有效期">-->
												<!--<Radio v-model="pointsCommonRule.pointsCommonRuleIsForeverActive">是否永久有效</Radio>-->
											<!--</FormItem>-->
										<!--</Col>-->
									<!--</Row>-->
									<!--<Row>-->
										<!--<Col :xs="24"-->
											 <!--:sm="24"-->
											 <!--:md="24"-->
											 <!--:lg="24">-->
										<!--<FormItem label="数据类型"-->
												  <!--prop="columnDatatype"-->
												  <!--:rules="[{-->
												<!--required: true,-->
												<!--message: '请选择数据类型'-->
											  <!--}]">-->
											<!--<Select v-model="codeColumnItem.columnDatatype">-->
												<!--<Option value="String">String</Option>-->
												<!--<Option value="Integer">Integer</Option>-->
												<!--<Option value="BigDecimal">BigDecimal</Option>-->
												<!--<Option value="Date">Date</Option>-->
												<!--<Option value="Boolean">Boolean</Option>-->
												<!--<Option value="List">List</Option>-->
											<!--</Select>-->

										<!--</FormItem>-->
										<!--</Col>-->
									<!--</Row>-->
									<!--<Row class="tab-form-row"-->
										 <!--type="flex"-->
										 <!--align="middle">-->
										<!--<Col :xs="24"-->
											 <!--:sm="24"-->
											 <!--:md="24"-->
											 <!--:lg="24">-->
										<!--<FormItem label="列长度"-->
												  <!--prop="columnLength"-->
												  <!--:rules="[{-->
												<!--required: true,-->
												<!--message: '请输入列长度'-->
											  <!--}]">-->
											<!--<Input v-model="codeColumnItem.columnLength"-->
												   <!--type="text"-->
												   <!--placeholder="请输入列长度"/>-->
										<!--</FormItem>-->
										<!--</Col>-->
									<!--</Row>-->
									<!--<Row>-->
										<!--<Col :xs="24"-->
											 <!--:sm="24"-->
											 <!--:md="24"-->
											 <!--:lg="24">-->
										<!--<FormItem label="输入框类型"-->
												  <!--prop="columnInputType"-->
												  <!--:rules="[{-->
													<!--required: true,-->
													<!--message: '请选择输入框类型'-->
												  <!--}]">-->
											<!--<Select v-model="codeColumnItem.columnInputType">-->
												<!--<Option value="text">text</Option>-->
												<!--<Option value="textarea">textarea</Option>-->
												<!--<Option value="number">number</Option>-->
												<!--<Option value="date">date</Option>-->
												<!--<Option value="select">select</Option>-->
												<!--<Option value="switch">switch</Option>-->
												<!--<Option value="radio">radio</Option>-->
												<!--<Option value="checkbox">checkbox</Option>-->
												<!--<Option value="image">image</Option>-->
												<!--<Option value="document">document</Option>-->
											<!--</Select>-->
										<!--</FormItem>-->
										<!--</Col>-->
									<!--</Row>-->
									<!--<Row class="tab-form-row"-->
										 <!--type="flex"-->
										 <!--align="middle">-->
										<!--<Col :xs="24"-->
											 <!--:sm="24"-->
											 <!--:md="24"-->
											 <!--:lg="24">-->
										<!--<FormItem label="列说明"-->
												  <!--prop="columnComment"-->
												  <!--:rules="[{-->
												<!--required: true,-->
												<!--message: '请输入列说明'-->
											  <!--}]">-->
											<!--<Input v-model="codeColumnItem.columnComment"-->
												   <!--type="text"-->
												   <!--placeholder="请输入列说明"/>-->
										<!--</FormItem>-->
										<!--</Col>-->
									<!--</Row>-->
									<!--<Row class="tab-form-row"-->
										 <!--type="flex"-->
										 <!--align="middle">-->
										<!--<Col :xs="24"-->
											 <!--:sm="24"-->
											 <!--:md="24"-->
											 <!--:lg="24">-->
										<!--<FormItem label="是否查询字段"-->
												  <!--prop="columnIsSearch">-->
											<!--<i-switch v-model="codeColumnItem.columnIsSearch"/>-->
										<!--</FormItem>-->
										<!--</Col>-->
									<!--</Row>-->
									<!--<Row class="tab-form-row"-->
										 <!--type="flex"-->
										 <!--align="middle">-->
										<!--<Col :xs="24"-->
											 <!--:sm="24"-->
											 <!--:md="24"-->
											 <!--:lg="24">-->
										<!--<FormItem label="是否必选字段"-->
												  <!--prop="columnIsRequired">-->
											<!--<i-switch v-model="codeColumnItem.columnIsRequired"/>-->
										<!--</FormItem>-->
										<!--</Col>-->
									<!--</Row>-->
									<!--<Row class="tab-form-row"-->
										 <!--type="flex"-->
										 <!--align="middle">-->
										<!--<Col :xs="24"-->
											 <!--:sm="24"-->
											 <!--:md="24"-->
											 <!--:lg="24">-->
										<!--<FormItem label="是否列表字段"-->
												  <!--prop="columnIsList">-->
											<!--<i-switch v-model="codeColumnItem.columnIsList"/>-->
										<!--</FormItem>-->
										<!--</Col>-->
									<!--</Row>-->
								<!--</Form>-->
							<!--</Modal>-->
							</Col>
							<Col :xs="24"
								 :sm="24"
								 :md="24"
								 :lg="24">
								<div class="tab tab-margin-top">
									<div class="tab-content">
										积分通用有效期：{{pointsCommonRule.pointsCommonRuleIsForeverActive ? '永久有效' : ''}}
									</div>
								</div>
							</Col>
						</Row>
					</div>
				</div>
				<div class="tab tab-margin-top">
					<div class="tab-title">
						积分自定义规则
					</div>
					<div class="tab-table">
						<Button type="primary"
								size="large"
								@click="handleAdd">
							新建积分规则
						</Button>
						<Table ref="table"
							   size="large"
							   :columns="[{
								type: 'selection',
								width: 60,
								align: 'center'
							},
							{
								key: 'pointsCustomRuleType',
								title: '奖励条件'
							},
							{
								key: 'pointsCustomRuleNumber',
								title: '单笔积分奖励数'
							},
							{
								key: 'systemUpdateTime',
								title: '规则更新时间'
							},
							{
								key: 'pointsCustomRuleCount',
								title: '已奖励总积分'
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
													this.handleEdit(params.row.pointsCustomRuleId);
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
	import {Row, Col, Breadcrumb, BreadcrumbItem, Button, Form, FormItem, Input, Table, Page, Card} from 'iview';

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
			'Page': Page,
			'Card': Card
		},
		mixins: [mixins],
		data: () => ({
			isLoad: false,
			isDelete: false,
            isSetCommonRule: false,
			pageIndex: 0,
			pageSize: 0,
			total: 0,
			list: [],
			pointsCustomRuleIdList: [],
            pointsCommonRule: {
                pointsCommonRuleIsForeverActive: true
			}
		}),
		mounted () {
			this.pageIndex = this.$store.state.pointsCustomRule.pageIndex;
			this.pageSize = this.$store.state.pointsCustomRule.pageSize;

			this.handleLoadCommonRule();
			this.handleLoad();
		},
		methods: {
		    handleLoadPointsCount: function () {
                this.request({
                    url: '/mail/cloud/points/rule/admin/v1/count',
                    data: {},
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
		    handleLoadCommonRule: function () {
                this.isLoad = true;
                this.request({
                    url: '/mail/cloud/points/common/rule/admin/v1/find',
                    data: {},
                    success: (response) => {
                        this.pointsCommonRule = response.data
                    },
                    error: (response) => {
                        this.$Message.error(response.message);
                    },
                    complete: () => {
                        this.isLoad = false;
                    }
                });
			},
			handleLoad: function () {
				this.isLoad = true;

				var data = {};
				data = Object.assign(data, {
					pageIndex: this.$store.state.pointsCustomRule.pageIndex,
					pageSize: this.$store.state.pointsCustomRule.pageSize
				});

				this.request({
					url: '/mail/cloud/points/custom/rule/admin/v1/list',
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
            handleSetCommonRule: function () {

			},
            handleSetCommonRulenCancel: function () {

			},
			handleAdd: function () {
				this.$router.push({
					path: '/mail/cloud/points/custom/rule/add',
					query: {}
				});
			},
			handleEdit: function (pointsCustomRuleId) {
				this.$router.push({
					path: '/mail/cloud/points/custom/rule/edit/' + pointsCustomRuleId,
					query: {}
				});
			},
			handleDelete: function () {
				this.isLoad = true;
				this.isDelete = false;

				this.request({
					url: '/mail/cloud/points/custom/rule/admin/v1/delete',
					data: {
						pointsCustomRuleIdList: this.pointsCustomRuleIdList
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
				if (this.pointsCustomRuleIdList.length == 0) {
					this.$Message.warning('请选择数据');

					return;
				}

				this.isDelete = true;
			},
			handleSelectionChange: function (list) {
				var pointsCustomRuleIdList = [];

				for (var item of list) {
					pointsCustomRuleIdList.push(item.pointsCustomRuleId);
				}

				this.pointsCustomRuleIdList = pointsCustomRuleIdList;
			},
			handleChangePageIndex: function (pageIndex) {
				this.$store.commit('pointsCustomRule', {
					pageIndex: pageIndex
				});

				this.handleLoad();
			},
			handleChangePageSize: function (pageSize) {
				this.$store.commit('pointsCustomRule', {
					pageSize: pageSize
				});

				this.handleLoad();
			}
		}
	}
</script>
