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
  padding: 0 20px;
}
</style>


<template>
   <div class="pages">
     <van-nav-bar
        title="代码生成器1.0使用说明"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
             <p class="p">
                        <font style="font-size: 20px;" color="#2964AB">※Service</font><br/>
                        ->支持生成前端代码和后端部分代码，并且支持自动生成没有的模型，前提是勾选生成模型，并在右侧输入要生成的表名（数据库连接字符串在设置中填写）<br/>
                        ->自动生成的Api：通过选择 是否作为API 进行订制</br>

                        ->首先输入你的项目名称，例如MES.Plugin.Adc。（可以使用我的例子进行测试，勾上新增，弹出框数2）</br>
                        ★项目名称格式必须为xx.Plugin.xx 。因为生成服务端的名字是直接将Plugin替换为ServerPlugin</br>
                        ->如果你的界面中存在新增、编辑、导入弹出框，勾上即可。</br>
                        ->键入你的弹出框数（不包括新增、编辑、导入）</br>
                        <font style="font-size: 20px;" color="#2964AB">※填表阶段</font></br>
                        ->打开文件夹中的eg.xlsx</br>

                        ->第一页为IndexPage页，按照提示填标即可，值得注意的是当中间控件需要换行置空时，可以选择占位控件</br>
                        ->第二页为新增页，一行分别对应为控件类型，控件名称（英文），控件名称（中文），英文使用大写 例如BILL_NO</br>
                        ->第四页为导入页，按照我给出的例子填写即可</br>
                        ->第五页开始为弹出框，弹出框的名称分别填在第一二格，后面的表格和前面填写方法一致，目前只支持一个搜索条件的弹出框。如果你有多个弹出框，请自行添加sheet页，格式和前面一致。</br>
                        ★注意：2019/1/3更新</br>
                        ·查询字段（英文）最好使用标准字段名，例如BILL_NO的首字母大写其余小写形式，例如BillNo。</br>

                        <font style="font-size: 20px;" color="#2964AB">※Model</font></br>
                        ·添加监视支持输入三种格式</br>
                        ->Word</br>
                        ->Bool Word</br>
                        ->Public Bool Word</br>
                        ★默认生成string类型，定制请选择下面两种。</br>

                        ->生成SQL，选择SFC_MITEM的excel例子试用（支持MySql、SQL Server）。</br>
                        ->添加Command 支持输入一个字符串</br>
                        ->生成模型，需要首先输入数据库连接字符串（设置中输入），在第二个下拉框中选择数据库类型，最后输入表名即可。</br>
                        ★需在Model页第二个下拉框选择数据库。</br>
                        ->设置中可以录入表连接关系，左右为两个表，下面文本框录入连接条件，一个录入一条。</br>
                        ->录入完成后，可以在下面查询。</br>

            </p>
    </div>
</template>


<script>
import { Toast } from "vant";
export default {
  name: "CodeGenerate",
  data() {
    return {
      active1:0,
      active2:0
    };
  },
  methods: {
    onClickLeft:function(){
      this.$router.go(-1);
    }
  },
  mounted: function() {
  }
};
</script>