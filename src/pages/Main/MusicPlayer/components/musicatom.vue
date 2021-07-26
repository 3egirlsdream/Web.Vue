<template>
  <div style="height:40px;padding:5px;">
    <van-icon style="float:right; width:10%; line-height:30px" name="ellipsis" size="20" @click="showEllipsis = true" />
    <div style="float:left; width:10%; line-height:30px;font-size:14px;text-align:center;">{{idx}}</div>
    <div style="float:left; width:70%; line-height:30px;" @click="onClick">
      <div style="width:100%; line-height:18px;font-size:14px;overflow:hidden;height:18px">{{item.MUSIC_NAME}}</div>
      <van-tag plain color="#FAA300" size="xsmall" style="float:left;">SQ</van-tag>
      <div class="subtitle">{{item.ARTISTS}}</div>
    </div>
    <van-popup v-model="showEllipsis" position="bottom" round :style="{height:'70%', width:'100%'}"  >
      <ellipsisCard :item="item" @addmusic="addMusic"></ellipsisCard>
    </van-popup>
  </div>
</template>

<script>
export default {
  name: "index",
  serverUrl: {},
  props: {
    idx: Number,
    item: Object,
  },
  components: {
    ellipsisCard: () => import("./ellipsisCard.vue"),
  },
  data() {
    return {
      showEllipsis: false,
      musics: [],
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
    addMusic(){
      this.$emit('addmusic');
    }
  },
  mounted() {},
};
</script>

<style scoped>
.subtitle {
  width: calc(100%-12px);
  line-height: 14px;
  font-size: 12px;
  color: lightgrey;
  padding-left: 30px;
  padding-top: 2px;
}
</style>