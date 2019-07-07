<template>
    <div>
      <nav-header></nav-header>
      <navigation></navigation>
      <el-row>
        <el-col :span="16" offset="4" class="order-Header"><span>check out</span></el-col>
      </el-row>
      <shop-flow :isShowOne=true :is-show-two=true :is-show-three=true :is-show-four=true></shop-flow>
      <el-row>
        <el-col :span="16" offset="4" class="success">
          <div class="success-img"></div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="16" offset="4" class="success">
          <div class="success-content">
                Congratulations!
                      <br>
            Your order is under processing!
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="16" offset="4" class="success">
          <div class="success-order">
            <div class="order-left">
              <span>Order ID:</span>
              <span>{{orderId}}</span>
            </div>
            <div class="order-right">
              <span>Order total:</span>
              <span>{{orderTotal}}</span>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col class="success">
          <div class="success-btn">
          <el-button @click="cartList">cart list</el-button>
          <el-button @click="goodsList">goods list</el-button>
          </div>
        </el-col>
      </el-row>
      <nav-footer></nav-footer>
    </div>
</template>

<script>
import NavHeader from '../components/Header'
import Navigation from '../components/Navigation'
import NavFooter from '../components/Footer'
import shopFlow from '../components/ShopFlow'
import axios from 'axios'
export default {
  name: 'orderSuccess',
  components: {
    NavHeader,
    NavFooter,
    Navigation,
    shopFlow
  },
  data () {
    return {
      orderId: this.$route.query.orderId,
      orderTotal: 0
    }
  },
  methods: {
    goodsList () {
      this.$router.push('/orderConfirm')
    },
    cartList () {
      this.$router.push('/cart')
    }
  },
  mounted () {
    var orderId = this.$route.query.orderId
    if (!orderId) {
      return
    }
    axios.post('/users/orderDetail', {
      orderId: orderId
    }).then((response) => {
      let res = response.data
      if (res.status === '0') {
        this.orderTotal = res.result.orderTotal
      }
    })
  }
}
</script>

<style scoped>
  .order-Header{
    min-height: 40px;
    padding: 40px 0px;
  }
  .order-Header>span{
    display: inline-block;
    line-height: 40px;
    font-size: 22px;
    text-transform: uppercase;
    letter-spacing: .25em;
    font-weight: bold;
  }
  .success-img{
    width: 100px;
    height: 130px;
    background: url('../../static/ok-2.png') no-repeat;
    background-size: cover;
  }
  .success{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .success-content{
    text-align: center;
    font-size: 1.25em;
    font-weight: 200;
    color: #333;
    margin-top: 30px;
  }
  .success-order{
    margin-top: 20px;
    color: #999;
    font-size: 20px;
  }
  .order-left{
    float: left;
  }
  .order-right{
    float: left;
    margin-left: 20px;
  }
  .success-btn{
    margin-top: 20px;
    padding-bottom: 50px;
  }
  .el-button{
    border-color: #03a9f4;
    color: #03a9f4;
    text-transform: uppercase;
  }
</style>
