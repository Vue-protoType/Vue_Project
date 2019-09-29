<template>
  <div>
    <Header></Header>
    <bread-crumb>
      <li class="breadcrumb-item" slot="previous">
        <router-link tag="a" to="/">{{$t('Home.Home')}}</router-link>
      </li>
      <li class="breadcrumb-item" slot="next">
        <router-link tag="a" to="/cart">{{$t('Home.Carts')}}</router-link>
      </li>
    </bread-crumb>
    <goods-display></goods-display>
    <Footer></Footer>
  </div>
</template>

<script>
  import Header from '../Common/Header'
  import BreadCrumb from '../Common/BreadCrumb'
  import GoodsDisplay from '../Common/GoodsDisplay'
  import Footer from '../Common/Footer'


  export default {
      name: 'GoodsList',
      components:{
        Header,
        BreadCrumb,
        GoodsDisplay,
        Footer
      }
  }
</script>

<style lang="scss" scoped>

</style>
