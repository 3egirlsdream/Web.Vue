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
  width: 20%;
  height: 100vh;
  float: left;
  background: #fcfcfc;
  position: relative;
  //box-shadow: 1px 1px 2px lightgray;
}
.page_construct_right {
  padding-top: 2vh;
  width: 75%;
  background: #fff;
  height: 100vh;
  float: left;
  box-shadow: -1px 1px 2px lightgray;
  //padding: 2vh;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial,
    sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
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
  font-size: 2.6vh;
  margin-left: 2vh;
  font-weight: bold;
}
.article_content {
  text-indent: 2em;
  //font-family: Lora, source-han-serif-tc, serif;
  padding-right: 2vh;
  padding-top: 2vh;
  overflow: hidden;
  word-break: break-all;
  text-overflow: ellipsis;
  height: 10.6vh;
  margin-left: 2vh;
  font-size: 2vh;
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
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial,
    sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  margin-left: 4vh;
  font-size: 16px;
  font-weight: bold;
}
.detail_article_content {
  clear: both;
  height: auto;
  width: 100%;
  padding: 4vh;
}
.category_border_style {
  margin-left: 4vh;
  margin-top: -0.3em;
  //border-radius: 1px;
  //border: 0.5px solid springgreen;
  //height: 2.5vh;
  ///width: auto;
  //padding: 1px;
  float: left;
}
.category_font_style {
  color: lightblue;
  font-size: 1.7vh;
  display: inline-block;
  display: inline;
  zoom: 1;
  text-align: 2.5vh;
  line-height: 1.8vh;
  font-family: "行楷";
}
</style>

<template>
  <div class="pages">
    <div class="page_construct">
      <div class="page_construct_left">
        <div
          v-for="item in navigation"
          class="left_title_style"
          :style="{ height: item.height, background: item.clickbackground }"
          @click="selected(item)"
        >
          <div
            :style="{ background: item.background, height: item.height }"
            class="focus_div"
          ></div>
          <div
            class="textdiv"
            :style="{ 'line-height': item.height, 'font-size': item.fontsize }"
          >
            {{ item.title }}
          </div>
        </div>
        <div class="powered_by_style">Powered by .NetCore & Vue</div>
      </div>

      <div class="page_construct_right">
        <div v-for="item in items" class="article_style" v-show="index">
          <div class="article_name" @click="toDetail(item)">
            <a class="a_underline">{{ item.ARTICLE_NAME }}</a>
          </div>
          <div>
            <img :src="item.IMG_CODE" width="20%" style="float:left;" />
            <div style="width:70%;float:left;">
              <div class="article_content" v-html="item.INDEX_CONTENT"></div>
            </div>
          </div>

          <div class="article_time">{{ item.DATETIME_CREATED }}</div>
          <hr class="article_div" color="#f0f0f0" SIZE="1" />
        </div>

        <!-- 文章列表 -->
        <div v-show="writes" style="height:100vh;">
          <div  
            class="tabs-bar container"
            style="position: fixed;padding-left:2em;top: 0px;box-shadow:2px 2px 5px gray;z-index:999;"
          >
            <nav class="tags-list">
              <a
                v-for="category in categories"
                @click="focused(category)"
                v-bind:class="{ active: category.checked }"
                style="-webkit-order: -1; order: -1;margin-top:2.5em"
                class="tags-list-item waves-effect waves-button waves-light "
                >{{ category.name }}</a>
            </nav>
          </div>
          <div
            style="height:80vh; position: relative; margin-top:2em"
          >
            <div class="waterfall-item" style="clear:both; width:100%;">
              <article class="article-card archive-article" v-for="item in articles" style="margin:10px;float:left;">
                <div class="post-meta">
                  <time>{{item.DATETIME_CREATED}}</time>
                </div>
                <h3 class="post-title" itemprop="name">
                  <a class="post-title-link" @click="toDetail(item)"
                    >{{item.ARTICLE_NAME}}</a
                  >
                </h3>
              </article>
            </div>
          </div>

        </div>
        <!-- <div v-for="item in items" class="article_style" style="height:12vh;" v-show="writes">
          <div class="article_name" @click="toDetail(item)">
            <a class="a_underline">{{item.ARTICLE_NAME}}</a>
          </div>
          <div class="article_time">{{item.DATETIME_CREATED}}</div>
          <hr class="article_div"  color="#f0f0f0" SIZE="1"/>
        </div> -->

        <!-- 详细文章 -->
        <div class="detail_article" v-show="dtl">
          <!-- <img :src="detail.IMG_CODE" height="50vh" /> -->
          <div class="detail_article_header">
            <font class="detail_article_header_font post-footer">{{
              detail.ARTICLE_NAME
            }}</font>
            <br />

            <div class="category_border_style">
              <li class="article-tag-list-item">
                <a
                  class="article-tag-list-link waves-effect waves-button"
                  rel="tag"
                  >{{ detail.CATEGORY_NAME }}</a
                >
              </li>
              <br style="clear:both;" />
            </div>
          </div>
          <div
            class="detail_article_content markdown-body"
            v-html="detail.CONTENT_TRANSFERED"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import fsCfg from "../assets/js/fw";
import marked from "marked";
export default {
  name: "Index",
  serverUrl: {
    API_GET_ALL_ARTICLE: "/api/article/user={0}&category={1}",
    API_GET_ALL_ARTICLE_TO_PAGE: "/api/article/page/user={0}&category={1}&startIndex={2}&length={3}",
  },
  data() {
    return {
      categories: [],
      detail: [], //详细文章信息
      navigation: [
        {
          title: "3egirlsdream",
          content: "content",
          date: "2019/09/24 10:10:10",
          background: "#fff",
          height: "15vh",
          fontsize: "3.5vh",
        },
        {
          title: "Articles",
          content: "content",
          date: "2019/09/24 10:10:10",
          background: "#fff",
          height: "5vh",
          fontsize: "2.5vh",
        },
        {
          title: "About",
          content: "content",
          date: "2019/09/24 10:10:10",
          background: "#fff",
          height: "5vh",
          fontsize: "2.5vh",
        },
        {
          title: "Photograph",
          content: "content",
          date: "2019/09/24 10:10:10",
          background: "#fff",
          height: "5vh",
          fontsize: "2.5vh",
        },
      ],
      items: [], //文章列表
      index: true, //控制主页的显影
      writes: false, //控制文章页的显影
      dtl: false, //控制详细文章的显影
      page:10,
      articles:[]
    };
  },
  methods: {
    focused: function(event) {
      this.categories.forEach((element) => {
        element.checked = false;
      });
      event.checked = true;
      this.getArticleToPage();
    },
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
      else if (item.title == "Articles"){ 
        this.writes = true;
        this.getArticleToPage();
      }
    },

    toDetail(item) {
      this.detail = item;
      this.index = false;
      this.writes = false;
      this.dtl = true;
    },
    getAllArticle() {
      let self = this;
      var url = framework.strFormat(
        this.$options.serverUrl.API_GET_ALL_ARTICLE,
        "cxk", "全部"
      );
      fsCfg.getData(url, function(res) {
        if (res.success) {
          self.items = res.data;
          self.categories = [{ name: "全部", checked: true }];
          for (let index = 0; index < res.data.length; index++) {
            const element = res.data[index];
            var count = 0;
            self.categories.forEach((c) => {
              if (c.name == element.CATEGORY_NAME) count++;
            });
            var m = { name: element.CATEGORY_NAME, checked: false };
            if (count == 0) {
              self.categories.push(m);
            }
          }
          for (let i = 0; i < self.items.length; i++) {
            self.items[i].DATETIME_CREATED = self.items[i].DATETIME_CREATED.replace("T", " ");
            self.items[i].INDEX_CONTENT = self.items[i].CONTENT.replace(
              /<[^>].*?>/g,
              ""
            );
            self.items[i].CONTENT_TRANSFERED = marked(self.items[i].CONTENT);
          }
        }
      });
    },

    getArticleToPage() {
      let self = this;
      var category = "";
      for (let index = 0; index < self.categories.length; index++) {
        const element = self.categories[index];
        if(element.checked){
          category = element.name;
          break;
        }
      }
      var url = framework.strFormat(
        this.$options.serverUrl.API_GET_ALL_ARTICLE_TO_PAGE,
        "cxk", category, 0, 9999
      );
      fsCfg.getData(url, function(res) {
        if (res.success) {
          self.articles = res.data;
          for (let i = 0; i < self.items.length; i++) {
            if (self.articles[i].IMG_CODE != null)
            self.articles[i].DATETIME_CREATED = self.articles[i].DATETIME_CREATED.replace("T", " ");
            self.articles[i].CONTENT_TRANSFERED = marked(self.articles[i].CONTENT);
          }
        }
      });
    },

  },
  mounted: function() {
    const link = document.createElement("link");
    link.type = "text/css";
    link.rel = "stylesheet";
    link.href =
      "https://cdn.bootcss.com/github-markdown-css/2.10.0/github-markdown.min.css";
    document.head.appendChild(link);
    this.getAllArticle();
  },
};
</script>
