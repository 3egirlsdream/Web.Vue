'use strict'
import './framework'
import Axios from "axios";
const fsCfg = {
    serverAddr: function () {
        if (window.location.protocol === 'https:')
            return 'https://localhost:44361'
        else if (window.location.protocol === 'http:') {
            return 'http://47.107.186.141:4396'
        }
        return ''
    },
    getData: function (url, callback) {
        let res = null;
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
                alert("网络错误")
            });
    },

    postData: function (url, data, callback) {
        Axios.post(this.serverAddr() + url, data, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(function (response) {
                if(response != null){
                    setTimeout(
                        function(clbk, msg){
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
    }
}

export default fsCfg