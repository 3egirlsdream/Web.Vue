<style lang="less" scoped>
.pages {
  //background-color: #fff;
  font-family: Montserrat, Roboto, "Source Sans Pro", Helvetica, Arial, Lora,
    source-han-serif-tc, serif;
  overflow: hidden;
}

.page_construct {
  width: 90%;
  background: #fff;
  height: 100vh;
  margin: auto;
  box-shadow: 1px 1px 2px lightgray;
}
.page_construct_left {
  width: 30%;
  height: 100vh;
  float: left;
  background: #fcfcfc;
  position: relative;
  //box-shadow: 1px 1px 2px lightgray;
}
.page_construct_right {
  padding-top: 2vh;
  width: 70%;
  background: #fff;
  height: 100vh;
  float: left;
  box-shadow: -1px 1px 2px lightgray;
  //padding: 2vh;
  font-family: Lora,source-han-serif-tc,serif;
  overflow: auto;
}

div::-webkit-scrollbar {
  width: 0;
}

.left_title_style {
  height: 20vh;
  margin-top: 2vh;
  overflow: hidden;
}
.left_title_style:hover {
  background-color: orange;
}
.left_title_style:active {
  background-color: lightsalmon;
}

.focus_div {
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

.a_underline {
  color: black;
}
.a_underline:hover {
  text-decoration: underline;
  color: #7a422c;
}
.article_name {
  overflow: hidden;
  font-size: 3vh;
  margin-left: 2vh;
  font-weight: bold;
}
.article_content {
  text-indent: 2em;
  font-family: Lora, source-han-serif-tc, serif;
  padding-right: 2vh;
  padding-top:2vh;
  overflow: hidden;
  height: 10vh;
  margin-left: 2vh;
  font-size: 2.5vh;
}
.article_time {
  position: absolute;
  bottom: 3vh;
  font-size: 2vh;
  margin-left: 2.5vh;
  color: gray;
}
.article_div {
  margin: auto;
  left: 2vh;
  width: 96%;
  position: absolute;
  bottom: 0;
}
.article_line {
  margin: auto auto;
  color: #987cb9;
  size: 1;
  width: 90%;
  position: absolute;
  bottom: 0;
}
.article_style {
  height: 24vh;
  position: relative;
  overflow: hidden;
}
.article_style:hover {
  background: #f7f7f7;
}
.powered_by_style {
  position: absolute;
  bottom: 0;
  float: right;
  font-size: 1.5vh;
  text-align: right;
  width: 100%;
  padding: 2vh;
  color: lightgray;
}
.detail_article {
  height: 100vh;
  width: 100%;
}
.detail_article_header {
  margin-top: 10px;
  height: auto;
  width: 100%;
}
.detail_article_header_font {
  font-family: Lora,source-han-serif-tc,serif;
  margin-left: 4vh;
  font-size: 3vh;
  font-weight: bold;
}
.detail_article_content {
  text-indent: 2em;
  clear: both;
  height: auto;
  width: 100%;
  padding: 4vh;
  font-size: 2vh;
  font-family: Lora, source-han-serif-tc, serif;
}
.category_border_style{
  margin-left: 4vh;
  border-radius: 1px;
  border: 0.5px solid springgreen;
  height: 2.5vh;
  width: auto;
  padding: 1px;
  float: left;
}
.category_font_style{
  color:lightblue;
  font-size:1.7vh;
  display:inline-block;
  display:inline;
  zoom:1;
  float:left;
  text-align:2.5vh;
  line-height:1.8vh;
  font-family: '行楷'
}
</style>


<template>
  <div class="pages">
    <div class="page_construct">
      <div class="page_construct_left">
        <div
          v-for="item in navigation"
          class="left_title_style"
          :style="{'height':item.height, 'background':item.clickbackground}"
          @click="selected(item)"
        >
          <div :style="{'background':item.background, 'height':item.height}" class="focus_div"></div>
          <div
            class="textdiv"
            :style="{'line-height':item.height, 'font-size':item.fontsize}"
          >{{item.title}}</div>
        </div>
        <div class="powered_by_style">Powered by .NetCore & Vue</div>
      </div>

      <div class="page_construct_right">
        <div v-for="item in items" class="article_style" v-show="index">
          <div class="article_name" @click="toDetail(item)">
            <a class="a_underline">{{item.ARTICLE_NAME}}</a>
          </div>
          <div>
            <div class="article_content" style="width:70%;float:left;" v-html="item.INDEX_CONTENT"></div>
            <img :src="item.IMG_CODE" width="20%" style="float:left;"/>
          </div>
          
          <div class="article_time">{{item.DATETIME_CREATED}}</div>
          <hr class="article_div" color="#f0f0f0" SIZE="1"/>
        </div>

        <div v-for="item in items" class="article_style" style="height:12vh;" v-show="writes">
          <div class="article_name" @click="toDetail(item)">
            <a class="a_underline">{{item.ARTICLE_NAME}}</a>
          </div>
          <div class="article_time">{{item.DATETIME_CREATED}}</div>
          <hr class="article_div"  color="#f0f0f0" SIZE="1"/>
        </div>
        
        <!-- 详细文章 -->
        <div class="detail_article" v-show="dtl">
          <img :src="detail.IMG_CODE" width="100%"/>
          <div class="detail_article_header">
            <font class="detail_article_header_font">{{detail.ARTICLE_NAME}}</font>
            <br/>
            <div class="category_border_style">
              <font class="category_font_style">{{detail.CATEGORY_NAME}}</font>
              <br style="clear:both;">
            </div>
            
          </div>
          <p class="detail_article_content" v-html="detail.CONTENT"></p>
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
      detail: [], //详细文章信息
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
      items: [], //文章列表
      index: true, //控制主页的显影
      writes: false, //控制文章页的显影
      dtl: false //控制详细文章的显影
    };
  },
  methods: {
    selected: function(item) {
      for (let i = 0; i < this.navigation.length; i++) {
        this.navigation[i].background = "#fff";
        this.navigation[i].clickbackground = null;
      }
      item.background = "#9f563a";
      item.clickbackground = "orange";
      this.index = false;
      this.writes = false;
      this.dtl = false;
      if (item.title == "3egirlsdream") this.index = true;
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
            if(self.items[i].IMG_CODE != null) self.items[i].IMG_CODE = "http://47.107.186.141/img/" + self.items[i].IMG_CODE;
            self.items[i].DATETIME_CREATED = self.items[i].DATETIME_CREATED.replace("T", " ");
            self.items[i].INDEX_CONTENT = self.items[i].CONTENT.replace(/<[^>].*?>/g,"");
          }
        }
      });
    },
    
  },
  mounted: function() {
    this.getArticle();
  }
};


</script>