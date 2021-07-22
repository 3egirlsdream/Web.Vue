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

    <audio ref="audio" preload="auto" controls="controls" :src="src" style="background:#f1f3f4;bottom: 0px;position: absolute;width: 100%;z-index:9999">

      <source :src="src" type="audio/mpeg" />
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
    API_SEARCH: "/api/music/Search?value={0}",
  },
  data() {
    return {
      boxes: ["我喜欢的音乐", "FM", "···"],
      icons: ["play", "audio", "graphic", "column", "invition"],
      images: [
        "https://cdn.wallpaperhub.app/cloudcache/d/0/c/a/6/7/d0ca67fb67d065130241cde719fbef2908393ffd.png",
        "https://cdn.wallpaperhub.app/cloudcache/4/4/1/9/d/9/4419d949c0724e36f4ac108715ebfb507ac0740e.jpg",
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
        "买辣椒也用券",
      ],
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
      items: [
        {
          color: "#952175",
          src: "https://cdn.vuetifyjs.com/images/cards/halcyon.png",
          title: "Halcyon Days",
          artist: "Ellie Goulding",
        },
      ],
      index: true, //控制主页的显影
      writes: false, //控制文章页的显影
      dtl: false, //控制详细文章的显影
      prex: "http://www.endingisnihility.xyz/mp3/",
      audio: null,
    };
  },
  components: {
    mine: () => import("./components/mine.vue"),
  },
  methods: {
    onclickPlay(item) {
      var self = this;
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
  },
};
</script>