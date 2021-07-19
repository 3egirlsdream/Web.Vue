<template>
  <div> 
      <van-nav-bar title="搜索" style="position: sticky;top:0" />
      <van-cell-group>
       <van-search v-model="searchText" placeholder="搜索"  @click="onSearch" />
        <van-row v-for="(item, index) in musics_after_search" :key="index">
          <van-col span="2" style="margin: 12px 0px 10px 10px;">
            <van-icon name="like" :color="item.color" size="20" @click="ilikeClick(item.name)" />
          </van-col>
          <van-col span="16">
            <van-cell :key="item.name" :title="item.name"/>
          </van-col>
      </van-row>
      </van-cell-group>
    </div>
</template>

<script>
export default {
  name: "index",
  serverUrl: {
    API_GET_ALL: "/api/music/GetMusics?like={0}&start={1}&length={2}",
    API_ADD_I_LIKE: "/api/music/AddILike",
    API_SEARCH: "/api/music/Search?value={0}",
  },
  data() {
    return {
        searchText:'',
      musics_after_search:[],
      finished: false,
      loading: false,
      musics: [],
      displayname: framework.getStorage("displayname"),
    };
  },
  methods: {
      onClickPlay(item) {
      var self = this;
      this.src = "http://www.endingisnihility.xyz/mp3/" + item;
      setTimeout(function() {
        self.$refs.audio.play();
      }, 1000);
    },
    
    iLikeClick(name) {
      let self = this;
      var data = {
        USER_CODE: "SYS",
        MUSIC_NAME: name
      };
      self.$fsCfg.postData(
        this.$options.serverUrl.API_ADD_I_LIKE,
        JSON.stringify(data),
        function(res) {
          if (res.success) {
            for (let index = 0; index < self.musics_after_search.length; index++) {
              const element = self.musics_after_search[index];
              if (element.name == name) {
                element.color = element.color == "red" ? "black" : "red";
              }
            }
          }
        }
      );
    },
    search(){
      if(this.searchText == '') return;
      let self = this;
      fsCfg.getData(framework.strFormat(this.$options.serverUrl.API_SEARCH, this.searchText), function(result)
      {
        if(result.success){
          self.musics_after_search = result.data;
        }
      })
    },
    onSearch() {},
  },
  mounted() {
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