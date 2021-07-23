<style lang="less" scoped>
.pages {
  overflow: hidden;
  height: 100vh;
}

.page_construct_right {
  background: transparent;
  height: 100vh;
  width: 100%;
  overflow: auto;
}

.bg {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}

.bg::before {
  content: "";
  position: absolute;

  /* 固定模糊层位置 */
  width: 215%;
  height: 200%;
  left: -100%;
  /* 回调模糊层位置 */
  top: -102%;
  /* 回调模糊层位置 */
  background: url("http://cdn.endingisnihility.xyz/162116760003467.jpg")
    no-repeat;

  filter: blur(20px);
  /* 值越大越模糊 */
  z-index: 16;
}

/* .rgba {
width: 100%;
height: 100%;
background-color: rgba(0, 0, 0, 0.2);
z-index: -1;
}
*/
.content {
  width: 200px;
  height: 100px;
  background-color: yellow;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
}

.header-style {
  font-size: 20px;
  width: 100%;
  text-align: left;
  margin: 10px;
  font-weight: 700;
}
.artist-style {
  font-size: 14px;
  width: 100%;
  text-align: left;
  margin: 10px;
  font-weight: 400;
  font-family: "黑体";
}
</style>


<template>
  <div class="pages" style="">

    <div class="page_construct_right bg">
      <van-nav-bar title="" style="position: sticky;top:0;z-index:99999;background:transparent;border:0px;" @click-left="$emit('close')">
        <template #left>
          <van-icon name="arrow-down" />
        </template>
      </van-nav-bar>

      <van-image src="http://cdn.endingisnihility.xyz/162116760003467.jpg" style="z-index:99999;text-align:center;width:80vw;height:80vw;margin:10vw;">
        <van-row>
          <van-col span="20">
            <div class="header-style">{{item.MUSIC_NAME}}</div>
          </van-col>
          <van-col span="4">
            <van-icon name="like" size="25" :color="item.COLOR" />
          </van-col>
        </van-row>
        <van-row>
          <div class="artist-style"> {{item.ARTISTS}}</div>
        </van-row>
        <van-row style="height:30%;"></van-row>
        <van-row>
          <van-col span="6"><van-icon name="underway" size="25"/></van-col>
          <van-col span="6"><van-icon name="comment" size="25"/></van-col>
          <van-col span="6"><van-icon name="share" size="25"/></van-col>
          <van-col span="6"><van-icon name="weapp-nav" size="25"/></van-col>
        </van-row>
      </van-image>

    </div>
    <audio ref="audio" preload="auto" controls="controls" :src="src" style="background:#f1f3f4;bottom: 0px;position: absolute;width: 100%;z-index:99999">
    </audio>
  </div>
</template>


<script>
import { Toast } from "vant";
export default {
  name: "Index",
  serverUrl: {
    API_GET_I_LIKE:
      "/api/music/GetMusics?like={0}&start={1}&length={2}&user={3}",
    API_ADD_I_LIKE: "/api/music/AddILike",
  },
  components: {
    musicatom: () => import("./musicatom.vue"),
  },
  props: {
    audio: HTMLAudioElement,
    item: Object,
  },
  data() {
    return {
      src: "",
      playlist: [],
      show: true,
    };
  },
  methods: {
    ellipsis(item) {
      console.log(item);
    },
    onClick(item) {
      this.$emit("play", item);
    },
  },

  mounted: function () {
    console.log(this.audio);
    this.$refs.audio = this.audio;
  },
};
</script>