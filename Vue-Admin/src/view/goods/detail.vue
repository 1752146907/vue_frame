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
                        <BreadcrumbItem>商品管理</BreadcrumbItem>
                        <BreadcrumbItem>{{isEdit ? '修改商品' : '添加商品'}}</BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div class="title">
                    {{isEdit ? '修改商品' : '添加商品'}}
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
                      :model="goods"
                      :label-width="100">
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
                            <FormItem label="商品分类"
                                      prop="goodsCategoryId"
                                      :rules="[{
									  	required: true,
										message: '请输入商品分类'
									  }]">
                                <Select v-model="goods.goodsCategoryId">
                                    <Option v-for="item in goodsCategoryArr" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                            </FormItem>
                            <FormItem label="商品名称"
                                      prop="goodsName"
                                      :rules="[{
									  	required: true,
										message: '请输入商品名称'
									  }]">
                                <Input v-model="goods.goodsName"
                                       type="text"
                                       placeholder="请输入商品名称"/>
                            </FormItem>
                            <FormItem label="商品类型"
                                      prop="goodsType"
                                      :rules="[{
									  	required: true,
										message: '请输入商品类型'
									  }]">
                                <Select v-model="goods.goodsType">
                                    <Option v-for="item in goodsTypeList" :value="item.value" :key="item.value">{{
                                        item.label }}
                                    </Option>
                                </Select>
                            </FormItem>
                            <FormItem label="商品编码"
                                      prop="goodsCode"
                                      :rules="[{
									  	required: true,
										message: '请输入商品编码'
									  }]">
                                <Input v-model="goods.goodsCode"
                                       type="text"
                                       placeholder="请输入商品编码"/>
                            </FormItem>
                            <FormItem label="商品图片"
                                      v-if="isEdit && goods.goodsImageList"
                                      prop="goodsVideoPath">
                                <imageUpload :number="4"
                                             :settingOption="goods.goodsImageList"
                                             @checkImageList = "handleUploadImageList" />
                            </FormItem>
                            <FormItem label="商品图片"
                                      v-if="!isEdit"
                                      prop="goodsVideoPath">
                                <imageUpload :number="4"
                                             :settingOption="goods.goodsImageList"
                                             @checkImageList = "handleUploadImageList" />
                            </FormItem>
                            <FormItem label="商品视频"
                                      prop="goodsVideoPath">
                                <Input v-model="goods.goodsVideoPath"
                                       type="text"
                                       disabled
                                       placeholder="请输入商品视频"/>
                            </FormItem>
                            <FormItem label="销售类型"
                                      prop="goodsSaleType"
                                      :rules="[{
									  	required: true,
										message: '请输入销售类型'
									  }]">
                                <Select v-model="goods.goodsSaleType">
                                    <Option v-for="item in goodsSaleTypeList" :value="item.value" :key="item.value">{{
                                        item.label }}
                                    </Option>
                                </Select>
                            </FormItem>
                            <FormItem label="运费"
                                      prop="goodsFreight"
                                      :rules="[{
									  	required: true,
										message: '请输入运费'
									  }]">
                                <InputNumber :min="0"
                                             :precision=2
                                             v-model="goods.goodsFreight"></InputNumber>
                            </FormItem>
                            <FormItem label="是否统一运费"
                                      prop="goodsIsUnifiedFreight">
                                <i-switch v-model="goods.goodsIsUnifiedFreight"/>
                            </FormItem>
                            <FormItem label="划线价"
                                      prop="goodsLineationPrice">
                                <InputNumber :min="0"
                                             :precision=2
                                             v-model="goods.goodsLineationPrice"
                                             placeholder="划线价"></InputNumber>
                            </FormItem>
                            <FormItem label="库存单位"
                                      prop="goodsStockUnit"
                                      :rules="[{
									  	required: true,
										message: '请输入库存单位'
									  }]">
                                <Input v-model="goods.goodsStockUnit"
                                       type="text"
                                       placeholder="请输入库存单位"/>
                            </FormItem>
                            <FormItem label="是否允许折扣"
                                      prop="goodsIsAllowDiscount">
                                <i-switch v-model="goods.goodsIsAllowDiscount"/>
                            </FormItem>
                            <FormItem label="会员限购"
                                      prop="goodsLimitPurchaseNumber"
                                      :rules="[{
									  	required: true,
										message: '请输入会员限购'
									  }]">
                                <InputNumber :min="0" v-model="goods.goodsLimitPurchaseNumber"></InputNumber>
                            </FormItem>
                            <FormItem label="排序"
                                      prop="goodsSort"
                                      :rules="[{
									  	required: true,
										message: '请输入排序'
									  }]">
                                <InputNumber :min="0" v-model="goods.goodsSort"></InputNumber>
                            </FormItem>
                            </Col>
                        </Row>
                    </div>
                </Form>
                <div class="tab margin-top-20">
                    <div class="tab-title">
                        规格信息
                        <div class="tab-title-sku">
                            是否多规格 <i-switch v-model="isSkuList" @on-change="handleIsSkuList" />
                        </div>
                    </div>
                    <!--单规格-->
                    <div v-for="(goodsSkuList, index) in goods.goodsSkuList"
                         :key="index"
                         style="position: relative"
                         v-if="!isSkuList" >
                        <Form ref="form2"
                              :model="goodsSkuList"
                              :label-width="100">
                                <Row class="tab-form-row"
                                     type="flex"
                                     align="middle">
                                    <Col :xs="24"
                                         :sm="12"
                                         :md="12"
                                         :lg="8">
                                        <FormItem label="编码"
                                                  prop="goodsSkuCode"
                                                  :rules="[{
                                                required: true,
                                                message: '请输入编码'
                                              }]">
                                            <Input v-model="goodsSkuList.goodsSkuCode"
                                                   type="text"
                                                   placeholder="请输入编码"/>
                                        </FormItem>
                                        <FormItem label="条形码"
                                                  prop="goodsSkuBarcode"
                                                  :rules="[{
                                                required: true,
                                                message: '请输入规格信息'
                                              }]">
                                            <Input v-model="goodsSkuList.goodsSkuBarcode"
                                                   type="text"
                                                   placeholder="请输入条形码"/>
                                        </FormItem>
                                        <FormItem label="价格(￥)"
                                                  prop="goodsSkuPrice"
                                                  :rules="[{
                                                required: true,
                                                message: '请输入规格信息'
                                              }]">
                                            <InputNumber :min="0"
                                                         :precision=2
                                                         v-model="goodsSkuList.goodsSkuPrice"
                                                         placeholder="价格"></InputNumber>
                                        </FormItem>
                                        <FormItem label="库存"
                                                  prop="goodsSkuStock"
                                                  :rules="[{
                                                required: true,
                                                message: '请输入规格信息'
                                              }]">
                                            <Input v-model="goodsSkuList.goodsSkuStock"
                                                   type="text"
                                                   placeholder="请输入库存"/>
                                        </FormItem>
                                    </Col>
                                </Row>
                        </Form>
                    </div>
                    <!--多规格-->
                    <div v-for="(goodsSkuConfigList, index) in goods.goodsSkuConfigList"
                         :key="index"
                         style="position: relative"
                         v-if="isSkuList" >
                        <Form ref="form2"
                              :model="goodsSkuConfigList"
                              :label-width="100">
                            <Row class="tab-form-row"
                                 type="flex"
                                 style="padding-bottom: 0px;border-bottom: 1px solid #f1f2f5;"
                                 align="middle">
                                <Col :xs="24"
                                     :sm="24"
                                     :md="24"
                                     :lg="24">
                                    <FormItem label="规格名"
                                              prop="attributeName"
                                              :rules="[{
                                                required: true,
                                                message: '请输入规格名'
                                              }]">
                                        <Input v-model="goodsSkuConfigList.attributeName"
                                               type="text"
                                               @on-blur="handleSkuComputeTitle"
                                               style="width: 302px; margin-right: 10px;"
                                               placeholder="请输入规格名" />
                                        <span @click="handleSkuAddImageCheckbox(index)">
                                            <Checkbox :value="goodsSkuConfigList.hasImage">添加图片</Checkbox>
                                        </span>
                                        <Icon class="tab-form-row-clone"
                                              type="ios-remove-circle-outline"
                                              color="#ea5b49"
                                              @click="handleDelteSku(index)"
                                              size="20" />
                                    </FormItem>
                                    <FormItem label="规格值"
                                              prop="valueAndImageList"
                                              :rules="[{
                                            required: true,
                                            message: '请输入规格值'
                                          }]">
                                        <span v-for="(item, itemIndex) in goodsSkuConfigList.valueAndImageList">
                                            <Input v-model="item.value"
                                                   type="text"
                                                   @on-change="handleSkuComputeValue"
                                                   style="width: 102px"
                                                   placeholder="请输入规格值"/>
                                            <Icon type="ios-remove-circle-outline"
                                                  color="#ea5b49"
                                                  style="margin-right: 30px;cursor: pointer;"
                                                  @click="handleDelteSkuValue(index, itemIndex)"
                                                  size="20" />
                                        </span>
                                        <Button type="dashed"
                                                @click="handleAddSkuName(index)"
                                                icon="md-add">添加规格名</Button>

                                        <div class="tab-form-row-image-upload"
                                             style="display: flex">
                                            <div style="margin-right: 54px; position: relative;"
                                                 v-if="goodsSkuConfigList.hasImage"
                                                 v-for="item in goodsSkuConfigList.valueAndImageList">
                                                <Icon class="tab-form-row-image-upload-clone"
                                                      type="ios-remove-circle-outline"
                                                      color="#999999"
                                                      size="20" />
                                                <imageUpload :number="1"
                                                             :handle="'handleSkuImage'"
                                                             @handleSkuImage = "handleSkuImage" />
                                            </div>
                                        </div>
                                    </FormItem>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                    <div class="add-sku-button"
                         v-if="isSkuList">
                        <Button type="dashed"
                                @click="handleAddSku"
                                icon="md-add">添加规格项目</Button>
                    </div>
                </div>
                <div class="tab margin-top-20"
                     v-if="isSkuList" >
                    <div class="tab-title">
                        规格明细
                    </div>
                    <div class="tab-table">
                        <Table ref="table"
                               size="large"
                               :columns="goodsSkuColumnsData"
                               :data="goodsSkuDataList"
                               :border="true"></Table>
                    </div>
                </div>
                <div class="tab margin-top-20">
                    <div class="tab-title">
                        商品详情
                    </div>
                    <div style="padding: 20px;">
                        <quillEditor @htmlForEditorValue="handleGetGoodsSkuList"
                                     v-model="goods.goodsDetail"
                                     v-if="!isEdit"
                                     :html="goods.goodsDetail" />
                        <quillEditor @htmlForEditorValue="handleGetGoodsSkuList"
                                     v-model="goods.goodsDetail"
                                     v-if="isEdit && goods.goodsDetail"
                                     :html="goods.goodsDetail" />
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
        InputNumber,
        Page
    } from 'iview';

    import mixin from '../../common/mixin';
    import quillEditor from '../../component/quillEditor';
    import imageUpload from '../../component/imageUpload';

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
            'Page': Page,
            quillEditor,
            imageUpload
        },
        mixins: [mixin],
        data: () => ({
            isLoad: false,
            isEdit: false,
            productId: '',
            isSkuList: false,
            goods: {
                goodsIsUnifiedFreight: false,
                goodsIsAllowDiscount: false,
                goodsSkuList: [{
                    goodsSkuAttributeList: [],
                    goodsSkuIsDefault: true,
                    goodsSkuCode: '',
                    goodsSkuBarcode: '',
                    goodsSkuPrice: 0,
                    goodsSkuStock: ''
                }],
                goodsSkuConfigList: []
            },
            goodsTypeList: [{
                value: 'FICTITIOUS',
                label: '虚拟商品'
            }, {
                value: 'ACTUAL',
                label: '实物商品'
            }, {
                value: 'E_CARD',
                label: '电子卡劵'
            }],
            goodsSaleTypeList: [{
                value: 'SINGLE',
                label: '单个销售'
            }, {
                value: 'GROUP',
                label: '组合销售'
            }],
            goodsCategoryArr: [],
            goodsSkuColumnsData: [],
            goodsSkuDataList: [],
            goodsSkuCloumns: [{
                key: 'goodsSkuBarcode',
                title: '编码',
                render: (h, params) => {
                    return h('div', [
                        h('Input', {
                            props: {
                                value: params.row.goodsSkuBarcode
                            },
                            style: {
                                marginRight: '5px'
                            },
                            on: {

                            }
                        }, )
                    ])
                }
            },
                {
                    key: 'goodsSkuCode',
                    title: '条形码',
                    render: (h, params) => {
                        return h('div', [
                            h('Input', {
                                props: {
                                    value: params.row.goodsSkuCode
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {

                                }
                            }, )
                        ])
                    }
                },
                {
                    key: 'goodsSkuPrice',
                    title: '市场价(￥)',
                    render: (h, params) => {
                        return h('div', [
                            h('InputNumber', {
                                props: {
                                    min: 0,
                                    precision: 2,
                                    value: parseInt(params.row.goodsSkuPrice)
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {

                                }
                            }, )
                        ])
                    }
                },
                {
                    key: 'goodsSkuStock',
                    title: '库存',
                    render: (h, params) => {
                        return h('div', [
                            h('Input', {
                                props: {
                                    value: params.row.goodsSkuStock
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {

                                }
                            }, )
                        ])
                    }
                },
                {
                    key: 'goodsSkuIsDefault',
                    title: '是否默认规格',
                    width: 180,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('i-switch', {
                                props: {
                                    type: 'primary',
                                    value: params.row.goodsSkuIsDefault
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    'on-change': () => {
                                        this.handleIsDefaultSku(params.row)
                                    }
                                }
                            }, )
                        ])
                    }
                }]
        }),
		mounted() {
            this.productId = this.$storage.getProductId();

            this.handleGetcategory();
            switch (this.$router.history.current.matched[0].path) {
                case '/goods/add':

                    break;
                case '/goods/edit/:goodsId':
                    this.isEdit = true;

                    this.handleLoad();

                    break;
                default:
                    break;
            }
        },
        methods: {
            handleGetData: function (productAttributeDomainList) {
                console.log(productAttributeDomainList)
                let dataList = [];
                for (let i in  productAttributeDomainList) {
                    var productAttributeDomain = productAttributeDomainList[i];

                    let newDataList = [];

                    for (let j in productAttributeDomain.valueAndImageList) {
                        if (productAttributeDomain.valueAndImageList[j] && productAttributeDomain.valueAndImageList[j].value) {

                            let oldDataList = JSON.parse(JSON.stringify(dataList));

                            if (oldDataList.length === 0) {
                                oldDataList.push({});
                            }

                            oldDataList.map(data => {
                                data[productAttributeDomain.attributeName] = productAttributeDomain.valueAndImageList[j].value;
                                return data;
                            });

                            newDataList = newDataList.length > 0 ? newDataList.concat(oldDataList) : oldDataList;
                        }
                    }

                    dataList = newDataList;
                }

                this.goodsSkuDataList = dataList.map( (item, index) => {
                    item.goodsSkuAttributeList = [],
                    item.goodsSkuCode = '',
                    item.goodsSkuBarcode = '',
                    item.goodsSkuPrice = 0,
                    item.goodsSkuStock = '',
                    item.goodsSkuIsDefault = (index === 0)

                    return item;
                });
            },
            handleDelteSkuValue: function (index, itemIndex) {
                this.goods.goodsSkuConfigList[index].valueAndImageList.splice(itemIndex, 1);
                this.handleGetData(this.goods.goodsSkuConfigList);
            },
            handleIsDefaultSku: function (data) {
                console.log(data)
            },
            handleSkuAddImageCheckbox: function (index) {
                for (let i = 0; i < this.goods.goodsSkuConfigList.length; i++) {
                    this.goods.goodsSkuConfigList[i].hasImage = false;
                }
                this.goods.goodsSkuConfigList[index].hasImage = true;
            },
            handleAddSkuName: function (index) {
                this.goods.goodsSkuConfigList[index].valueAndImageList.push({
                    imageId: '',
                    imagePath: '',
                    value: ''
                })
            },
            handleDelteSku: function (index) {
                this.goods.goodsSkuConfigList.splice(index, 1);
                this.goodsSkuColumnsData.splice(index, 1);
                 this.handleGetData(this.goods.goodsSkuConfigList);
            },
            handleIsSkuList: function (status) {
                this.isSkuList = status;
                this.goods.goodsSkuConfigList = [];
                this.goods.goodsSkuList = {
                    goodsSkuList: [{
                        goodsSkuAttributeList: [],
                        goodsSkuIsDefault: true,
                        goodsSkuCode: '',
                        goodsSkuBarcode: '',
                        goodsSkuPrice: 0,
                        goodsSkuStock: ''
                    }],
                }
            },
            handleSkuComputeTitle: function () {
                this.goodsSkuColumnsData = this.goods.goodsSkuConfigList.map((item, index) => {
                    console.log(typeof(item.attributeName) != 'undefined')
                    console.log(this.goods.goodsSkuConfigList)
                    // && typeof(this.goods.goodsSkuConfigList.valueAndImageList[index].value) != 'undefined'
                    return {
                        key: item.attributeName,
                        title: item.attributeName
                    }
                }).concat(this.goodsSkuCloumns);
            },
            handleSkuComputeValue: function () {
                this.handleGetData(this.goods.goodsSkuConfigList);
            },

            handleAddSku: function () {

                this.goods.goodsSkuConfigList.push({
                    attributeName: '',
                    hasImage: false,
                    valueAndImageList: [{
                        imageId: '',
                        imagePath: '',
                        value: ''
                    }]
                });

                if (this.goods.goodsSkuConfigList.length == 1) {
                    return;
                }
            },
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
            handleUploadImageList: function (data) {
                let goodsImageList = [];
                for (let i = 0; i < data.length; i++) {
                    goodsImageList.push({
                        imageId: data[i].imageId,
                        imagePath: data[i].imagePath
                    });
                }
                this.goods.goodsImageList = goodsImageList;
            },
            handleSkuImage: function (data) {
                console.log(data);
            },
            handleGetGoodsSkuList: function (data) {
                this.goods.goodsDetail = data;
            },
            handleLoad: function () {
                this.isLoad = true;

                this.request({
                    url: '/ec/goods/admin/v1/shop/find',
                    data: {
                        goodsId: this.$route.params.goodsId
                    },
                    success: (response) => {
                        if (response.data.goodsSkuList.length > 1) {
                            this.isSkuList = true;
                        }

                        this.goods = response.data;
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
                        this.goods.productId = this.productId;
                        this.goods.goodsVideoPath = "";
                        this.goods.goodsSkuConfigList = [];

                        var data = this.goods;

                        this.isLoad = true;
                        this.request({
                            url: this.isEdit ? '/ec/goods/admin/v1/shop/update' : '/ec/goods/admin/v1/shop/save',
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
