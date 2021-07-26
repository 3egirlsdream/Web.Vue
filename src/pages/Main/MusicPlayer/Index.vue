<style lang="less" scoped>
.pages {
  overflow: hidden;
  height: 100vh;
}
</style>


<template>
  <div>
    <van-nav-bar title="BB音乐" style="position: sticky;top:0" @click-right="showMore = true">
      <template #right> 
        <van-icon name="weapp-nav" />
      </template>
    </van-nav-bar>
    <mine @play="onclickPlay" @addmusic="addMusic"></mine>

    <div style="background:#f1f3f4;bottom: 0px;position: absolute;width: 100%;z-index:9999;height:48px;overflow:hidden">
      <div @click="showLyric = true" style="float:left;">
        <img class="size" src="../../../assets/img/music.png" v-show="!show" />
        <img class="size" src="../../../assets/img/music1.png" v-show="show" />
      </div>
      <audio ref="audio" preload="auto" controls="controls" :src="src" class="width100-48" style="float:left;height:48px">
        <source :src="src" type="audio/mpeg" />
      </audio>
    </div>

    <van-popup v-model="showLyric" position="bottom" :style="{height:'100%', width:'100%'}">
      <lyric v-if="showLyric" @close="showLyric = false" :item="item" :status="status" :playlist="playlist"></lyric>
    </van-popup>

    <van-popup v-model="showMore" position="bottom" :style="{height:'86px', width:'100%'}" style="z-index:9999999">
      <van-grid>
        <van-grid-item icon="close" text="注销" clickable @click="logout"/>
      </van-grid>
    </van-popup>
  </div>

</template>


<script>
export default {
  name: "Index",
  serverUrl: {
    API_GET_ALL: "/api/music/GetMusics?like={0}&start={1}&length={2}",
    API_ADD_I_LIKE: "/api/music/AddILike",
    API_SEARCH: "/api/music/Search?value={0}",
    API_COUNT_PLUS:'/api/Music/CountPlus?cdn={0}'
  },
  data() {
    return {
      showMore:false,
      showLyric: false,
      show: false,
      musics_after_search: [],
      searchText: "",
      searchShow: false,
      finished: false,
      loading: false,
      src: "",
      item: {},
      audio: null,
      playlist: [],
      status: { playStatus: "single" }, //single 单曲循环 loop 列表循环
    };
  },
  components: {
    mine: () => import("./components/mine.vue"),
    lyric: () => import("./components/lyricCard.vue"),
  },
  watch:{
    item(val){
      framework.setStorage('src', JSON.stringify(val));
    }
  },
  methods: {
    onclickPlay(item) {
      var self = this;
      this.item = item;
      this.addMusic(item);
      this.src = "http://cdn.endingisnihility.xyz/" + item.CDN;
      console.log(this.src);
      setTimeout(function () {
        self.play();
      }, 1000);
    },
    playEndedHandler: function () {
      let self = this;
      this.position++;
      if (this.status.playStatus == "single") {
        self.play();
      } else if (this.status.playStatus == "loop") {
        if (this.playlist.length > 0) {
          this.item = this.playlist[this.position % (this.playlist.length - 1)];
          this.audio.src = this.item.CDN;
          setTimeout(() => {
            self.play();
          }, 1000);
        } else {
          self.play();
        }
      }
    },

    play(){
      this.audio.play();
      this.countPlus(this.item.CDN);
    },
    onclick() {
      this.$router.push({ path: "favours" });
    },
    tabClick(name, title) {
      if (title == "搜索") {
        this.searchShow = true;
      }
    },
    addMusic(item){
      var idx = this.playlist.findIndex(v=>v.MUSIC_NAME == item.MUSIC_NAME);
      if(idx < 0){
        this.playlist.push(item);
        this.$toast('添加成功');
        let json = JSON.stringify(this.playlist);
        framework.setStorage('playlist', json);
      }
      else{
        this.$toast('已存在列表');
      }
    },
    logout(){
      const index = location.href.lastIndexOf("/pages");
      const urlBase = location.href.substring(0, index);
      window.location.href = urlBase + "/pages/SYSTEM/Login.html";
    },
    countPlus(cdn){
      let url = framework.strFormat(this.$options.serverUrl.API_COUNT_PLUS, cdn);
      this.$fsCfg.get(url).then((res)=>{
        if(!res.success){
          this.$toast(res.message.content);
        }
      }).catch((err)=>{
        this.$toast(err);
      })
    }
  },
  mounted: function () {
    this.audio = this.$refs.audio;
    this.audio.addEventListener("ended", this.playEndedHandler, false);
    let pl = framework.getStorage('playlist');
    if(pl != '' && pl != undefined && pl != null){
      this.playlist = JSON.parse(pl);
    }

    let item = framework.getStorage('src');
    if(item != null && item != undefined && item != ""){
      this.item = JSON.parse(item);
      this.src = "http://cdn.endingisnihility.xyz/" + this.item.CDN;
    }

    setInterval(() => {
      this.show = !this.show;
    }, 1000);
  },
};
</script>

<style scoped>
.width100-48 {
  width: calc(100%-48px);
}
</style>