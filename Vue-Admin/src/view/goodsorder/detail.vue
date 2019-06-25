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
                            <BreadcrumbItem>订单</BreadcrumbItem>
                            <BreadcrumbItem>详情</BreadcrumbItem>
                        </Breadcrumb>
                    </div>
                    <div class="title">
                        订单详情
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
                        订单信息
                    </div>
                    <Form ref="form"
                          :model="tradeData"
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
                                <FormItem label="订单状态"
                                          prop="tradeStatus"
                                          :rules="[{
											required: false,
											message: '请输入订单状态'
									  }]">
                                    <Input v-model="tradeData.tradeStatus"
                                           type="text"
                                           placeholder="请输入订单状态"/>
                                </FormItem>
                                <FormItem label="应付金额"
                                          prop="tradePayAmount"
                                          :rules="[{
											required: false,
											message: '请输入应付金额'
									  }]">
                                    <Input v-model="tradeData.tradePayAmount"
                                           type="text"
                                           placeholder="请输入应付金额"/>
                                </FormItem>
                                <FormItem label="总金额"
                                          prop="tradeTotalAmount"
                                          :rules="[{
											required: false,
											message: '请输入总金额'
									  }]">
                                    <Input v-model="tradeData.tradeTotalAmount"
                                           type="text"
                                           placeholder="请输入总金额"/>
                                </FormItem>
                                <FormItem label="商品总数"
                                          prop="tradeGoodsTotalQuantity"
                                          :rules="[{
											required: false,
											message: '请输入商品总数'
									  }]">
                                    <Input v-model="tradeData.tradeGoodsTotalQuantity"
                                           type="text"
                                           placeholder="请输入商品总数"/>
                                </FormItem>
                                <FormItem label="收货人昵称"
                                          prop="tradeDeliveryName"
                                          :rules="[{
											required: true,
											message: '请输入昵称'
									  }]">
                                    <Input v-model="tradeData.tradeDeliveryName"
                                           type="text"
                                           placeholder="请输入昵称"/>
                                </FormItem>
                                <FormItem label="手机号码"
                                          prop="tradeDeliveryMobile"
                                          :rules="[{
											required: true,
											message: '请输入手机号码'
									  }]">
                                    <Input v-model="tradeData.tradeDeliveryMobile"
                                           type="text"
                                           placeholder="请输入手机号码"/>
                                </FormItem>
                                <FormItem label="省"
                                          prop="tradeDeliveryProvince"
                                          :rules="[{
											required: false,
											message: '请输入省'
									  }]">
                                    <Input v-model="tradeData.tradeDeliveryProvince"
                                           type="text"
                                           placeholder="请输入省"/>
                                </FormItem>
                                <FormItem label="市"
                                          prop="tradeDeliveryCity"
                                          :rules="[{
                                            required: false,
                                            message: '请输入市'
									  }]">
                                    <Input v-model="tradeData.tradeDeliveryCity"
                                           type="text"
                                           placeholder="请输入市"/>
                                </FormItem>
                                <FormItem label="区"
                                          prop="tradeDeliveryArea"
                                          :rules="[{
                                            required: false,
                                            message: '请输入区'
									  }]">
                                    <Input v-model="tradeData.tradeDeliveryArea"
                                           type="text"
                                           placeholder="请输入区"/>
                                </FormItem>
                                <FormItem label="详细地址"
                                          prop="tradeDeliveryAddress"
                                          :rules="[{
                                            required: false,
                                            message: '请输入详细地址'
									  }]">
                                    <Input v-model="tradeData.tradeDeliveryAddress"
                                           type="text"
                                           placeholder="请输入详细地址"/>
                                </FormItem>
                                <FormItem label="订单来源"
                                          prop="tradeFrom">
                                    <Input v-model="tradeData.tradeFrom"
                                           type="text"/>
                                </FormItem>
                                <FormItem label="买家留言"
                                          prop="买家留言"
                                          :rules="[{
                                            required: false,
                                            message: '请输入买家留言'
									  }]">
                                    <Input v-model="tradeData.tradeBuyerMessage"
                                           type="textarea"
                                           placeholder="买家留言"/>
                                </FormItem>
                            </Col>
                        </Row>
                    </Form>
                </div>
                <div class="tab tab-margin-top">
                    <div class="tab-title">
                        商品列表
                    </div>
                    <div class="tab-table">
                        <Table ref="table"
                               size="large"
                               :columns="[{
								width: 60,
								align: 'center'
							},
							{
								key: 'goodsName',
								title: '商品名称',
								width: 460,
                                render: (h, params) => {
								    return h('div', {
                                        'style': {
                                            display: 'flex',
                                            alignItems: 'center'
                                        }
								        }, [
										h('img', {
                                            style: {
                                                width: '30px',
                                                height: '30px',
                                                verticalAlign: 'middle'
                                            },
                                            attrs: {
                                                src: application.imageHost + params.row.goodsImagePath
                                                }
                                        },),
                                        h('span', {
                                            style: {
                                              flex: '1',
                                              paddingLeft: '4px',
                                              overflow : 'hidden',
                                              textOverflow: 'ellipsis',
                                              display: '-webkit-box',
                                              lineClamp: '2',
                                              boxOrient: 'vertical',
                                              lineHeight: '16px'
                                            }
                                        },params.row.goodsName)
									])
								}
							},
							{
								key: 'goodsQuantity',
								title: '商品数量',
							},
							{
								key: 'goodsSkuAttributeList',
								title: '商品规格',
							},
							{
								key: 'goodsSkuPrice',
								title: '商品价格',
							}]"
                               :data="tradeData.tradeGoodsList"
                               :border="true"></Table>
                    </div>
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
            'Page': Page
        },
        mixins: [mixin],

        data: () => ({
            isLoad: false,
            isEdit: false,
            tradeData: {}
        }),
        mounted() {
            this.handleActiveMenu('/goods/order/detail');
            this.handleLoad();
        },
        methods: {
            handleLoad: function () {
                this.isLoad = true;

                this.request({
                    url: '/ec/trade/admin/v1/find',
                    data: {
                        tradeId: this.$route.params.tradeId
                    },
                    success: (response) => {
                        switch (response.data.tradeStatus) {
                            case 'WAITING_PAYMENT':
                                response.data.tradeStatus = '待付款';

                                break;
                            case 'WAITING_DELIVERY':
                                response.data.tradeStatus = '待发货';

                                break;
                            case 'WAITING_RECEIVE':
                                response.data.tradeStatus = '待收货';

                                break;
                            case 'WAITING_EVALUATE':
                                response.data.tradeStatus = '待评价';

                                break;
                            case 'OTHER':
                                response.data.tradeStatus = '退款/售后';

                                break;
                            default:
                                break;
                        }

                        response.data.tradeGoodsList.map( (data) => {
                            if(data.goodsSkuAttributeList.length == 0){
                                data.goodsSkuAttributeList.push("单规格商品")
                            }
                        });

                        this.tradeData = response.data
                    },
                    error: (response) => {
                        this.$Message.error(response.message);
                    },
                    complete: () => {
                        this.isLoad = false;
                    }
                });
            }
        }
    }
</script>
