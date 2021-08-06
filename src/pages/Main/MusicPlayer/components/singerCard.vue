<style lang="less" scoped>
.pages {
  overflow-y: hidden;
  height: 100vh;
}

.page_construct_right {
  background: #fff;
  height: 100vh;
  overflow-y: auto;
}
.element::-webkit-scrollbar { width: 0 !important }
</style>


<template>
  <div class="pages">
    <van-nav-bar :title="name" style="position: sticky;top:0" @click-left="$emit('close')" left-arrow />
    <van-cell icon="fire-o" value="热门歌曲" style="background:transparent; width:50%;float:left" :border="false" />
    <van-cell icon="audio" value="播放全部" clickable @click="playAll()" style="background:transparent; width:50%;float:left" :border="false" />
    <div class="page_construct_right" style="border-radius:25px;position: sticky;clear:both;">
      
      
      <musicatom style="clear:both;" v-for="(item, index) in musics" :key="index" :item="item" :idx="index + 1" @onClick="onClick(item)" @addmusic="addMusic(item)" :show="1"></musicatom>
    </div>
  </div>
</template>


<script>

export default {
  name: "Index",
  serverUrl: {
    API_GET_ALL: "/api/Music/GetRank?start={0}&length={1}&user={2}&singerName={3}",
  },
  components: {
    musicatom: () => import("./musicatom.vue"),
  },
  data() {
    return {
      user: framework.getStorage('user'),
      musics: [],
      audio: null,
      show: true,
    };
  },
  props: {
    name: String,
  },
  methods: {
    onClick(item) {
      this.$emit("onClick", item);
    },
    addMusic(item) {
      this.$emit("addmusic", item);
    },
    playAll() {
      if(this.musics.length > 0){
        this.onClick(this.musics[0]);
      }
      for (let index = 0; index < this.musics.length; index++) {
        const item = this.musics[index];
        this.$emit("addmusic", item);
      }
    },
    init() {
      let self = this;
      let url = framework.strFormat(
        self.$options.serverUrl.API_GET_ALL,
        0,
        999,
        self.user,
        self.name
      );
      self.$fsCfg.get(url).then((result) => {
        if (result.success) {
          self.musics = result.data.data;
        } else{
          self.$toast(result.message.content);
        }
      });
      
    },
  },

  mounted: function () {
    window.setTimeout(()=>{
      this.init();
    }, 100);
    
  },
};
</script>