<template>
  <div id="demo">
        <div class="border-shadow">
            <van-tabs>
                <van-tab title="首页">内容 1</van-tab>
                <van-tab title="文章">
                  
                </van-tab>
                <van-tab title="个人中心">内容 3</van-tab>
                <van-tab title="关于">内容 4</van-tab>
            </van-tabs>


        </div>
    </div>
</template>

<script>
import { Dialog } from "vant";
import { Toast } from "vant";

export default {
  name: "Index",
  data () {
    return {
      
    };
  },
  mounted () {
    
  },
  methods: {
   
    
  }
};
</script>

<style>

</style>

<style lang="less" scoped>
.content {
  box-sizing: content-box !important;
  padding-bottom: 50px;
  .footer {
    width: 100%;
    position: fixed;
    bottom: 0;
    z-index: 2;
  }
}

.border-shadow {
        border: 1px solid;
        border-color: white;
        box-shadow: 0 2px 12px 0 rgba(221, 208, 208, 0.1);
        background-color: white;
        padding: 2%;
    }

    body {
        font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
        background-color: lightgrey;
    }
</style>