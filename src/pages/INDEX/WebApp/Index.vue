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
  <div>
    <van-tabs v-model="active1">
      <van-tab title="首页">
        <van-grid :clickable="clickable" square>
          <van-grid-item v-on:click="toCaculator" icon="edit" text="计算器" />
          <van-grid-item v-on:click="toImg" icon="scan" text="文字识别" />
          <van-grid-item v-on:click="toWordCloud" icon="smile-comment-o" text="词云" />
          <van-grid-item v-on:click="toImage" icon="photo-o" text="画廊" />
          <van-grid-item icon="more-o" text="..." />
        </van-grid>
      </van-tab>
      <van-tab title="文章">
        <van-cell-group v-for="list in articles">
          <van-swipe-cell :right-width="60">
            <van-cell :title="list.articlE_NAME" v-on:click="toArticle(list.id)" :border="false"/>
            <van-button square slot="right" type="danger" text="删除" v-on:click="Delete(list.id)"/>
          </van-swipe-cell>
        </van-cell-group>
        <div
          v-on:click="write"
          style="position: fixed; bottom: 0px; width: 100%;text-align: center;overflow: hidden; padding: 15px;"
        >
          <img class="size" src="../../../assets/img/release.png" />
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
      articles: [],
      clickable: true
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
    toImage: function() {
       const index = location.href.lastIndexOf("/INDEX");
      const urlBase = location.href.substring(0, index);
      window.location.href = urlBase + "/INDEX/Image.html";
    },
    toCodeGenerate1: function() {
      this.$router.push("Code");
    },

    toWordCloud() {
      const index = location.href.lastIndexOf("/INDEX");
      const urlBase = location.href.substring(0, index);
      window.location.href = urlBase + "/INDEX/WordCloud.html";
    },

    write: function() {
      const index = location.href.lastIndexOf("/INDEX");
      const urlBase = location.href.substring(0, index);
      window.location.href = urlBase + "/INDEX/Article.html";
    },
    Delete: function(id){
      Toast("unused");
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