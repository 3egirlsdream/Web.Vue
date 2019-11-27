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
    <van-nav-bar title left-text="返回" left-arrow @click-left="onClickLeft"/>
    <van-cell-group :border="false">
      <div style="margin-top:10px;">
        <font
          color="black"
          style="font-family: 'Courier New', Courier, monospace;margin-left:14px;font-size:20px;"
        >{{title}}</font>
      </div>
      <van-field
        v-model="value"
        type="textarea"
        min-height="100%"
        :autosize="{minHeight:500}"
        :readonly="true"
      />
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
    API_GET_ARTICLE: "/api/article/id={0}"
  },
  data() {
    return {
      active1: 0,
      active2: 0,
      value: "",
      title: "",
      date: null,
      user: null,
      ID: ""
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