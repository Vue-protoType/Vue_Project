<template>
    <div>
      <Header></Header>
      <bread-crumb>
        <li class="breadcrumb-item" slot="previous">
          <router-link tag="a" to="/">{{$t('Home.Home')}}</router-link>
        </li>
        <li class="breadcrumb-item" slot="next">
          <router-link tag="a" to="/orderConfirm">{{$t('Home.Order')}}</router-link>
        </li>
      </bread-crumb>
      <div class="container">
        <div class="row address">
          <div class="col confirm process"><span>confirm address</span></div>
          <div class="col confirm process"><span>View Your Order</span></div>
          <div class="col confirm process"><span>Make Payment</span></div>
          <div class="col confirm process"><span>Order Confirmation</span></div>
        </div>
        <div class="row finishMessage">
          <div class="col-md-4 offset-md-4 finishLayout">
            <div><img src="/static/images/smile.png" alt=""></div>
            <div>Congratulations!</div>
            <div>Your order is under processing!</div>
            <div>Order ID：{{this.$route.params.orderId}}</div>
            <div class="text-danger">Order total：${{this.$route.params.orderTotal}}</div>
            <div>
              <router-link class="btn btn-primary" tag="button" to="/cart">CartList</router-link>
              <router-link class="btn btn-primary" tag="button" to="/">GoodsList</router-link>
            </div>
          </div>
        </div>
      </div>

      <Footer></Footer>

    </div>
</template>

<script>
  import Header from '../Common/Header'
  import BreadCrumb from '../Common/BreadCrumb'
  import Footer from '../Common/Footer'
  import axios from 'axios'
    export default {
        name: "OrderFinish",
        components:{
          Header,
          BreadCrumb,
          Footer
        }
    }
</script>

<style lang="scss" scoped>

</style>
