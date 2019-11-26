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
}
.size {
  width: 30px;
  height: 30px;
  margin: 5px;
}
</style>

<template>
  <div>
    <van-cell-group>
      <van-field v-model="word" autosize />
    </van-cell-group>
    <van-button @click="GetWord"  text="生成词云"  type="primary" size="large"/>
    <div id="MyCharts" style="width:50%;height:50%;"></div>
  </div>
</template>

<script>
import { word } from "../../../assets/js/echarts-wordcloud.min.js";

import fsCfg from "../../../assets/js/fw";
import { Toast } from "vant";
import ECharts from "vue-echarts/components/ECharts";
export default {
  name: "Index",
  serverUrl: {
    API_GET_WORDS: "/api/values/getword/word",
    API_WRITE_ARTICLE: "/api/article/write"
  },
  data() {
    return {
      active1: 0,
      active2: 0,
      articles: ["111", "1211"],
      value: "",
      f: true,
      title: "",
      word: null,
      data: []
    };
  },
  methods: {
    MyCharts: function() {
      const self = this;

      var MyCharts = this.$echarts.init(document.getElementById("MyCharts"));

      MyCharts.setOption({
        tooltip: {},
        series: [
          {
            type: "wordCloud",
            gridSize: 2,
            sizeRange: [12, 50],
            //  rotationRange: [0, 90],
            shape: "star",
            //width: 600,
            //height: 400,
            textStyle: {
              normal: {
                color: function() {
                  return (
                    "rgb(" +
                    [
                      Math.round(Math.random() * 160),
                      Math.round(Math.random() * 160),
                      Math.round(Math.random() * 160)
                    ].join(",") +
                    ")"
                  );
                }
              },
              emphasis: {
                shadowBlur: 10,
                shadowColor: "#333"
              }
            },
            data: self.data
          }
        ]
      });
    },
    GetWord: function() {
      let self = this;
      // var url = framework.strFormat(
      //   this.$options.serverUrl.API_GET_WORDS,
      //   self.word
      // );

      // fsCfg.getData(url, function(res) {

      //     self.data = res;

      // });

      let t = {
        word: self.word
      };
      fsCfg.postData(
        this.$options.serverUrl.API_GET_WORDS,
        JSON.stringify(self.word),
        function(res) {
          self.data = res;
          self.MyCharts();
        }
      );
    }
  },
  mounted: function() {
    //this.MyCharts();
  }
};
</script>