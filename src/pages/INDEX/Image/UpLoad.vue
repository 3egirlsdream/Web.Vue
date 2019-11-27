<style lang="less" scoped>
.content {
  box-sizing: content-box !important;
  padding-bottom: 50px;
  background: #ffffff;

  .footer {
    width: 100%;
    position: fixed;
    bottom: 0;
    z-index: 2;
  }
}

.Gray {
  background-color: white;
  height: 10px;
}

.pages {
  background-color: white;
}

.p {
  font-size: 17px;
}

.size {
  width: 30px;
  height: 30px;
  margin: 5px;
}
</style>


<template>
  <div class="pages">
    <van-nav-bar
      title
      left-text="返回"
      right-text="发表"
      left-arrow
      @click-left="onClickLeft"
      @click-right="release"
    />
    <van-field v-model="value" type="textarea" autosize />
    <div v-for="item in images">
      <img style="margin-top:20px;" :src="item" width="100%" height="auto"/>
    </div>
    <label>
      <input
        type="file"
        name
        id="form"
        @change="uploadIMG"
        style="opacity:0;width:0;"
        accept="image/*"
      />
      <van-icon name="photograph" size="100px" />
    </label>
  </div>
</template>


<script>
import fsCfg from "../../../assets/js/fw";
import { Toast } from "vant";
import { Dialog, ImagePreview, Lazyload } from "vant";
export default {
  name: "Index",
  serverUrl: {
    API_IS_LOGIN: "/api/values/login/user={0}&pwd={1}",
    API_UPLOAD_IMG: "/api/values/UpLoadImage"
  },
  data() {
    return {
      active1: 0,
      active2: 0,
      value: "",
      title: "",
      date: null,
      user: null,
      ID: "",
      images: []
    };
  },
  methods: {
    onClickLeft: function() {
      this.$router.go(-1);
    },
    LoadEssay: function() {
      let self = this;
      var url = framework.strFormat(
        this.$options.serverUrl.API_GET_ARTICLE,
        self.ID
      );

      fsCfg.getData(url, function(res) {
        if (res.success) {
          self.title = res.data.articlE_NAME;
          self.value = res.data.content;
        }
      });
    },
    uploadIMG(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.picavalue = files[0];
      this.imgPreview(this.picavalue);
    },
    //获取图片
    imgPreview(file, callback) {
      let self = this;
      //判断支不支持FileReader
      if (!file || !window.FileReader) return;
      if (/^image/.test(file.type)) {
        //创建一个reader
        let reader = new FileReader();
        //将图片转成base64格式
        reader.readAsDataURL(file);
        //读取成功后的回调
        reader.onloadend = function() {
          let result = this.result;
          if (self.images.length > 1) return;
          self.images.push(this.result);
        };
      }
    },
    release: function() {
      let self = this;
      var data = {
        title: self.images,
        content: self.value,
        user: self.user
      };

      fsCfg.postData(
        this.$options.serverUrl.API_UPLOAD_IMG,
        JSON.stringify(data),
        function(res) {
          if (res.success) {
            self.$router.go(-1);
          } else {
            Toast("发布失败");
          }
        }
      );
    }
  },
  mounted: function() {
    this.ID = this.$route.query.id;
    var user = framework.getStorage("user");
    this.user = user;
    var pwd = framework.getStorage("pwd");
    var url = framework.strFormat(
      this.$options.serverUrl.API_IS_LOGIN,
      user,
      pwd
    );
    fsCfg.getData(url, function(res) {
      if (!res.success) {
        Toast("请登录");
        const index = location.href.lastIndexOf("/INDEX");
        const urlBase = location.href.substring(0, index);
        window.location.href = urlBase + "/SYSTEM/Login.html";
      }
    });

    this.LoadEssay();
  }
};
</script>