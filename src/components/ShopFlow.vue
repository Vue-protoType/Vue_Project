<template>
<div>
   <el-row ref="father">
     <el-col :span="4" offset="4" :class="{'nowStep':isShowOne}">Confirm Addressspan <span :class="{'nowStepSpan': isShowOne}"></span></el-col>
     <el-col :span="4" :class="{'nowStep':isShowTwo}">View Your Order <span :class="{'nowStepSpan': isShowTwo}"></span></el-col>
     <el-col :span="4" :class="{'nowStep':isShowThree}">Make Payment <span :class="{'nowStepSpan': isShowThree}"></span></el-col>
     <el-col :span="4" :class="{'nowStep':isShowFour}">Order Confirmation <span :class="{'nowStepSpan': isShowFour}"></span></el-col>
   </el-row>
</div>
</template>

<script>
export default {
  name: 'ShopFlow',
  props: {
    isShowFour: {
      type: Boolean
    },
    isShowOne: {
      type: Boolean
    },
    isShowTwo: {
      type: Boolean
    },
    isShowThree: {
      type: Boolean
    }
  }
}
</script>

<style scoped lang="scss">
  .el-row{
    min-height: 120px;
  }
  .el-col{
    border-bottom: 2px solid #ccc;
    height: 40px;
    padding: 30px 0px 40px 0px;
    text-align: center;
    font-weight: bold;
    position: relative;
    color:#ccc;
    font-size: 15px;
  }
  .el-col>span{
    width: 14px;
    height: 14px;
    border-radius: 50%;
    display: block;
    position: absolute;
    bottom: -7px;
    left: 50%;
    margin-left: -7px;
    background:#ccc
  }
  .nowStepSpan{
    background: $color !important;
  }
  .nowStep{
    border-bottom: 2px solid $color;
    color:$color;
  }
</style>
