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
.fontsize {
  font-size: 11px;
}
.size {
  width: 30px;
  height: 30px;
  margin: 5px;
}
</style>


<template>
  <div class="pages">
    <van-tabs v-model="active1">
      <van-tab title="首页" style="padding:5%">
        <table>
          <tr>
            <td>
              <div v-on:click="toCaculator">
                <img class="size" src="../../../assets/img/calc.png">
                <br>
                <font class="fontsize">计算器</font>
              </div>
            </td>
            <td>
              <div v-on:click="toImg">
                <img class="size" src="../../../assets/img/ocr.png">
                <br>
                <font class="fontsize">文字识别</font>
              </div>
            </td>
            <td></td>
          </tr>
        </table>
      </van-tab>
      <van-tab title="文章">
        <van-cell-group v-for="list in articles">
          <van-swipe-cell :right-width="60">
            <van-cell :title="list.articlE_NAME" v-on:click="toArticle(list.id)" :border="false"/>
            <van-button square slot="right" type="danger" text="删除"/>
          </van-swipe-cell>
        </van-cell-group>
        <div
          v-on:click="write"
          style="position: fixed; bottom: 0px; width: 100%;text-align: center;overflow: hidden; padding: 15px;"
        >
          <img class="size" src="../../../assets/img/release.png">
        </div>
      </van-tab>
      <van-tab title="个人中心"></van-tab>
      <van-tab title="关于"></van-tab>
    </van-tabs>
  </div>
</template>


<script>
import { Toast } from "vant";
import fsCfg from "../../../assets/js/fw";
export default {
  name: "Index",
  serverUrl: {
    API_GET_ALL_ARTICLE: "/api/article/user={0}"
  },
  data() {
    return {
      active1: 0,
      active2: 0,
      articles: []
    };
  },
  methods: {
    toArticle: function(list) {
      const index = location.href.lastIndexOf("/INDEX");
      const urlBase = location.href.substring(0, index);
      window.location.href = urlBase + "/INDEX/Article.html#/Essay?id=" + list;
    },
    toCaculator: function() {
      this.$router.push("Caculator");
    },
    toImg: function() {
      this.$router.push("ImageRead");
    },
    toCodeGenerate1: function() {
      this.$router.push("Code");
    },
    write: function() {
      const index = location.href.lastIndexOf("/INDEX");
      const urlBase = location.href.substring(0, index);
      window.location.href = urlBase + "/INDEX/Article.html";
    }
  },
  mounted: function() {
    var self = this;
    var user = window.sessionStorage.getItem("user");
    if (user != null && user != "") {
      var url = framework.strFormat(
        this.$options.serverUrl.API_GET_ALL_ARTICLE,
        user
      );
      fsCfg.getData(url, function(res) {
        if (res.success) {
          self.articles = res.data;
        }
      });
    }
  }
};
</script>