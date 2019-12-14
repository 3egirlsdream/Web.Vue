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
    <div class="center" style="background:#fff;width:100%;">
      <!-- header -->
      <div style="position:fixed;z-index:999;top:0;">
        <nav>
          <div
            class="container"
            style="position: fixed;top: 0px; background:#6200ea;box-shadow:2px 2px 5px gray;"
          >
            <div style="padding-left:4vh;float:left;">
              <a href="">3egirlsdream</a>
            </div>
            <div class="menu" style="padding-right:4vh;">
              <a href>Blogs</a>
              <a href>Categories</a>
              <a href="">Gallery</a>
              <a href>About</a>
            </div>
          </div>
        </nav>
      </div>
      <div style="margin-top:150px;"></div>
      <div v-for="item in items" style="margin-top:7vh;">
        <v-lazy>
          <v-card class="mx-auto" width="80%" height="40%">
            <v-img
              :src="item.imG_CODE"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            >
              <!-- <v-card-title style="font-size:20px;" v-text="item.title"></v-card-title> -->
            </v-img>
            <v-card-text style="font-size:20px;" class="text--primary">{{item.imG_BASE64}}</v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn icon>
                <v-icon>mdi-heart</v-icon>
              </v-btn>

              <v-btn icon>
                <v-icon>mdi-bookmark</v-icon>
              </v-btn>

              <v-btn icon>
                <v-icon>mdi-share-variant</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-lazy>
      </div>
    </div>
  </v-app>
</template>

<script>
import framework from "../../../assets/js/framework";
import fsCfg from "../../../assets/js/fw";
import { Toast } from "vant";
import Axios from "axios";
import { vuetify } from "vuetify";
export default {
  name: "Index",
  serverUrl: {
    API_IS_LOGIN: "/api/values/login/user={0}&pwd={1}",
    API_WRITE_ARTICLE: "/api/article/write",
    API_GET_IMAGE: "/api/values/getimage={0}"
  },
  data() {
    return {
      showKeyboard: true,
      value: "",
      user: "",
      date: null,
      user: null,
      items: []
    };
  },
  methods: {},
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

    var url = framework.strFormat(this.$options.serverUrl.API_GET_IMAGE, 'jxj');
    fsCfg.getData(url, function(res) {
      if (res.success) {
        self.items = res.data;
        self.items.forEach(element => {
          element.imG_CODE = "http://47.107.186.141/img/" + element.imG_CODE;
        });
      }
    });

    var myDate = new Date();
    this.date = myDate.toLocaleString();
  }
};
</script>