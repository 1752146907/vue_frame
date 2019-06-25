<template>
    <div>
        <div class="upload-list"
             v-for="(item, index) in viewImageList"
             :key="index">
            <div class="upload-list-img" :style="'background: url(' + application.imageHost + item.imagePath +')'"></div>
            <div class="upload-list-cover">
                <div class="padding-top-22">
                    <Icon type="ios-eye-outline"
                          size="22"
                          @click.native="handleView(item.imagePath)"></Icon>
                    <Icon type="ios-trash-outline"
                          size="20"
                          @click.native="handleRemoveSelect(index)"></Icon>
                </div>
            </div>
        </div>
        <div class="upload-list upload-list-add"
             v-if="viewImageList.length < this.number"
             @click="handleAddImage">
            <Icon type="md-add"
                  size="26" />
            <p>添加</p>
        </div>
        <Modal title="预览结果"
               v-model="visible">
            <img :src="previewImageUrl" v-if="visible" style="width: 100%">
        </Modal>
        <Modal  v-model="myUpload"
                title="我的上传"
                width="1000"
                loading
                scrollable>
            <Row type="flex">
                <Col span="4"
                     :xs="4"
                     :sm="4"
                     :md="3"
                     :lg="3"
                     v-for="(item, index) in checkList"
                     :key="index">
                <div class="upload-list"
                     v-on:click.stop="handleCheck(index)">
                    <div class="upload-list-img" :style="'background: url(' + application.imageHost + item.filePath +')'"></div>
                    <div class="upload-list-cover"
                         v-if="!item.isCheck">
                        <div class="padding-top-22">
                            <Icon type="ios-eye-outline"
                                  size="22"
                                  v-on:click.stop="handleView(item.filePath)" />
                            <Icon type="ios-trash-outline"
                                  size="20"
                                  v-on:click.stop="handleRemove(item.fileId)" />
                        </div>
                    </div>
                    <div class="upload-list-shadow"
                         v-if="item.isCheck"></div>
                    <Icon class="icon-chack"
                          color="#ffffff"
                          v-if="item.isCheck"
                          type="md-checkmark-circle-outline"
                          size="38" />
                </div>
                </Col>
                <Spin size="large" fix v-if="isLoad"></Spin>
            </Row>
            <div slot="footer"
                 class="modal-footer">
                <div class="footer-left">
                    <Upload :before-upload="handleBeforeUpload"
                            :action="application.imageHost"
                            style="display: inline-block;width:102px;margin-right: 10px;">
                        <Button icon="ios-cloud-upload-outline"
                                @click="handleBeforeUploadButtom(0)">上传图片</Button>
                    </Upload>
                    <Upload :before-upload="handleBeforeUpload"
                            :action="application.imageHost"
                            style="display: inline-block;width:102px;">
                        <Button icon="ios-cloud-upload-outline"
                                @click="handleBeforeUploadButtom(1)">上传原图</Button>
                    </Upload>
                </div>
                <div class="footer-right">
                    <Button icon="ios-close-circle-outline"
                            @click="handleCancel">取消</Button>
                    <Button type="primary"
                            icon="ios-checkmark-circle-outline"
                            @click="handleOk">确定</Button>
                </div>
            </div>
            <Page class="page"
                  :page-size="32"
                  @on-change="handlePage"
                  :total="totalPage"
                  show-total />
        </Modal>

        <Modal v-model="deleteTips"
               title="确认提示"
               @on-ok="handleDelteImage"
               @on-cancel="modalcancel">
            <p>确定删除该图片吗？</p>
        </Modal>
    </div>
</template>

<style scoped>
    .icon-chack{
        position: absolute;
        top: 26px;
        left: 0;
        right: 0;
    }
    .upload-list-shadow{
        position: absolute;
        top: 6px;
        right: 6px;
        bottom: 6px;
        left: 6px;
        background: rgba(0,0,0,.4);
    }
    .padding-top-22{
        padding-top: 22px;
    }
    .upload-list{
        display: inline-block;
        width: 94px;
        height: 94px;
        padding: 6px;
        text-align: center;
        line-height: 60px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #ffffff;
        position: relative;
        border: solid 1px rgba(0,0,0,.2);
        margin-right: 4px;
        position: relative;
    }
    .upload-list-img{
        width: 80px;
        height: 80px;
        background-size: contain !important;
        background-repeat: no-repeat !important;
        background-position: 50% !important;
    }
    .upload-list-cover{
        display: none;
        position: absolute;
        top: 6px;
        bottom: 6px;
        left: 6px;
        right: 6px;
        background: rgba(0,0,0,.6);
        cursor: pointer;
    }
    .upload-list:hover .upload-list-cover{
        display: block;
    }
    .upload-list-cover i{
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 30px 4px 0px 4px;
    }
    .upload-list-add{
        padding-top: 26px;
        font-size: 14px;
        cursor: pointer;
        line-height: 20px !important;
        background-color: #fbfbfb !important;
        border: 1px dashed #d9d9d9 !important;
    }
    .page{
        text-align: right;
        margin-top: 16px;
    }
    .modal-footer{
        display: flex;
        flex-direction: row;
    }
    .footer-left{
        flex: 1;
        text-align: left;
    }
    .footer-right{
        flex: 1;
    }
</style>

<script>
    import {Row, Col} from 'iview';
    import ImageCompressor from 'image-compressor.js';

    import mixin from '../common/mixin';

    export default {
        props: {
            number: {
                type: Number,
                required: true
            },
            settingOption: {
                type: Array,
                required: false
            },
            handle: {
                type: String,
                required: false
            }
        },
        components: {
            'Row': Row,
            'Col': Col,
            'ImageCompressor': ImageCompressor
        },
        mixins: [mixin],
        data: () => ({
            isLoad: false,
            deleteTips: false,
            viewImageList: [],
            checkList: [],
            previewImageUrl: '',
            myUpload: false,
            visible: false,
            selectNumber: 0,
            base64String: "",
            fileOriginalName: "",
            pageIndex: 0,
            pageSize: 32,
            quality: 0,
            totalPage: 0,
            deleteFileId: ''
        }),
        mounted() {
            setTimeout(() => {
                if(this.settingOption && this.settingOption.length > 0){
                    this.settingOption.map((data, index) => {
                        this.viewImageList.push({
                            imageId: this.settingOption[index].imageId,
                            imagePath: this.settingOption[index].imagePath
                        });
                    });
                }
            },1000);
        },
        methods: {
            handlePage (events) {
                this.pageIndex = events;
                this.handleImageList();
            },
            handleDelteImage () {
                this.isLoad = true;
                this.request({
                    url: this.application.imageHost + '/module/file/admin/v1/delete',
                    data: {
                        fileIdList: [this.deleteFileId],
                    },
                    success: (data) => {
                        this.deleteTips = false;
                        this.isLoad = false;
                        this.$Message.success("删除成功");
                        this.handleImageList();
                    },
                    error: (response) => {
                        this.isLoad = false;
                    },
                    complete: () => {

                    }
                });
            },
            modalcancel () {
                this.deleteTips = false;
            },
            handleRemoveSelect (index) {
                this.viewImageList.splice(index, 1);
                this.$emit(this.handle ? this.handle : 'checkImageList', this.viewImageList);
            },
            handleAddImage () {
                this.myUpload = true;
                this.handleImageList();
            },
            handleView (filePath) {
                this.previewImageUrl = this.application.imageHost + filePath;
                this.visible = true
            },
            handleBeforeUploadButtom (index) {
                this.quality = index;
            },
            handleBeforeUpload (file) {
                if (file) {
                    if (!/\.(jpeg|jpe|jpg|gif|png|webp)$/i.test(file.name)) {
                        this.$Message.success('图片格式不对');
                    }
                }
                if (file.size > 1024 * 1024 * 5) {
                    this.$Message.success('图片大小不能超过5M');

                    return false;
                }

                this.isLoad = true;
                new ImageCompressor(file, {
                    success: (result) => {
                        quality: this.quality;
                        const reader = new FileReader();
                        reader.onload = (e) => {
                            let base64String = e.currentTarget.result;
                            this.request({
                                url: this.application.imageHost + '/module/file/admin/v1/image/base64/upload',
                                data: {
                                    base64String: base64String,
                                    fileOriginalName: file.name
                                },
                                success: (response) => {
                                    this.handleImageList();
                                    this.$Message.success("上传成功");
                                },
                                error: (response) => {
                                    this.isLoad = false;

                                    this.$Message.error("上传失败");
                                },
                                complete: () => {

                                }
                            });
                        }

                        reader.readAsDataURL(result);
                    }
                })
                return false;
            },
            handleImageList () {
                this.request({
                    url: this.application.imageHost + '/module/file/admin/v1/image/list',
                    data: {
                        pageIndex: this.pageIndex,
                        pageSize: this.pageSize
                    },
                    success: (data) => {
                        data.data.list.map( (data, index) => {
                            data.filePath =  data.filePath;
                            data.isCheck = false;
                        })
                        this.selectNumber = 0;
                        this.checkList = data.data.list;
                        this.totalPage = data.data.total;
                        this.isLoad = false;
                    },
                    error: (response) => {
                        this.isLoad = false;
                    },
                    complete: () => {

                    }
                });
            },
            handleRemove (fileId) {
                this.deleteTips = true;
                this.deleteFileId = fileId;
            },
            handleOk () {
                this.checkList.map( (data, index) => {
                    if (data.isCheck) {
                        var checkList = {
                            imageId: data.fileId,
                            imagePath: data.filePath
                        }
                        this.viewImageList.push(checkList);
                        data.isCheck = false;
                    }
                });
                this.selectNumber = 0;
                this.myUpload = false;
                this.$emit(this.handle ? this.handle : 'checkImageList', this.viewImageList);
            },
            handleCancel () {
                this.myUpload = false;
            },
            handleCheck (index) {
                if((parseInt(this.selectNumber) + parseInt(this.viewImageList.length)) < this.number) {
                    if (this.checkList[index].isCheck) {
                        this.selectNumber -= 1;
                        this.checkList[index].isCheck = false;
                    } else {
                        this.selectNumber += 1;
                        this.checkList[index].isCheck = true;
                    }
                } else if ((parseInt(this.selectNumber) + parseInt(this.viewImageList.length)) == this.number) {
                    if (this.checkList[index].isCheck) {
                        this.checkList[index].isCheck = false;
                        this.selectNumber -= 1;
                    }
                }
            }
        }
    }
</script>
