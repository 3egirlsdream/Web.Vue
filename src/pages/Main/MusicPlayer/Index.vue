<style lang="less" scoped>
.pages {
  overflow: hidden;
  height: 100vh;
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
  background: #fff;
  height: 90vh;
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
  font-size: 4vh;
  margin-left: 2vh;
  font-weight: bold;
}
.article_content {
  text-indent: 2em;
  font-family: Lora, source-han-serif-tc, serif;
  padding-right: 2vh;
  padding-top: 2vh;
  overflow: hidden;
  height: 10vh;
  margin-left: 2vh;
  font-size: 3vh;
}
.article_time {
  position: absolute;
  bottom: 3vh;
  font-size: 2.5vh;
  margin-left: 2.5vh;
  color: black;
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
  font-family: "Courier New", Courier, monospace;
  margin-left: 4vh;
  font-size: 4vh;
}
.detail_article_content {
  text-indent: 2em;
  clear: both;
  height: auto;
  width: 100%;
  padding: 4vh;
  font-size: 3vh;
  font-family: Lora, source-han-serif-tc, serif;
}
.category_border_style {
  margin-left: 4vh;
  border-radius: 1px;
  border: 0.5px solid springgreen;
  height: 3.9vh;
  width: auto;
  padding: 1px;
  float: left;
}
.category_font_style {
  color: lightblue;
  font-size: 2.5vh;
  display: inline-block;
  display: inline;
  zoom: 1;
  float: left;
  text-align: 3vh;
  line-height: 3vh;
}

.footer {
  grid-row-start: 2;
  grid-row-end: 3;
}

.van-tabs__content {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  z-index: 999;
  overflow: scroll;
}

.back_1 {
  border-radius: 5px;
  background: url("https://cdn.wallpaperhub.app/cloudcache/8/f/e/9/c/8/8fe9c82ddad8072931176875ed43074c5ef78e1e.jpg")
    no-repeat;
  background-size: cover;
  width: 25%;
  float: left;
  height: 100px;
  position: relative;
  margin: 4%;
}

.demo2 {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100px;
  line-height: 100px;
  text-align: center;
  float: left;
  background: rgba(255, 255, 255, 0.3);
}

.container {
  background-color: rgba(255, 255, 255, 0.1);
  height: 100%;
}
</style>


<template>
  <div class="pages">
    <van-nav-bar title="BB音乐" style="position: sticky;top:0" />
    <mine></mine>
    
      <audio ref="audio" preload="auto" controls="controls" :src="src"  style="background:#f1f3f4;bottom: 0px;position: absolute;width: 100%;">
        <!-- <source src="../../../mp3/我乐意.mp3" type="audio/mpeg" /> -->
        <!-- <source :src="src" type="audio/mpeg" /> -->
      </audio>



    <v-bottom-navigation v-if="false" style="background:#f1f3f4;" scroll-target="#scroll-area-1" hide-on-scroll absolute horizontal>
      <img class="size" src="../../../../assets/img/music.png" v-show="!show" />
      <img class="size" src="../../../../assets/img/music1.png" v-show="show" />
      <audio ref="audio" controls="controls" preload="auto" :src="src">
        <!-- <source src="../../../mp3/我乐意.mp3" type="audio/mpeg" /> -->
        <!-- <source :src="src" type="audio/mpeg" /> -->
      </audio>
    </v-bottom-navigation>
   

  

  </div>

</template>


<script>
import { Toast } from "vant";
import fsCfg from "../../../assets/js/fw";
export default {
  name: "Index",
  serverUrl: {
    API_GET_ALL: "/api/music/GetMusics?like={0}&start={1}&length={2}",
    API_ADD_I_LIKE: "/api/music/AddILike",
    API_SEARCH:"/api/music/Search?value={0}"
  },
  data() {
    return {
      boxes: ["我喜欢的音乐", "FM", "···"],
      icons: ["play", "audio", "graphic", "column", "invition"],
      images: [
        "https://cdn.wallpaperhub.app/cloudcache/d/0/c/a/6/7/d0ca67fb67d065130241cde719fbef2908393ffd.png",
        "https://cdn.wallpaperhub.app/cloudcache/4/4/1/9/d/9/4419d949c0724e36f4ac108715ebfb507ac0740e.jpg"
      ],
      Singers: [
        "All",
        "许嵩",
        "米津玄师",
        "王菲",
        "周杰伦",
        "李健",
        "薛之谦",
        "双笙",
        "买辣椒也用券"
      ],
      musics_after_search:[],
      searchText:'',
      searchShow:false,
      finished:false,
      loading:false,
      src: "http://www.endingisnihility.xyz/mp3/许嵩 - 医生.mp3",
      musics: [],
      src: null,
      detail: [], //详细文章信息
      active: 0,
      icon: {
        active: "https://img.yzcdn.cn/vant/user-active.png",
        inactive: "https://img.yzcdn.cn/vant/user-inactive.png"
      },
      items: [
        {
          color: "#952175",
          src: "https://cdn.vuetifyjs.com/images/cards/halcyon.png",
          title: "Halcyon Days",
          artist: "Ellie Goulding"
        }
      ],
      index: true, //控制主页的显影
      writes: false, //控制文章页的显影
      dtl: false, //控制详细文章的显影
      prex :'http://www.endingisnihility.xyz/mp3/'
    };
  },
  components:{
    mine:()=> import('./components/mine.vue'),
  },
  methods: {
    onclickPlay(item) {
      var self = this;
      this.src = "http://www.endingisnihility.xyz/mp3/" + item;
      setTimeout(function() {
        self.$refs.audio.play();
      }, 1000);
    },
     playEndedHandler: function () {
      try {
        let self = this;
        this.position++;
        this.src = this.playlist[this.position % this.playlist.length];
        this.audio.src = this.src;
        setTimeout(() => {
          self.audio.play();
        }, 1000);
      } catch {
        this.position--;
        setTimeout(() => {
          self.playEndedHandler();
        }, 1000);
      }
    },
    onclick() {
      this.$router.push({ path: "favours" });
    },
    tabClick(name, title){
      if(title == "搜索"){
        this.searchShow = true;
      }
    },
  },
  mounted: function() {
    this.active = 0;
    this.audio = this.$refs.audio;
    this.audio.addEventListener("ended", this.playEndedHandler, false);
  }
};
</script>