<template>
  <div>
    <nav-header></nav-header>
    <navigation :homecolor="homecolor" :Goodscolor="goodcolor" :addressColor="addressColor"></navigation>
    <shopFlow :isShowOne=true></shopFlow>
    <nav-site></nav-site>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
import NavHeader from '../components/Header'
import Navigation from '../components/Navigation'
import shopFlow from '../components/ShopFlow'
import NavFooter from '../components/Footer'
import NavSite from '../components/Site'
export default {
  name: 'Address',
  data () {
    return {
      homecolor: '#1E90FF',
      goodcolor: '#1E90FF',
      addressColor: 'red'
    }
  },
  components: {
    NavHeader,
    Navigation,
    shopFlow,
    NavFooter,
    NavSite
  }
}
</script>

<style scoped>

</style>
