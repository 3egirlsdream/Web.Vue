<template>
<v-app name='app'>
  <div style="padding:5px;border-radius:5px;font-size:14px;" class="card"  @click="show = true">
    <van-row  class="weight700">
      <van-col span="4">歌手：</van-col>
      <van-col span="20">{{item.ARTISTS}}</van-col>
    </van-row>
     <van-row class="weight400">
      <van-col span="3">歌曲：</van-col>
      <van-col span="3">{{item.COUNT}}</van-col>
      <van-col span="3">专辑：</van-col>
      <van-col span="2">{{item.ALBUM_COUNT}}</van-col>
    </van-row>
  </div>
  <van-popup v-model="show" position="right" :style="{height:'100%', width:'100%'}">
    <singerCard v-if="show" @close="close()" :name="item.ARTISTS" @onClick="onClick" @addmusic="addMusic"></singerCard>
  </van-popup>
</v-app>
</template>

<script>
export default {
  name: "index",
  serverUrl: {
  },
  props: {
    idx: Number,
    item: Object,
  },
  components: {
    ellipsisCard: () => import("./ellipsisCard.vue"),
    singerCard: ()=>import('./singerCard.vue')
  },
  data() {
    return {
      show:false,
      musics: [],
      displayname: framework.getStorage("displayname"),
    };
  },
  methods: {
    onClick(item) {
      this.$emit("onClick", item);
    },
    addMusic(item){
      this.$emit('addmusic', item);
    },
    close(){
      console.log('close');
      this.show = false;
    }
  },
  mounted() {},
};
</script>

<style scoped>
.card {
  box-shadow: 0px 0px 5px #bebebe;
  border-radius: 7px;
  background: #fff;
  width: 89%;
  margin: 20px 4%;
}

.weight700{
  margin-left: 10px;
  font-weight: 700;
  font-family: 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.weight400{
  margin-left: 10px;
  font-size: 12px;
  font-weight: 400;
  font-family: 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
</style>