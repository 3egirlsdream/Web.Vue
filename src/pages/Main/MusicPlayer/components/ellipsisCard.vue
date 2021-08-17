<template>
  <div style="padding:5px;">
    <van-image :src="musicimg" height="3rem" width="3rem" style="text-align:center;" class="margin50">
      <font size="2">{{atom.ARTISTS}}</font>
    </van-image>
    <van-divider />
    <div style="width:100%" @click="ilikeClick(atom.MUSIC_NAME)">
      <van-icon style="float:left; width:20px; line-height:30px;margin-left:20%;" name="like" :color="atom.COLOR" size="20" />
      <div style="float:left; width:20%; line-height:30px;font-size:14px;text-align:center;">{{atom.COLOR == 'red' ? '取消收藏' : '收藏'}}</div>
    </div>
    <div style="width:100%;clear:both" @click="addmusic">
      <van-icon style="float:left; width:20px; line-height:30px;margin-left:20%;" name="underway-o" size="20" />
      <div style="float:left; width:20%; line-height:30px;font-size:14px;text-align:center;">加入列表</div>
    </div>
    <div style="width:100%;clear:both" @click="showSongList=true">
      <van-icon style="float:left; width:20px; line-height:30px;margin-left:20%;" name="add-o" size="20" />
      <div style="float:left; width:20%; line-height:30px;font-size:14px;text-align:center;">加入歌单</div>
    </div>
    <div style="width:100%;clear:both" @click="showShare = true">
      <van-icon style="float:left; width:20px; line-height:30px;margin-left:20%;" name="share-o" size="20" />
      <div style="float:left; width:20%; line-height:30px;font-size:14px;text-align:center;">分享</div>
    </div>
    <div style="width:100%;clear:both">
      <van-icon style="float:left; width:20px; line-height:30px;margin-left:20%;" name="down" size="20" />
      <div style="float:left; width:20%; line-height:30px;font-size:14px;text-align:center;"><a :title="item.MUSIC_NAME" :download="item.MUSIC_NAME" :href="'http://cdn.endingisnihility.xyz/'+item.CDN">下载</a></div>
    </div>
    <van-share-sheet v-model="showShare" title="分享" :options="options" />
    <van-popup v-model="showSongList" position="bottom" :style="{height:'50%', width:'100%'}">
      <van-cell-group>
        <van-cell v-for="(im, index) in songLists" :key="index" :title="im.LIST_NAME" clickable @click="addSongToList(im.LIST_ID, atom.ID)"/>
      </van-cell-group>
    </van-popup>
  </div>
</template>

<script>
import song_list_helper from '../../../../assets/js/song_list_helper'
export default {
  name: "index",
  serverUrl: {},
  props: {
    item: Object,
  },
  serverUrl: {
    API_ADD_I_LIKE: "/api/music/AddILike",
  },
  data() {
    return {
      songLists:[],
      showSongList:false,
      showShare: false,
      options: [
        { name: "微信", icon: "wechat" },
        { name: "微博", icon: "weibo" },
        { name: "复制链接", icon: "link" },
      ],
      musics: [],
      atom: {},
      musicimg: "",
      displayname: framework.getStorage("displayname"),
    };
  },
  watch: {
    atom(val) {
      console.log(val);
    },
  },
  methods: {
    onClick() {
      this.$emit("onClick");
    },
    ellipsis() {
      this.$emit("ellipsis");
    },
    addmusic() {
      this.$emit("addmusic");
    },
    ilikeClick(name) {
      let self = this;
      let user = framework.getStorage("user");
      var data = {
        USER_CODE: user,
        MUSIC_NAME: name,
      };
      self.$fsCfg.postData(
        this.$options.serverUrl.API_ADD_I_LIKE,
        JSON.stringify(data),
        function (res) {
          if (res.success) {
            self.atom.COLOR = self.atom.COLOR == "red" ? "black" : "red";
          } else {
            self.$toast(res.message.content);
          }
        }
      );
    },
    getSongList(){
      let user = framework.getStorage('user');
      song_list_helper.getSongList(user, "", "").then((data)=>{
        this.songLists = data;
      }).catch((err)=>{
        this.$toast(err);
      });
    },
    addSongToList(listId, songId){
      let user = framework.getStorage('user');
      song_list_helper.addSongToList(user, listId, songId).then(()=>{
        this.$toast('添加成功');
        this.showSongList = false;
      }).catch((err)=>{
        this.$toast(err);
      });
    }
  },
  mounted() {
    this.musicimg = framework.getStorage("myimg");
    this.atom = this.item;
    this.atom.ARTISTS = this.atom.ARTISTS;
    this.getSongList();
    console.log(this.atom);
  },
};
</script>

<style scoped>
.margin50 {
  margin-top: 20px;
  margin-left: calc(50%-1.5rem);
}
</style>