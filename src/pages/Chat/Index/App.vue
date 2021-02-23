<template>
  <div>
    <van-notice-bar
      left-icon="volume-o"
      :text="
        `激情${room_number}号聊天室 激情${room_number}号聊天室 激情${room_number}号聊天室 激情${room_number}号聊天室 激情${room_number}号聊天室 激情${room_number}号聊天室 激情${room_number}号聊天室`
      "
    />
    <section style="padding-bottom:100px;" class="chatlist">
      <ul>
        <template v-for="item in records">
          <li class="chat-mine" v-if="item.type == 1" :key="item"> 
            <div class="chat-user"><img id="myimg" :src="myimg" /></div>
            <div class="time">
              <cite
                ><i>{{ item.time }}</i
                >{{ item.name }}</cite
              >
            </div>
            <div class="chat-text imgwidth" v-html="replaceFace(item.content)"></div>
          </li>
          <li v-if="item.type == 2" :key="item">
            <div class="chat-user"><img :src="item.otherimg" /></div>
            <div class="time">
              <cite
                >{{ item.name }}<i>{{ item.time }}</i></cite
              >
            </div>
            <div class="chat-text imgwidth" v-html="replaceFace(item.content)"></div>
          </li>
        </template>
      </ul>
    </section>

    <section class="foot">
      <!-- <van-row>
        <van-col span="21"><van-field v-model="displayname" label="用户名" placeholder="请输入用户名" /></van-col>
        <van-col span="3"><span class="btn btn-send" v-on:click="placeOrder">发送</span></van-col>
      </van-row>
      <van-row>
        <van-col span="21"><van-field v-model="content" label="内容" placeholder="请输入内容" @keyup.enter="placeOrder"/></van-col>
        <van-col span="3"><van-icon name="add-o" style="float:right;" @click="showSelBox == 1 ? showSelBox = 0 : showSelBox = 1"/></van-col>
      </van-row>
       -->
      <van-row style="background:#fff;">
        <van-col span="2"
          ><van-icon
              style="margin-top:0.2em;"
              name="smile-o"
              size="0.8em"
              @click="
                showSelBox == 1 ? (showSelBox = 0) : (showSelBox = 1)
              "/></van-col>
        <van-col span="2">
          <van-icon
              style="margin-top:0.2em;"
              name="add-o"
              size="0.8em"
              @click="
                showSelBox == 2 ? (showSelBox = 0) : (showSelBox = 2)
              "/>
        </van-col>
        <van-col span="20"
          ><van-field
            ref="contents"
            v-model="content"
            placeholder="请输入内容"
            @keyup.enter="placeOrder"
        /></van-col>
      </van-row>
      
      <span
        class="btn btn-send"
        v-on:click="placeOrder"
        style="margin-right:4px;"
        >发 送</span
      >
      <section class="selbox" :class="showSelBox > 0 ? 'show' : 'hide'">
        <section v-show="showSelBox == 1" class="face-box">
          <van-swipe class="my-swipe" :autoplay="0" indicator-color="white">
            <van-swipe-item v-for="n in Math.ceil(EXPS.length / 30)" :key="n">
              <div
                v-for="(item, index) in getEXP(n, 30)"
                :key="index"
                style="float:left;"
              >
                <img
                  :src="item.file"
                  alt=""
                  :data="item.code"
                  v-on:click="content += item.code"
                />
              </div>
            </van-swipe-item>
          </van-swipe>
        </section>
        <div v-show="showSelBox == 2">
          <!-- <van-icon name="photo-o"> -->
            <label style="margin:20px;">
              <input
                type="file"
                name
                id="form"
                @change="addImg"
                style="opacity:0;width:0;float:left;"
                accept="image/*"
                ref="inputImage"
              >
              <van-icon name="photo-o"/>
            </label>
          <!-- </van-icon> -->
        </div>
      </section>
    </section>
    <van-dialog v-model="show" title="" @confirm="confirm()">
      <van-cell-group>
        <van-field
          v-model="room_number"
          label="房间号"
          placeholder="请输入房间号"
        />
        <van-field
          v-model="displayname"
          label="姓名"
          placeholder="请输入姓名"
          readonly
        />
      </van-cell-group>
    </van-dialog>
  </div>
</template>

<script>
import framework from "../../../assets/js/framework";
import * as signalR from "@microsoft/signalr";
import util from "../../../assets/js/util";
import fsCfg from "../../../assets/js/fw";
import { Toast } from "vant";
import { Notify } from 'vant';

let hubUrl = window.location.hostname == 'localhost1' ? "https://localhost:44351/chatHub" : "http://47.107.186.141:5000/chatHub";//";// 
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
  name: "chatlist",
  serviceUrl: {
    API_USER_INFO: "/api/values/GetUserInfo?username={0}",
  },
  data() {
    return {
      headImg:'photo-o',
      show: true,
      myimg: "",
      otherimg: "",
      room_number: "",
      src:
        '<img src="https://csdnimg.cn/release/blogv2/dist/pc/img/original.png"  alt="" />',
      displayname: framework.getStorage("displayname"),
      username: framework.getStorage("user"),
      count: 0,
      showSelBox: 1, // 0隐藏 1显示表情 2显示其他
      selFace: "表情",
      selOther: "其他功能",
      content: "",
      topStatus: "",
      token: "",
      user: "user",
      msg: "",
      remsg: "",
      curuser: "",
      sendto: "",
      //聊天记录
      records: [],
      // 表情
      EXPS: [
        { file: "100.gif", code: "/::)", title: "微笑", reg: /\/::\)/g },
        { file: "101.gif", code: "/::~", title: "伤心", reg: /\/::~/g },
        { file: "102.gif", code: "/::B", title: "美女", reg: /\/::B/g },
        { file: "103.gif", code: "/::|", title: "发呆", reg: /\/::\|/g },
        { file: "104.gif", code: "/:8-)", title: "墨镜", reg: /\/:8-\)/g },
        { file: "105.gif", code: "/::<", title: "哭", reg: /\/::</g },
        { file: "106.gif", code: "/::$", title: "羞", reg: /\/::\$/g },
        { file: "107.gif", code: "/::X", title: "哑", reg: /\/::X/g },
        { file: "108.gif", code: "/::Z", title: "睡", reg: /\/::Z/g },
        { file: "109.gif", code: "/::'(", title: "哭", reg: /\/::'\(/g },
        { file: "110.gif", code: "/::-|", title: "囧", reg: /\/::-\|/g },
        { file: "111.gif", code: "/::@", title: "怒", reg: /\/::@/g },
        { file: "112.gif", code: "/::P", title: "调皮", reg: /\/::P/g },
        { file: "113.gif", code: "/::D", title: "笑", reg: /\/::D/g },
        { file: "114.gif", code: "/::O", title: "惊讶", reg: /\/::O/g },
        { file: "115.gif", code: "/::(", title: "难过", reg: /\/::\(/g },
        { file: "116.gif", code: "/::+", title: "酷", reg: /\/::\+/g },
        { file: "117.gif", code: "/:--b", title: "汗", reg: /\/:--b/g },
        { file: "118.gif", code: "/::Q", title: "抓狂", reg: /\/::Q/g },
        { file: "119.gif", code: "/::T", title: "吐", reg: /\/::T/g },
        { file: "120.gif", code: "/:,@P", title: "笑", reg: /\/:,@P/g },
        { file: "121.gif", code: "/:,@-D", title: "快乐", reg: /\/:,@-D/g },
        { file: "122.gif", code: "/::d", title: "奇", reg: /\/::d/g },
        { file: "123.gif", code: "/:,@o", title: "傲", reg: /\/:,@o/g },
        { file: "124.gif", code: "/::g", title: "饿", reg: /\/::g/g },
        { file: "125.gif", code: "/:|-)", title: "累", reg: /\/:\|-\)/g },
        { file: "126.gif", code: "/::!", title: "吓", reg: /\/::!/g },
        { file: "127.gif", code: "/::L", title: "汗" },
        { file: "128.gif", code: "/::>", title: "高兴" },
        { file: "129.gif", code: "/::,@", title: "闲" },
        { file: "130.gif", code: "/:,@f", title: "努力" },
        { file: "131.gif", code: "/::-S", title: "骂" },
        { file: "132.gif", code: "/:?", title: "疑问" },
        { file: "133.gif", code: "/:,@x", title: "秘密" },
        { file: "134.gif", code: "/:,@@", title: "乱" },
        { file: "135.gif", code: "/::8", title: "疯" },
        { file: "136.gif", code: "/:,@!", title: "哀" },
        { file: "137.gif", code: "/:!!!", title: "鬼" },
        { file: "138.gif", code: "/:xx", title: "打击" },
        { file: "139.gif", code: "/:bye", title: "bye" },
        { file: "140.gif", code: "/:wipe", title: "汗" },
        { file: "141.gif", code: "/:dig", title: "抠" },
        { file: "142.gif", code: "/:handclap", title: "鼓掌" },
        { file: "143.gif", code: "/:&-(", title: "糟糕" },
        { file: "144.gif", code: "/:B-)", title: "恶搞" },
        { file: "145.gif", code: "/:<@", title: "什么" },
        { file: "146.gif", code: "/:@>", title: "什么" },
        { file: "147.gif", code: "/::-O", title: "累" },
        { file: "148.gif", code: "/:>-|", title: "看" },
        { file: "149.gif", code: "/:P-(", title: "难过" },
        { file: "150.gif", code: "/::'|", title: "难过" },
        { file: "151.gif", code: "/:X-)", title: "坏" },
        { file: "152.gif", code: "/::*", title: "亲" },
        { file: "153.gif", code: "/:@x", title: "吓" },
        { file: "154.gif", code: "/:8*", title: "可怜" },
        { file: "155.gif", code: "/:pd", title: "刀" },
        { file: "156.gif", code: "/:<W>", title: "水果" },
        { file: "157.gif", code: "/:beer", title: "酒" },
        { file: "158.gif", code: "/:basketb", title: "篮球" },
        { file: "159.gif", code: "/:oo", title: "乒乓" },
        { file: "160.gif", code: "/:coffee", title: "咖啡" },
        { file: "161.gif", code: "/:eat", title: "美食" },
        { file: "162.gif", code: "/:pig", title: "动物" },
        { file: "163.gif", code: "/:rose", title: "鲜花" },
        { file: "164.gif", code: "/:fade", title: "枯" },
        { file: "165.gif", code: "/:showlove", title: "唇" },
        { file: "166.gif", code: "/:heart", title: "爱" },
        { file: "167.gif", code: "/:break", title: "分手" },
        { file: "168.gif", code: "/:cake", title: "生日" },
        { file: "169.gif", code: "/:li", title: "电" },
        { file: "170.gif", code: "/:bome", title: "炸弹" },
        { file: "171.gif", code: "/:kn", title: "刀子" },
        { file: "172.gif", code: "/:footb", title: "足球" },
        { file: "173.gif", code: "/:ladybug", title: "瓢虫" },
        { file: "174.gif", code: "/:shit", title: "翔" },
        { file: "175.gif", code: "/:moon", title: "月亮" },
        { file: "176.gif", code: "/:sun", title: "太阳" },
        { file: "177.gif", code: "/:gift", title: "礼物" },
        { file: "178.gif", code: "/:hug", title: "抱抱" },
        { file: "179.gif", code: "/:strong", title: "拇指" },
        { file: "180.gif", code: "/:weak", title: "贬低" },
        { file: "181.gif", code: "/:share", title: "握手" },
        { file: "182.gif", code: "/:v", title: "剪刀手" },
        { file: "183.gif", code: "/:@)", title: "抱拳" },
        { file: "184.gif", code: "/:jj", title: "勾引" },
        { file: "185.gif", code: "/:@@", title: "拳头" },
        { file: "186.gif", code: "/:bad", title: "小拇指" },
        { file: "187.gif", code: "/:lvu", title: "拇指八" },
        { file: "188.gif", code: "/:no", title: "食指" },
        { file: "189.gif", code: "/:ok", title: "ok" },
        { file: "190.gif", code: "/:love", title: "情侣" },
        { file: "191.gif", code: "/:<L>", title: "爱心" },
        { file: "192.gif", code: "/:jump", title: "蹦哒" },
        { file: "193.gif", code: "/:shake", title: "颤抖" },
        { file: "194.gif", code: "/:<O>", title: "怄气" },
        { file: "195.gif", code: "/:circle", title: "跳舞" },
        { file: "196.gif", code: "/:kotow", title: "发呆" },
        { file: "197.gif", code: "/:turn", title: "背着" },
        { file: "198.gif", code: "/:skip", title: "伸手" },
        { file: "199.gif", code: "/:oY", title: "耍帅" },
      ],
      userinfo: [],
    };
  },
  methods: {
    addImg(e) {
      let self = this;
      let files = e.target.files || e.dataTransfer.files;
      let reader = new FileReader();

      //将图片转成base64格式
      reader.readAsDataURL(files[0]);
      reader.onloadend = function() {
        self.headImg = this.result;
        self.content = `<img src="${self.headImg}"  alt="" />`
        self.placeOrder();
      }
      this.$refs.inputImage.value = ''
    },
    confirm() {},
    
    
    getEXP: function(pageNow, pageSize) {
      var f = this.EXPS.slice((pageNow - 1) * pageSize, pageSize * pageNow);
      //console.log(f);
      var ff = [];
      f.forEach((element) => {
        var m = JSON.parse(JSON.stringify(element));
        m.file = "http://www.endingisnihility.xyz/emotion/" + element.file;
        ff.push(m);
      });
      return ff;
    },
    //发送消息
    comeIn: function() {
      connection.invoke("ComeIn", this.displayname, this.room_number);
    },

    placeOrder: function() {
      connection.invoke(
        "PlaceOrder",
        this.room_number,
        this.displayname,
        this.username,
        this.content
      );
      this.content = "";
      this.headImg = '';
      this.showSelBox = 0;
    },
    //聚焦输入框
    focusTxtContent: function() {
      //document.querySelector("#txtContent input").focus();
    },
    //滚动条滚动到底部
    scrollToBottom: function() {
      setTimeout(function() {
        var chatlist = document.getElementsByClassName("chatlist")[0];
        chatlist.scrollTop = chatlist.scrollHeight;
      }, 100);
    },
    //替换表情代码
    replaceFace: function(con) {
      var _this = this;
      var exps = this.EXPS;
      for (var i = 0; i < exps.length; i++) {
        //con = con.replace(new RegExp(exps[i].code,'g'), '<img src="static/emotion/' + '"  alt="" />');
        con = con.replace(
          exps[i].reg,
          '<img src="http://www.endingisnihility.xyz/emotion/' +
            exps[i].file +
            '"  alt="" />'
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

        setTimeout(function() {
          var newHeight = chatlist.scrollHeight;
          chatlist.scrollTop = newHeight - oldHeight;
        }, 100);

        this.$refs.loadmore.onTopLoaded(id);
      }, 1500);
    },
    notify(displayname){
      Notify({ type: 'success', message: `${displayname}进入了房间！` });
    }
  },
  mounted: function() {
    
    //this.disp_prompt();
   
    this.myimg = framework.getStorage("myimg");
    this.$refs.contents.focus();
    window.setTimeout(() => {
      this.showSelBox = 0;
    }, 100);
    let _this = this;
    this.curuser = framework.getStorage("user");
    this.sendto = framework.getStorage("sendto");
    //this.getToken();
    //实现Show方法
    connection.on("ComeIn", function(displayname, room_number) {
      if(room_number != _this.room_number){
        return;
      }
      _this.notify(displayname);
    });
    connection.on("ShowOrder", function(
      orderId,
      displayname,
      username,
      content
    ) {
      if (orderId != _this.room_number) {
        return;
      }
      console.log(displayname + " " + _this.displayname);
      if (_this.userinfo.findIndex((v) => v.username == username) == -1) {
        var url = framework.strFormat(
          _this.$options.serviceUrl.API_USER_INFO,
          username
        );
        fsCfg.getData(url, function(res) {
          if (res.success) {
            var type = displayname == _this.displayname ? 1 : 2;
            _this.records.push({
              type: type,
              time: util.formatDate.format(new Date(), "yyyy-MM-dd hh:mm:ss"),
              name: displayname,
              content: content,
              otherimg: res.data.IMG,
            });
            var info = {
              username: username,
              img: res.data.IMG,
            };
            _this.userinfo.push(info);
            _this.scrollToBottom();
          } else {
            Toast(res.message.content);
          }
        });
      } else {
        var imginfo =
          _this.userinfo[
            _this.userinfo.findIndex((v) => v.username == username)
          ];
        var type = displayname == _this.displayname ? 1 : 2;
        _this.records.push({
          type: type,
          time: util.formatDate.format(new Date(), "yyyy-MM-dd hh:mm:ss"),
          name: displayname,
          content: content,
          otherimg: imginfo.img,
        });
        _this.scrollToBottom();
      }
    });
    this.scrollToBottom();
    this.focusTxtContent();
    
  },

  watch:{
    room_number(){
      this.comeIn();
    }
  }
  // updated:function(){
  //     this.scrollToBottom();
  // }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.imgwidth{
  max-width: 40%;
}
.chatlist {
  position: absolute;
  top: 60px;
  bottom: 48px;
  left: 0px;
  right: 0px;
  overflow-y: scroll;
  overflow-x: hidden;
  padding: 10px;
}

.chatlist-bottom {
  bottom: 48px;
}

.chatlist-bottom-collapse {
  bottom: 198px;
}

.chatlist ul {
  min-height: 300px;
}

.chatlist ul .chat-mine {
  text-align: right;
  padding-left: 0;
  padding-right: 60px;
}

.chatlist ul li {
  position: relative;
  /*font-size: 0;*/
  margin-bottom: 10px;
  padding-left: 60px;
  min-height: 68px;
}

.chat-mine .chat-user {
  left: auto;
  right: 3px;
}

.chat-user {
  position: absolute;
  left: 3px;
}

.chat-text,
.chat-user {
  display: inline-block;
  vertical-align: top;
  /*font-size: 14px;*/
}

.chat-user img {
  width: 40px;
  height: 40px;
  border-radius: 100%;
}

.time {
  width: 100%;
}

cite {
  left: auto;
  right: 60px;
  text-align: right;
}

cite {
  font-style: normal;
  line-height: 24px;
  font-size: 12px;
  white-space: nowrap;
  color: #999;
  text-align: left;
}

cite i {
  font-style: normal;
  padding-left: 5px;
  padding-right: 5px;
  font-size: 12px;
}

.chat-mine .chat-text {
  margin-left: 0;
  text-align: left;
  background-color: #33df83;
  color: #fff;
}

.chat-text {
  position: relative;
  line-height: 22px;
  /*margin-top: 25px;*/
  padding: 10px 15px;
  background-color: #eee;
  border-radius: 3px;
  color: #333;
  word-break: break-all;
  max-width: 462px\9;
}

.chat-text,
.chat-user {
  display: inline-block;
  vertical-align: top;
  font-size: 14px;
}

.chat-text img {
  max-width: 100%;
  vertical-align: middle;
}

.chat-user {
  position: absolute;
  left: 3px;
}

.chat-text:after {
  content: "";
  position: absolute;
  left: -10px;
  top: 15px;
  width: 0;
  height: 0;
  border-style: solid dashed dashed;
  border-color: #eee transparent transparent;
  overflow: hidden;
  border-width: 10px;
}

.chat-mine .chat-text:after {
  left: auto;
  right: -10px;
  border-top-color: #33df83;
}

.foot {
  width: 100%;
  min-height: 48px;
  position: fixed;
  bottom: 0px;
  left: 0px;
  background-color: #f8f8f8;
}

.foot .con {
  position: absolute;
  left: 66px;
  right: 40px;
}

.foot .btn-plus {
  width: 28px;
  padding: 9px 3px;
  position: absolute;
  left: 0px;
  border-left: 1px solid #d9d9d9;
}

.foot .btn-plus i {
  font-size: 2em;
  color: #ccc;
}

.foot .btn-face {
  width: 28px;
  padding: 9px 3px 9px 0px;
  position: absolute;
  left: 35px;
  /*border-right: 1px solid #d9d9d9;*/
}

.foot .btn-face i {
  font-size: 2em;
  color: #d9d9d9;
}

.foot .selbox {
  height: 24vh;
  margin-top: 1px;
  border-top: 1px solid #fff;
}

.show {
  display: block;
}

.hide {
  display: none;
}

.face-box {
  /* position: absolute; */
  /* top: 48px; */
  /* left: 0px; */
  /* right: 0px; */
  /* bottom: 0px; */
  padding: 15px 15px 0px 15px;
  overflow: hidden;
  width: 290px;
  margin: 0px auto;
  /* height: 135px; */
}

.face-box li {
  width: 30px;
  float: left;
  padding: 6px 10px 0px 8px;
}

.btn {
  display: inline-block;
  vertical-align: top;
  font-size: 14px;
  line-height: 32px;
  margin-left: 5px;
  padding: 0 6px;
  background-color: #33df83;
  color: #fff;
  border-radius: 3px;
}

.btn-send {
  position: absolute;
  right: 0px;
  top: 8px;
}
</style>
