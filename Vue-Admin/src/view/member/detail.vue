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
							<BreadcrumbItem>会员</BreadcrumbItem>
						</Breadcrumb>
					</div>
					<div class="title">
						会员
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
						  :model="member"
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
								<FormItem label="昵称"
										  prop="memberNickName"
										  :rules="[{
									  	required: true,
										message: '请输入昵称'
									  }]">
									<Input v-model="member.memberNickName"
										   type="text"
										   placeholder="请输入昵称"/>
								</FormItem>
								<FormItem label="手机号码"
										  prop="memberMobile"
										  :rules="[{
									  	required: true,
										message: '请输入手机号码'
									  }]">
									<Input v-model="member.memberMobile"
										   type="text"
										   placeholder="请输入手机号码"/>
								</FormItem>
								<FormItem label="头像路径"
										  prop="memberAvatarPath"
										  :rules="[{
									  	required: false,
										message: '请输入头像路径'
									  }]">
									<imageUpload :number="1"
												 :settingOption="[{
													  imageId: 'member.memberAvatarId',
													  imagePath: member.memberAvatarPath
												 }]" />
								</FormItem>
								<FormItem label="微信号"
										  prop="memberWechatNumber"
										  :rules="[{
									  	required: false,
										message: '请输入微信号'
									  }]">
									<Input v-model="member.memberWechatNumber"
										   type="text"
										   placeholder="请输入微信号"/>
								</FormItem>
								<FormItem label="性别"
										  prop="memberSex"
										  :rules="[{
									  	required: false,
										message: '请输入性别'
									  }]">
									<Select v-model="member.memberSex" style="width:200px">
										<Option v-for="item in memberSex" :value="item.value" :key="item.value">{{
											item.label }}
										</Option>
									</Select>
								</FormItem>
								<FormItem label="生日"
										  prop="memberBirthday"
										  :rules="[{
									  	required: false,
										message: '请输入生日'
									  }]">
									<DatePicker v-model="member.memberBirthday"
												type="date" placeholder="请选择生日" style="width: 200px"></DatePicker>
								</FormItem>
								<FormItem label="省"
										  prop="memberProvince"
										  :rules="[{
									  	required: false,
										message: '请输入省'
									  }]">
									<Input v-model="member.memberProvince"
										   type="text"
										   placeholder="请输入省"/>
								</FormItem>
								<FormItem label="市"
										  prop="memberCity"
										  :rules="[{
									  	required: false,
										message: '请输入市'
									  }]">
									<Input v-model="member.memberCity"
										   type="text"
										   placeholder="请输入市"/>
								</FormItem>
								<FormItem label="区"
										  prop="memberArea"
										  :rules="[{
									  	required: false,
										message: '请输入区'
									  }]">
									<Input v-model="member.memberArea"
										   type="text"
										   placeholder="请输入区"/>
								</FormItem>
								<FormItem label="详细地址"
										  prop="memberAddress"
										  :rules="[{
									  	required: false,
										message: '请输入详细地址'
									  }]">
									<Input v-model="member.memberAddress"
										   type="text"
										   placeholder="请输入详细地址"/>
								</FormItem>
								<FormItem label="来源"
										  prop="memberFrom"
										  :rules="[{
									  	required: false,
										message: '请输入来源'
									  }]">
									<Input v-model="member.memberFrom"
										   type="textarea"
										   placeholder="请输入来源"/>
								</FormItem>
								<FormItem label="备注"
										  prop="memberRemark"
										  :rules="[{
									  	required: false,
										message: '请输入备注'
									  }]">
									<Input v-model="member.memberRemark"
										   type="textarea"
										   placeholder="请输入备注"/>
								</FormItem>
								<FormItem label="余额"
										  prop="memberBalance"
										  :rules="[{
									  	required: false,
										message: '请输入余额'
									  }]">
									<InputNumber :min="0"
												 :precision=2
												 v-model="member.memberBalance"
												 placeholder="价格"></InputNumber>
								</FormItem>
								<FormItem label="积分"
										  prop="memberPoints"
										  :rules="[{
									  	required: false,
										message: '请输入积分'
									  }]">
									<InputNumber :min="0" v-model="member.memberPoints"></InputNumber>
								</FormItem>
								<FormItem label="交易次数"
										  prop="memberTradeNumber"
										  :rules="[{
									  	required: false,
										message: '请输入交易次数'
									  }]">
									<InputNumber :min="0" v-model="member.memberTradeNumber"></InputNumber>
								</FormItem>
								<FormItem label="会员卡编号"
										  prop="memberCardId"
										  :rules="[{
									  	required: false,
										message: '请输入会员卡编号'
									  }]">
									<Input v-model="member.memberCardId"
										   type="text"
										   placeholder="请输入会员卡编号"/>
								</FormItem>
								<FormItem label="会员卡号"
										  prop="memberCardNumber"
										  :rules="[{
									  	required: false,
										message: '请输入会员卡号'
									  }]">
									<Input v-model="member.memberCardNumber"
										   type="text"
										   placeholder="请输入会员卡号"/>
								</FormItem>
								<FormItem label="版本号"
										  prop="memberCardNumber"
										  :rules="[{
                                    required: false,
                                    message: '请输入版本号'
                                  }]">
									<Input v-model="member.systemVersion"
										   type="text"
										   placeholder="请输入版本号"/>
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
		Select,
		DatePicker,
		InputNumber,
		Page
	} from 'iview';

	import mixin from '../../common/mixin';
	import imageUpload from '../../component/imageUpload'

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
			'Select': Select,
			'DatePicker': DatePicker,
			'InputNumber': InputNumber,
			'Page': Page,
			imageUpload
		},
		mixins: [mixin],

		data: () => ({
			isLoad: false,
			isEdit: false,
			member: {},
			memberSex: [{
				value: '0',
				label: '女士'
			}, {
				value: '1',
				label: '男士'
			}]
		}),
		mounted () {
            this.handleActiveMenu('/member/add');

			switch (this.$router.history.current.matched[0].path) {
				case '/member/add':

					break;
				case '/member/edit/:memberId':
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
					url: '/ec/member/admin/v1/find',
					data: {
						memberId: this.$route.params.memberId
					},
					success: (response) => {
						this.member = response.data;
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
						var data = this.member;

						this.request({
							url: this.isEdit ? '/ec/member/admin/v1/update' : '/ec/member/admin/v1/save',
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
