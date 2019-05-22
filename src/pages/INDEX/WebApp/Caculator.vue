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

<template>
  <div class="liveCenter">
    <van-nav-bar
      title="计算器"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
      <van-field v-model="value" type="textarea" style="height:300px;"/>
    <div style="position: fixed;bottom: 0px;width: 100%; text-align:center;">
      <van-row type="flex" >
        <van-button square size="large" plain hairline type="default" style="height:80px;" v-on:click="click1">1</van-button>
        <van-button square size="large" plain hairline type="default" style="height:80px;" v-on:click="click2">2</van-button>
        <van-button square size="large" plain hairline type="default" style="height:80px;" v-on:click="click3">3</van-button>
        <van-button square size="large" plain hairline type="default" style="height:80px;" v-on:click="clickChu">/</van-button>
      </van-row>
      <van-row type="flex">
        <van-button square size="large" plain hairline type="default" style="height:80px;" v-on:click="click4">4</van-button>
        <van-button square size="large" plain hairline type="default" style="height:80px;" v-on:click="click5">5</van-button>
        <van-button square size="large" plain hairline type="default" style="height:80px;" v-on:click="click6">6</van-button>
        <van-button square size="large" plain hairline type="default" style="height:80px;" v-on:click="clickClear">C</van-button>
      </van-row>
      <van-row type="flex">
        <van-button square size="large" plain hairline type="default" style="height:80px;" v-on:click="click7">7</van-button>
        <van-button square size="large" plain hairline type="default" style="height:80px;" v-on:click="click8">8</van-button>
        <van-button square size="large" plain hairline type="default" style="height:80px;" v-on:click="click9">9</van-button>
        <van-button square size="large" plain hairline type="default" style="height:80px;" v-on:click="clickJia">+</van-button>
      </van-row>
      <van-row type="flex">
        <van-button square size="large" plain hairline type="default" style="height:80px;" v-on:click="clickJian">-</van-button>
        <van-button square size="large" plain hairline type="default" style="height:80px;" v-on:click="click0">0</van-button>
        <van-button square size="large" plain hairline type="default" style="height:80px;" v-on:click="clickCheng">x</van-button>
        <van-button square size="large" plain hairline type="default" style="height:80px;" v-on:click="clickDeng">=</van-button>
      </van-row>
    </div>
  </div>
</template>
<script>
import { Toast } from "vant";
export default {
  name: "Detail",
  data() {
    return {
      value: "",
      operation: "",
      list: [],
      secondNum: 0,
      temp: 0,
      result: 0,
      cot: 0
    };
  },
  mounted: function() {},
  computed: {},
  methods: {
    click1: function() {
      this.temp = 1;
      if ((this.value === "")) {
        this.list[this.cot++] = "1";
        this.result = 1;
        this.value = "1";
      } else {
        this.list[this.cot++] = "1";
        if (
          this.list[this.cot - 2] != "x" &&
          this.list[this.cot - 2] != "-" &&
          this.list[this.cot - 2] != "+" &&
          this.list[this.cot - 2] != "/"
        ) {
          this.value = "1";
          this.cot = 0;
          this.list = [];
          this.list[this.cot++] = "1";
        } else this.value = this.textbox(this.list);
        if (this.operation != "")
          this.result = this.oper(this.result, this.temp, this.operation);
      }
    },
    click2: function() {
      this.temp = 2;
      if ((this.value === "")) {
        this.list[this.cot++] = "2";
        this.result = 2;
        this.value = "2";
      } else {
        this.list[this.cot++] = "2";
        if (
          this.list[this.cot - 2] != "x" &&
          this.list[this.cot - 2] != "-" &&
          this.list[this.cot - 2] != "+" &&
          this.list[this.cot - 2] != "/"
        )
          {
          this.value = "2";
          this.cot = 0;
          this.list = [];
          this.list[this.cot++] = "2";
        }
        else this.value = this.textbox(this.list);
        if (this.operation != "")
          this.result = this.oper(this.result, this.temp, this.operation);
      }
    },
    click3: function() {
      this.temp = 3;
      if ((this.value === "")) {
        this.list[this.cot++] = "3";
        this.result = 3;
        this.value = "3";
      } else {
        this.list[this.cot++] = "3";
        if (
          this.list[this.cot - 2] != "x" &&
          this.list[this.cot - 2] != "-" &&
          this.list[this.cot - 2] != "+" &&
          this.list[this.cot - 2] != "/"
        )
          {
          this.value = "3";
          this.cot = 0;
          this.list = [];
          this.list[this.cot++] = "3";
        }
        else this.value = this.textbox(this.list);
        if (this.operation != "")
          this.result = this.oper(this.result, this.temp, this.operation);
      }
    },
    click4: function() {
      this.temp = 4;
      if ((this.value === "")) {
        this.result = 4;
        this.value = "4";
        this.list[this.cot++] = "4";
      } else {
        this.list[this.cot++] = "4";
        if (
          this.list[this.cot - 2] != "x" &&
          this.list[this.cot - 2] != "-" &&
          this.list[this.cot - 2] != "+" &&
          this.list[this.cot - 2] != "/"
        )
          {
          this.value = "4";
          this.cot = 0;
          this.list = [];
          this.list[this.cot++] = "4";
        }
        else this.value = this.textbox(this.list);
        if (this.operation != "")
          this.result = this.oper(this.result, this.temp, this.operation);
      }
    },
    click5: function() {
      this.temp = 5;
      if ((this.value === "")) {
        this.result = 5;
        this.list[this.cot++] = "5";
        this.value = "5";
      } else {
        this.list[this.cot++] = "5";
        if (
          this.list[this.cot - 2] != "x" &&
          this.list[this.cot - 2] != "-" &&
          this.list[this.cot - 2] != "+" &&
          this.list[this.cot - 2] != "/"
        )
          {
          this.value = "5";
          this.cot = 0;
          this.list = [];
          this.list[this.cot++] = "5";
        }
        else this.value = this.textbox(this.list);
        if (this.operation != "")
          this.result = this.oper(this.result, this.temp, this.operation);
      }
    },
    click6: function() {
      this.temp = 6;
      if ((this.value === "")) {
        this.result = 6;
        this.list[this.cot++] = "6";
        this.value = "6";
      } else {
        this.list[this.cot++] = "6";
        if (
          this.list[this.cot - 2] != "x" &&
          this.list[this.cot - 2] != "-" &&
          this.list[this.cot - 2] != "+" &&
          this.list[this.cot - 2] != "/"
        )
          {
          this.value = "6";
          this.cot = 0;
          this.list = [];
          this.list[this.cot++] = "6";
        }
        else this.value = this.textbox(this.list);
        if (this.operation != "")
          this.result = this.oper(this.result, this.temp, this.operation);
      }
    },
    click7: function() {
      this.temp = 7;
      if ((this.value === "")) {
        this.result = 7;
        this.list[this.cot++] = "7";
        this.value = "7";
      } else {
        this.list[this.cot++] = "7";
        if (
          this.list[this.cot - 2] != "x" &&
          this.list[this.cot - 2] != "-" &&
          this.list[this.cot - 2] != "+" &&
          this.list[this.cot - 2] != "/"
        )
          {
          this.value = "7";
          this.cot = 0;
          this.list = [];
          this.list[this.cot++] = "7";
        }
        else this.value = this.textbox(this.list);
        if (this.operation != "")
          this.result = this.oper(this.result, this.temp, this.operation);
      }
    },
    click8: function() {
      this.temp = 8;
      if ((this.value === "")) {
        this.result = 8;
        this.list[this.cot++] = "8";
        this.value = "8";
      } else {
        this.list[this.cot++] = "8";
        if (
          this.list[this.cot - 2] != "x" &&
          this.list[this.cot - 2] != "-" &&
          this.list[this.cot - 2] != "+" &&
          this.list[this.cot - 2] != "/"
        )
          {
          this.value = "8";
          this.cot = 0;
          this.list = [];
          this.list[this.cot++] = "8";
        }
        else this.value = this.textbox(this.list);
        if (this.operation != "")
          this.result = this.oper(this.result, this.temp, this.operation);
      }
    },
    click9: function() {
      this.temp = 9;
      if ((this.value === "")) {
        this.result = 9;
        this.list[this.cot++] = "9";
        this.value = "9";
      } else {
        this.list[this.cot++] = "9";
        if (
          this.list[this.cot - 2] != "x" &&
          this.list[this.cot - 2] != "-" &&
          this.list[this.cot - 2] != "+" &&
          this.list[this.cot - 2] != "/"
        )
          {
          this.value = "9";
          this.cot = 0;
          this.list = [];
          this.list[this.cot++] = "9";
        }
        else this.value = this.textbox(this.list);
        if (this.operation != "")
          this.result = this.oper(this.result, this.temp, this.operation);
      }
    },
    click0: function() {
      this.temp = 0;
      if ((this.value === "")) {
        this.result = 0;
        this.list[this.cot++] = "0";
        this.value = "0";
      } else {
        this.list[this.cot++] = "0";
        if (
          this.list[this.cot - 2] != "x" &&
          this.list[this.cot - 2] != "-" &&
          this.list[this.cot - 2] != "+" &&
          this.list[this.cot - 2] != "/"
        )
          {
          this.value = "0";
          this.cot = 0;
          this.list[this.cot++] = "0";
        }
        else this.value = this.textbox(this.list);
        if (this.operation != "")
          this.result = this.oper(this.result, this.temp, this.operation);
      }
    },
    clickChu: function() {
      this.operation = "/";
      this.list[this.cot++] = "/";
    },
    clickCheng: function() {
      this.operation = "x";
      this.list[this.cot++] = "x";
    },
    clickJian: function() {
      this.operation = "-";
      this.list[this.cot++] = "-";
    },
    clickJia: function() {
      this.operation = "+";
      this.list[this.cot++] = "+";
    },
    clickDeng: function() {
      this.value = this.result;
      this.list = [];
      this.cot = 0;
      this.list[this.cot++] = this.result;
    },
    clickClear: function() {
      this.value = "";
      this.cot = 0;
      this.list = [];
    },
    oper: function(arg1, arg2, arg3) {
      switch (arg3) {
        case "x":
          return arg1 * arg2;
          break;
        case "/":
          return arg1 / arg2;
          break;
        case "-":
          return arg2 - arg2;
          break;
        case "+":
          return arg1 + arg2;
          break;
      }
    },
    textbox: function(args) {
      var ds = "";
      args.forEach(element => {
        ds += element + " ";
      });
      return ds;
    },
    IsDigital: function(args) {
      if (
        args === 0 ||
        args === 1 ||
        args === 2 ||
        args === 3 ||
        args === 4 ||
        args === 5 ||
        args === 6 ||
        args === 7 ||
        args === 8 ||
        args === 9
      )
        return true;
    },
    onClickLeft:function(){
      this.$router.go(-1);
    }
  }
};
</script>