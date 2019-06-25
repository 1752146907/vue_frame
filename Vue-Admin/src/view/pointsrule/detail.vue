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
                        <BreadcrumbItem>积分自定义规则</BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div class="title">
                    积分自定义规则
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
                          :model="pointsCustomRule"
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
                                <Input v-model="pointsCustomRule.merchantId"
                                       type="text"
                                       placeholder="请输入商户编号"/>
                            </FormItem>
                            <FormItem label="积分数"
                                      prop="pointsCustomRuleNumber"
                                      :rules="[{
									  	required: true,
										message: '请输入积分数'
									  }]">
                                <InputNumber :min="0" v-model="pointsCustomRuleNumber"></InputNumber>
                            </FormItem>
                            <FormItem label="规则类型"
                                      prop="pointsCustomRuleType"
                                      :rules="[{
									  	required: true,
										message: '请输入规则类型'
									  }]">
                                <Input v-model="pointsCustomRule.pointsCustomRuleType"
                                       type="text"
                                       placeholder="请输入规则类型"/>
                            </FormItem>
                            <FormItem label="是否关注商户微信"
                                      prop="pointsCustomRuleIsFollowWechat"
                                      :rules="[{
									  	required: true,
										message: '请输入是否关注商户微信'
									  }]">
							    <Switch v-model="pointsCustomRuleIsFollowWechat" />
                            </FormItem>
                            <FormItem label="成功交易多少笔"
                                      prop="pointsCustomRuleSuccessTradeCount"
                                      :rules="[{
									  	required: true,
										message: '请输入成功交易多少笔'
									  }]">
                                <InputNumber :min="0" v-model="pointsCustomRuleSuccessTradeCount"></InputNumber>
                            </FormItem>
                            <FormItem label="成功交易多少笔"
                                      prop="pointsCustomRulePayAmountCount"
                                      :rules="[{
									  	required: true,
										message: '请输入成功交易多少笔'
									  }]">
                                <InputNumber :min="0" v-model="pointsCustomRulePayAmountCount"></InputNumber>
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
    import {Row, Col, Breadcrumb, BreadcrumbItem, Button, Modal, Form, FormItem, Input, Table, InputNumber, Switch,  Page} from 'iview';

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
            'Switch': Switch,
            'Page': Page
        },
        mixins: [mixin],
        data: () => ({
            isLoad: false,
            isEdit: false,
            pointsCustomRule: {}
        }),
        mounted() {
            switch (this.$router.history.current.matched[0].path) {
                case '/mail/cloud/points/custom/rule/add':

                    break;
                case '/points/custom/rule/edit/:pointsCustomRuleId':
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
                    url: '/mail/cloud/points/custom/rule/admin/v1/find',
                    data: {
                        pointsCustomRuleId: this.$route.params.pointsCustomRuleId
                    },
                    success: (response) => {
                        this.pointsCustomRule = response.data;
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
                        var data = this.pointsCustomRule;

                        this.request({
                            url: this.isEdit ? '/mail/cloud/points/custom/rule/admin/v1/update' : '/mail/cloud/points/custom/rule/admin/v1/save',
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
