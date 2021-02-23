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
  background-color: gray;
  height: 100%;
  width: 100%;
  position: absolute;
}
.p {
  font-size: 17px;
}
.menu {
  a {
    color: black;
    padding: 5px;
    font-size: 9px;
  }

  a:hover {
    color: white;
  }
}
.title {
  a {
    color: black;
    padding: 5px;
    font-size: 2vh;
  }

  a:hover {
    color: white;
  }
}
.container {
  height: 15%;
  width: 100%;
}
</style>

<template>
  <v-app>
    <input type="file" class="upload" multiple />
    <img class="previewImg" src="" />
    <button @click="upload">submit</button>
  </v-app>
</template>

<script>
import framework from "../../../assets/js/framework";
import fsCfg from "../../../assets/js/fw";
import { Toast } from "vant";
import Axios from "axios";
export default {
  name: "Index",
  serverUrl: {
    API_IS_LOGIN: "/api/values/login/user={0}&pwd={1}",
    API_WRITE_ARTICLE: "/api/article/write",
    API_GET_IMAGE: "/api/values/getimage={0}",
  },
  data() {
    return {
      showKeyboard: true,
      value: "",
      user: "",
      date: null,
      user: null,
      items: [],
    };
  },
  methods: {
    uploadsingle(files, index, data){
        let self = this;
        var fr = new FileReader();
        fr.readAsDataURL(files[index]); //读取文件内容，读取完成,result属性中将包含一个data: URL格式的字符串以表示所读取文件的内容。
        fr.onload = function(e) {
              var m = {
                name: files[index].name,
                stream: fr.result,
              };
              data.push(m);
              if(index < files.length - 1){
                index = index+1;
                console.log(index);
                self.uploadsingle(files, index, data);
              }
              else{
                console.log(data);
                       fsCfg.postData("/api/Values/Upload", JSON.stringify(data), function(
                        res
                      ) {
                        if (!res.success) {
                          console.log(res.message.content);
                        }
                      });
              }
        }
    },
    upload() {
      
      var data = [];
      var files = document.querySelector("input.upload").files;
      var index = 0;
      this.uploadsingle(files, 0, data); 
    },
  },
  mounted: function() {
    let self = this;
    // var user = framework.getStorage("user");
    // var pwd = framework.getStorage("pwd");
    // let e = this.$options.serverUrl.API_IS_LOGIN;
    // var url = framework.strFormat(
    //   this.$options.serverUrl.API_IS_LOGIN,
    //   user,
    //   pwd
    // );
    // fsCfg.getData(url, function(res) {
    //   if (!res.success) {
    //     Toast("请登录");
    //     const index = location.href.lastIndexOf("/INDEX");
    //     const urlBase = location.href.substring(0, index);
    //     window.location.href = urlBase + "/SYSTEM/Login.html";
    //   }
    // });
    //Toast(user);

    // var url = framework.strFormat(this.$options.serverUrl.API_GET_IMAGE, 'jxj');
    // fsCfg.getData(url, function(res) {
    //   if (res.success) {
    //     self.items = res.data;
    //     self.items.forEach(element => {
    //       element.imG_CODE = "http://47.107.186.141/img/" + element.imG_CODE;
    //     });
    //   }
    // });

    // var myDate = new Date();
    // this.date = myDate.toLocaleString();
  },
};
</script>
