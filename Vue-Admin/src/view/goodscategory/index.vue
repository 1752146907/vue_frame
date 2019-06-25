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
                        <BreadcrumbItem>商品分类</BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div class="title">
                    商品分类
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
                            <FormItem label="分类名称"
                                      prop="goodsCategoryName"
                                      :rules="[]">
                                <Input v-model="search.goodsCategoryName"
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
                        <div class="lrz-table">
                            <div class="lrz-table-title">
                                <div class="lrz-table-title-item">分类名称</div>
                                <div class="lrz-table-title-item">分类头像</div>
                                <div class="lrz-table-title-item"
                                     style="text-align: right;padding-right: 20px">操作</div>
                            </div>
                            <div class="lrz-table-body" v-if="list.length == 0">
                                <p class="not-data">暂无数据</p>
                            </div>
                            <div class="lrz-table-body">
                                <div  v-for="item in list">
                                    <div class="lrz-table-body-box1">
                                        <div class="lrz-table-body-item pointer"
                                             @click="handleTabItem(item.goodsCategoryId)"
                                             v-if="item.isShow">
                                            <Icon class=""
                                                  size="16"
                                                  type="ios-arrow-dropup-circle" />
                                            {{item.goodsCategoryName}}
                                        </div>
                                        <div class="lrz-table-body-item pointer"
                                             @click="handleTabItem(item.goodsCategoryId)"
                                             v-if="!item.isShow">
                                            <Icon class=""
                                                  size="16"
                                                  type="ios-arrow-dropdown-circle" />
                                            {{item.goodsCategoryName}}
                                        </div>
                                        <div class="lrz-table-body-item">
                                            <img class="lrz-table-body-item-img" :src="application.imageHost + item.goodsCategoryImagePath" alt="">
                                        </div>
                                        <div class="lrz-table-body-item" style="text-align: right;padding-right: 20px">
                                            <Button size="default"
                                                    @click="handleConfirm(item.goodsCategoryId)">删除</Button>
                                            <Button size="default"
                                                    style="margin-left: 8px"
                                                    @click="handleEdit(item.goodsCategoryId)">修改</Button>
                                        </div>
                                    </div>
                                    <div class="lrz-table-body-box2"
                                         v-for="children in item.children"
                                         v-if="item.isShow">
                                        <div class="lrz-table-body-box2-content">
                                            <div class="lrz-table-body-item">
                                                {{children.goodsCategoryName}}
                                            </div>
                                            <div class="lrz-table-body-item">
                                                <img class="lrz-table-body-item-img" :src="application.imageHost + children.goodsCategoryImagePath" alt="">
                                            </div>
                                            <div class="lrz-table-body-item" style="text-align: right;padding-right: 20px">
                                                <Button size="default"
                                                        @click="handleConfirm(children.goodsCategoryId)">删除</Button>
                                                <Button size="default"
                                                        @click="handleEdit(children.goodsCategoryId)"
                                                        style="margin-left: 8px">修改</Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
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
            goodsCategoryId: '',
            productId: ""
        }),
        mounted() {
            this.handleActiveMenu('/goods/category/index');

            this.search = this.$store.state.goodsCategory.search;
            this.pageIndex = this.$store.state.goodsCategory.pageIndex;
            this.pageSize = this.$store.state.goodsCategory.pageSize;
            this.productId = this.$storage.getProductId();

            this.handleLoad();
        },
        methods: {
            handleLoad: function () {
                this.isLoad = true;

                var data = this.$store.state.goodsCategory.search;
                data = Object.assign(data, {
                    productId: this.productId,

                    pageIndex: this.$store.state.goodsCategory.pageIndex,
                    pageSize: this.$store.state.goodsCategory.pageSize
                });

                this.request({
                    url: '/ec/goods/category/admin/v1/list',
                    data: data,
                    success: (response) => {
                        this.total = response.data.total;
                        this.list = response.data.list;
                        for (let i = 0; i < this.list.length; i++) {
                            this.list[i].isShow = true;

                            if (typeof(this.list[i].children) != 'undefined') {
                                for (let j = 0; j < this.list[i].children.length; j++) {
                                    this.list[i].children[j].isShow = true;
                                }
                            }
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
            handleTabItem: function (id) {
                for (let i = 0; i < this.list.length; i++) {
                    var item = this.list[i];
                    if(item.goodsCategoryId == id) {
                        item.isShow = !item.isShow;

                        this.$set(this.list, i, item);
                    }
                    if (typeof(this.list[i].children) != 'undefined') {
                        for (let j = 0; j < this.list[i].children.length; j++) {
                            if(this.list[i].children[j].goodsCategoryId == id) {
                                this.list[i].children[j].isShow = !this.list[i].children[j].isShow;
                                this.$set(this.list[i].children, j,this.list[i].children[j]);
                            }
                        }
                    }
                }
            },
            handleSearch: function () {
                this.$store.commit('goodsCategory', {
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
                    path: '/goods/category/add',
                    query: {}
                });
            },
            handleEdit: function (goodsCategoryId) {
                this.$router.push({
                    path: '/goods/category/edit/' + goodsCategoryId,
                    query: {}
                });
            },
            handleDelete: function () {
                this.isLoad = true;
                this.isDelete = false;

                this.request({
                    url: '/ec/goods/category/admin/v1/delete',
                    data: {
                        goodsCategoryId: this.goodsCategoryId
                    },
                    success: (response) => {
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
            handleConfirm: function (id) {
                this.isDelete = true;
                this.goodsCategoryId = id;
            },
            handleChangePageIndex: function (pageIndex) {
                this.$store.commit('goodsCategory', {
                    pageIndex: pageIndex
                });

                this.handleLoad();
            },
            handleChangePageSize: function (pageSize) {
                this.$store.commit('goodsCategory', {
                    pageSize: pageSize
                });

                this.handleLoad();
            }
        }
    }
</script>
