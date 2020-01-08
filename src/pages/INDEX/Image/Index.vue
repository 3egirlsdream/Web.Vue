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
}
.p {
  font-size: 17px;
}
.size {
  width: 30px;
  height: 30px;
  margin: 5px;
}
.imgcontent{
  width: 90%;
  margin-left:10px;
  margin-bottom: 10px;
}
</style>


<template>
  <div class="pages">
    <van-nav-bar
      title
      left-text="返回"
      right-text="发布"
      left-arrow
      @click-left="onClickLeft"
      @click-right="release"
    />
    
    <div v-for="item in items" v-on:click="toImg(item.ID)">
      <van-image round width="20px" height="20px" src="https://img.yzcdn.cn/vant/cat.jpeg"/>
      <img :src="item.IMG_CODE" width="100%" height="auto"/>
      <van-icon name="like-o" size="25px" style="margin-left:10px;"/>
      <van-icon name="share" size="25px" style="margin-left:10px;"/>
      <div class="imgcontent" style="">{{item.IMG_BASE64}}</div>
    </div>
    
  </div>
</template>


<script>
import fsCfg from "../../../assets/js/fw";
import { Toast } from "vant";
import { Image } from 'vant';
export default {
  name: "Index",
  serverUrl: {
    API_IS_LOGIN: "/api/values/login/user={0}&pwd={1}",
    API_WRITE_ARTICLE: "/api/article/write",
    API_GET_IMAGE: "/api/values/getimage={0}"
  },
  data() {
    return {
      active1: 0,
      active2: 0,
      articles: ["111", "1211"],
      value: "",
      title: "",
      date: null,
      user: null,
      items:[]
    };
  },
  methods: {
    onClickLeft: function() {
      this.$router.go(-1);
    },
    release: function() {
      this.$router.push("UpLoad");
    },
    toImg:function(item){
      Toast(item)
    }
  },
  mounted: function() {
    let self = this;
    var code = this.$route.query.code;
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
    //Toast(user);

    var url = framework.strFormat(
      this.$options.serverUrl.API_GET_IMAGE,
      user
    );
    fsCfg.getData(url, function(res) {
      if (res.success) {
        self.items = res.data;
        self.items.forEach(element => {
          element.IMG_CODE = "http://47.107.186.141/img/" + element.IMG_CODE;
        });
      }
    });

    var myDate = new Date();
    this.date = myDate.toLocaleString();
  }
};
</script>