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
                        <BreadcrumbItem>商品属性库</BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div class="title">
                    商品属性库
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

                <Form ref="form"
                      :model="goodsAttributeLibrary"
                      class="tab-form"
                      :label-width="100"
                      @keydown.native.enter.prevent="handleSubmit">
                    <div class="tab">
                        <div class="tab-title">
                            基本信息
                        </div>
                        <Row class="tab-form-row"
                             type="flex"
                             align="middle">
                            <Col :xs="24"
                                 :sm="12"
                                 :md="12"
                                 :lg="8">
                            <FormItem label="属性名"
                                      prop="goodsAttributeLibraryName"
                                      :rules="[{
                                            required: true,
                                            message: '请输入属性名'
                                          }]">
                                <Input v-model="goodsAttributeLibrary.goodsAttributeLibraryName"
                                       type="text"
                                       placeholder="请输入属性名"/>
                            </FormItem>
                            </Col>
                        </Row>
                    </div>
                    <div class="tab">
                        <div class="tab-title">
                            商品属性值
                            <Button type="primary"
                                    ghost
                                    class="tab-title-add"
                                    custom-icon="iconfont icon-plus-circle"
                                    :loading="isLoad"
                                    size="small"
                                    @click="handleAddAttribute">
                                新增
                            </Button>
                        </div>
                        <div class="tab-table">
                            <Table ref="table"
                                   size="large"
                                   :columns="[{
								width: 60,
								align: 'center'
							},
							{
								key: 'goodsAttributeLibraryName',
								title: '属性名'
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
													this.handleEdit(params.row._index, params.row.goodsAttributeLibraryName);
												}
											}
										}, '修改'),
										h('Button', {
											props: {
												size: 'default'
											},
											style: {
											    marginLeft: '10px'
											},
											on: {
												click: () => {
													this.handleDelte(params.row._index);
												}
											}
										}, '删除')
									]);
								}
							}]"
                                   :data="goodsAttributeLibraryValueList"
                                   :border="true"></Table>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
        <Modal v-model="isAddAttribute"
                title="商品属性"
                width="520"
                loading
                scrollable>
            <Row type="flex">
                <Input v-model="addAttributeValue"
                       placeholder="请输入新属性..."/>
            </Row>
            <div slot="footer"
                 class="modal-footer">
                <div class="footer-right">
                    <Button icon="ios-close-circle-outline"
                            @click="isAddAttribute = false">取消</Button>
                    <Button type="primary"
                            icon="ios-checkmark-circle-outline"
                            @click="handeleAddAttributeOk">确定</Button>
                </div>
            </div>
        </Modal>
    </div>
</template>

<style src="./detail.css" scoped></style>

<script>
    import {Row, Col, Breadcrumb, BreadcrumbItem, Button, Modal, Form, FormItem, Input, Table, Page} from 'iview';

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
            'Page': Page
        },
        mixins: [mixin],
        data: () => ({
            isLoad: false,
            isEdit: false,
            isAttributeValueEdit: -1,
            productId: '',
            addAttributeValue: '',
            isAddAttribute: false,
            goodsAttributeLibrary: {},
            goodsAttributeLibraryValueList: []
        }),
        mounted() {
            this.productId = this.$storage.getProductId();
            switch (this.$router.history.current.matched[0].path) {
                case '/goods/attribute/library/add':

                    break;
                case '/goods/attribute/library/edit/:goodsAttributeLibraryId':
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
                    url: '/ec/goods/attribute/library/admin/v1/find',
                    data: {
                        goodsAttributeLibraryId: this.$route.params.goodsAttributeLibraryId
                    },
                    success: (response) => {
                        this.goodsAttributeLibrary = response.data;
                        this.goodsAttributeLibraryValueList = response.data.goodsAttributeLibraryValueList;
                    },
                    error: (response) => {
                        this.$Message.error(response.message);
                    },
                    complete: () => {
                        this.isLoad = false;
                    }
                });
            },
            handleAddAttribute: function () {
                this.isAddAttribute = true;
                this.addAttributeValue = "";
            },
            handeleAddAttributeOk: function () {
                if (this.isAttributeValueEdit >= 0) {
                    this.goodsAttributeLibraryValueList[this.isAttributeValueEdit].goodsAttributeLibraryName = this.addAttributeValue;
                    this.isAttributeValueEdit = -1;
                    this.isAddAttribute = false;
                    return;
                }
                this.isAddAttribute = false;
                var value =  {goodsAttributeLibraryName: this.addAttributeValue};
                this.goodsAttributeLibraryValueList.push(value);
            },
            handleEdit: function (index, name) {
                this.isAddAttribute = true;
                this.addAttributeValue = name;
                this.isAttributeValueEdit = index;
            },
            handleDelte: function (index) {
                this.goodsAttributeLibraryValueList.splice(index, 1);
            },
            handleSubmit: function () {
                this.$refs.form.validate((valid) => {
                    if (valid) {

                        this.request({
                            url: this.isEdit ? '/ec/goods/attribute/library/admin/v1/update' : '/ec/goods/attribute/library/admin/v1/save',
                            data: {
                                productId: this.productId,
                                goodsAttributeLibraryName: this.goodsAttributeLibrary.goodsAttributeLibraryName,
                                goodsAttributeLibraryValueList: this.goodsAttributeLibraryValueList
                            },
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
            },
            handleChangePageIndex: function (pageIndex) {
                this.handleLoad();
            },
            handleChangePageSize: function (pageSize) {
                this.handleLoad();
            }
        }
    }
</script>
