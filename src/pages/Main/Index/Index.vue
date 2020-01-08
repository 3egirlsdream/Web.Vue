<style lang="less" scoped>

.pages {
  //background-color: #fff;
  font-family: Montserrat, Roboto, "Source Sans Pro", Helvetica, Arial, Lora,
    source-han-serif-tc, serif;
  overflow: hidden;
}


.pageconstruct {
  width: 80%;
  background: #fcfcfc;
  height: 100vh;
  margin: auto;
}
.pageconstructleft {
  width: 30%;
  height: 100vh;
  float: left;
  position: relative;
}
.pageconstructright {
  width: 70%;
  background: #fff;
  height: 100vh;
  float: left;
  box-shadow: 1px 1px 2px lightgray;
  //padding: 2vh;
  font-family: "仿宋";
  overflow: auto;
}

div::-webkit-scrollbar {
  width: 0;
}

.lefttitlestyle {
  height: 20vh;
  margin-top: 2vh;
  overflow: hidden;
}
.lefttitlestyle:hover {
  background-color: orange;
}
.lefttitlestyle:active {
  background-color: lightsalmon;
}

.focusdiv {
  float: right;
  height: 20vh;
  width: 1%;
}
.textdiv {
  float: right;
  margin-right: 5vh;
  //font-family: 'Consolas' 'Arial', 'Helvetica', '微软等线Light';
  //overflow-x: hidden;
  cursor: pointer;
  transition: all 0.2s linear;
  color: #000;
  font-weight: 1;
}

.aunderline {
  color: black;
}
.aunderline:hover {
  text-decoration: underline;
  color: #7a422c;
}
.articlename {
  overflow: hidden;
  font-size: 3vh;
  margin-bottom: 1vh;
  font-weight: bold;
}
.articleconten {
  overflow: hidden;
  height: 12vh;
  font-size: 2vh;
}
.articletime {
  position: absolute;
  bottom: 1vh;
  font-size: 2vh;
}
.articleline {
  width: 98%;
  height: 0px;
  border: 0.5px solid lightgray;
  position: absolute;
  bottom: 0;
}
.articlestyle {
  margin: 2vh;
  height: 21vh;
  position: relative;
  overflow: hidden;
}
.powerbystyle {
  position: absolute;
  bottom: 0;
  float: right;
  font-size: 1.5vh;
  text-align: right;
  width: 100%;
  padding: 2vh;
  color: lightgray;
}
.detailarticle {
  height: 100vh;
  width: 100%;
}
.detailarticleheader {
  margin-top: 10px;
  height: 3vh;
  width: 100%;
}
.detailarticleheaderfont {
  font-family: "Courier New", Courier, monospace;
  margin-left: 14px;
  font-size: 3vh;
}
.detailarticlecontent {
  height: 90vh;
  width: 100%;
  padding: 3vh;
  font-size: 2vh;
}
</style>


<template>
  <div class="pages">
    <div class="pageconstruct">
      <div class="pageconstructleft">
        <div
          v-for="item in navigation"
          class="lefttitlestyle"
          :style="{'height':item.height}"
          @click="selected(item)"
        >
          <div :style="{'background':item.background, 'height':item.height}" class="focusdiv"></div>
          <div
            class="textdiv"
            :style="{'line-height':item.height, 'font-size':item.fontsize}"
          >{{item.title}}</div>
        </div>
        <div class="powerbystyle">Power by .NetCore & Vue</div>
      </div>

      <div class="pageconstructright">
        <div v-for="item in items" class="articlestyle" v-show="index">
          <div class="articlename" @click="toDetail(item)">
            <a class="aunderline">{{item.ARTICLE_NAME}}</a>
          </div>
          <div class="articleconten">{{item.CONTENT}}</div>
          <div class="articletime">{{item.DATETIME_CREATED}}</div>
          <div class="articleline"></div>
        </div>

        <div v-for="item in items" class="articlestyle" style="height:10vh;" v-show="writes">
          <div class="articlename" @click="toDetail(item)">
            <a class="aunderline">{{item.ARTICLE_NAME}}</a>
          </div>
          <div class="articletime">{{item.DATETIME_CREATED}}</div>
          <div class="articleline"></div>
        </div>

        <!-- 详细文章 -->
        <div class="detailarticle" v-show="dtl">
          <div class="detailarticleheader">
            <font class="detailarticleheaderfont">{{detail.ARTICLE_NAME}}</font>
          </div>
          <div class="detailarticlecontent">{{detail.CONTENT}}</div>
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
      detail: [],//详细文章信息
      navigation: [
        {
          title: "3egirlsdream",
          content: "content",
          date: "2019/09/24 10:10:10",
          background: "#fff",
          height: "15vh",
          fontsize: "3.5vh"
        },
        {
          title: "Articles",
          content: "content",
          date: "2019/09/24 10:10:10",
          background: "#fff",
          height: "5vh",
          fontsize: "2.5vh"
        },
        {
          title: "About",
          content: "content",
          date: "2019/09/24 10:10:10",
          background: "#fff",
          height: "5vh",
          fontsize: "2.5vh"
        },
        {
          title: "Photograph",
          content: "content",
          date: "2019/09/24 10:10:10",
          background: "#fff",
          height: "5vh",
          fontsize: "2.5vh"
        }
      ],
      items: [],//文章列表
      index: true,//控制主页的显影
      writes: false,//控制文章页的显影
      dtl: false//控制详细文章的显影
    };
  },
  methods: {
    selected: function(item) {
      for (let i = 0; i < this.navigation.length; i++) {
        this.navigation[i].background = "#fff";
      }
      item.background = "#9f563a";
      this.index = false;
      this.writes = false;
      this.dtl = false;
      if (item.title == "3egrilsdream") this.index = true;
      else if (item.title == "Articles") this.writes = true;
    },

    toDetail(item) {
      this.detail = item;
      this.index = false;
      this.writes = false;
      this.dtl = true;
    },
    getArticle() {
      let self = this;
      var url = framework.strFormat(
        this.$options.serverUrl.API_GET_ALL_ARTICLE,
        "cxk"
      );
      fsCfg.getData(url, function(res) {
        if (res.success) {
          self.items = res.data;
          for (let i = 0; i < self.items.length; i++) {
            self.items[i].DATETIME_CREATED = self.items[
              i
            ].DATETIME_CREATED.replace("T", " ");
          }
        }
      });
    }
  },
  mounted: function() {
    this.getArticle();
  }
};
</script>