<template>
  <div class="main">
    <a-form
      :form="form"
      layout="vertical"
    >
      <a-row :gutter="16">
        <a-col span="6">
          <a-form-item label="Access Key:">
            <a-input v-model="config.accessKey"></a-input>
          </a-form-item>
        </a-col>
        <a-col span="6">
          <a-form-item label="Secret Key:">
            <a-input
              v-model="config.secretKey"
              type="password"
            ></a-input>
          </a-form-item>
        </a-col>
        <a-col span="4">
          <a-form-item label="bucket:">
            <a-input
              v-model="config.bucket"
              type="text"
            ></a-input>
          </a-form-item>
        </a-col>
        <a-col span="4">
          <a-form-item label="加速域名:">
            <a-input
              v-model="config.cdnUrl"
              type="text"
            ></a-input>
          </a-form-item>
        </a-col>
        <a-col span="4">
          <a-form-item label="bucket 所在机房：">
            <a-select v-model="config.zone">
              <a-select-option value="qiniu.zone.Zone_z0">华东（qiniu.zone.Zone_z0）</a-select-option>
              <a-select-option value="qiniu.zone.Zone_z1">华北（qiniu.zone.Zone_z1）</a-select-option>
              <a-select-option value="qiniu.zone.Zone_z2">华南（qiniu.zone.Zone_z2）</a-select-option>
              <a-select-option value="qiniu.zone.Zone_na0">北美（qiniu.zone.Zone_na0）</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col span="24">
          <a-form-item label="操作：">
            <a-button-group>
              <a-button
                type="primary"
                @click="saveConfig"
              >保存配置</a-button>
              <a-divider type="vertical"></a-divider>
              <a-button
                type="primary"
                @click="getConfig"
              >获取配置</a-button>
              <a-divider type="vertical"></a-divider>
              <a-button
                type="primary"
                @click="handleUpload"
              >上传文件</a-button>
              <a-divider type="vertical"></a-divider>
              <a-button
                type="primary"
                @click="getFileListMethod"
              >获取bucket中的文件列表</a-button>
            </a-button-group>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <div class="list-content">
      <a-list :data-source="listData">
        <a-list-item
          slot="renderItem"
          slot-scope="item, index"
        >
          <a slot="actions">delete</a>
          <a slot="actions">rename</a>
          <a-list-item-meta>
            <span
              slot="title"
              :key="index"
            >{{ item.title }}</span>
            <span slot="description">{{item.description}}</span>
            <span slot="avatar" style="cursor: pointer" @click="handlePreview(item.avatar)">
              <a-avatar :src="item.avatar" />
            </span>
          </a-list-item-meta>
        </a-list-item>
      </a-list>
    </div>
    <upload-modal
      ref="uploadModal"
      :visible="isShowUoloadModal"
      @close="()=>{isShowUoloadModal = false}"
      @refresh="getFileListMethod"
    ></upload-modal>
    <a-modal
      ref="priviewModal"
      :visible="previewVisible"
      :footer="null"
      @cancel="()=>{previewVisible = false}"
    >
      <img
        alt="example"
        style="width: 100%"
        :src="previewImage"
      />
    </a-modal>
  </div>
</template>

<script>
import { getFileList } from '../../services/file';
import UploadModal from './components/UploadModal.vue';

export default {
  name: 'Qiniu',
  components: {
    UploadModal,
  },
  data() {
    return {
      form: this.$form.createForm(this),
      config: {
        accessKey: '',
        secretKey: '',
        bucket: '',
        cdnUrl: '',
        zone: '',
      },
      listData: [],
      isShowUoloadModal: false,
      previewVisible: false,
      previewImage: '',
    };
  },
  created() {
    this.getConfig();
  },
  methods: {
    getConfig() {
      const config = window.localStorage.getItem('config');
      if (config) {
        this.config = JSON.parse(config);
      }
    },
    saveConfig() {
      window.localStorage.setItem('config', JSON.stringify(this.config));
    },
    handleUpload() {
      this.isShowUoloadModal = true;
    },
    getFileListMethod() {
      getFileList({ bucket: this.config.bucket }).then((res) => {
        this.listData = res.data.items.map((item, index) => ({
          id: index + new Date(),
          title: item.key,
          description: `http://${this.config.cdnUrl}/${item.key}`,
          avatar: `http://${this.config.cdnUrl}/${item.key}`,
        }));
      });
    },
    handlePreview(src) {
      this.previewImage = src;
      this.previewVisible = true;
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  .list-content {
    height: 650px;
    width: 100%;
    overflow: scroll;
  }
}
</style>
