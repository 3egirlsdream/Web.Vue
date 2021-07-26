<template>
  <div style="height:50%;overflow-y:auto;">
    <van-cell-group>
      <van-cell v-for="(item, index) in playlist" :key="index" :title="item.MUSIC_NAME" />
    </van-cell-group>
  </div>
</template>


<script>
import { Toast } from "vant";
export default {
  name: "Index",
  serverUrl: {
    API_GET_I_LIKE:
      "/api/music/GetMusics?like={0}&start={1}&length={2}&user={3}",
    API_ADD_I_LIKE: "/api/music/AddILike",
  },
  props: {
    playlist: Array,
  },
  data() {
    return {
      Singers: [],
      musics: [],
      audio: null,

      show: true,
    };
  },
  methods: {},

  mounted: function () {},
};
</script>