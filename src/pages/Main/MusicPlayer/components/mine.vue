<template>
  <div style="border-radius:10px;">
    <van-search v-model="searchText" placeholder="搜索" readonly @click="showSearch = true" />
    <div class="card">
      <van-card desc="昵称" style="background:#fff" :thumb="userimg">
        <template #tags>
          <a v-if="displayname == null" style="text-decoration:underline;" @click="login">登录</a>
          <div v-if="displayname != null" style="font-size:16px">{{displayname}}</div>
        </template>
      </van-card>
    </div>

    <van-cell-group :border="false">
      <van-field readonly label="我喜欢" left-icon="like-o" :border="false" is-link @click="showFavours = true" />
      <van-field readonly label="音乐库" left-icon="music-o" :border="false" is-link @click="showAll = true" />
      <van-field readonly label="排行榜" left-icon="bar-chart-o" :border="false" is-link @click="showRank = true" />
     
    </van-cell-group>

    <songListCard></songListCard>

    <van-popup v-model="showAll" position="bottom" :style="{height:'100%', width:'100%'}">
      <allmusic v-if="showAll" @close="showAll = false" @play="play" @addmusic="addMusic"></allmusic>
    </van-popup>

    <!-- 搜索 -->
    <van-popup v-model="showSearch" position="bottom" :style="{height:'100%', width:'100%'}">
      <search @play="play" @close="showSearch = false"></search>
    </van-popup>

    <van-popup v-model="showFavours" position="bottom" :style="{height:'100%', width:'100%'}">
      <favours v-if="showFavours" @close="showFavours = false" @play="play" @addmusic="addMusic"></favours>
    </van-popup>

     <van-popup v-model="showRank" position="bottom" :style="{height:'100%', width:'100%'}">
      <rank v-if="showRank" @close="showRank = false" @play="play" @addmusic="addMusic"></rank>
    </van-popup>

  
    
  </div>
</template>

<script>

export default {
  name: "index",
  serverUrl: {},
  components: {
    allmusic: () => import("./allmusic.vue"),
    search: () => import("./search.vue"),
    favours: () => import("./favours.vue"),
    rank: () => import("./rankCard.vue"),
    songListCard:()=>import('./songListCard.vue')
  },
  data() {
    return {
      showRank:false,
      showFavours: false,
      showSearch: false,
      showAll: false,
      searchText: "",
      displayname: framework.getStorage("displayname"),
      userimg: "",
    };
  },
  methods: {
    play(data){
      this.$emit('play', data);
    },
    onSearch() {},
    onClick() {
      this.$router.push({ path: "favours" });
    },
    addMusic(item){
      this.$emit('addmusic', item);
    },
    login() {
      const index = location.href.lastIndexOf("/pages");
      const urlBase = location.href.substring(0, index);
      window.location.href = urlBase + "/pages/SYSTEM/Login.html";
    },
  },
  mounted() {
    this.userimg = framework.getStorage("myimg");
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