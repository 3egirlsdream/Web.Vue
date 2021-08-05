<template>
  <van-cell-group>
    <van-field v-for="(item, index) in playlist" :key="index" v-model="item.ARTISTS" center :label="item.MUSIC_NAME" readonly>
      <template #button>
        <van-button size="small" type="danger" @click="removeItem(index)">删除</van-button>
      </template>
    </van-field>
  </van-cell-group>

</template>


<script>
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
      musics: [],
      audio: null,
      show: true,
    };
  },
  methods: {
    removeItem(index) {
      this.playlist.splice(index, 1);
      let json = JSON.stringify(this.playlist);
      framework.setStorage("playlist", json);
    },
  },

  mounted: function () {},
};
</script>