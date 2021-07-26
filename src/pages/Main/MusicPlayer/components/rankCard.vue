<template>
  <div>
    <van-nav-bar title="排行榜" style="position: sticky;top:0" left-arrow @click-left="$emit('close')"/>
    
    <van-list v-model="loading" :finished="finished" @load="getall">
      <musicatom v-for="(item, index) in musics" :key="index" :item="item" :idx="index + 1" @onClick="onClick(item)" @addmusic="addMusic(item)"></musicatom>
    </van-list>

    
  </div>
</template>

<script>
export default {
  name: "index",
  serverUrl: {
    API_GET_ALL: "/api/Music/GetRank?start={0}&length={1}&user={2}",
    API_ADD_I_LIKE: "/api/music/AddILike",
    API_SEARCH: "/api/music/Search?value={0}",
  },
  
  components: {
    musicatom: () => import("./musicatom.vue"),
  },
  data() {
    return {
      finished:false,
      showEllipsis: false,
      loading: true,
      musics: [],
      displayname: framework.getStorage("displayname"),
    };
  },
  methods: {
    getall() {
      let self = this;
      setTimeout(() => {
        var url = framework.strFormat(
          this.$options.serverUrl.API_GET_ALL,
          0,
          self.musics.length + 20,
          framework.getStorage('user')
        );
        self.$fsCfg.getData(url, function (res) {
          if (res.success) {
            var data = res.data.data;
            // 加载状态结束
            self.loading = false;
            self.musics = data;

            if (self.musics.length >= res.data.total) {
              self.finished = true;
            }
          } else {
            self.$toast(res.message.content);
          }
        });
      }, 1000);
    },
    onClick(item) {
      this.$emit('play', item);
    },
    addMusic(item){
      this.$emit('addmusic', item);
    }
  },
  mounted() {
    this.getall();
  },
};
</script>

<style scoped>
.card {
  box-shadow: 0px 0px 2px #bebebe;
  border-radius: 7px;
  background: #fff;
  width: 90%;
  margin: 20px 5%;
  overflow: hidden;
}
</style>