<style lang="less" scoped>
.content {
  box-sizing: content-box !important;
  padding-bottom: 50px;
  background: #fafafa;
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
  height: 100%;
  width: 100%;
  position: absolute;
}
.p {
  font-size: 17px;
}
</style>


<template>
  <div class="pages">
    <div>
      <van-cell-group>
        <van-cell title="头像" title-style="text-align:center;line-height:30px" is-link>
          <label>
            <input
              type="file"
              name
              id="form"
              @change="addImg"
              style="opacity:0;width:0;"
              accept="image/*"
            >
            <van-icon :name="headImg" size="20px"/>
          </label>
        </van-cell>
        <van-field v-model="username" label="账号" placeholder :clearable="true"/>
        <van-field v-model="displayname" label="昵称" placeholder :clearable="true"/>
        <van-field v-model="password" label="密码" type="password" :clearable="true" @input="onchange"/>
      </van-cell-group>

      <van-row type="flex" style="position: fixed; bottom: 0px; width: 100%;text-align: center;overflow: hidden; padding: 15px;">
        <van-button type="warning" size="large" @click="Signup">注册</van-button>
      </van-row>
    </div>
  </div>
</template>


<script>
import framework from "../../../assets/js/framework";
import fsCfg from "../../../assets/js/fw";
import { Toast } from "vant";
import Axios from "axios";

export default {
  name: "Index",
  serviceUrl: {
    API_REGISTER: "/api/values/SignUp",
    API_LOGIN: "/api/values/login/user={0}&pwd={1}"
  },
  data() {
    return {
      headImg: "",
      username: "",
      displayname: "",
      password:""
    };
  },
  methods: {
    addImg(e) {
      let self = this;
      let files = e.target.files || e.dataTransfer.files;
      let reader = new FileReader();

      //将图片转成base64格式
      reader.readAsDataURL(files[0]);
      reader.onloadend = function() {
        self.headImg = this.result;
      }
      
    },
    Signup:function(){
      let self = this;
      fsCfg.postData(this.$options.serviceUrl.API_REGISTER, JSON.stringify({
        img: self.headImg,
        username:self.username,
        displayname:self.displayname,
        password: self.password
      }), function(res){
        if(res != null){
          window.location.href = "http://47.107.186.141/m/pages/SYSTEM/Login.html"
        }
      });
        
      //alert(this.headImg);
    },
    onchange:function(){
      if(this.password.length > 6){
        alert("密码长度为6")
        this.password = this.password.slice(0, this.password.length - 1)
      }
    }
  },
  mounted: function() {
    this.headImg = "contact";
  }
};
</script>