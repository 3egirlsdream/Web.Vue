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
  background-color: gray;
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
    <div style="padding-top:50px;">
      <van-cell-group style="margin:15px;">
        <van-field v-model="user" placeholder="请输入用户名" :clearable="true" style="height:48px;"/>
        <van-field v-model="sendto" placeholder="请输入聊天用户" :clearable="true" style="height:48px;"/>
      </van-cell-group>
      <!-- <van-password-input :value="value" info="密码为 6 位数字" @focus="showKeyboard = true"/>
      <van-number-keyboard
        :show="showKeyboard"
        @input="onInput"
        @delete="onDelete"
        @blur="showKeyboard = false"
      /> -->
      <van-row type="flex" style="padding:15px;">
        <!-- <van-button type="primary" size="large" @click="register">注册</van-button> -->
        <van-button type="warning" size="large" @click="login">登录</van-button>
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
    API_REGISTER: "http://47.107.186.141:4396/api/values/",
    API_LOGIN: "/api/values/login/user={0}&pwd={1}"
  },
  data() {
    return {
      showKeyboard: true,
      value: "",
      user: "",
      sendto:""
    };
  },
  methods: {
    onInput(key) {
      this.value = (this.value + key).slice(0, 6);
    },
    onDelete() {
      this.value = this.value.slice(0, this.value.length - 1);
    },
    register: function() {
          const index = location.href.lastIndexOf("/SYSTEM");
          const urlBase = location.href.substring(0, index);
          window.location.href = urlBase + "/SYSTEM/Signup.html"
          console.log(response);
    },
    login: function() {
      let self = this;
      // var url = framework.strFormat(
      //   this.$options.serviceUrl.API_LOGIN,
      //   this.user,
      //   this.value
      // );
      framework.setStorage('user', self.user);
      framework.setStorage('pwd', self.value);
      framework.setStorage("login", "YES");
      framework.setStorage('sendto', self.sendto);
      
      const index = location.href.lastIndexOf("/Chat");
      const urlBase = location.href.substring(0, index);
      window.location.href = urlBase + "/Chat/Index.html#/"
      // fsCfg.getData(url, function(res){
      //   if(res.success){
      //     Toast(res.data);
      //     const index = location.href.lastIndexOf("/SYSTEM");
      //     const urlBase = location.href.substring(0, index);
      //     window.location.href = urlBase + "/INDEX/WebApp.html"
      //   }
      //   else{
      //     Toast(res.message.content);
      //   }
      // });
      
    }
  },
  mounted: function() {
    //weChatCfg.WechatConfig(location.href.split("#")[0]);
  }
};
</script>