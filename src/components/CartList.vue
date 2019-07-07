<template>
  <div>
    <el-row class="Head">
      <el-col :span="18" offset="3">
        <div class="cartTitle"><span>my cart</span></div>
       <div class="cartHead">
         <el-row>
           <el-col :span="8">items</el-col>
           <el-col :span="4">price</el-col>
           <el-col :span="4">quantity</el-col>
           <el-col :span="4">subtotal</el-col>
           <el-col :span="4">edit</el-col>
         </el-row>
       </div>
        <div class="cartList">
          <ul>
            <li v-for="(item, index) of cartList" :key="index">
              <el-row class="product-msg">
               <el-col :span="8">
                <div class="cartCheck"><a href="javascript:void(0)" :class="{'check': '1' === item.checked}" @click="change('checked',item)"></a></div>
                <div class="cartImg"><img :src="`../../static/`+item.productImage" :alt="item.productName"></div>
                <div class="cartName"><p>{{item.productName}}</p></div>
               </el-col>
                <el-col :span="4">
                <div class="cartPrice">{{item.salePrice|doll}}</div>
                </el-col>
              <el-col :span="4">
                <div class="cartNum">
                 <div class="cartNum-item">
                   <a href="javascript:void(0)" @click="change('red', item)">-</a>
                  <span>{{item.productNum}}</span>
                   <a href="javascript:void(0)" @click="change('add', item)">+</a>
                 </div>
                </div>
              </el-col>
              <el-col :span="4">
                <div class="cartTotal">{{item.salePrice*item.productNum|doll}}</div>
              </el-col>
              <el-col :span="4">
                  <div class="cartDelete">
                    <div class="deleteImg" @click="deleteProduct(item.productId)"></div>
                  </div>
              </el-col>
              </el-row>
            </li>
          </ul>
        </div>
        <div class="space"></div>
        <div class="totalPrice">
          <div class="selectAll">
            <a href="javascript:void(0)" :class="{'check':checkAllFlag}" @click="selectAll"></a>
            <span>Select all</span>
          </div>
          <div class="allPrice">
            <div class="item-total">
              <span>Item total:</span>
              <span id="number">{{costAll}}</span>
            </div>
            <div class="cleanBtn">
              <button  @click="checkOut">checkout</button></div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%">
      <span>确定删除该商品吗?</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="del">确认</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'CartList',
  data () {
    return {
      cartList: [],
      dialogVisible: false,
      productId: ''
    }
  },
  computed: {
    checkAllFlag () {
      return this.checkAllCount === this.cartList.length// 根据列表长度与check的个数是否相等判断是都是全选
    },
    checkAllCount () {
      var i = 0
      this.cartList.map((item) => {
        if (item.checked === '1') {
          i += 1
        }
      })
      return i
    },
    costAll () {
      var cost = 0
      this.cartList.map((item) => {
        if (item.checked === '1') {
          cost += item.productNum * item.salePrice
        }
      })
      return cost
    }
  },
  methods: {
    init () {
      axios.get('/users/cartList').then((response) => {
        let res = response.data
        if (res.status === '0') {
          this.cartList = res.result
        }
      })
    },
    checkOut () {
      if (this.checkAllCount > 0) {
        this.$router.push({
          path: '/address'
        })
      } else {
        this.$message({
          message: '请选选择要购买的商品!',
          type: 'warning'
        })
      }
    },
    selectAll () {
      var State = !this.checkAllFlag
      var Flag = (State * 1) + ''
      this.cartList.forEach(
        (item) => { item.checked = Flag }) // 根据checkAllFlag,对全选和未全选判断后取反
      axios.post('users/editCheckAll', {
        checkAll: Flag
      }).then((response) => {
        let res = response.data
        if (res.status === '0') {
          console.log('全选/全不选')
        }
      })
    },
    change (flag, item) {
      if (flag === 'add') {
        item.productNum++
      } else if (flag === 'red') {
        if (item.productNum <= 1) {
          this.$message({
            message: '数量不能小于1！',
            type: 'warning'
          })
          return
        }
        item.productNum--
      } else {
        item.checked = item.checked === '1' ? '0' : '1'
      }
      axios.post('/users/cart/edit', {
        productId: item.productId,
        productNum: item.productNum,
        checked: item.check
      })
    },
    deleteProduct (productId) {
      this.dialogVisible = true
      this.productId = productId
    },
    del () {
      axios.post('/users/cart/del', {
        productId: this.productId
      }).then((response) => {
        let res = response.data
        if (res.status === '0') {
          this.dialogVisible = false
          this.init()
          this.$alert('删除成功', '提示', {
            confirmButtonText: '确定'})
        } else {
          this.$alert('删除失败', '提示', {
            confirmButtonText: '确定'})
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
  }
}
</script>

<style lang="scss" scoped>
  .Head{
    min-height: 580px;
  }
  .cartTitle{
    font-size: 22px;
    text-transform: uppercase;
    letter-spacing: .25em;
    font-weight: bold;
    padding: 40px 0px 20px 0px;
  }
  .cartHead{
    width: 100%;
  }
  .cartHead>.el-row>.el-col{
    background: $color;
    text-align: center;
    line-height: 40px;
    list-style: none;
    flex-grow: 1;
    text-transform: uppercase;
    font-family: "moderat", sans-serif;
    letter-spacing: .25em;
    color:white;
  }
  .cartHead>ul>li:first-child{
    flex-grow: 2;
  }
  .cartList>ul>li{
    list-style: none;
  }
  .product-msg>.el-col{
    list-style: none;
    box-sizing: border-box;
    padding: 20px 0px;
    float: left;
    border-bottom: 1px solid #00B7FF;
  }
  .cartCheck{
    float:left;
    padding: 30px 22px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .cartCheck>a{
    display: inline-block;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 1px solid #999;
  }
  .cartImg{
    width: 80px;
    height: 80px;
    border: 1px solid #999;
    box-sizing: border-box;
    float: left;
  }
  .cartImg>img{
    width: 100%;
  }
  .cartName{
    float: left;
  }
  .cartName>p{
    padding: 20px 0px;
    margin-left: 10px;
    line-height: 40px;
    text-align: left;
    @include font-style;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .cartPrice{
    padding: 21px 0px;
    line-height: 40px;
    text-align: center;
    @include font-style;
  }
  .cartNum{
    padding: 21px 0px;
  }
  .cartNum-item{
    height: 20px;
    width: 90px;
    margin: 9px auto;
    border: 1px solid #f0f0f0
  }
  .cartNum-item>a{
    width: 30px;
    height: 20px;
    float: left;
    text-align: center;
    line-height: 20px;
    background: #f0f0f0;;
    color:#605F5F;
    transition: background-color .5s ease-out;
  }
  .cartNum-item>a:hover{
    background: #999;
    color:white;
  }
  .cartNum-item>span{
    float: left;
    width: 30px;
    height: 20px;
    text-align: center;
    line-height: 20px;
  }
  .cartTotal{
    height: 40px;
    padding: 21px 0px;
    @include font-style;
    text-align: center;
    line-height: 40px;
    color:red;
  }
  .cartDelete{
    padding: 25px 0px;
    text-align: center;
    display: flex;
    justify-content: center;
  }
  .deleteImg{
    width: 32px;
    height: 32px;
    background-image: url('../../static/recycle.png');
  }
  .deleteImg:hover{
    background-image: url('../../static/recycleactive.png');
    cursor: pointer;
  }
  .space{
    width: 100%;
    height: 40px;
    clear: both;
  }
  .totalPrice{
    width: 100%;
    height: 56px;
  }
  .selectAll{
    width: 20%;
    height: 100%;
    display: flex;
    align-items: center;
    float: left;
  }
  .selectAll>a{
    width: 20px;
    height: 20px;
    display: inline-block;
    border: 1px solid #999;
    border-radius: 50%;
    margin-left: 22px;
  }
  .selectAll>span{
    margin-left: 10px;
    @include font-style;
    color: #999;
  }
  .allPrice{
    width: 30%;
    height: 100%;
    float: left;
    margin-left: 50%;
  }
  .item-total{
    width: 50%;
    height: 100%;
    float: left;
  }
  .item-total>span{
    line-height: 54px;
    @include font-style;
    color: #999;
  }
  .selectAll>span:hover{
    color:#f16f75;
    cursor: pointer;
  }
  #number{
    margin-left: 6px;
    color: #d1434a;
    font-size: 1.125em;
    font-weight: bold;
    line-height: 1.2;
  }
  .cleanBtn{
    width: 50%;
    height: 100%;
    float: right;
  }
  .cleanBtn>button{
    outline: none;
    border: none;
    display: block;
    margin: 0 auto;
    width: 90%;
    height: 100%;
    background: #d1434a;;
    line-height: 54px;
    color:white;
    text-align: center;
    text-transform: uppercase;
    font-size: 14px;
    font-family: "moderat", sans-serif;
    font-weight: bold;
    letter-spacing: .25em;
    transition: background-color .5s ease-out;
  }
  .cleanBtn>button:hover{
    background: #f16f75;
    cursor: pointer;
  }
  .check{
    background-image: url("../../static/yes.png");
    background-repeat: no-repeat;
    background-size: cover;
  }
</style>
