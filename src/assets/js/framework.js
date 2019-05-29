//import "https://cdnjs.cloudflare.com/ajax/libs/vue-resource/0.1.17/vue-resource.js";
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ?
    factory(exports) :
    typeof define === 'function' && define.amd ?
    define('framework', ['exports'], factory) :
    factory((global.framework = {}))
})(this, function (exports) {
  'use strict'
  /*exports.getData = function (url) {
    Axios
      .get(url)
      .then(response => {
        console.log(response);
      })
      // 请求失败
      .catch(error => {
        alert("网络错误，不能访问");
      });
  }

  exports.postData = function (url, data) {
    Axios.post(url, data, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        alert(error);
      });
  }*/

  exports.strFormat = function () {
    if (arguments.length == 0) return null
    var str = arguments[0]
    for (var i = 1; i < arguments.length; i++) {
      var re = new RegExp('\\{' + (i - 1) + '\\}', 'gm')
      str = str.replace(re, arguments[i])
    }
    return str
  }
  window.framework = exports
})

