
<template>
<div>
  <input type="file" id="form" multiple @change="uploadIMG" accept="audio/mpeg" />
  <div v-for="(item, index) in filelist" :key="index">
    <span> {{item.MUSIC_NAME}}  {{item.ARTISTS}} {{item.CDN}}</span>
  </div>
  <button @click="postServer()">上传</button>
</div>
</template>

<script>
import framework from "../../../assets/js/framework";
import fsCfg from "../../../assets/js/fw";
import { Toast } from "vant";
import Axios from "axios";
export default {
  name: "Index",
  serverUrl: {
    API_IS_LOGIN: "/api/values/login/user={0}&pwd={1}",
    API_WRITE_ARTICLE: "/api/article/write",
    API_GET_IMAGE: "/api/values/getimage={0}",
    API_GET_TOKEN: "/api/Qiniu/GetToken",
  },
  data() {
    return {
      showKeyboard: true,
      value: "",
      user: "",
      date: null,
      user: null,
      items: [],
      token: "",
      filelist: [],
    };
  },
  methods: {
    getToken() {
      let self = this;
      this.$fsCfg.getData(
        this.$options.serverUrl.API_GET_TOKEN,
        function (res) {
          self.token = res.data;
          console.log(res);
        }
      );
    },
    uploadIMG(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      for (let i = 0; i < files.length; i++) {
        this.upload(files[i]);
      }
    },
    //获取图片
    imgPreview(file, callback) {
      let self = this;
      //判断支不支持FileReader
      if (!file || !window.FileReader) return;
      let reader = new FileReader();

      //将图片转成base64格式
      reader.readAsDataURL(file);
      //读取成功后的回调
      reader.onloadend = function () {
        let base64 = this.result;
        console.log(base64);
      };
    },

    upload(file) {
      let self = this;
      var formData = new FormData();
      formData.append("file", file);
      formData.append("token", this.token);
      Axios({
        headers: {
          "content-type": "multipart/form-data",
        },
        method: "post",
        url: "http://up-z2.qiniup.com",
        data: formData,
      }).then(function (response) {
        if (response != null && response.data != null) {
          let music = file.name.split("-");
          let _ = {
            MUSIC_NAME: music[1].split(".")[0],
            ARTISTS: music[0],
            CDN: response.data.key,
            QUALITY: "SQ",
          };
          self.filelist.push(_);
        }
      });
    },

    postServer(){
      let self = this;
      console.log(this.filelist);
      this.$fsCfg.postData("/api/qiniu/uploadmusic", JSON.stringify(this.filelist), function(res){
        if(res.success){

        }
        else{
          self.$toast(res.message.content);
        }
      })
    }
  },
  mounted: function () {
    let self = this;
    this.getToken();
  },
};
</script>
