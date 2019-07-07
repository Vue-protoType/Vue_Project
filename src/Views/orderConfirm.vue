<template>
    <div>
      <nav-header></nav-header>
      <navigation></navigation>
      <el-row>
        <el-col :span="16" offset="4" class="order-Header"><span>check out</span></el-col>
      </el-row>
      <shop-flow :isShowTwo=true :isShowOne=true></shop-flow>
      <el-row>
        <el-col :span="16" offset="4" class="order-Title"><span>order content</span></el-col>
      </el-row>
      <el-row>
        <el-col :span="16" offset="4" class="table-content">
          <div class="order-item">
            <div class="order-item-header">
              <ul class="item-header">
                <li>order contents</li>
                <li>price</li>
                <li>quantity</li>
                <li>subtotal</li>
              </ul>
              <ul class="item-content" v-for="(item, index) of cartList" v-if="item.checked === '1'" :key="index">
                <li><div class="item-img"><img :src="`../../static/`+item.productImage" alt=""></div><span>{{item.productName}}</span></li>
                <li><div class="item-price"><span>{{item.salePrice | doll}}</span></div></li>
                <li><div class="item-num"><span class="item-num-1">{{item.productNum}}</span></div></li>
                <li><div class="item-cost"><span class="cost">{{item.salePrice * item.productNum | doll}}</span></div></li>
              </ul>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row class="order-line"></el-row>
      <el-row>
        <el-col :span="4" offset="16" class="order-data">
          <ul>
            <li>
              <div class="content-left">Item subtotal:</div>
              <div class="content-right">{{CostAll | doll}}</div>
            </li>
            <li>
              <div class="content-left">Shipping:</div>
              <div class="content-right">{{Shipping | doll}}</div>
            </li>
            <li>
              <div class="content-left">Discount:</div>
              <div class="content-right">{{Discount | doll}}</div>
            </li>
            <li>
              <div class="content-left">Tax:</div>
              <div class="content-right">{{Tax | doll}}</div>
            </li>
            <li>
              <div class="content-left">Order total:</div>
              <div class="content-right content-red">{{orderTotal | doll}}</div>
            </li>
          </ul>
        </el-col>
      </el-row>
      <el-row class="bottom">
        <el-col :span="4" offset="4"><el-button class="content-btn" @click="previous">previous</el-button></el-col>
        <el-col :span="4" offset="8"><el-button type="primary" class="payment" @click="Payment">proceed to payment</el-button></el-col>
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
  name: 'orderConfirm',
  data () {
    return {
      cartList: [],
      Shipping: 100,
      Tax: 400,
      Discount: 200
    }
  },
  components: {
    NavFooter,
    NavHeader,
    Navigation,
    shopFlow
  },
  methods: {
    init () {
      axios.get('/users/cartList').then((response) => {
        let res = response.data
        this.cartList = res.result
      })
    },
    previous () {
      this.$router.push('/Address')
    },
    Payment () {
      axios.post('/users/payment', {
        addressId: this.$route.params.addressId,
        orderTotal: this.orderTotal
      }).then((response) => {
        let res = response.data
        if (res.status === '0') {
          this.$router.push({
            path: '/orderSuccess', query: {orderId: res.result.orderId}
          })
        }
      })
    }
  },
  mounted () {
    this.init()
  },
  filters: {
    doll (value) {
      return '$' + value
    }
  },
  computed: {
    CostAll () {
      let All = 0
      this.cartList.map((item) => {
        if (item.checked === '1') {
          All += item.productNum * item.salePrice
        }
      })
      return All
    },
    orderTotal () {
      return this.CostAll + this.Shipping - this.Tax - this.Discount
    }
  }
}
</script>

<style scoped lang="scss">
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
  .order-Title{
    min-height: 40px;
  }
  .order-Title>span{
    display: inline-block;
    line-height: 30px;
    font-size: 18px;
    text-transform: uppercase;
    letter-spacing: .25em;
    font-weight: bold;
  }
  .order-item{
    width: 100%;
    display: table;
  }
  .order-item-header{
    display: table-header-group;
    width: 100%;
  }
  .item-header{
    display: table-row;
    width: 100%;
  }
  .item-header>li{
    display: table-cell;
    height: 40px;
    line-height: 40px;
    background: $color;
    color:white;
    text-align: center;
    text-transform: uppercase;
    font-family: "moderat", sans-serif;
    letter-spacing: .25em;
  }
  .item-content{
    display: table-row;
    width: 100%;
  }
  .item-content>li{
    display: table-cell;
    border-bottom: 1px solid $color;
    padding: 20px 0;
    position: relative;
  }
  .item-content>li>span{
    display: inline-block;
    width: 100px;
    line-height: 80px;
    text-align: center;
    position: relative;
    float: left;
    left:60px;
    font-weight: bold;
  }
  .item-img{
    width: 80px;
    height: 80px;
    border: 1px solid #ada9a5;
    left:30px;
    float: left;
    position: relative;
  }
  .item-cost{
    width: 100%;
    height: 80px;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .item-price{
    width: 100%;
    height: 80px;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .item-img>img{
    width: 100%;
  }
  .item-num{
    width: 30%;
    height: 20px;
    background: #e9e9e9;
    margin-left: 35%;
    margin-bottom: 30px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .item-num-1{
    position: absolute;
  }
  .cost{
    color:red;
  }
  .order-line{
    min-height: 50px;
  }
  .order-data{
    min-height: 200px;
  }
  .order-data>ul{
    width: 100%;
  }
  .order-data>ul>li{
    list-style: none;
    width: 100%;
    height: 20px;
    padding: 5px 0;
  }
  .content-left{
    width: 60%;
    height: 100%;
    float: left;
    text-align: right;
    font-size: 18px;
    color:#999;
  }
  .content-right{
    width: 40%;
    height: 100%;
    float: right;
    text-align: right;
    font-size: 20px;
    font-weight: bold;
  }
  .content-red{
    color:red;
  }
  .content-btn{
    color:$color;
    border-color:$color ;
    text-transform: uppercase;
  }
  .payment{
    text-transform: uppercase;
    float: right;
  }
  .bottom{
    padding-bottom: 30px;
  }
  @media screen and (max-width: 1271px){
    .order-data{
      width: 20%;
    }
  }
  @media screen and (max-width: 1071px){
    .content-left{
      font-size: 16px;
    }
    .content-right{
      font-size: 18px;
    }
  }
  @media screen and (max-width: 891px){
    .content-left{
      font-size: 14px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .content-right{
      font-size: 16px;
    }
  }
</style>
