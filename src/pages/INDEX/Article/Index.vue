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
    <van-cell-group>
      <font
        color="gray"
        style="font-family: 'Courier New', Courier, monospace;margin-left:17px;font-size:10px;"
      >{{date}}</font>
      <van-field v-model="title" placeholder="请输入标题"/>
      <van-field v-model="value" type="textarea" min-height="100%" :autosize="{minHeight:1000}"/>
    </van-cell-group>
  </div>
</template>


<script>
import fsCfg from "../../../assets/js/fw";
import { Toast } from "vant";
export default {
  name: "Index",
  serverUrl: {
    API_IS_LOGIN: "/api/values/login/user={0}&pwd={1}",
    API_WRITE_ARTICLE: "/api/article/write"
  },
  data() {
    return {
      active1: 0,
      active2: 0,
      articles: ["111", "1211"],
      value: "",
      title: "",
      date: null,
      user: null
    };
  },
  methods: {
    onClickLeft: function() {
      this.$router.go(-1);
    },
    release: function() {
      let self = this;
      var data = {
        title: self.title,
        content: self.value,
        user: self.user
      };

      fsCfg.postData(
        this.$options.serverUrl.API_WRITE_ARTICLE,
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
    var code = this.$route.query.code;
    var user = window.sessionStorage.getItem("user");
    this.user = user;
    var pwd = window.sessionStorage.getItem("pwd");
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

    var myDate = new Date();
    this.date = myDate.toLocaleString();
  }
};
</script>