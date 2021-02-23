<template>
  <div>
    <section
      class="chatlist"
      :class="showSelBox > 0 ? 'chatlist-bottom-collapse' : 'chatlist-bottom'"
    >
      <mt-loadmore
        :top-method="loadTop"
        top-pull-text="加载更多"
        top-drop-text="释放加载"
        @top-status-change="handleTopChange"
        ref="loadmore"
      >
        <ul>
          <template v-for="item in records">
            <li class="chat-mine" v-if="item.type == 1">
              <div class="chat-user"><img src="../../../assets/img/calc.png" /></div>
              <div class="time">
                <cite
                  ><i>{{ item.time }}</i
                  >{{ item.name }}</cite
                >
              </div>
              <div class="chat-text" v-html="replaceFace(item.content)"></div>
            </li>
            <li v-if="item.type == 2">
              <div class="chat-user"><img src="../../../assets/img/calc.png" /></div>
              <div class="time">
                <cite
                  >{{ item.name }}<i>{{ item.time }}</i></cite
                >
              </div>
              <div class="chat-text" v-html="replaceFace(item.content)"></div>
            </li>
          </template>
        </ul>
      </mt-loadmore>
    </section>

    <section class="foot">
      <mt-field
        id="txtContent"
        placeholder="请输入消息"
        class="con"
        v-model="content"
      ></mt-field>
      <span class="btn-face" v-on:click="showSelBox = showSelBox == 1 ? 0 : 1"
        ><i class="fa fa-smile-o" aria-hidden="true"></i
      ></span>
      <span class="btn-plus" v-on:click="showSelBox = showSelBox == 2 ? 0 : 2"
        ><i
          class="fa"
          aria-hidden="true"
          :class="showSelBox == 2 ? 'fa-minus-circle' : 'fa-plus-circle'"
        ></i
      ></span>
      <span class="btn btn-send" v-on:click="sendMsg">发送</span>
      <section class="selbox" :class="showSelBox > 0 ? 'show' : 'hide'">
        <section v-show="showSelBox == 1" class="face-box">
          <mt-swipe :auto="0" :continuous="false">
            <mt-swipe-item v-for="n in Math.ceil(EXPS.length / 18)">
              <li v-for="(item, index) in getEXP(n, 18)">
                <img
                  :src="'static/emotion/' + item.file"
                  alt=""
                  :data="item.code"
                  v-on:click="content += item.code"
                />
              </li>
            </mt-swipe-item>
          </mt-swipe>
        </section>
        <div v-show="showSelBox == 2">{{ selOther }}</div>
      </section>
    </section>
  </div>
</template>


<script>
import * as signalR from "@microsoft/signalr";
import util from "../../../assets/js/util";
import fsCfg from "../../../assets/js/fw";
let hubUrl = "https://localhost:44351/chatHub";
// .net core 版本中默认不会自动重连，需手动调用 withAutomaticReconnect
const connection = new signalR.HubConnectionBuilder()
  .withAutomaticReconnect([0, 3000, 5000, 10000, 15000, 30000])
  .withUrl(hubUrl)
  .build();
connection.onreconnecting((error) => {
  const status = 'Connection lost due to error "${error}"';
  console.log(error);
});
connection.start().catch((err) => console.log(err.message));
export default {
  name: "Im",
  mounted() {
    var _this = this;
    //this.getToken();
    //实现Show方法
    connection.on("Show", function (token, sendto, message) {
      //_this.remsg = _this.remsg + "<br>" + username + ":" + message;
      //var ts = token.split('#');
      console.log(sendto);
      _this.records.push({
        type: sendto,
        time: util.formatDate.format(new Date(), "yyyy-MM-dd hh:mm:ss"),
        name: token,
        content: message,
      });

      // setTimeout(function () {
      //   _this.records.push({
      //     type: 2,
      //     time: util.formatDate.format(new Date(), "yyyy-MM-dd hh:mm:ss"),
      //     name: sendto,
      //     content: "你好！",
      //   });
      // }, 100);
    });
  },
  data() {
    return {
      user: "user",
      msg: "",
      remsg: "",
      records: [
        {
          type: 1,
          time: util.formatDate.format(new Date(), "yyyy-MM-dd hh:mm:ss"),
          name: "游客",
          content: "你好！",
        },
        {
          type: 2,
          time: util.formatDate.format(new Date(), "yyyy-MM-dd hh:mm:ss"),
          name: "客户MM",
          content:
            '这里是<a target="_blank" href="https://github.com/taylorchen709/vue-chat">源码</a>',
        },
      ],
    };
  },
  methods: {
    // getToken:function(){
    //   let self = this;
    //   var url = "https://localhost:44351/api/login/gettoken/userid=jxj&passwod=123";
    //     fsCfg.getData(url, function(rtl){
    //       self.token = rtl;
    //     });
    // },
    getEXP: function (pageNow, pageSize) {
      return this.EXPS.slice((pageNow - 1) * pageSize, pageSize * pageNow);
    },
    //发送消息
    sendMsg: function () {
      var _this = this;

      if (this.content == "") {
        Toast("请输入消息");
        return;
      }

      var t = this.count % 2 == 0 ? 1 : 2;
      this.count++;
      connection.invoke("SendMsg", this.token, t, this.content);
      this.content = "";

      this.scrollToBottom();
      //this.focusTxtContent();//聚焦输入框
    },
    //聚焦输入框
    focusTxtContent: function () {
      document.querySelector("#txtContent input").focus();
    },
    //滚动条滚动到底部
    scrollToBottom: function () {
      setTimeout(function () {
        var chatlist = document.getElementsByClassName("chatlist")[0];
        chatlist.scrollTop = chatlist.scrollHeight;
      }, 100);
    },
    //替换表情代码
    replaceFace: function (con) {
      var _this = this;
      var exps = this.EXPS;
      for (var i = 0; i < exps.length; i++) {
        //con = con.replace(new RegExp(exps[i].code,'g'), '<img src="static/emotion/' + exps[i].file +'"  alt="" />');
        con = con.replace(
          exps[i].reg,
          '<img src="static/emotion/' + exps[i].file + '"  alt="" />'
        );
      }
      return con;
    },
    handleTopChange(status) {
      this.topStatus = status;
    },
    loadTop(id) {
      var _this = this;
      setTimeout(() => {
        var chatlist = document.getElementsByClassName("chatlist")[0];
        var oldHeight = chatlist.scrollHeight;

        _this.records.unshift(
          {
            type: 1,
            time: util.formatDate.format(new Date(), "yyyy-MM-dd hh:mm:ss"),
            name: "游客",
            content: "你好！13213",
          },
          {
            type: 2,
            time: util.formatDate.format(new Date(), "yyyy-MM-dd hh:mm:ss"),
            name: "客户MM",
            content:
              '这里是<a target="_blank" href="https://github.com/taylorchen709/vue-chat">源码</a>13213',
          }
        );

        setTimeout(function () {
          var newHeight = chatlist.scrollHeight;
          chatlist.scrollTop = newHeight - oldHeight;
        }, 100);

        this.$refs.loadmore.onTopLoaded(id);
      }, 1500);
    },
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.hello{
  height: 100%;
  width: 50%;
}
#el-input{
  display: inline-block;
  width:96%;
  float: left;
}
#message {
  overflow-y:auto;
  text-align: left;
  border: #42b983 solid 1px;
  height: 20vh;
}


</style>