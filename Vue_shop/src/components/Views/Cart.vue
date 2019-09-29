<template>
    <div>
      <Header></Header>
      <Bread-crumb>
        <li class="breadcrumb-item" slot="previous">
          <router-link tag="a" to="/">{{$t('Home.Home')}}</router-link>
        </li>
        <li class="breadcrumb-item" slot="next">
          <router-link tag="a" to="/address">{{$t('Home.Address')}}</router-link>
        </li>
      </Bread-crumb>
      <cart-list></cart-list>
      <Footer></Footer>
    </div>
</template>

<script>
  import Header from '../Common/Header'
  import BreadCrumb from '../Common/BreadCrumb'
  import Footer from '../Common/Footer'
  import CartList from '../Common/CartList'
    export default {
        name: "Cart",
        components:{
          Header,
          BreadCrumb,
          Footer,
          CartList
        }
    }
</script>

<style scoped>

</style>
