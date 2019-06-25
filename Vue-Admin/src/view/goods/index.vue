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
                        <BreadcrumbItem>商品</BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div class="title">
                    商品
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
                            <FormItem label="商品分类"
                                      prop="goodsCategoryId"
                                      :rules="[]">
                                <Select v-model="search.goodsCategoryId">
                                    <Option v-for="item in goodsCategoryArr" :value="item.value" :key="item.value">{{ item.label }}</Option>
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
                                    <Option v-for="item in goodsStatusArr" :value="item.value" :key="item.value">{{ item.label }}</Option>
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
								type: 'selection',
								width: 60,
								align: 'center'
							},
							{
								key: 'goodsImagePath',
								title: '商品名称',
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
								key: 'goodsPrice',
								title: '商品价格',
								width: 120
							},
							{
								key: 'goodsStock',
								title: '商品库存',
								width: 100
							},
							{
								key: 'goodsStatus',
								title: '商品状态',
								width: 100
							},
							{
								key: 'action',
								title: '操作',
								width: 188,
								align: 'center',
								render: (h, params) => {
									return h('div', [
										h('Button', {
											props: {
												size: 'default'
											},
											on: {
												click: () => {
													this.handleEdit(params.row.goodsId);
												}
											}
										}, '修改'),
										params.row.goodsStatus == '仓库中' ?
                                            h('Button', {
                                                props: {
                                                    size: 'default'
                                                },
                                                style: {
                                                    marginLeft: '8px'
                                                },
                                                on: {
                                                    click: () => {
                                                        this.handleGrounding(params.row.goodsId);
                                                    }
                                                }
                                            }, '上架')
                                        :
                                            h('Button', {
                                                props: {
                                                    size: 'default'
                                                },
                                                style: {
                                                    marginLeft: '8px'
                                                },
                                                on: {
                                                    click: () => {
                                                        this.handleUndercarriage(params.row.goodsId);
                                                    }
                                                }
                                            }, params.row.goodsStatus == '销售中' ? '下架' : '已售罄')
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
            goodsIdList: [],
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
            }]
        }),
		mounted() {
			this.handleActiveMenu('/goods/index');

			this.productId = this.$storage.getProductId();
            this.search = this.$store.state.goods.search;
            this.pageIndex = this.$store.state.goods.pageIndex;
            this.pageSize = this.$store.state.goods.pageSize;

            this.handleLoad();
            this.handleGetcategory();
        },
        methods: {
            handleGetcategory: function () {
                this.request({
                    url: '/ec/goods/category/admin/v1/list',
                    data: {
                        productId: this.productId
                    },
                    success: (response) => {
                        for (let i = 0; i < response.data.list.length; i++){
                            let arr = {
                                value: response.data.list[i].goodsCategoryId,
                                label: response.data.list[i].goodsCategoryName
                            }
                            this.goodsCategoryArr.push(arr);
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
                            if(data.goodsStatus == "SELLING") {
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
                this.$store.commit('goods', {
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
                    path: '/goods/add',
                    query: {}
                });
            },
            handleEdit: function (goodsId) {
                this.$router.push({
                    path: '/goods/edit/' + goodsId,
                    query: {}
                });
            },
            handleGrounding: function (id) {
                let goodsIdList = [];
                goodsIdList.push(id);

                this.isLoad = true;
                this.request({
                    url: '/ec/goods/admin/v1/upper',
                    data: {
                        goodsIdList: goodsIdList
                    },
                    success: (response) => {
                        this.$Message.success(response.message);
                        this.handleLoad();
                    },
                    error: (response) => {
                        this.$Message.error(response.message);
                    },
                    complete: () => {
                        this.isLoad = false;
                    }
                });
            },
            handleUndercarriage: function (id) {
                let goodsIdList = [];
                goodsIdList.push(id);

                this.isLoad = true;
                this.request({
                    url: '/ec/goods/admin/v1/lower',
                    data: {
                        goodsIdList: goodsIdList
                    },
                    success: (response) => {
                        this.$Message.success(response.message);
                        this.handleLoad();
                    },
                    error: (response) => {
                        this.$Message.error(response.message);
                    },
                    complete: () => {
                        this.isLoad = false;
                    }
                });
            },
            handleDelete: function () {
                this.isLoad = true;
                this.isDelete = false;

                this.request({
                    url: '/ec/goods/admin/v1/delete',
                    data: {
                        goodsIdList: this.goodsIdList
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
                if (this.goodsIdList.length == 0) {
                    this.$Message.warning('请选择数据');

                    return;
                }

                this.isDelete = true;
            },
            handleSelectionChange: function (list) {
                var goodsIdList = [];

                for (var item of list) {
                    goodsIdList.push(item.goodsId);
                }

                this.goodsIdList = goodsIdList;
            },
            handleChangePageIndex: function (pageIndex) {
                this.$store.commit('goods', {
                    pageIndex: pageIndex
                });

                this.handleLoad();
            },
            handleChangePageSize: function (pageSize) {
                this.$store.commit('goods', {
                    pageSize: pageSize
                });

                this.handleLoad();
            }
        }
    }
</script>
