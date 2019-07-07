<template>
    <div>
      <nav-header></nav-header>
      <navigation :homecolor="homecolor" :goodscolor="goodcolor" :addressColor="addressColor"></navigation>
      <nav-cart></nav-cart>
      <nav-footer></nav-footer>
    </div>
</template>

<script>
import NavHeader from '../components/Header'
import Navigation from '../components/Navigation'
import NavCart from '../components/CartList'
import NavFooter from '../components/Footer'
export default {
  name: 'Cart',
  data () {
    return {
      homecolor: '#1E90FF',
      goodcolor: 'red',
      addressColor: '#1E90FF'
    }
  },
  components: {
    NavHeader,
    NavFooter,
    Navigation,
    NavCart
  }
}
</script>

<style scoped>
</style>
