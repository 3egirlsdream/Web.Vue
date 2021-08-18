<style lang="less" scoped>
.pages {
  overflow-y: hidden;
  height: 100vh;
}

.page_construct_right {
  background: #fff;
  height: calc(100vh-100vw -50px);
  overflow-y: auto;
}
.element::-webkit-scrollbar { width: 0 !important }
</style>


<template>
  <div class="pages">
    <van-nav-bar :title="item.LIST_NAME" style="position: sticky;top:0" @click-left="$emit('close')" left-arrow @click-right="showMore = true" >
      <template #right>
        <van-icon name="weapp-nav" size="14"/>
      </template>
    </van-nav-bar>
    <div style="width:100vw; height:80vw;">
      <img width="100%" height="100%"  :src="!!item.IMG ? item.IMG : 'http://cdn.endingisnihility.xyz/162116760003467.jpg'" />
    </div>
    <van-cell icon="audio" value="播放全部" clickable @click="playAll()" style="background:transparent;" :border="false" />
    <div class="page_construct_right" style="border-radius:25px;position: sticky;clear:both;">
      <musicatom style="clear:both;" v-for="(im, index) in item.DETAILS" :key="index" :item="im" :idx="index + 1" @onClick="onClick(im)" @addmusic="addMusic(im)" :show="1"></musicatom>
    </div>
    <van-popup v-model="showMore" position="top" :style="{height:'86px', width:'100%'}" style="z-index:9999999">
      <van-grid>
        <van-grid-item icon="delete" text="删除" clickable @click="del" />
        <van-grid-item icon="edit" text="编辑" clickable @click="showEdit=true" />
      </van-grid>
    </van-popup>
    <van-dialog v-model="showEdit" title="编辑歌单" show-cancel-button @confirm="createSongList">
      <van-cell-group>
        <van-field v-model="songListName" label="歌单名" placeholder="请输入歌单名" />
        <van-field v-model="songListImg" label="封面" placeholder="请输入封面url" />
      </van-cell-group>
    </van-dialog>
  </div>
</template>


<script>
import song_list_helper from '../../../../assets/js/song_list_helper'
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
      showMore:false,
      songListName:'',
      songListImg:'',
      item:{},
      user: framework.getStorage('user'),
      musics: [],
      audio: null,
      show: true,
      showEdit:false
    };
  },
  props: {
    ID: String,
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
      for (let index = this.musics.length - 1; index >= 0; index--) {
        const item = this.musics[index];
        this.$emit("addmusic", item);
      }
    },
    getSongList(){
      let user = framework.getStorage('user');
      song_list_helper.getSongList(user, this.ID, "").then((data)=>{
        this.item = data[0];
        this.musics = data[0].DETAILS;
      }).catch((err)=>{
        this.$toast(err);
      });
    },
    createSongList(){
      let user = framework.getStorage('user');
      song_list_helper.createSongList(user, this.songListName, this.songListImg).then(()=>{
        this.getSongList();
      }).catch((err)=>{
        this.$toast(err);
      });
    },
    del(){
      song_list_helper.delSongList(this.ID).then(()=>{
        this.$emit('del');
      }).catch((err)=>{
        this.$toast(err);
      })
    }
  },

  mounted: function () {
    window.setTimeout(()=>{
      this.getSongList();
    }, 100);
    
  },
};
</script>