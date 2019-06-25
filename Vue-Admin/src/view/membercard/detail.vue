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
                        <BreadcrumbItem>会员卡</BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div class="title">
                    会员卡
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
                          :model="memberCard"
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
                            <FormItem label="商户编号"
                                      prop="merchantId"
                                      :rules="[{
									  	required: false,
										message: '请输入商户编号'
									  }]">
                                <Input v-model="memberCard.merchantId"
                                       type="text"
                                       placeholder="请输入商户编号"/>
                            </FormItem>
                            <FormItem label="名称"
                                      prop="memberCardName"
                                      :rules="[{
									  	required: true,
										message: '请输入名称'
									  }]">
                                <Input v-model="memberCard.memberCardName"
                                       type="text"
                                       placeholder="请输入名称"/>
                            </FormItem>
                            <FormItem label="类型"
                                      prop="memberCardType"
                                      :rules="[{
									  	required: true,
										message: '请输入类型'
									  }]">
                                <Input v-model="memberCard.memberCardType"
                                       type="text"
                                       placeholder="请输入类型"/>
                            </FormItem>
                            <FormItem label="状态"
                                      prop="memberCardStatus"
                                      :rules="[{
									  	required: true,
										message: '请输入状态'
									  }]">
                                <Input v-model="memberCard.memberCardStatus"
                                       type="text"
                                       placeholder="请输入状态"/>
                            </FormItem>
                            <FormItem label="封面颜色"
                                      prop="memberCardCoverColor"
                                      :rules="[{
									  	required: false,
										message: '请输入封面颜色'
									  }]">
                                <Input v-model="memberCard.memberCardCoverColor"
                                       type="text"
                                       placeholder="请输入封面颜色"/>
                            </FormItem>
                            <FormItem label="封面图片编号"
                                      prop="memberCardCoverImageId"
                                      :rules="[{
									  	required: false,
										message: '请输入封面图片编号'
									  }]">
                                <Input v-model="memberCard.memberCardCoverImageId"
                                       type="text"
                                       placeholder="请输入封面图片编号"/>
                            </FormItem>
                            <FormItem label="封面图片路径"
                                      prop="memberCardCoverImagePath"
                                      :rules="[{
									  	required: false,
										message: '请输入封面图片路径'
									  }]">
                                <Input v-model="memberCard.memberCardCoverImagePath"
                                       type="text"
                                       placeholder="请输入封面图片路径"/>
                            </FormItem>
                            <FormItem label="是否包邮"
                                      prop="memberCardIsFreePost"
                                      :rules="[{
									  	required: false,
										message: '请输入是否包邮'
									  }]">
							    <Switch v-model="memberCardIsFreePost" />
                            </FormItem>
                            <FormItem label="折扣"
                                      prop="memberCardDiscount"
                                      :rules="[{
									  	required: false,
										message: '请输入折扣'
									  }]">
                                <InputNumber :min="0" v-model="memberCardDiscount"></InputNumber>
                            </FormItem>
                            <FormItem label="优惠卷编号"
                                      prop="couponId"
                                      :rules="[{
									  	required: false,
										message: '请输入优惠卷编号'
									  }]">
                                <Input v-model="memberCard.couponId"
                                       type="text"
                                       placeholder="请输入优惠卷编号"/>
                            </FormItem>
                            <FormItem label="积分"
                                      prop="memberCardPoints"
                                      :rules="[{
									  	required: false,
										message: '请输入积分'
									  }]">
                                <InputNumber :min="0" v-model="memberCardPoints"></InputNumber>
                            </FormItem>
                            <FormItem label="使用须知"
                                      prop="memberCardDescription"
                                      :rules="[{
									  	required: false,
										message: '请输入使用须知'
									  }]">
                                <Input v-model="memberCard.memberCardDescription"
                                       type="text"
                                       placeholder="请输入使用须知"/>
                            </FormItem>
                            <FormItem label="客服电话"
                                      prop="memberCardCustomerServicePhone"
                                      :rules="[{
									  	required: false,
										message: '请输入客服电话'
									  }]">
                                <Input v-model="memberCard.memberCardCustomerServicePhone"
                                       type="text"
                                       placeholder="请输入客服电话"/>
                            </FormItem>
                            <FormItem label="是否无限期"
                                      prop="memberCardIsForever"
                                      :rules="[{
									  	required: false,
										message: '请输入是否无限期'
									  }]">
							    <Switch v-model="memberCardIsForever" />
                            </FormItem>
                            <FormItem label="有效开始日期"
                                      prop="memberCardActiveStartDate"
                                      :rules="[{
									  	required: false,
										message: '请输入有效开始日期'
									  }]">
							    <DatePicker v-model="memberCard.memberCardActiveStartDate"
							            type="date" placeholder="请选择有效开始日期" style="width: 200px"></DatePicker>
                            </FormItem>
                            <FormItem label="有效结束日期"
                                      prop="memberCardActiveEndDate"
                                      :rules="[{
									  	required: false,
										message: '请输入有效结束日期'
									  }]">
							    <DatePicker v-model="memberCard.memberCardActiveEndDate"
							            type="date" placeholder="请选择有效结束日期" style="width: 200px"></DatePicker>
                            </FormItem>
                            <FormItem label="过期后调整对应会员卡编号"
                                      prop="memberCardExpireCardId"
                                      :rules="[{
									  	required: false,
										message: '请输入过期后调整对应会员卡编号'
									  }]">
                                <Input v-model="memberCard.memberCardExpireCardId"
                                       type="text"
                                       placeholder="请输入过期后调整对应会员卡编号"/>
                            </FormItem>
                            <FormItem label="是否需激活"
                                      prop="memberCardIsNeedActive"
                                      :rules="[{
									  	required: false,
										message: '请输入是否需激活'
									  }]">
							    <Switch v-model="memberCardIsNeedActive" />
                            </FormItem>
                            <FormItem label="是否需要完善用户资料"
                                      prop="memberCardIsPerfectInfo"
                                      :rules="[{
									  	required: false,
										message: '请输入是否需要完善用户资料'
									  }]">
							    <Switch v-model="memberCardIsPerfectInfo" />
                            </FormItem>
                            <FormItem label="会员期限"
                                      prop="memberCardMemberTermName"
                                      :rules="[{
									  	required: false,
										message: '请输入会员期限'
									  }]">
                                <Input v-model="memberCard.memberCardMemberTermName"
                                       type="text"
                                       placeholder="请输入会员期限"/>
                            </FormItem>
                            <FormItem label="库存"
                                      prop="memberCardStock"
                                      :rules="[{
									  	required: false,
										message: '请输入库存'
									  }]">
                                <Input v-model="memberCard.memberCardStock"
                                       type="text"
                                       placeholder="请输入库存"/>
                            </FormItem>
                            <FormItem label="天数"
                                      prop="memberCardDayNumber"
                                      :rules="[{
									  	required: false,
										message: '请输入天数'
									  }]">
                                <InputNumber :min="0" v-model="memberCardDayNumber"></InputNumber>
                            </FormItem>
                            <FormItem label="价格"
                                      prop="memberCardPrice"
                                      :rules="[{
									  	required: false,
										message: '请输入价格'
									  }]">
                                <InputNumber :min="0" v-model="memberCardPrice"></InputNumber>
                            </FormItem>
                            <FormItem label="商户编码"
                                      prop="memberCardMerchantCode"
                                      :rules="[{
									  	required: false,
										message: '请输入商户编码'
									  }]">
                                <Input v-model="memberCard.memberCardMerchantCode"
                                       type="text"
                                       placeholder="请输入商户编码"/>
                            </FormItem>
                            <FormItem label="等级"
                                      prop="memberCardLevel"
                                      :rules="[{
									  	required: false,
										message: '请输入等级'
									  }]">
                                <Input v-model="memberCard.memberCardLevel"
                                       type="text"
                                       placeholder="请输入等级"/>
                            </FormItem>
                            <FormItem label="累计成功交易多少笔"
                                      prop="memberCardSuccessTradeCount"
                                      :rules="[{
									  	required: false,
										message: '请输入累计成功交易多少笔'
									  }]">
                                <InputNumber :min="0" v-model="memberCardSuccessTradeCount"></InputNumber>
                            </FormItem>
                            <FormItem label="累计消费金额多少元"
                                      prop="memberCardPayAmountCount"
                                      :rules="[{
									  	required: false,
										message: '请输入累计消费金额多少元'
									  }]">
                                <InputNumber :min="0" v-model="memberCardPayAmountCount"></InputNumber>
                            </FormItem>
                            <FormItem label="累计积分达到多少分"
                                      prop="memberCardPointsCount"
                                      :rules="[{
									  	required: false,
										message: '请输入累计积分达到多少分'
									  }]">
                                <InputNumber :min="0" v-model="memberCardPointsCount"></InputNumber>
                            </FormItem>
                            <FormItem label="是否领卡日开始生效"
                                      prop="memberCardIsCollarCardActive"
                                      :rules="[{
									  	required: false,
										message: '请输入是否领卡日开始生效'
									  }]">
							    <Switch v-model="memberCardIsCollarCardActive" />
                            </FormItem>
                            <FormItem label="自定义生效开始日期"
                                      prop="memberCardSelfActiveStartDate"
                                      :rules="[{
									  	required: false,
										message: '请输入自定义生效开始日期'
									  }]">
							    <DatePicker v-model="memberCard.memberCardSelfActiveStartDate"
							            type="date" placeholder="请选择自定义生效开始日期" style="width: 200px"></DatePicker>
                            </FormItem>
                            <FormItem label="是否同步微信卡包"
                                      prop="memberCardIsSyncWechatBag"
                                      :rules="[{
									  	required: false,
										message: '请输入是否同步微信卡包'
									  }]">
							    <Switch v-model="memberCardIsSyncWechatBag" />
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
    import {Row, Col, Breadcrumb, BreadcrumbItem, Button, Modal, Form, FormItem, Input, Table, Switch, InputNumber, DatePicker,  Page} from 'iview';

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
            'Switch': Switch,
            'InputNumber': InputNumber,
            'DatePicker': DatePicker,
            'Page': Page
        },
        mixins: [mixin],
        data: () => ({
            isLoad: false,
            isEdit: false,
            memberCard: {}
        }),
        mounted() {
            switch (this.$router.history.current.matched[0].path) {
                case '/member/card/add':

                    break;
                case '/member/card/edit/:memberCardId':
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
                    url: '/mail/cloud/member/card/admin/v1/find',
                    data: {
                        memberCardId: this.$route.params.memberCardId
                    },
                    success: (response) => {
                        this.memberCard = response.data;
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
                        var data = this.memberCard;

                        this.request({
                            url: this.isEdit ? '/mail/cloud/member/card/admin/v1/update' : '/mail/cloud/member/card/admin/v1/save',
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
