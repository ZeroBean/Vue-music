<template>
  <div id="topbar">
    <div class="left">
      <slot name="left">
        <a href="#">
          <!-- 需要绑定用户图片 -->
          <img :src="userImg" alt="404" />
        </a>
        <!-- 登录后显示用户名称的 -->
        <span style="fontsize: 13px" v-if="currentUserInfo">{{
          currentUserInfo.nickname
        }}</span>
        <el-button
          type="text"
          style="color: #fff"
          v-else
          @click="dialogFormVisible = true"
          >登录</el-button
        >
        <el-button
          style="margin-top: 10px; margin-left: 15px"
          v-if="currentUserInfo !== null"
          @click="logout"
          size="mini"
        >
          退出
        </el-button>
        <el-dialog
          title="请登录~~~~"
          width="18%"
          :visible.sync="dialogFormVisible"
        >
          <img
            src="~assets/img/login/phone.png"
            style="display: block; margin: 10px auto; width: 18%"
          />
          <el-form :model="form" :rules="loginInfoRules">
            <el-form-item label="手机号" :label-width="formLabelWidth">
              <el-input v-model="form.phone" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <el-form>
            <el-form-item label="密码" :label-width="formLabelWidth">
              <el-input
                v-model="form.password"
                autocomplete="off"
                type="password"
              ></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="cancelLogin">取消</el-button>
            <el-button type="primary" @click="confirmLogin">确定</el-button>
          </div>
        </el-dialog>
      </slot>
    </div>
    <div class="center">
      <slot name="center">
        <div>
          <a href="javascript:void(0)" @click.stop="toBack">
            <i class="el-icon-arrow-left"></i>
          </a>
        </div>
        <div>
          <a href="#">
            <i class="el-icon-refresh"></i>
          </a>
        </div>
        <div class="inputSq">
          <el-input
            size="mini"
            class="inputt"
            placeholder="请输入内容"
            v-model="input"
            clearable
            suffix-icon="el-icon-search"
          >
          </el-input>
        </div>
        <div>
          <a href>
            <i class="el-icon-microphone"></i>
          </a>
        </div>
      </slot>
    </div>
    <div class="right">
      <slot name="right">
        <a href>回到旧版</a>
        <a href>
          <i class="el-icon-monitor"></i>
        </a>
        <a href>
          <i class="el-icon-mobile-phone"></i>
        </a>
        <a href>
          <i class="el-icon-menu"></i>
        </a>
        <a href>
          <i class="el-icon-s-opportunity"></i>
        </a>
        <a href>
          <i class="el-icon-setting"></i>
        </a>
        <a href>
          <i class="el-icon-bell"></i>
        </a>
        <a href>
          <i class="el-icon-close"></i>
        </a>
      </slot>
    </div>
  </div>
</template>

<script>
import { getPhoneLogin, getPhoneLoginOut,getUserSongList } from "network/login";
import {USER_SONGLIST} from '@/store/mutationType';
export default {
  name: "TopBar",
  data() {
    return {
      input: "",
      dialogFormVisible: false, //显示登录框
      userImg: require("assets/img/common/logo.png"),
      currentUserInfo:
        window.localStorage.getItem("currentUserInfo") === null
          ? null
          : JSON.parse(window.localStorage.getItem("currentUserInfo")),
      loginInfoRules: {
        phone: [{ required: true, message: " ", trigger: "blur" }],
        password: [{ required: true, message: " ", trigger: "blur" }],
      },
      form: {
        phone: "13479636407",
        password: "kzj2372966718",
      },
      formLabelWidth: "80px",
    };
  },
  methods: {
    //返回功能
    toBack() {
      this.$router.back();
    },
    // 搜索功能后续再做
    //取消登录
    cancelLogin() {
      this.dialogFormVisible = false;
    },

    //获取用户歌单,打入Vuex中
    getUserSongList(uid) {
      getUserSongList(uid).then(res=>{
        this.$store.commit(USER_SONGLIST,res.playlist);
      })
    },
    // 请求登录函数
    getPhoneLogin(phone, paswd) {
      getPhoneLogin(phone, paswd).then((res) => {
        if (res === undefined) {
          this.dialogFormVisible = true;
          // toast 提醒，留后再做
          return;
        }
        if (res.code !== 200) {
          this.dialogFormVisible = true;
          // toast 提醒，留后再做
          return;
        }
        window.localStorage.setItem(
          "currentUserInfo",
          JSON.stringify(res.profile)
        );
        this.currentUserInfo = res.profile;
        this.userImg = this.currentUserInfo.avatarUrl;
        this.dialogFormVisible = false;
        // toast toast 提醒，留后再做
        //获取用户歌单
        this.getUserSongList(this.currentUserInfo.userId);
      });
    },
    // 退出登录,还原数据
    getPhontLoginOut() {
      console.log("正在退出");
      getPhoneLoginOut().then((res) => {
        console.log(res);
        this.currentUserInfo = null;
        window.localStorage.setItem("currentUserInfo", null);
        this.userImg = require("assets/img/common/logo.png");
        this.$store.commit(USER_SONGLIST,[]);
      });
    },
    logout() {
      console.log("退出登录");
      this.getPhontLoginOut();
      // this.$router.push('./home/rtstyle');
    },
    // 确认登录
    confirmLogin() {
      this.getPhoneLogin(this.form.phone, this.form.password);
    },
  },
  created(){
    if(this.currentUserInfo){
      this.userImg = this.currentUserInfo.avatarUrl;
      // 获取歌单
    }
  }
};
</script>

<style>
.inputt input.el-input__inner {
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.8);
  color: #888;
}
</style>

<style lang="scss" scoped>
#topbar {
  height: 60px;
  background: #5292fe;
  padding: 10px;
  position: relative;
  color: #fff;
  display: flex;
  justify-content: space-between;
}
// left
.left {
  margin-left: 20px;
  margin-top: 10px;
}
.left a > img {
  width: 36px;
  height: 36px;
  border-radius: 50%;
}
.left a {
  font-size: 14px;
  color: white;
  text-decoration: none;
  vertical-align: middle;
  margin-right: 5px;
}
// center
.inputSq {
  width: 360px;
  margin-left: 15px;
  margin-top: 12px;
}
.center {
  color: #fff;
  margin-top: 4px;
  display: flex;
  justify-content: space-around;
}
.center a i {
  font-size: 20px;
  color: rgba(255, 255, 255, 0.8);
  margin-left: 10px;
  margin-top: 15px;
}
.center a i:hover {
  color: rgba(255, 255, 255, 1);
}
// right
.right {
  margin-top: 18px;
}
.right a {
  color: rgba(255, 255, 255, 0.8);
  margin-right: 15px;
  text-decoration: none;
  font-size: 13px;
}
.right a:last-child {
  margin-right: 200px;
  font-size: 19px;
}
.right a:hover {
  color: #fff;
}
</style>
