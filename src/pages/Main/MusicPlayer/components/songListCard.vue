<template>
<div>
  <van-collapse v-model="activeName" accordion style="float:left;" class="width100-50">
    <van-collapse-item name="1" :border="false">
      <template #title>
        <div class="song-list" style="float:left;">自建歌单</div>
        <van-icon name="music" size="18" color="#009966" style="margin-top:3px; margin-left:5px; float:left;"/>
        
      </template>
      <van-row>
          <div style="width:40px; height:40px; float:left;">
              <img style=" border-radius:5px;" width="40px" height="40px" src="http://cdn.endingisnihility.xyz/162116760003467.jpg" />
          </div>
          <div style="height:40px; float:left; line-height:40px; margin-left:10px;" class="width100-50">
              <div style="color:black;font-weight:700;">我的歌单</div>
          </div>
      </van-row>
    </van-collapse-item>
  </van-collapse>
  <van-icon name="add" size="18" style="margin-top:3px; float:right;line-height:44px;width:44px; text-align:center;" @click="$toast(1)"/>
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
  },
  data() {
    return {
      activeName: 1,
      showRank: false,
      showFavours: false,
      showSearch: false,
      showAll: false,
      searchText: "",
      displayname: framework.getStorage("displayname"),
      userimg: "",
    };
  },
  methods: {
    play(data) {
      this.$emit("play", data);
    },
    onSearch() {},
    onClick() {
      this.$router.push({ path: "favours" });
    },
    addMusic(item) {
      this.$emit("addmusic", item);
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

.song-list{
    font-weight: 700;
    font-size: 14px;
}

.width100-50{
    width:calc(100%-50px);
}
</style>