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
.pages{
  background-color: white;
}
.p{
  font-size: 17px;
}
</style>


<template>
   <div class="pages">
            <van-tabs v-model="active1">
                <van-tab title="首页">
                   <van-cell title="计算器" v-on:click="toCaculator"/>
                   <van-cell title="Image" v-on:click="toImg"/>
                </van-tab>
                <van-tab title="文章">
                    <van-cell title="代码生产器(1.0)使用说明" v-on:click="toCodeGenerate1"/>
                    
                </van-tab>
                <van-tab title="个人中心"></van-tab>
                <van-tab title="关于"></van-tab>
            </van-tabs>


        </div>
</template>


<script>

import { Toast } from "vant";
export default {
  name: "Index",
  data() {
    return {
      active1:0,
      active2:0
    };
  },
  methods: {
    toCaculator:function(){
      this.$router.push('Caculator');
    },
    toImg:function(){
      this.$router.push('ImageRead');
    },
    toCodeGenerate1:function(){
      this.$router.push('Code');
    }
  },
  mounted: function() {
  }
};
</script>