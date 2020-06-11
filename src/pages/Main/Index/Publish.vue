<style lang="less" scoped>
.xr-editor {
  width: 100%;
  .nav {
    display: flex;
    button {
      cursor: pointer;
    }
    &__img {
      position: relative;
      input {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        opacity: 0;
      }
    }
  }
  .row {
    display: flex;
    width: 100%;
    height: 300px;
  }
  .editor {
    height: 100vh;
    width: 100%;
    flex: 1;
    position: relative;
    padding: 0px;
    outline: none;
    border: 1px solid #000;
    overflow-y: scroll;
    img {
      max-width: 100px;
      max-height: 100px;
      vertical-align: middle;
    }
  }
  .content {
    width: 90%;
    flex: 1;
    border: 1px solid #000;
    word-break: break-all;
    word-wrap: break-word;
    overflow: scroll;
  }
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
  <div class="pages">
    <div class="xr-editor">
      <van-dropdown-menu>
        <van-dropdown-item v-model="filter" :options="items" />
      </van-dropdown-menu>

      <van-cell-group>
        <font
          color="gray"
          style="font-family: 'Courier New', Courier, monospace;margin-left:17px;font-size:10px;"
        >{{date}}</font>
        <van-field v-model="title" placeholder="请输入标题" />
      </van-cell-group>
      <!--按钮区-->
      <div class="nav">
        <van-button icon="star-o" type="primary" size="small" @click="execCommand('bold')" square>加粗</van-button>
        <van-button
          icon="star-o"
          type="primary"
          size="small"
          @click="execCommand('insertUnorderedList')"
          square
        >无序列表</van-button>
        <van-button
          icon="star-o"
          type="primary"
          size="small"
          @click="execCommand('insertHorizontalRule')"
          square
        >水平线</van-button>
        <van-button
          icon="arrow-left"
          type="primary"
          size="small"
          @click="execCommand('undo')"
          square
        >后退</van-button>
        <van-button icon="arrow" type="primary" size="small" @click="execCommand('redo')" square>前进</van-button>
        <van-button
          icon="star-o"
          type="primary"
          size="small"
          @click="execCommand('formatBlock', '<p>')"
          square
        >段落</van-button>
        <van-button icon="star-o" type="primary" size="small" @click="createLink" square>链接</van-button>
        <van-button icon="photo" type="primary" size="small" class="nav__img" square>
          插入图片
          <!--这个 input 是隐藏的-->
          <input type="file" accept="image/gif, image/jpeg, image/png" @change="insertImg" />
        </van-button>
        <van-button text="发布" @click="release" type="danger" size="small" square />
      </div>
      <!--编辑区-->
      <div id="richbox" class="editor" contenteditable="true"></div>
      <!-- <diV class="content">{{html}}</diV> -->
    </div>
  </div>
</template>


<script>
import fsCfg from "../../../assets/js/fw";
import { Toast } from "vant";
export default {
  name: "Index",
  serverUrl: {
    API_IS_LOGIN: "/api/values/login/user={0}&pwd={1}",
    API_WRITE_ARTICLE: "/api/article/write",
    API_GET_ARTICLE_CATEGORY: "/api/article/getarticlecategory"
  },
  data() {
    return {
      html: null,
      filter: "NORMAL",
      items: [],
      articles: ["111", "1211"],
      value: "",
      title: "",
      date: null,
      user: null,
      pwd: null,
      show: "block"
    };
  },
  methods: {
    execCommand(name, args = null) {
      document.execCommand(name, false, args);
      this.print();
    },
    print() {
      this.html = document.querySelector(".editor").innerHTML;
    },
    createLink() {
      let url = window.prompt("请输入链接地址");
      if (url) this.execCommand("createLink", url);
    },
    insertImgLink() {
      let url = window.prompt("请输入图片地址");
      if (url) this.execCommand("insertImage", url);
    },
    insertImg(e) {
      let reader = new FileReader();
      let file = e.target.files[0];
      reader.onload = () => {
        let base64Img = reader.result;
        this.execCommand("insertImage", base64Img);
        document.querySelector(".nav__img input").value = ""; // 解决同一张图片上传无效的问题
      };
      reader.readAsDataURL(file);
    },
    onClickLeft: function() {
      this.$router.go(-1);
    },
    release: function() {
      let self = this;
      if(self.user == null || self.items.length == 0) return;
      var data = {
        title: self.title,
        content: document.getElementById("richbox").innerHTML,
        user: self.user,
        category: self.filter
      };

      Toast.loading({
        forbidClick: true,
        duration: 0,
        message: "发布中..."
      });

      fsCfg.postData(
        this.$options.serverUrl.API_WRITE_ARTICLE,
        JSON.stringify(data),
        function(res) {
          if (res.success) {
            self.$router.go(-1);
            Toast.clear();
          } else {
            Toast(res.message.content);
            Toast.clear();
          }
        }
      );
    },
    handleClick(e) {
      if (
        e.target &&
        e.target.tagName &&
        e.target.tagName.toUpperCase() === "IMG"
      ) {
        this.handleClickImg(e.target);
      } else {
        let t = document.getElementById("nmsl");
        if (t) {
          t.parentElement.removeChild(t);
        }
      }
    },
    handleClickImg(img) {
      this.nowImg = img;
      this.showOverlay();
    },
    showOverlay() {
      // 添加蒙层
      this.overlay = document.createElement("div");
      this.editor.appendChild(this.overlay);
      // 定位蒙层和大小
      this.repositionOverlay();
    },
    repositionOverlay() {
      let imgRect = this.nowImg.getBoundingClientRect();
      let editorRect = this.editor.getBoundingClientRect();
      // 设置蒙层宽高和位置
      Object.assign(this.overlay.style, {
        position: "absolute",
        top: `${imgRect.top - editorRect.top + this.editor.scrollTop}px`,
        left: `${imgRect.left -
          editorRect.left -
          1 +
          this.editor.scrollLeft}px`,
        width: `${imgRect.width}px`,
        height: `${imgRect.height}px`,
        boxSizing: "border-box",
        border: "1px dashed red",
        display: this.show
      });
      this.overlay.id = "nmsl";
      // 添加四个顶点拖拽框
      this.createBox();
    },
    clearbox() {
      let t = document.getElementById("nmsl");
      if (t) t.parentElement.removeChild(t);
      this.boxes = [];
    },
    createBox() {
      this.boxes = [];
      this.addBox("nwse-resize"); // top left
      this.addBox("nesw-resize"); // top right
      this.addBox("nwse-resize"); // bottom right
      this.addBox("nesw-resize"); // bottom left
      this.positionBoxes(); // 设置四个拖拽框位置
    },
    addBox(cursor) {
      const box = document.createElement("div");
      Object.assign(box.style, {
        class: "minitest",
        position: "absolute",
        height: "12px",
        width: "12px",
        display: this.show,
        backgroundColor: "white",
        border: "1px solid #777",
        boxSizing: "border-box",
        opacity: "0.80"
      });
      box.style.cursor = cursor;
      box.addEventListener("mousedown", this.handleMousedown); // 顺便添加事件
      this.overlay.appendChild(box);
      this.boxes.push(box);
    },
    positionBoxes() {
      let handleXOffset = `-6px`;
      let handleYOffset = `-6px`;
      [
        { left: handleXOffset, top: handleYOffset },
        { right: handleXOffset, top: handleYOffset },
        { right: handleXOffset, bottom: handleYOffset },
        { left: handleXOffset, bottom: handleYOffset }
      ].forEach((pos, idx) => {
        Object.assign(this.boxes[idx].style, pos);
      });
    },
    handleMousedown(e) {
      this.dragBox = e.target;
      this.dragStartX = e.clientX;
      this.preDragWidth = this.nowImg.width;
      this.setCursor(this.dragBox.style.cursor);
      document.addEventListener("mousemove", this.handleDrag);
      document.addEventListener("mouseup", this.handleMouseup);
    },
    handleDrag(e) {
      // 计算水平拖动距离
      const deltaX = e.clientX - this.dragStartX;
      // 修改图片大小
      if (this.dragBox === this.boxes[0] || this.dragBox === this.boxes[3]) {
        // 左边的两个框
        this.nowImg.width = Math.round(this.preDragWidth - deltaX);
      } else {
        // 右边的两个框
        this.nowImg.width = Math.round(this.preDragWidth + deltaX);
      }
      // 同时修改蒙层大小
      this.repositionOverlay();
    },
    handleMouseup() {
      this.setCursor("");
      // 拖拽结束移除事件监听
      document.removeEventListener("mousemove", this.handleDrag);
      document.removeEventListener("mouseup", this.handleMouseup);
    },
    setCursor(value) {
      // 设置鼠标样式
      [document.body, this.nowImg].forEach(el => {
        el.style.cursor = value;
      });
    }
  },
  mounted: function() {
    let self = this;
    self.user = window.prompt("请输入用户名");
    self.pwd = window.prompt("请输入密码");
    if (framework.isNullOrWhite(self.user) && framework.isNullOrWhite(self.pwd)) {
      fsCfg.getData(
        framework.strFormat(this.$options.serverUrl.API_IS_LOGIN, self.user, self.pwd),
        function(res) {
          if (!res.success) {
            Toast(res.message.content);
            return;
          }
        }
      );

      fsCfg.getData(this.$options.serverUrl.API_GET_ARTICLE_CATEGORY, 
      function(res) {
        if (res.success) {
          for (let index = 0; index < res.data.length; index++) {
            let temp = {
              text: res.data[index].CATEGORY_NAME,
              value: res.data[index].CATEGORY_CODE
            };
            self.items.push(temp);
          }
        }
      });
      this.editor = document.querySelector(".editor");
      this.editor.addEventListener("click", this.handleClick);
      //Toast(user);

      var myDate = new Date();
      this.date = myDate.toLocaleString();
    }
  }
};
</script>