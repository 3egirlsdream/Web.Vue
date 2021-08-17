<template>
  <div style="height:40px;padding:5px;">
    <van-icon style="float:right; width:10%; line-height:30px" name="ellipsis" size="20" @click="showEllipsis = true" />
    <div style="float:left; width:10%; line-height:30px;font-size:14px;text-align:center;">{{idx}}</div>
    <div style="float:left; width:60%; line-height:30px;" @click="onClick">
      <div style="width:100%; line-height:18px;font-size:14px;overflow:hidden;height:18px">{{item.MUSIC_NAME}}</div>
      <van-tag plain color="#FAA300" style="float:left;font-size:9px; line-height:12px">SQ</van-tag>
      <div class="subtitle">{{item.ARTISTS}}</div>
    </div>

    <div v-show="show != 1" v-if="!!item.QTY && item.QTY > 0"  style="float:left; width:10%; line-height:30px;">
      <div style="width:100%; line-height:18px;font-size:14px;overflow:hidden;height:18px"></div>
      <div class="subtitle">{{item.QTY}}次</div>
    </div>

    <van-popup v-model="showEllipsis" position="bottom" round :style="{height:'70%', width:'100%'}"  >
      <ellipsisCard v-if="showEllipsis" :item="item" @addmusic="addMusic"></ellipsisCard>
    </van-popup>
  </div>
</template>

<script>
export default {
  name: "index",
  serverUrl: {},
  props: {
    show:Number,
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
  line-height: 12px;
  font-size: 12px;
  color: lightgrey;
  padding-left: 30px;
  padding-top: 1px;
}
</style>