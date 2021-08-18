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

.lyric{
  height: calc(100% - 142px);
  opacity: 1;
}

.cover{
    width:100%;
    height:100%;
    position:relative;
    text-align:center;
}
 
.cover::before{    
    content:'';
    position:absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background:transparent url(http://cdn.endingisnihility.xyz/162116760003467.jpg) center center no-repeat;
    filter:blur(20px);
    z-index:-1;
    background-size:cover;
}
</style>


<template>
  <div class="pages">
    <div class="page_construct_right cover">
      <van-row>
        <van-col span="3"><van-icon name="arrow-down" size="20" style="position: sticky;top:0; left:10px; z-index:99;background:transparent;border:0px;" @click="$emit('close')" /></van-col>
        
      </van-row>
      
      
      <div style="height:50%;width:100%;">
        <van-image v-if="true" src="http://cdn.endingisnihility.xyz/162116760003467.jpg" style="z-index:99;text-align:center;width:80vw;height:80vw;margin:0 10vw;">

      </van-image>
      </div>
      <div style="height:40%;width:80%;text-align:center;z-index:99999;opacity: 1;margin:0 10%;">
          <van-row style="height:45px;overflow:hidden">
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
          <div id="lyric" style="font-size:12px;overflow-y:auto;" class="lyric">
            <pre id="pre">{{info.LYRIC}}</pre>
          </div>
          <van-row style="position:absolute;bottom:48px;width:80%;">
            <van-col span="6" @click="changeStatus">
              <van-icon v-show="status.playStatus == 'loop'" name="replay" size="25" />
              <van-image v-show="status.playStatus == 'single'" src="http://cdn.endingisnihility.xyz/replay.png" width="25" height="25"></van-image>
            </van-col>
            <van-col span="6">
              <van-icon name="comment-o" size="25"/>
            </van-col>
            <van-col span="6">
              <van-icon name="share-o" size="25" />
            </van-col>
            <van-col span="6" @click="show=true"><van-icon name="orders-o" size="25" /></van-col>
          </van-row>
      </div>
    </div>

    <van-popup round v-model="show" position="bottom" :style="{height:'50%', width:'100%'}">
      <playlistCard v-if="show" :playlist="playlist" :musicname="item.MUSIC_NAME"></playlistCard>
    </van-popup>

  </div>
</template>


<script>

export default {
  name: "Index",
  serverUrl: {
    API_GET_I_LIKE:
      "/api/music/GetMusics?like={0}&start={1}&length={2}&user={3}",
    API_ADD_I_LIKE: "/api/music/AddILike",
    API_GET_LYRIC: "/api/music/GetMusicInfo?song={0}&singer={1}",
  },
  components: {
    musicatom: () => import("./musicatom.vue"),
    playlistCard: () => import("./playlistCard.vue"),
  },
  props: {
    item: Object,
    status: Object,
    playlist: Array,
  },
  data() {
    return {
      info: {LYRIC:''},
      src: "http://cdn.endingisnihility.xyz/llskvrestDSYprLbumb8LFzCQfOY",
      show: false,
    };
  },
  watch: {
    item(){
      this.getLyric();
    }
  },
  methods: {
    getLyric() {
      let url = framework.strFormat(
        this.$options.serverUrl.API_GET_LYRIC,
        this.item.MUSIC_NAME,
        this.item.ARTISTS
      );
      this.$fsCfg
        .get(url)
        .then((res) => {
          if (res.success ) {
            if(res.data != null && !!res.data.LYRIC){
              this.info.LYRIC = res.data.LYRIC
            }
          } else {
            this.$toast(res.message.content);
          }
        })
        .catch((err) => {
          this.$toast(err);
        });
    },
    changeStatus() {
      this.status.playStatus =
        this.status.playStatus == "loop" ? "single" : "loop";
    },
    ellipsis(item) {
      console.log(item);
    },
    onClick(item) {
      this.$emit("play", item);
    },
    lyricRoll() {
      var audio = document.querySelector("audio");
      var pre = document.getElementById("pre");
      if (pre != null && pre != undefined && pre.offsetHeight != null) {
        var top = (audio.currentTime / audio.duration) * pre.offsetHeight;
        var l = document.getElementById("lyric");
        l.scrollTop = top;
      }
    },
  },

  mounted: function () {
    this.getLyric();

    window.setInterval(() => {
      this.lyricRoll();
    }, 1000);
  },
};
</script>