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
							<BreadcrumbItem>商品分组</BreadcrumbItem>
						</Breadcrumb>
					</div>
					<div class="title">
						商品分组
					</div>
				</Col>
				<Col :xs="24"
					 :sm="12"
					 :md="12"
					 :lg="12"
					 class="action">
					<Button class="action-margin"
							custom-icon="iconfont icon-left-circle"
							size="large"
							@click="handleBack">
						返回
					</Button>
					<Button type="primary"
							custom-icon="iconfont icon-check-circle"
							size="large"
							:loading="isLoad"
							@click="handleSubmit">
						提交
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
						基本信息
					</div>
					<Form ref="form"
						  :model="goodsGroup"
						  class="tab-form"
						  :label-width="100"
						  @keydown.native.enter.prevent="handleSubmit">
						<Row class="tab-form-row"
							 type="flex"
							 align="middle">
							<Col :xs="24"
								 :sm="12"
								 :md="12"
								 :lg="8">
								<FormItem label="名称"
										  prop="goodsGroupName"
										  :rules="[{
									  	required: true,
										message: '请输入名称'
									  }]">
									<Input v-model="goodsGroup.goodsGroupName"
										   type="text"
										   placeholder="请输入名称"/>
								</FormItem>
								<FormItem label="简介"
										  prop="goodsGroupDescription"
										  :rules="[{
									  	required: true,
										message: '请输入简介'
									  }]">
									<Input v-model="goodsGroup.goodsGroupDescription"
										   type="textarea"
										   placeholder="请输入简介"/>
								</FormItem>
								<FormItem label="排序"
										  prop="goodsGroupSort"
										  :rules="[{
									  	required: true,
										message: '请输入排序'
									  }]">
									<InputNumber :min="0" v-model="goodsGroup.goodsGroupSort"></InputNumber>
								</FormItem>
							</Col>
						</Row>
					</Form>
				</div>
			</div>
		</div>
	</div>
</template>

<style src="./detail.css" scoped></style>

<script>
	import {
		Row,
		Col,
		Breadcrumb,
		BreadcrumbItem,
		Button,
		Modal,
		Form,
		FormItem,
		Input,
		Table,
		InputNumber,
		Page
	} from 'iview';

	import mixin from '../../common/mixin';

	export default {
		components: {
			'Row': Row,
			'Col': Col,
			'Breadcrumb': Breadcrumb,
			'BreadcrumbItem': BreadcrumbItem,
			'Button': Button,
			'Modal': Modal,
			'Form': Form,
			'FormItem': FormItem,
			'Input': Input,
			'Table': Table,
			'InputNumber': InputNumber,
			'Page': Page
		},
		mixins: [mixin],
		data: () => ({
			isLoad: false,
			isEdit: false,
			productId: '',
			goodsGroup: {}
		}),
		mounted () {
			this.productId = this.$storage.getProductId();
			switch (this.$router.history.current.matched[0].path) {
				case '/goods/group/add':

					break;
				case '/goods/group/edit/:goodsGroupId':
					this.isEdit = true;

					this.handleLoad();

					break;
				default:
					break;
			}
		},
		methods: {
			handleLoad: function () {
				this.isLoad = true;

				this.request({
					url: '/ec/goods/group/admin/v1/find',
					data: {
						goodsGroupId: this.$route.params.goodsGroupId
					},
					success: (response) => {
						this.goodsGroup = response.data;
					},
					error: (response) => {
						this.$Message.error(response.message);
					},
					complete: () => {
						this.isLoad = false;
					}
				});
			},
			handleSubmit: function () {
				this.$refs.form.validate((valid) => {
					if (valid) {
						var data = this.goodsGroup;
						data.productId = this.$storage.getProductId();

						this.request({
							url: this.isEdit ? '/ec/goods/group/admin/v1/update' : '/ec/goods/group/admin/v1/save',
							data: data,
							success: (response) => {
								this.$Message.success(response.message);

								this.handleBack();
							},
							error: (response) => {
								this.$Message.error(response.message);
							},
							complete: () => {
								this.isLoad = false;
							}
						});
					}
				});
			}
		}
	}
</script>
