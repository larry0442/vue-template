<template>
  <div>
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
            <a-input v-model="config.secretKey" type="password"></a-input>
          </a-form-item>
        </a-col>
        <a-col span="4">
          <a-form-item label="bucket:">
            <a-input v-model="config.bucket" type="text"></a-input>
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
        <a-col span="4">
          <a-form-item label="操作：">
            <a-button type="primary" @click="saveConfig">保存配置</a-button>
            <a-divider type="vertical"></a-divider>
            <a-button type="primary" @click="getConfig">获取配置</a-button>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <a-divider>operate</a-divider>
    <div class="operate">
      <a-button-group>
        <a-button type="primary">上传文件</a-button>
        <a-divider type="vertical"></a-divider>
        <a-button type="primary" @click="getFileListMethod">获取bucket中的文件列表</a-button>
      </a-button-group>
    </div>
    <div class="result">123</div>
  </div>
</template>

<script>
import { getFileList } from '../../services/file';

export default {
  name: 'Qiniu',
  data() {
    return {
      form: this.$form.createForm(this),
      config: {
        accessKey: '',
        secretKey: '',
        bucket: '',
        zone: '',
      },
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
    getFileListMethod() {
      getFileList({ bucket: this.config.bucket });
    },
  },
};
</script>

<style>
</style>
