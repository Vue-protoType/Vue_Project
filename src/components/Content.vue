<template>
  <div>
    <el-row>
      <el-col :span="18" offset="3">
      <div class="Content">
        <div class="Content-top">
          <span class="sort">Sort by:</span>
          <el-tooltip content="价格降序/升序" placement="top">
          <a href="javascript:void(0)" class="price" @click="sortGoods">Price</a>
          </el-tooltip>
          <span></span>
        </div>
        <div class="Content-main">
          <div class="Content-left">
            <dl class="filter-price">
              <dt>aprice:</dt>
              <dd><a href="javascript:void(0)" :class="{'active':range === 'All'}" @click="active('All')">All</a></dd>
              <dd v-for="(item, index) of priceList" :key="index"><a href="javascript:void(0)" :class="{ 'active':range === item.startPrice}" @click="active(item.startPrice,index)">{{item.startPrice|doll}}~~{{item.endPrice|doll}}</a></dd>
            </dl>
          </div>
          <div class="Content-right">
            <ul class="list" >
              <li v-for="item of GoodList" :key="item.productId" id="list_item">
                <div>
                  <div class="picture"><img v-lazy="`../../static/`+item.productImage" alt=""></div>
                </div>
                <div class="main">
                  <div class="main-name">{{item.productName}}</div>
                  <div class="main-price">{{item.salePrice|doll}}</div>
                  <div class="main-button"><el-button type="primary" class="button-style" @click="addCart(item.productId)">加入购物车</el-button></div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      </el-col>
    </el-row>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%">
      <span>加入购物车成功,是否跳转到购物车?</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="skip">确认</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Content',
  data () {
    return {
      priceList: [
        {
          startPrice: '0.00',
          endPrice: '100.00'
        },
        {
          startPrice: '100.00',
          endPrice: '500.00'
        },
        {
          startPrice: '500.00',
          endPrice: '1000.00'
        },
        {
          startPrice: '1000.00',
          endPrice: '5000.00'
        }
      ],
      range: 'All',
      sortFlag: true,
      page: 1,
      pageSize: 17,
      GoodList: [],
      index: 'All',
      dialogVisible: false
    }
  },
  methods: {
    active (value, index) {
      this.range = value
      this.index = index
      this.page = 1
      this.getGoodList()
    },
    skip () {
      this.$router.push('/cart')
    },
    getGoodList () {
      var param = {
        page: this.page,
        pageSize: this.pageSize,
        sort: this.sortFlag ? 1 : -1,
        rang: this.index
      }
      axios.get('/goods/list', {
        params: param}).then((res) => {
        this.GoodList = res.data.result.list
      })
    },
    sortGoods () {
      this.sortFlag = !this.sortFlag
      this.page = 1
      this.getGoodList()
    },
    addCart (productId) {
      axios.post('/goods/addCart', {productId: productId}).then((res) => {
        if (res.data.status === '0') {
          this.dialogVisible = true
        } else {
          this.$alert('请先登录再进行操作', '提示', {
            confirmButtonText: '确定'
          })
        }
      })
    }
  },
  mounted () {
    this.getGoodList()
  },
  filters: {
    doll (value) {
      return '$' + value
    }
  }
}
</script>

<style scoped lang="scss">
  .Content{
    border-bottom: 2px solid #e9e9e9;
  }
  .Content-top{
    background:aliceblue;
    height:55px;
    margin: 60px 0px 30px 0px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    font-family: $font;
    color: $color;
  }
  .default{
    padding-left: 10px;
  }
  .price{
    padding-left: 10px;
    padding-right: 20px;
  }
  .Content-main{
    display: flex;
  }
  .Content-left{
    width: 200px;
    height: 355px;
    padding-left: 20px;
  }
  .filter-price>dt{
    height:19px;
    margin-bottom: 30px;
    font-family: "moderat", sans-serif;
    font-weight: bold;
    letter-spacing: .25em;
    text-transform: uppercase;
  }
  .filter-price>dd{
    line-height: 1.2em;
    margin: 20px 0;
  }
  .filter-price>dd>a{
    color: $color
  }
  .filter-price>dd>a:hover{
    transition: padding-left .3s ease-out;
    padding-left: 15px;
    border-left: 2px solid $border-color;
    color: #ee7a23;
  }
  .Content-right{
    height: auto;
    flex:1;
    width: 860px;
    overflow: hidden;
    position: relative;
  }
  .picture>img{
    width: 99%;
    height: 200px;
  }
  .Content-right>ul{
    display: flex;
    flex-wrap:wrap;
  }
  .Content-right>ul>li{
    list-style: none;
    width: 220px;
    margin: 20px 2px;
    border-radius: 5px;
    border: 2px solid #e9e9e9;
    float: left;
    padding-bottom: 20px;
  }
  .Content-right>ul>li:hover{
    border-color: #ee7a23;
    -webkit-transform: translateY(-5px);
    -ms-transform: translateY(-5px);
    transform: translateY(-5px);
    -webkit-box-shadow: 0 0 10px #999;
    box-shadow: 0 0 10px #999;
    -webkit-transition: all .5s ease-out;
    transition: all .5s ease-out;
    cursor: pointer;
  }
  .main-name{
    width: 80%;
    margin: 10px auto;
    font-family: $font;
    font-weight: 900;
    font-size: 18px;
    text-align: center;
    color: $color;
  }
  .main-price{
    width: 80%;
    margin: 0px auto;
    font-family: $font;
    font-size: 18px;
    text-align: center;
    color: red;
  }
  .main-button{
    display: flex;
    justify-content: center;
  }
  .Content-top>a{
    color: #ada9a5;
  }
  .Content-top>a:hover{
    color:$border-color;
  }
  @media screen and (max-width: 1024px){
    .main-button{
      display:none ;
    }
  }
  @media screen and (max-width: 1440px){
    .Content-right>ul>li{
      width: 207px;
    }
  }
  .active{
    color:$border-color !important;
    border-left: 2px solid $border-color;
    padding-left: 15px;
  }
  .slide-btn{
    position: absolute;
    top:160px;
    z-index: 5;
    height: 50px;
    width: 36px;
  }
  .prev{
    background-image:url('../../static/pre.png');
    left :0px;
    background-repeat: no-repeat;
  }
  .next{
    right:5px;
    background-image:url('../../static/next.png');
    background-repeat: no-repeat;
  }
</style>
