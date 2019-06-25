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
                        <BreadcrumbItem>添加商品</BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div class="title">
                    添加商品
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
        <div class="content">
            <Spin fix
                  v-if="isLoad"
                  size="large"/>
            <div class="tab tab-margin-top">
                <div class="tab-title">
                    商品列表
                    <Button type="primary"
                            @click="handleAdd"
                            class="tab-title-add">添加
                    </Button>
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
								key: 'goodsName',
								title: '商品名称'
							},
							{
								key: 'goodsImagePath',
								title: '商品图片',
                                render: (h, params) => {
								    return h('div', [
										h('img', {
                                            style: {
                                                width: '30px',
                                                height: '30px'
                                            },
                                            attrs: {
                                                src: application.imageHost + params.row.goodsImagePath
                                                }
                                        },)
									])
								}
							},
							{
								key: 'goodsPrice',
								title: '商品价格'
							},
							{
								key: 'goodsStock',
								title: '商品库存'
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
													this.handleEdit(params.row._index);
												}
											}
										}, '删除')
									]);
								}
							}]"
                           :data="goodsList"
                           :border="true"></Table>
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
        <Modal v-model="isAddProduct"
               width="1100"
               :styles="{height: '554px'}"
               title="选择商品"
               @on-ok="handleAddProduct"
               @on-cancel="isAddProduct = false">
            <div style="height: 554px">
                <div class="">
                    <div class="content">
                        <div class="tab">
                            <div class="tab-title">
                                搜索条件
                                <Button class="action-seach"
                                        custom-icon="iconfont icon-search"
                                        size="large"
                                        :loading="isLoad"
                                        @click="handleSearch">
                                    查询
                                </Button>
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
                                    <FormItem label="商品分类"
                                              prop="goodsCategoryId"
                                              :rules="[]">
                                        <Select v-model="search.goodsCategoryId">
                                            <Option v-for="item in goodsCategoryArr" :value="item.value"
                                                    :key="item.value">{{ item.label }}
                                            </Option>
                                        </Select>
                                    </FormItem>
                                    </Col>
                                    <Col :xs="24"
                                         :sm="12"
                                         :md="8"
                                         :lg="8">
                                    <FormItem label="商品名称"
                                              prop="goodsName"
                                              :rules="[]">
                                        <Input v-model="search.goodsName"
                                               type="text"
                                               placeholder=""/>
                                    </FormItem>
                                    </Col>
                                    <Col :xs="24"
                                         :sm="12"
                                         :md="8"
                                         :lg="8">
                                    <FormItem label="商品编码"
                                              prop="goodsCode"
                                              :rules="[]">
                                        <Input v-model="search.goodsCode"
                                               type="text"
                                               placeholder=""/>
                                    </FormItem>
                                    </Col>
                                    <Col :xs="24"
                                         :sm="12"
                                         :md="8"
                                         :lg="8">
                                    <FormItem label="状态"
                                              prop="goodsStatus"
                                              :rules="[]">
                                        <Select v-model="search.goodsStatus">
                                            <Option v-for="item in goodsStatusArr" :value="item.value"
                                                    :key="item.value">{{ item.label }}
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
                            <div class="tab-table" style="height: 271px;overflow-y: scroll">
                                <Table ref="table"
                                       size="large"
                                       @on-selection-change="handleSelectionChange"
                                       :columns="[{
								type: 'selection',
								width: 60,
								align: 'center'
                                },
                                {
                                    key: 'goodsName',
                                    title: '商品名称',
                                    render: (h, params) => {
                                        return h('div', [
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
                                    key: 'goodsImagePath',
                                    title: '商品图片',
                                    render: (h, params) => {
                                        return h('div', [
                                            h('img', {
                                                style: {
                                                    width: '30px',
                                                    height: '30px'
                                                },
                                                attrs: {
                                                    src: application.imageHost + params.row.goodsImagePath
                                                    }
                                            },)
                                        ])
                                    }
                                },
                                {
                                    key: 'goodsCode',
                                    title: '商品编码'
                                },
                                {
                                    key: 'goodsPrice',
                                    title: '商品价格'
                                },
                                {
                                    key: 'goodsStock',
                                    title: '商品库存'
                                },
                                {
                                    key: 'goodsStatus',
                                    title: '商品状态'
                                },
                                {
                                    key: 'systemCreateTime',
                                    title: '创建时间'
                                }]"
                               :data="list"
                               :border="true" ></Table>
                                <div class="tab-table-page">
                                    <Page show-total
                                          show-sizer
                                          :current="pageIndex"
                                          :page-size="pageSize"
                                          :total="total"
                                          @on-change="handleChangePageIndex"
                                          @on-page-size-change="handleChangePageSize" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    </div>
</template>

<style src="./addsgroup.css" scoped></style>

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
            isAddProduct: false,
            productId: '',
            total: 0,
            pageIndex: 0,
            pageSize: 0,
            goodsGroup: {},
            goodsCategoryArr: [],
            goodsStatusArr: [{
                value: 'SELLING',
                label: '销售中'
            }, {
                value: 'WAITING_SELL',
                label: '仓库中'
            }, {
                value: 'SELL_OUT',
                label: '已售罄'
            }],
            search: {},
            selectGoodsList: [],
            goodsList: [],
            list: []
        }),
        mounted() {
            this.productId = this.$storage.getProductId();
            this.search = this.$store.state.goodsGroup.search;
            this.pageIndex = this.$store.state.goodsGroup.pageIndex;
            this.pageSize = this.$store.state.goodsGroup.pageSize;

            this.handleLoad();
            this.handleGoodsList();
            this.handleGetcategory();
        },
        methods: {
            handleGoodsList: function () {
                this.isLoad = true;

                this.request({
                    url: '/ec/goods/group/admin/v1/goods/list',
                    data: {
                        goodsGroupId: this.$router.history.current.params.goodsGroupId
                    },
                    success: (response) => {
                        this.goodsList = response.data;
                    },
                    error: (response) => {
                        this.$Message.error(response.message);
                    },
                    complete: () => {
                        this.isLoad = false;
                    }
                });
            },

            handleGetcategory: function () {
                this.request({
                    url: '/ec/goods/category/admin/v1/list',
                    data: {
                        productId: this.productId
                    },
                    success: (response) => {
                        for (let i = 0; i < response.data.list.length; i++) {
                            let arr = {
                                value: response.data.list[i].goodsCategoryId,
                                label: response.data.list[i].goodsCategoryName
                            }
                            this.goodsCategoryArr.push(arr)
                        }
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
                this.isLoad = true;

                let goodsIdList = []
                this.goodsList.map( (data) => {
                    goodsIdList.push(data.goodsId);
                });

                this.request({
                    url: '/ec/goods/group/admin/v1/goods/update',
                    data: {
                        goodsGroupId: this.$router.history.current.params.goodsGroupId,
                        goodsIdList: goodsIdList
                    },
                    success: (response) => {
                        this.$Message.success(response.message);
                        this.handleGoodsList();
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

                var data = this.$store.state.goods.search;
                data = Object.assign(data, {
                    pageIndex: this.$store.state.goods.pageIndex,
                    pageSize: this.$store.state.goods.pageSize
                });
                data.productId = this.productId;

                this.request({
                    url: '/ec/goods/admin/v1/shop/list',
                    data: data,
                    success: (response) => {
                        this.total = response.data.total;
                        this.list = response.data.list;
                        this.list.map((data) => {
                            if (data.goodsStatus == "SELLING") {
                                data.goodsStatus = '销售中'
                            } else if (data.goodsStatus == "WAITING_SELL") {
                                data.goodsStatus = '仓库中'
                            } else {
                                data.goodsStatus = '已售罄'
                            }

                            data.goodsPrice = '￥' + data.goodsPrice.toFixed(2)
                        })
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
                this.$store.state.goods.search = this.search;

                this.$store.commit('goodsGroup', {
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
                this.isAddProduct = true;
            },
            handleEdit: function (index) {
                this.goodsList.splice(index, 1)
            },
            handleSelectionChange: function (list) {
                this.selectGoodsList = list;
            },
            handleAddProduct: function () {
                for(var i in this.selectGoodsList){
                    if (this.goodsList.length > 0) {
                        if (this.goodsList.findIndex(goods => goods.goodsId === this.selectGoodsList[i].goodsId) == -1) {
                            this.goodsList.push(this.selectGoodsList[i]);
                        }
                    } else {
                        this.goodsList.push(this.selectGoodsList[i]);
                    }

                }
            },
            handleChangePageIndex: function (pageIndex) {
                this.$store.commit('goodsGroup', {
                    pageIndex: pageIndex
                });
                this.$store.state.goods.pageIndex = pageIndex
                this.handleLoad();
            },
            handleChangePageSize: function (pageSize) {
                this.$store.commit('goodsGroup', {
                    pageSize: pageSize
                });

                this.handleLoad();
            }
        }
    }
</script>
