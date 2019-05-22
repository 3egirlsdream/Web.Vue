<style>
.liveCenter {
  text-align: center; /*让div内部文字居中*/
  margin: auto;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
<script src="https://cdnjs.cloudflare.com/ajax/libs/vue-resource/0.1.17/vue-resource.js"></script>
<script src="../../../assets/js/framework.js"></script>
<template>
  <div class="liveCenter">
    <van-nav-bar title left-text="返回" left-arrow @click-left="onClickLeft"/>
    <van-uploader :after-read="onRead" accept="image/*">
      <van-icon name="photograph"/>
    </van-uploader>
    <div>
      <van-field v-model="value" type="textarea" autosize/>
      <img id="image" v-if="imgUrl !== ''" ref="goodsImg" :src="imgUrl" width="50%" height="50%">
    </div>
    <div style="overflow:hidden; position: fixed;bottom: 0px;width: 100%; text-align:center;">
      <van-button v-on:click="getCustomers" type="primary" size="large">识别</van-button>
    </div>
  </div>
</template>
<script>
import fs from "../../../assets/js/fw";

import { Toast } from "vant";
import Axios from "axios";
export default {
  name: "ImageRead",
  data() {
    return {
      value: "",
      imgUrl: "",
      list: [],
      secondNum: 0,
      temp: 0,
      result: 0,
      cot: 0,
      apiUrl: "http://47.107.186.141:4396/api/values/id=",
      postUrl: "http://47.107.186.141:4396/api/values/image"
    };
  },
  ready: function() {
    this.getCustomers();
  },
  mounted: function() {},
  computed: {},
  methods: {
    getCustomers: function() {
      let self = this;
      // this.apiUrl = "Access-Control-Allow-Origin:" + this.apiUrl;
      console.log(this.postUrl);
      var api = this.apiUrl + this.imgUrl;
      Toast.loading({
        forbidClick: true,
        duration: 0,
        message: "识别中..."
      });
      //alert(this.postUrl);
      var params = new URLSearchParams();
      params.append("key", "value");
     
      Axios.post(this.postUrl, JSON.stringify(this.imgUrl), {
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(function(response) {
            self.value = response.data;
            Toast.clear();
        })
        .catch(function(error) {
          alert(error);
        });
      
      // Axios
      //   .get(this.apiUrl)
      //   .then(response => {
      //     console.log(response);
      //   })
      //   // 请求失败
      //   .catch(error => {
      //     alert("网络错误，不能访问");
      //   });
    },
    onRead(file) {
      console.log(file);
      //this.$refs.goodsImg.src = file.content;
      this.imgUrl = file.content;
    },
    onClickLeft: function() {
      this.$router.go(-1);
    }
  }
};
</script>
