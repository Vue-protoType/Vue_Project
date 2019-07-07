<template>
    <div>
      <nav-header></nav-header>
      <navigation :homecolor="homecolor" :Goodscolor="goodcolor" :addressColor="addressColor"></navigation>
      <nav-content></nav-content>
      <nav-footer></nav-footer>
    </div>
</template>

<script>
import NavHeader from '../components/Header'
import Navigation from '../components/Navigation'
import NavContent from '../components/Content'
import NavFooter from '../components/Footer'

export default {
  name: 'GoodList',
  data () {
    return {
      GoodList: [],
      homecolor: 'red',
      goodcolor: '#1E90FF',
      addressColor: '#1E90FF'
    }
  },
  components: {
    NavHeader,
    Navigation,
    NavContent,
    NavFooter
  }
}
</script>

<style scoped>
  *{
    margin: 0;
    padding: 0;
  }
</style>
