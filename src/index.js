import React from 'react';
import ReactDOM from 'react-dom';
// import 'antd-mobile/dist/antd-mobile.css';
import axios from './api';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const render = ()=>ReactDOM.render(<App />, document.getElementById('root'));
/**
 * 如果是一生约APP进入页面需要URL加入参数
 * @param/userType
 * @value/ysyapp
 * 一生约app初始化 并挂载实例
 */
const appinit = window.appinit;
appinit(function (ysyapp) {
    window.ysyapp =  ysyapp;
    /**
     * 获取登录信息
     */
    if(ysyapp){
        ysyapp({
            funName:'getUserId',
            data:"",
            callback:function (res) {
                axios.defaults.headers.common['accessToken'] = res.accessToken;
                localStorage.setItem('userId', res.userId);
                localStorage.setItem('accessToken',res.accessToken);
                render();
            }
        });
    }else{
        render();
    }
});

registerServiceWorker();
