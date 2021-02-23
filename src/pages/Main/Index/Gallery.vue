<style lang="less" scoped>


.Gray {
  background-color: white;
  height: 10px;
}
.pages {
  background-color: #fff;
  font-family:'Consolas', 'Fira Code Medium',Microsoft Yahei,monospace;
  overflow-x: hidden;
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
    <div class="center" style="background:#fff;width:100%;height:100%;">
      <!-- header -->
      <div>
        <nav>
          <div class="container" style="position: fixed;top: 0px; background:#fff;box-shadow:2px 2px 5px gray;">
            <div style="padding-left:20px;">
              <a class="title" href="/pages/Main/Index.html#/">3egirlsdream's Photography Column</a>
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
      <div v-for="item in items" style=" margin-top:100px;" :key="item">
        <div style="box-shadow:2px 2px 10px rgb(37, 36, 36);width:70%;height:500px;margin:auto;border-radius: 2px;">
          <div style="font-size:25px;height:40px;">{{item.title}}</div>
          <div style="font-size:20px;text-align:left;padding:10px;height:120px;overflow:hidden">&nbsp;&nbsp;&nbsp;{{item.content}}</div>
          <div style="font-size:15px;text-align:right;color:gray;height:40px; margin-right:20px;">{{item.date}}</div>
        </div>
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
      items:[ 
        { title :'title', content: '全球最大中文互动问答平台全球最大中文互动问答平台全球最大中文互动问答平台全球最大中文互动问答平台全球最大中文互动问答平台全球最大中文互动问答平台全球最大中文互动问答平台全球最大中文互动问答平台', date:'2019/09/24 10:10:10'}, 
        { title :'title', content: 'content', date:'2019/09/24 10:10:10'},
        { title :'title', content: 'content', date:'2019/09/24 10:10:10'},
        { title :'title', content: 'content', date:'2019/09/24 10:10:10'}]
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