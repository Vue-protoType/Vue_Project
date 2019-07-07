<template>
    <div>
      <el-row>
        <el-col :span="5" offset="3" class="grid-content">
          <div class="content">
            <router-link tag="a" to="/" :style="{'color':homecolor}">Home</router-link>
            <router-link tag="a" to="/cart" :style="{'color':Goodscolor}">Goods</router-link>
            <router-link tag="a" to="/address" :style="{'color':addressColor}">Address</router-link>
          </div>
        </el-col>
      </el-row>
    </div>
</template>

<script>
export default {
  name: 'Navigation',
  props: {
    Goodscolor: {
      type: String
    },
    homecolor: {
      type: String
    },
    addressColor: {
      type: String
    }
  }
}
</script>

<style scoped lang="scss">
  .el-row{
    background: aliceblue;
  }
  .grid-content{
    min-height: 38px;
    display: flex;
    align-items: center;
    font-family: $font;
  }
  .content>a{
    position: relative;
    padding-right: 10px;
  }
  .content>a:first-child:after{
    content: '/';
    right: 1px;
    position: absolute;
    color: $color
  }
  .content>a:nth-child(2):after{
    content: '/';
    right: 1px;
    position: absolute;
    color: $color
  }
</style>
