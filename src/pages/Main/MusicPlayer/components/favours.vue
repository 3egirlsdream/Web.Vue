<style lang="less" scoped>
.pages {
  overflow: hidden;
  height: 100vh;
}

.page_construct_right {
  background: #fff;
  height: 100vh;
  overflow: auto;
}
</style>


<template>
  <div class="pages">
    <van-nav-bar title="我喜欢" style="position: sticky;top:0" @click-left="$emit('close')" left-arrow/>
    <div class="page_construct_right" style="border-radius:25px;">

      <van-cell icon="audio" value="播放全部" clickable @click="playAll()" style="background:transparent;" :border="false" />
      <musicatom v-for="(item, index) in musics" :key="index" :item="item" :idx="index + 1" @onClick="onClick(item)" @ellipsis="ellipsis(item)"></musicatom>
    </div>
  </div>
</template>


<script>
import { Toast } from "vant";
export default {
  name: "Index",
  serverUrl: {
    API_GET_I_LIKE: "/api/music/GetMusics?like={0}&start={1}&length={2}",
    API_ADD_I_LIKE: "/api/music/AddILike",
  },
  components: {
    musicatom: () => import("./musicatom.vue"),
  },
  data() {
    return {
      Singers: [],
      musics: [],
      audio: null,
      playlist: [],
      show: true,
      prex: "http://www.endingisnihility.xyz/mp3/",
    };
  },
  methods: {
    ellipsis(item) {
      console.log(item);
    },
    onClick(item) {
      console.log(item);
    },
    
    playAll() {
    },
    getILike() {
      let self = this;
      var url = framework.strFormat(
        this.$options.serverUrl.API_GET_I_LIKE,
        "Y",
        0,
        0
      );
      self.$fsCfg.getData(url, function (res) {
        if (res.success) {
          var data = res.data;
          self.musics = data;
          self.active = 0;
          self.musics.forEach((element) => {
            self.playlist.push(
              "http://www.endingisnihility.xyz/mp3/" + element.name
            );
            console.log("http://www.endingisnihility.xyz/mp3/" + element.name);
          });
        } else {
          Toast(res.message.content);
        }
      });
    },
   
    
  },

  mounted: function () {
    this.getILike();
    
    setInterval(() => {
      this.show = !this.show;
    }, 1000);
  },
};
</script>