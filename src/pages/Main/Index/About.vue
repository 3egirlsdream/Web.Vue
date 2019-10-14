<style lang="less" scoped>


.Gray {
  background-color: white;
  height: 10px;
}
.pages {
  background-color: #fff;
  font-family:'Consolas', 'Fira Code Medium',Microsoft Yahei,monospace;
  height: 100%;
}

// a{
//   color:black;
//   padding: 5px;
//   font-size: 14px;
// }

.menu{
  a{
    color:black;
    padding: 5px;
    font-size: 9px;
  }
  
    a:hover{
      color: green;
    }
}
</style>


<template>
  <div class="pages">
    <div class="center" style="background:#fff;">
      <!-- header -->
      <div>
        <nav>
          <div class="container" style="position: fixed;top: 0px; background:#fff;box-shadow:2px 2px 5px gray;">
            <div style="padding-left:20px;">
              <a class="title" href="/pages/Main/Index.html#/About">About</a>
            </div>
            <div class="menu" style="padding-right:20px;">
              <a href="">Blogs</a>
              <a href="">Categories</a>
              <a href="">Gallery</a>
              <a href="">About</a>
            </div>
          </div>
        </nav>
      </div>

      <!-- body -->
        <div style="box-shadow:2px 2px 10px lightgray;width:30%;height:100%;border-radius: 2px;">
          <li>aaaa</li>
          <li>aaaa</li>
          <li>aaaa</li>
          <li>aaaa</li>
          <li>aaaa</li>
          <li>aaaa</li>
          <li>aaaa</li>
          <li>aaaa</li>

        </div>
    </div>
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
      items:[]
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