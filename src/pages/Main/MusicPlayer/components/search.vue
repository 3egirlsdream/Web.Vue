<template>
  <div>
    <van-nav-bar title="搜索" style="position: sticky;top:0" left-arrow @click-left="$emit('close')" />
    <van-search autofocus v-model="searchText" placeholder="搜索" @search="onSearch" />
    <playerCard v-for="(item, ii) in artists" :key="ii + 'a'" :item="item" @onClick="play" @addmusic="addMusic()"></playerCard>
    <musicatom v-for="(item, index) in musics_after_search" :key="index" :item="item" :idx="index + 1" @onClick="onClick(item)" @ellipsis="ellipsis(item)"></musicatom>
  </div>
</template>

<script>
export default {
  name: "index",
  serverUrl: {
    API_GET_ALL: "/api/music/GetMusics?like={0}&start={1}&length={2}",
    API_ADD_I_LIKE: "/api/music/AddILike",
    API_SEARCH: "/api/music/Search?key={0}&user={1}",
    API_SEARCH_ARTIST:"/api/Music/SearchArtist?artist={0}"
  },
  components: {
    musicatom: () => import("./musicatom.vue"),
    playerCard:()=>import('./playerCard.vue')
  },
  data() {
    return {
      searchText: "",
      musics_after_search: [],
      finished: false,
      loading: false,
      musics: [],
      artists:[],
      displayname: framework.getStorage("displayname"),
      user:framework.getStorage("user")
    };
  },
  methods: {
    play(item){
      this.$emit('play', item)
    },
    addMusic(item){
      this.$emit("addmusic", item);
    },
    ellipsis() {
      this.$emit("ellipsis");
    },
    onSearch() {
      this.searchArtist();
      let self = this;
      let url = framework.strFormat(
        self.$options.serverUrl.API_SEARCH,
        self.searchText,
        self.user
      );
      self.$fsCfg.get(url).then((result) => {
        if (result.success) {
          self.musics_after_search = result.data;
        } else{
          self.$toast(result.message.content);
        }
      });
      
    },

    searchArtist(){
      let self = this;
      let url = framework.strFormat(
        this.$options.serverUrl.API_SEARCH_ARTIST,
        this.searchText
      );
      self.$fsCfg.get(url).then((result) => {
        if (result.success) {
          self.artists = result.data;
        } else{
          self.$toast(result.message.content);
        }
      });
    }
  },
  mounted() {},
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