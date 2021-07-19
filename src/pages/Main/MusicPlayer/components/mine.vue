<template>
  <div style="border-radius:10px;">
    <van-search v-model="searchText" placeholder="搜索" readonly @click="showSearch = true" />
    <div class="card">
      <van-card desc="昵称" style="background:#fff" :thumb="userimg">
        <template #tags>
          <div style="font-size:16px">{{displayname}}</div>
        </template>
      </van-card>
    </div>

    <van-cell-group :border="false">
      <van-field readonly label="我喜欢" left-icon="like" :border="false" is-link @click="showFavours = true" />
      <van-field readonly label="全部" left-icon="music" :border="false" is-link @click="showAll = true"/>
    </van-cell-group>
    <van-popup v-model="showAll" position="bottom" :style="{height:'100%', width:'100%'}">
      <allmusic v-if="showAll"  @close="showAll = false"></allmusic>
    </van-popup>

    <!-- 搜索 -->
    <van-popup v-model="showSearch" position="bottom" :style="{height:'100%', width:'100%'}" close-icon-position="top-left" closeable close-icon="arrow-left">
      <search></search>
    </van-popup>

    <van-popup v-model="showFavours" position="bottom" :style="{height:'100%', width:'100%'}">
      <favours @close="showFavours = false"></favours>
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
  },
  data() {
    return {
      showFavours: false,
      showSearch: false,
      showAll: false,
      searchText: "",
      boxes: ["我喜欢的音乐", "FM", "···"],
      icons: ["play", "audio", "graphic", "column", "invition"],
      images: [
        "https://cdn.wallpaperhub.app/cloudcache/d/0/c/a/6/7/d0ca67fb67d065130241cde719fbef2908393ffd.png",
        "https://cdn.wallpaperhub.app/cloudcache/4/4/1/9/d/9/4419d949c0724e36f4ac108715ebfb507ac0740e.jpg",
      ],
      displayname: framework.getStorage("displayname"),
      userimg: "",
    };
  },
  methods: {
    onSearch() {},
    onClick() {
      this.$router.push({ path: "favours" });
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