<template>
    <div>
      <el-row>
        <el-col :span="3">
          <div class="grid-content">
            <div class="navbar-img"> </div>
          </div>
        </el-col>
        <el-col :span="5" offset="16">
          <div class="grid-content" id="login">
            <span class="navbar-login" v-show="showname"> 用户:{{showname}}</span>
            <a href="javascript:void(0)" class="navbar-link" v-show="showname" @click="logout">Logout</a>
            <a href="javascript:void(0)" class="navbar-link" @click="isopen = !isopen">Login</a>
            <div class="grid-content">
              <span></span>
              <img src="../../static/shop.png" alt="" class="shopimg">
            </div>
          </div>
        </el-col>
      </el-row>
      <div class="Mask" v-show="isopen" @click.self="closeMask">
        <div class="loginbox" >
          <span class="loginheader">用户登录</span>
          <form action="">
          <div class="login"><input type="text" name="username" v-model="userName" placeholder="用户名"></div>
          <div class="login"><input type="password" name="password"  v-model="userPwd" placeholder="密码"></div>
          <div class="sumbit">
            <el-button type="submit" round @click="login" @keyup.enter="login">登录</el-button>
          </div>
          </form>
          <span class="error" v-show="iserror">用户名或者密码错误</span>
        </div>
      </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Header',
  data () {
    return {
      isopen: false,
      userName: '',
      userPwd: '',
      iserror: false,
      showname: ''
    }
  },
  methods: {
    closeMask (e) {
      if (e.target) {
        this.isopen = false
      }
    },
    login () {
      if (!this.userName || !this.userPwd) {
        this.iserror = true
        return false
      } else {
        axios.post('/users/login', {
          userName: this.userName,
          userPwd: this.userPwd
        }).then((response) => {
          console.log(response.data.status)
          let res = response.data
          if (res.status === '0') {
            this.iserror = false
            this.isopen = false
            this.showname = response.data.result.userName
          } else {
            this.iserror = true
          }
        })
      }
    },
    logout () {
      axios.post('/users/logout').then((response) => {
        let res = response.data
        if (res.status === '0') {
          this.showname = ''
        }
      })
    },
    checkLogin () {
      axios.post('/users/checkLogin').then((response) => {
        let res = response.data
        if (res.status === '0') {
          this.showname = res.result
        }
      })
    }
  },
  mounted () {
    this.checkLogin()
  }
}
</script>

<style lang="scss" scoped>
  .el-col {
    border-radius: 4px;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 56px;
    display: flex;
    align-items: center;
  }
  .navbar-img {
    width: 158px;
    height: 58px;
    margin-left: 20px;
    background-image: url('../../static/logo.png');
    background-repeat: no-repeat;
    background-size: 80%;
  }
  .navbar-link {
    margin-left: 10px;
    font-size: 18px;
    font-family: $font;
    color: $color;
  }
  .navbar-login{
    margin-left: 10px;
    color: $color;
    font-family: $font;
  }
  @media screen and (max-width: 1024px){
    .navbar-link{
      display: none;
    }
  }
  .Mask{
    overflow: hidden;
    z-index: 9999998;
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0px;
    left: 0px;
    background: rgb(0, 0, 0);
    opacity:0.8;
  }
  .loginbox {
    margin: 200px auto;
    width: 555px;
    height: 388px;
    border-radius: 15px;
    background: #fff;
  }
  .loginheader{
    width: 100%;
    font-size :35px;
    text-align: center;
    padding: 35px 0px;
    font-weight: 700;
    display: block;
    border-bottom: 1px solid $color;
    margin-bottom: 30px;
    color: black;
  }
  .login{
    width: 100%;
    height: 45px;
    margin: 10px 0px;
    justify-content: center;
    display: flex;
    align-items: center;
  }
  .login>input {
    width: 50%;
    height: 30px;
    border: none;
    border-radius: 20px;
    box-shadow: none;
    outline: none;
    padding: 0px 45px;
    background: #e1e1e1;
    transition: all 0.5s ease 0s;
  }
  .login>input:focus{
    background: #CCCCCC;
    box-shadow: 0 0 15px #03a9f4;
  }
  input::-moz-placeholder{
    font-size: 14px;
    font-weight: bold;
  }
  input::-webkit-input-placeholder{
    font-size: 14px;
    font-weight: bold;
  }
  .sumbit{
    width: 100%;
    display: flex;
    height: 100px;
    align-items: center;
    justify-content: center;
  }
  .el-button {
    width: 100px;
    background: #00B7FF;
    color: #FFFFFF;
  }
  .error {
    color: red;
    margin-left: 200px;
    font-weight: bold;
    font-size: 16px;
  }
  .shopimg {
    margin-left: 20px;
  }
</style>
