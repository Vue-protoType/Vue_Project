<template>
  <div>
    <div class="navbar navbar-light navbar-color navbar-expand-lg">
      <div class="container">
        <a href="#" class="navbar-brand">
          <img src="../../../static/images/logo.png" alt="" class="logo-img">Vue商城</a>
        <ul class="navbar-right nav">
          <li class="nav-item"><a href="#" class="nav-link">{{user}}</a></li>
          <li class="nav-item cart-img"><img src="../../../static/images/cart.png" style="cursor: pointer" alt="" @click="toCart"><span ref="NumDom">{{$store.state.cartListNum}}</span></li>
          <li class="nav-item dropdown">
            <a href="#" class="nav-link dropdown-toggle" id="navbarDropdown" data-toggle="dropdown">{{$t('set.set')}}</a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <a href="#" class="dropdown-item" @click="ShowView">{{$t('set.Login')}}</a>
              <a href="#" class="dropdown-item" @click="Logout">{{$t('set.Logout')}}</a>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="Login" v-show="LoginView" @click="HideView">
      <div class="frame" >
        <span class="frame-title">{{$t('set.Login')}}</span>
        <div class="frame-input">
          <input type="text"  placeholder="用户名" name="username" v-model="userName">
        </div>
        <div class="frame-input">
          <input type="text"  placeholder="密码" name="password" v-model="passWord">
        </div>
        <div class="frame-btn">
          <input type="button" class="btn btn-primary  btn-block" @click="Login" @keyup.enter="Login" value="登录">
        </div>
        <div class="message" v-show="errMessage" ref="message"></div>
      </div>
    </div>
  </div>
</template>


<script>
    import axios from 'axios'
    export default {
        name: "Header",
        data(){
            return{
              LoginView:false,
              errMessage:false,
              userName:'',
              passWord:'',
              user:''
            }
        },
        methods: {
          ShowView() {
            this.LoginView = true
          },
          toCart(){
            this.$router.push('/cart')
          },
          HideView() {
            if (event.target.classList.value === 'Login') {
              this.LoginView = false
            }
          },
          LoginErr(){
            this.errMessage = true;
            this.$refs.message.innerHTML = '密码或者账号错误!'
          },
          Logout(){
            axios.post('/users/logout').then((response)=>{
              let res = response.data;
              if(res.status === '012'){
                this.user = '';
                sessionStorage.removeItem('Num');
                this.$refs.NumDom.innerHTML = ''
              }
            })
          },
          checkLogin(){
            axios.get('/users/checkLogin').then((response) =>{
              let res = response.data;
              if(res.status === '014'){
                this.user = "你好!" + res.result
              }else{
                this.$message('您尚未登录,请您先登录！')
              }
            })
          },
          Login() {
            if (this.userName === '' || this.passWord === '') {
              this.errMessage = true;
              this.$refs.message.innerHTML = '密码或者账号不能为空!';
            } else {
              axios.post("/users/login", {
                userName: this.userName,
                passWord: this.passWord
              }).then(response => {
                let res = response.data;
                if (res.status === '010') {
                  this.LoginView = false;
                  this.user = "你好!" + res.result.userName
                 }
                if(res.status === '011'){
                  this.LoginErr();
                }
              })
            }
          }
        },
      created() {
        var _this = this;
        document.onkeydown = function(e) {
          let key = window.event.keyCode;
          if (key === 13) {
            _this.Login();
          }
        };
      },
      mounted() {
          this.checkLogin()
      }
    }
</script>

<style lang="scss" scoped>

</style>
