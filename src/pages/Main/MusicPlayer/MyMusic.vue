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
  height: 100vh;
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
</style>


<template>
  <div class="pages">
    <div class="page_construct_right" style="border-radius:25px;">
      <van-cell
        icon="arrow-left"
        style="background:transparent;"
        clickable
        @click="$router.go(-1)"
      />
      <van-cell icon="audio" value="播放全部" clickable @click="playAll()" style="background:transparent;"/>
      <van-row v-for="item in musics">
        <van-col span="2" style="margin: 12px 0px 10px 10px;">
          <van-icon name="like" :color="item.color" size="20" @click="ilikeClick(item.name)" />
        </van-col>
        <van-col span="16">
          <van-cell :key="item.name" :title="item.name" @click="onclickPlay(item.name)" />
        </van-col>
      </van-row>
    </div>

    <v-bottom-navigation
      style="background:#f1f3f4;"
      scroll-target="#scroll-area-1"
      hide-on-scroll
      absolute
      horizontal
    >
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
    API_GET_I_LIKE: "/api/music/GetMusics/like={0}",
    API_ADD_I_LIKE: "/api/music/AddILike"
  },
  data() {
    return {
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
      musics: [],
      src: null,
      detail: [], //详细文章信息
      active: 0,
      icon: {
        active: "https://img.yzcdn.cn/vant/user-active.png",
        inactive: "https://img.yzcdn.cn/vant/user-inactive.png"
      },
      items: [], //文章列表
      position: 0,
      audio: null,
      playlist: [],
      prex :"http://www.endingisnihility.xyz/mp3/"
    };
  },
  methods: {
    onclickPlay(item) {
      var self = this;
      this.src = "http://www.endingisnihility.xyz/mp3/" + item;
      setTimeout(function() {
        self.$refs.audio.play();
      }, 1000);
    },
    playAll() {
      let self = this;
      self.playlist = [];
      var ao = self.$refs.audio;
      this.audio = ao;
      this.audio.addEventListener("ended", this.playEndedHandler, false);
      this.musics.forEach(element => {
        self.playlist.push("http://www.endingisnihility.xyz/mp3/" + element.name);
      });
      this.audio.playlist = self.playlist;
      this.audio.position = 0;
      this.audio.src =
        self.playlist[self.audio.position % self.audio.playlist.length];
      setTimeout(function() {
        self.audio.play();
      }, 1000);
    },
    getall() {
      let self = this;
      var url = framework.strFormat(
        this.$options.serverUrl.API_GET_I_LIKE,
        "Y"
      );
      var res = fsCfg.getData(url, function(res) {
        if (res.success) {
          var data = res.data;
          self.musics = data;
          self.active = 0;
          self.src = self.prex + data[0].name;
        } else {
          Toast(res.message.content);
        }
      });
    },
    playEndedHandler: function() {
      let self = this;
      try{
        let self = this;
        this.position++;
        this.src = this.playlist[this.position % this.playlist.length];
        this.audio.src = this.src;
        setTimeout(()=>{
          self.audio.play();
        }, 1000)
      }
      catch{
        this.position--;
        setTimeout(() => {
          self.playEndedHandler();
        }, 1000);
      }
      
      
    },
    ilikeClick(name) {
      let self = this;
      var data = {
        USER_CODE: "SYS",
        MUSIC_NAME: name
      };
      fsCfg.postData(
        this.$options.serverUrl.API_ADD_I_LIKE,
        JSON.stringify(data),
        function(res) {
          if (res.success) {
            for (let index = 0; index < self.musics.length; index++) {
              const element = self.musics[index];
              if (element.name == name) {
                element.color = element.color == "red" ? "black" : "red";
              }
            }
          }
        }
      );
    }
  },

  mounted: function() {
    this.getall("All");
  }
};
</script>