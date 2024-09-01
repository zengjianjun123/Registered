//存放用户登录相关数据
import { defineStore } from "pinia";
import type {
  LoginData,
  UserLoginResponse,
  UserInfo,
} from "@/api/hospital/type";
import { reqUserLogin } from "@/api/hospital";
const useUserStore = defineStore("User", {
  state: () => {
    return {
      visiable: false, //控制登录框显示与隐藏
      //存储用户的信息 ,本地存储有就从本地存储拿
      userInfo: <UserInfo>(
        (JSON.parse(localStorage.getItem("USERINFO") as string) || {})
      ),
    };
  },
  actions: {
    //结果返回一个promise ，告诉组件是不是登录成功，来更换用户名字
    async userLogin(loginParam: LoginData) {
      let res: UserLoginResponse = await reqUserLogin(loginParam);
      if (res.code === 200) {
        this.userInfo = res.data;
        //但是一刷新数据就没了 ，所以要本地持久化
        localStorage.setItem("USERINFO", JSON.stringify(this.userInfo));
        return "ok";
      } else {
        return Promise.reject(new Error(res.message));
      }
    },
    //看本地存储是否有用户数据
    queryState() {
      //开启定时器,每隔一段时间询问是否本地存储了用户信息
      let timer = setInterval(() => {
        if (localStorage.getItem("USERINFO")) {
          //关闭对话框
          this.visiable = false;
          this.userInfo = JSON.parse(
            localStorage.getItem("USERINFO") as string
          );
          clearInterval(timer);
        }
      }, 1000);
    },
  },
  getters: {},
});

export default useUserStore;
