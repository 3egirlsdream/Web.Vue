'use strict'
import './framework'
import Axios from "axios";
const fsCfg = {
    serverAddr: function () {
        if (window.location.hostname === 'localhost')
            return 'https://localhost:44361'
        else if (window.location.protocol === 'http:') {
            return 'http://47.107.186.141:4396'
        }
        return ''
    },
    getData: function (url, callback) {
        console.log('GET URL:' + url)
        let user = 'cxk'//framework.getStorage('user');
        let pwd = '123455'//framework.getStorage('pwd')
        let u = framework.strFormat('/api/values/login/user={0}&pwd={1}', user, pwd);
        Axios.get(this.serverAddr() + u)
            .then(() => {
                Axios.get(this.serverAddr() + url)
                    .then(response => {
                        if (response != null) {
                            setTimeout(
                                function (clbk, msg) {
                                    clbk(msg)
                                },
                                100,
                                callback,
                                response.data
                            )
                        }
                    })
                    // 请求失败
                    .catch(error => {
                        console.log(error);
                        alert("网络错误")
                    });
            })
            // 请求失败
            .catch(error => {
                alert(error);
                const index = location.href.lastIndexOf("/pages");
                const urlBase = location.href.substring(0, index);
                window.location.href = urlBase + "/pages/SYSTEM/Login.html";
            });

    },

    postData: function (url, data, callback) {
        Axios.post(this.serverAddr() + url, data, {
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(function (response) {
                if (response != null) {
                    setTimeout(
                        function (clbk, msg) {
                            clbk(msg)
                        },
                        100,
                        callback,
                        response.data
                    )
                }
            })
            .catch(function (error) {
                alert(error);
            });
    },
    isLogin: function () {

    }
}

export default fsCfg