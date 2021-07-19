<template>
  <div style="width:100%;padding:5px;">
    <van-image :src="musicimg" height="3rem" width="3rem" style="text-align:center;" class="margin50">
      <font size="2">{{item.name.split('-')[0]}}</font>
    </van-image>
    <van-divider />
    <div style="width:100%">
      <van-icon style="float:left; width:20px; line-height:30px;margin-left:20%;" name="like" :color="item.color" size="20" />
      <div style="float:left; width:20%; line-height:30px;font-size:14px;text-align:center;">{{item.color == 'red' ? '取消收藏' : '收藏'}}</div>
    </div>
    <div style="width:100%;clear:both">
      <van-icon style="float:left; width:20px; line-height:30px;margin-left:20%;" name="add-o" size="20" />
      <div style="float:left; width:20%; line-height:30px;font-size:14px;text-align:center;">加入歌单</div>
    </div>
    <div style="width:100%;clear:both">
      <van-icon style="float:left; width:20px; line-height:30px;margin-left:20%;" name="share-o" size="20" />
      <div style="float:left; width:20%; line-height:30px;font-size:14px;text-align:center;">分享</div>
    </div>
    <div style="width:100%;clear:both">
      <van-icon style="float:left; width:20px; line-height:30px;margin-left:20%;" name="down" size="20" />
      <div style="float:left; width:20%; line-height:30px;font-size:14px;text-align:center;">下载</div>
    </div>
    <div style="width:100%;clear:both">
      <van-icon style="float:left; width:20px; line-height:30px;margin-left:20%;" name="delete" size="20" />
      <div style="float:left; width:20%; line-height:30px;font-size:14px;text-align:center;">删除</div>
    </div>
  </div>
</template>

<script>
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
      musics: [],
      musicimg: "",
      displayname: framework.getStorage("displayname"),
    };
  },
  methods: {
    onClick() {
      this.$emit("onClick");
    },
    ellipsis() {
      this.$emit("ellipsis");
    },
    ilikeClick(name) {
      let self = this;
      var data = {
        USER_CODE: "SYS",
        MUSIC_NAME: name,
      };
      self.$fsCfg.postData(
        this.$options.serverUrl.API_ADD_I_LIKE,
        JSON.stringify(data),
        function (res) {
          if (res.success) {
            for (let index = 0; index < self.musics.length; index++) {
              const element = self.musics[index];
              if (element.name == name) {
                element.color = element.color == "red" ? "black" : "red";
              }
            }
          }
        }
      );
    },
  },
  mounted() {
    this.musicimg = framework.getStorage("myimg");
  },
};
</script>

<style scoped>
.margin50 {
  margin-top: 20px;
  margin-left: calc(50%-1.5rem);
}
</style>