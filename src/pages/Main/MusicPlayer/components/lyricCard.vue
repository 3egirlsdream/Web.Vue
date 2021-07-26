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
  <div class="pages">
    <div class="page_construct_right bg">
      <van-icon name="arrow-down" size="20" style="position: sticky;top:0; left:10px; z-index:99;background:transparent;border:0px;" @click="$emit('close')"/>

      <van-image src="http://cdn.endingisnihility.xyz/162116760003467.jpg" style="z-index:99;text-align:center;width:80vw;height:80vw;margin:10vw;">
        <van-row>
          <van-col span="20">
            <div class="header-style">{{item.MUSIC_NAME}}</div>
          </van-col>
          <van-col span="4">
            <van-icon name="like-o" size="25" :color="item.COLOR" />
          </van-col>
        </van-row>
        <van-row>
          <div class="artist-style"> {{item.ARTISTS}}</div>
        </van-row>
        <van-row style="height:30%;"></van-row>
        <van-row>
          <van-col span="6" @click="changeStatus">
            <van-icon v-show="status.playStatus == 'loop'" name="replay" size="25"/>
            <van-image v-show="status.playStatus == 'single'" src="http://cdn.endingisnihility.xyz/replay.png" width="25" height="25"></van-image>
          </van-col>
          <van-col span="6"><van-icon name="comment-o" size="25"/></van-col>
          <van-col span="6"><van-icon name="share-o" size="25"/></van-col>
          <van-col span="6">
             <van-popover v-model="show" trigger="click" placement="top" >
                <playlistCard :playlist="playlist"></playlistCard>
                <template #reference>
                    <van-icon name="orders-o" size="25"/>
                  </template>
              </van-popover>
          </van-col>
        </van-row>
      </van-image>

     
    </div>
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
    playlistCard:()=>import('./playlistCard.vue')
  },
  props: {
    item: Object,
    status:Object,
    playlist:Array
  },
  data() {
    return {
      src: "http://cdn.endingisnihility.xyz/llskvrestDSYprLbumb8LFzCQfOY",
      show: true,
    };
  },
  watch:{
    status(val){
      console.log(val)
    }
  },
  methods: {
    showPlaylist(){
      console.log(1);
    },
    changeStatus(){
      this.status.playStatus = this.status.playStatus == 'loop' ? 'single' : 'loop'
    },
    ellipsis(item) {
      console.log(item);
    },
    onClick(item) {
      this.$emit("play", item);
    },
  },

  mounted: function () {
  },
};
</script>