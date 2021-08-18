<template>
<div>
  <van-collapse v-model="activeName" accordion style="float:left;" class="width100-50">
    <van-collapse-item name="1" :border="false">
      <template #title>
        <div class="song-list" style="float:left;">自建歌单</div>
        <van-icon name="music" size="18" color="#009966" style="margin-top:3px; margin-left:5px; float:left;"/>
        
      </template>
      <van-row v-for="(item,index) in songLists" :key="index" style="margin-top:5px;" @click="openList(item.LIST_ID)">
          <div style="width:40px; height:40px; float:left;">
              <img style=" border-radius:5px;" width="40px" height="40px" :src="!!item.IMG ? item.IMG : 'http://cdn.endingisnihility.xyz/162116760003467.jpg'" />
          </div>
          <div style="height:40px; float:left; line-height:40px; margin-left:10px;" class="width100-50">
              <div style="color:black;font-weight:700;">{{item.LIST_NAME}}</div>
          </div>
      </van-row>
    </van-collapse-item>
  </van-collapse>
  <van-icon name="add" size="18" style="margin-top:3px; float:right;line-height:44px;width:44px; text-align:center;" @click="show = true"/>
  <van-dialog v-model="show" title="新增歌单" show-cancel-button @confirm="createSongList">
    <van-cell-group>
      <van-field v-model="songListName" label="歌单名" placeholder="请输入歌单名" />
      <van-field v-model="songListImg" label="封面" placeholder="请输入封面url" />
    </van-cell-group>
  </van-dialog>
  <van-popup v-model="showDtl" position="bottom" :style="{height:'100%', width:'100%'}">
    <songListDtl v-if="showDtl" @close="showDtl = false" :ID="songListId" @onClick="play" @del="showDtl=false,getSongList()" @addmusic="addMusic"></songListDtl>
  </van-popup>
</div>
</template>

<script>
import song_list_helper from '../../../../assets/js/song_list_helper'
export default {
  name: "index",
  serverUrl: {},
  components: {
    allmusic: () => import("./allmusic.vue"),
    search: () => import("./search.vue"),
    favours: () => import("./favours.vue"),
    rank: () => import("./rankCard.vue"),
    songListDtl: () => import('./songListDtlCard.vue')
  },
  data() {
    return {
      showDtl:false,
      show:false,
      songListName:'',
      songListImg:'',
      activeName: 1,
      showRank: false,
      showFavours: false,
      showSearch: false,
      showAll: false,
      searchText: "",
      displayname: framework.getStorage("displayname"),
      userimg: "",
      songLists:[],
      songListId:''
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
    createSongList(){
      let user = framework.getStorage('user');
      song_list_helper.createSongList(user, this.songListName, this.songListImg).then(()=>{
        this.getSongList();
      }).catch((err)=>{
        this.$toast(err);
      });
    },
    getSongList(){
      let user = framework.getStorage('user');
      song_list_helper.getSongList(user, "", "").then((data)=>{
        this.songLists = data;
      }).catch((err)=>{
        this.$toast(err);
      });
    },
    openList(id){
      this.songListId = id;
      this.showDtl = true;
    }
  },
  mounted() {
    this.userimg = framework.getStorage("myimg");
    this.getSongList()
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