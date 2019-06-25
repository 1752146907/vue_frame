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
                        </Breadcrumb>
                    </div>
                    <div class="title">
                        订单列表
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
                    <!--<Button class="action-margin"-->
                    <!--custom-icon="iconfont icon-delete"-->
                    <!--size="large"-->
                    <!--:loading="isLoad"-->
                    <!--@click="handleConfirm">-->
                    <!--删除-->
                    <!--</Button>-->
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
                                <FormItem label="订单编号"
                                          prop="memberId"
                                          :rules="[]">
                                    <Input v-model="search.tradeId"
                                           type="text"
                                           placeholder=""/>
                                </FormItem>
                            </Col>
                            <Col :xs="24"
                                 :sm="12"
                                 :md="8"
                                 :lg="8">
                                <FormItem label="订单状态"
                                          prop="merchantId"
                                          :rules="[]">
                                    <!--<Input v-model="search.tradeStatus"-->
                                           <!--type="text"-->
                                           <!--placeholder=""/>-->
                                    <Select v-model="search.tradeStatus">
                                        <Option v-for="item in goodsTradeStatus" :value="item.value" :key="item.value">{{
                                            item.label }}
                                        </Option>
                                    </Select>
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
								type: 'index',
								width: 60,
								align: 'center'
							},
							{
								key: 'tradeId',
								title: '订单编号',
							},
							{
								key: 'tradeStatus',
								title: '订单状态',
							},
							{
								key: 'tradePayAmount',
								title: '应付金额',
							},
							{
								key: 'tradeTotalAmount',
								title: '总金额',
							},
							{
								key: 'tradeGoodsTotalQuantity',
								title: '商品总数',
							},
							{
								key: 'tradeFrom',
								title: '来源',
								render: (h, params) => {
									return h('div', [
										h('div', {

										}, params.tradeFrom ? params.tradeFrom : '---')
									]);
								}
							},
							{
								key: 'action',
								title: '操作',
								width: 180,
								align: 'center',
								render: (h, params) => {
									return h('div', [
										h('Button', {
											props: {
												size: 'default'
											},
											on: {
												click: () => {
													this.handleEdit(params.row.tradeId);
												}
											}
										}, '查看')
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
            productId: '',
            memberIdList: [],
            goodsTradeStatus: [{
                value: 'WAITING_PAYMENT',
                label: '待付款'
            }, {
                value: 'WAITING_DELIVERY',
                label: '待发货'
            }, {
                value: 'WAITING_RECEIVE',
                label: '待收货'
            }, {
                value: 'WAITING_EVALUATE',
                label: '待评价'
            }, {
                value: 'OTHER',
                label: '退款/售后'
            }],
        }),
        mounted () {
            this.handleActiveMenu('/goods/order/index');

            this.productId = this.$storage.getProductId();
            this.search = this.$store.state.goods.search;
            this.pageIndex = this.$store.state.goods.pageIndex;
            this.pageSize = this.$store.state.goods.pageSize;

            this.handleLoad();
        },
        methods: {
            htmlForEditorValue (title) {
                console.log(title)
            },
            handleLoad: function () {
                this.isLoad = true;

                var data = this.$store.state.member.search;
                data = Object.assign(data, {
                    pageIndex: this.$store.state.member.pageIndex,
                    pageSize: this.$store.state.member.pageSize
                    // 其它搜索参数
                });
                data.productId = this.productId;

                this.request({
                    url: '/ec/trade/admin/v1/list',
                    data: data,
                    success: (response) => {
                        response.data.list.map( (data) => {
                            if (data.tradeStatus == 'WAITING_PAYMENT') {
                                data.tradeStatus = '待付款'
                            }
                            else if (data.tradeStatus == 'WAITING_DELIVERY') {
                                data.tradeStatus = '待发货'
                            }
                            else if (data.tradeStatus == 'WAITING_RECEIVE') {
                                data.tradeStatus = '待收货'
                            }
                            else if (data.tradeStatus == 'WAITING_EVALUATE') {
                                data.tradeStatus = '待评价'
                            }
                            if (data.tradeStatus == 'OTHER') {
                                data.tradeStatus = '退款/售后'
                            }
                        });

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
                this.$store.commit('goodsorder', {
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
                    path: '/member/add',
                    query: {}
                });
            },
            handleEdit: function (tradeId) {
                this.$router.push({
                    path: '/goods/order/detail/' + tradeId,
                    query: {}
                });
            },
            handleDelete: function () {
                this.isLoad = true;
                this.isDelete = false;

                this.request({
                    url: '/mail/cloud/member/admin/v1/delete',
                    data: {
                        memberIdList: this.memberIdList
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
                if (this.memberIdList.length == 0) {
                    this.$Message.warning('请选择数据');

                    return;
                }

                this.isDelete = true;
            },
            handleSelectionChange: function (list) {
                var memberIdList = [];

                for (var item of list) {
                    memberIdList.push(item.memberId);
                }

                this.memberIdList = memberIdList;
            },
            handleChangePageIndex: function (pageIndex) {
                this.$store.commit('member', {
                    pageIndex: pageIndex
                });

                this.handleLoad();
            },
            handleChangePageSize: function (pageSize) {
                this.$store.commit('member', {
                    pageSize: pageSize
                });

                this.handleLoad();
            }
        }
    }
</script>
