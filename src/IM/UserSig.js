import TIM from 'tim-js-sdk';
import TIMUploadPlugin from 'tim-upload-plugin';
//封装方法
//SDKAppID
let options = {
    SDKAppID:1400455450// 接入时需要将 0 替换为您的云通信应用的 SDKAppID
};

//userSig
const userSig={
    userSig:'eJyrVgrxCdYrSy1SslIy0jNQ0gHzM1NS80oy0zLBwoYmBgYmpqYmpjDZ4pTsxIKCzBQlK4QURCa1oiCzKBUobmpqamRgABUtycwFiZkZGlmYWgIVQ03JTAcanmRW7FaeYVymnVWZHuZRXBSU628Wnh1plp*dF2RSmOirnWNgYuLrFurqlWyrVAsAZboxWw__'
}
let options_o = {
    SDKAppID: 1400485471// 接入时需要将 0 替换为您的云通信应用的 SDKAppID
};

//userSig
const userSig_o={
    userSig:'eJyrVgrxCdYrSy1SslIy0jNQ0gHzM1NS80oy0zLBwoYmBgYmFqYm5oZQ2eKU7MSCgswUJSuwlKmpiakBRCa1oiCzKBUobmpqamRgABUtycwFiZkZGlmYWloamkNNyUwHGl7gk14eFqjtlmWkXRij713onl4W7hwcaOFVaJJT4pnlFJkV5Jfp65FoFJ4aaKtUCwCK9DGY'
}
// 创建 SDK 实例，`TIM.create()`方法对于同一个 `SDKAppID` 只会返回同一份实例
let tim = TIM.create(options); // SDK 实例通常用 tim 表示
// 设置 SDK 日志输出级别，详细分级请参见 <a href="https://imsdk-1252463788.file.myqcloud.com/IM_DOC/Web/SDK.html#setLogLevel">setLogLevel 接口的说明</a>
// tim.setLogLevel(0); // 普通级别，日志量较多，接入时建议使用
// tim.setLogLevel(1); // release 级别，SDK 输出关键信息，生产环境时建议使用
// 注册腾讯云即时通信IM上传插件
tim.registerPlugin({'tim-upload-plugin': TIMUploadPlugin});
const LOGIN = (values)=>{
   // 登录
   console.log("用户",values)
    if(values.username==="123"){
        LOGINout(values)
        console.log(String(options.SDKAppID) )
        let promise = tim.login({userID:String(options.SDKAppID) , userSig:userSig.userSig});
        promise.then(function(imResponse) {
            console.log(imResponse.data,"登录成功"); // 登录成功
            if (imResponse.data.repeatLogin === true) {
                // 标识账号已登录，本次登录操作为重复登录。v2.5.1 起支持
                console.log(imResponse.data.errorInfo,"yes");
            }
        }).catch(function(imError) {
            console.warn('login error:', imError); // 登录失败的相关信息
        });
    }else{
        console.log(String(options_o.SDKAppID))
        LOGINout(values)
        console.log(String(options.SDKAppID) )
        let promise = tim.login({userID:String(options_o.SDKAppID) , userSig:userSig_o.userSig});
        promise.then(function(imResponse) {
            console.log(imResponse.data,"登录成功"); // 登录成功
            if (imResponse.data.repeatLogin === true) {
                // 标识账号已登录，本次登录操作为重复登录。v2.5.1 起支持
                console.log(imResponse.data.errorInfo,"yes");
            }
        }).catch(function(imError) {
            console.warn('login error:', imError); // 登录失败的相关信息
        });
    }

}
 const LOGINout = (values)=>{
     //退出
     if(values.username==="123") {
         let promise1 = tim.logout({userID:String(options.SDKAppID) , userSig:userSig.userSig});
         promise1.then(function(imResponse) {
             console.log(imResponse.data,"登出成功"); // 登出成功
         }).catch(function(imError) {
             console.warn('logout error:', imError);
         });
     }else{
         let promise1 = tim.logout({userID:String(options_o.SDKAppID) , userSig:userSig_o.userSig});
         promise1.then(function(imResponse) {
             console.log(imResponse.data,"登出成功"); // 登出成功
         }).catch(function(imError) {
             console.warn('logout error:', imError);
         });
     }
}
const ON=()=>{
    let onMessageReceived = function(event) {
        // event.data - 存储 Message 对象的数组 - [Message]
    };
    tim.on(TIM.EVENT.MESSAGE_RECEIVED, onMessageReceived);
}
const OFF =()=>{
    let onSdkReady = function(event) {
        console.log(event)
        let onMessageReceived = function(event) {
            console.log(event)
            // 收到推送的单聊、群聊、群提示、群系统通知的新消息，可通过遍历 event.data 获取消息列表数据并渲染到页面
            // event.name - TIM.EVENT.MESSAGE_RECEIVED
            // event.data - 存储 Message 对象的数组 - [Message]
        };
        tim.on(TIM.EVENT.MESSAGE_RECEIVED, onMessageReceived);
    }
    tim.off(TIM.EVENT.MESSAGE_RECEIVED, onSdkReady);
}
const SEND=(values)=>{
    let message = tim.createTextMessage({
        to: String(options.SDKAppID),
        conversationType: "C2C",
        // 消息优先级，用于群聊（v2.4.2起支持）。如果某个群的消息超过了频率限制，后台会优先下发高优先级的消息，详细请参考：https://cloud.tencent.com/document/product/269/3663#.E6.B6.88.E6.81.AF.E4.BC.98.E5.85.88.E7.BA.A7.E4.B8.8E.E9.A2.91.E7.8E.87.E6.8E.A7.E5.88.B6)
        // 支持的枚举值：TIM.TYPES.MSG_PRIORITY_HIGH, TIM.TYPES.MSG_PRIORITY_NORMAL（默认）, TIM.TYPES.MSG_PRIORITY_LOW, TIM.TYPES.MSG_PRIORITY_LOWEST
        // priority: TIM.TYPES.MSG_PRIORITY_NORMAL,
        payload: {
            text: values
        }
    });
// 2. 发送消息
    let promise = tim.sendMessage(message);
    promise.then(function(imResponse) {
        // 发送成功
        console.log(imResponse);
    }).catch(function(imError) {
        // 发送失败
        console.warn('sendMessage error:', imError);
    });

}
export  {LOGIN,LOGINout,ON,OFF,SEND};

