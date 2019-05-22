<style lang="less" scoped>
.content {
  box-sizing: content-box !important;
  padding-bottom: 50px;
  background: #fafafa;
  .footer {
    width: 100%;
    position: fixed;
    bottom: 0;
    z-index: 2;
  }
}

.Gray {
  background-color: white;
  height: 10px;
}
.pages {
  background-color: white;
}
.p {
  font-size: 17px;
  padding: 0 20px;
}
</style>


<template>
  <div class="pages">
    <van-nav-bar title="代码生成器1.0使用说明" left-text="返回" left-arrow @click-left="onClickLeft"/>
  </div>
</template>


<script>
import { Toast } from "vant";
import Axios from "axios";
export default {
  name: "Battle",
  data() {
    return {
      active1: 0,
      active2: 0,
      apiUrl: "http://localhost:4396/api/values/id="
    };
  },
  methods: {
    onClickLeft: function() {
      this.$router.go(-1);
    }
  },
  getall: function() {
    Axios.get(this.apiUrl)
      .then(response => {
        console.log(response);
      })
      // 请求失败
      .catch(error => {
        alert("网络错误，不能访问");
      });
  },
  mounted: function() {}
};
</script>