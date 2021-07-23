<style lang="less" scoped>
.pages {
  overflow: hidden;
  height: 100vh;
}
</style>


<template>
  <div class="pages">
    <van-nav-bar title="BB音乐" style="position: sticky;top:0" />
    <mine @play="onclickPlay"></mine>
    
    <div  style="background:#f1f3f4;bottom: 0px;position: absolute;width: 100%;z-index:9999;height:48px" v-show="!showLyric">
    <div @click="showLyric = true" style="float:left;">
      <img class="size" src="../../../assets/img/music.png" v-show="!show" />
      <img class="size" src="../../../assets/img/music1.png" v-show="show" />
    </div>
     <audio  ref="audio" preload="auto" controls="controls" :src="src" class="width100-48" style="float:left;height:48px">
      <source :src="src" type="audio/mpeg" />
    </audio>
    </div>
   
    <van-popup v-model="showLyric" position="bottom" :style="{height:'100%', width:'100%'}">
      <lyric v-if="showLyric" @close="showLyric = false" :audio="$refs.audio" :item="item"></lyric>
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
  },
  data() {
    return {
      showLyric: false,
      show: false,
      images: [
        "https://cdn.wallpaperhub.app/cloudcache/d/0/c/a/6/7/d0ca67fb67d065130241cde719fbef2908393ffd.png",
        "https://cdn.wallpaperhub.app/cloudcache/4/4/1/9/d/9/4419d949c0724e36f4ac108715ebfb507ac0740e.jpg",
      ],
      Singers: [],
      musics_after_search: [],
      searchText: "",
      searchShow: false,
      finished: false,
      loading: false,
      src: "http://www.endingisnihility.xyz/mp3/Hero.mp3",
      musics: [],
      detail: [], //详细文章信息
      active: 0,
      icon: {
        active: "https://img.yzcdn.cn/vant/user-active.png",
        inactive: "https://img.yzcdn.cn/vant/user-inactive.png",
      },
      items: [],
      item:{},
      audio: null,
      playlist: [],
      playstatus:0,//0 单曲循环 1 顺序播放 2 列表循环
    };
  },
  components: {
    mine: () => import("./components/mine.vue"),
    lyric: () => import("./components/lyricCard.vue"),
  },
  methods: {
    onclickPlay(item) {
      var self = this;
      this.item = item;
      this.src = "http://cdn.endingisnihility.xyz/" + item.CDN;
      console.log(this.src);
      setTimeout(function () {
        self.$refs.audio.play();
      }, 1000);
    },
    playEndedHandler: function () {
      try {
        let self = this;
        this.position++;
        if (this.playlist.length > 0) {
          this.src = this.playlist[this.position % this.playlist.length];
          this.audio.src = this.src;
          setTimeout(() => {
            self.audio.play();
          }, 1000);
        }
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
    tabClick(name, title) {
      if (title == "搜索") {
        this.searchShow = true;
      }
    },
  },
  mounted: function () {
    this.active = 0;
    this.audio = this.$refs.audio;
    this.audio.addEventListener("ended", this.playEndedHandler, false);
    
    setInterval(() => {
      this.show = !this.show;
    }, 1000);
  },
};
</script>

<style scoped>
.width100-48{
  width:calc(100%-48px);
}
</style>