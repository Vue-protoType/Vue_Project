<template>
  <div>
    <div class="sort">
      <div class="container" id="sort-nav">
        <ul class="nav justify-content-end">
          <li class="nav-item">
            <a href="#" class="nav-link disabled">{{$t('sortBy.sort')}}:</a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link" @click="sort('Sale')">{{$t('sortBy.Default')}}</a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link" @click="sort('Price')">{{$t('sortBy.Price')}}</a>
          </li>
        </ul>
      </div>
    </div>
  <div class="container" id="GoodsDisplay">
      <div class="row">
        <div class="col-md-3 col-sm-4 col-lg-2">
          <ul class="list-group">
            <li class="list-group-item active">{{$t('sortBy.Price')}}:</li>
            <li class="list-group-item"><a href="#" @click="addStyle('All')" :class="{isActive:activeState === 'All'}">{{$t('sortBy.All')}}</a></li>
            <li class="list-group-item" v-for="price of priceList" :key="price.id"><a href="#" @click="addStyle(price.StartPrices)" :class="{isActive:activeState === price.StartPrices}">{{price.StartPrices}}--{{price.EndPrice}}</a></li>
          </ul>
        </div>
        <div class="col-md-9 col-sm-8 col-lg-10">
          <div class="row">
            <div class="col-md-4 col-sm-6 col-12 col-lg-3" v-for="item of GoodsList" :key="item.id">
              <div class="card">
                <img class="card-img-top" v-lazy="`/static/images/`+item.productImage" style="width: 100%;" alt="Card image cap" >
                <div class="card-body">
                  <h5 class="card-title text-center">{{item.productName}}</h5>
                  <h6 class="card-text text-center text-danger">售价:{{item.salePrice | doll}}<span class="text-secondary small ">/{{item.saleNum}}人付款</span></h6>
                  <a href="#" class="btn btn-primary d-flex justify-content-center" data-toggle="modal" data-target="#exampleModal" @click="confirmProductId(item.productId)">加入购物车</a>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
      <div class="container">
        <nav>
          <ul class="pagination justify-content-center">
            <li class="page-item disabled" id="previous" @click="Previous">
              <a class="page-link" href="#">Previous</a>
            </li>
            <li class="page-item" v-for="item of PageList" :key="item.id" @click="gainData(item)" :class="{'active':currentPage === item}"><a class="page-link" href="#">{{item}}</a></li>
            <li class="page-item" id="next">
              <a class="page-link" href="#" @click="next">Next</a>
            </li>
          </ul>
        </nav>
      </div>
    <Modal>
      <h5 slot="title" class="modal-title">提示</h5>
      <div slot="body" class="modal-body">是否将该商品添加到购物车中?</div>
      <button class="btn btn-info" slot="save"  @click="addCart" data-dismiss="modal" >确认</button>
  </Modal>

  </div>
</template>

<script>
  import axios from 'axios'
  import Modal from '../Common/Modal'
    export default {
        name: "GoodsDisplay",
        components:{
            Modal
        },
        data () {
          return {
            GoodsList:[],
            priceList:[
              {
                StartPrices:0.00,
                EndPrice:500.00
              },
              {
                StartPrices:500.00,
                EndPrice:1000.00
              },
              {
                StartPrices:1000.00,
                EndPrice:2000.00
              }
            ],
            activeState:'All',
            page:1,
            pageSize:8,
            PageList:[1,2],
            currentPage:0,
            nextPage:1,
            addToCartState:false,
            currentState:'',
            productId:''
          }
        },
        methods: {
          gainData(item) {
            this.currentPage = item || this.page;
            var param = {
              page: this.currentPage,
              pageSize: this.pageSize,
              activeState:this.activeState
            };
            axios.get('/goods/list', {
              params: param
            }).then(res => {
              let data = res.data;
              if (data.status === '001') {
                this.GoodsList = data.result
              } else {
                console.log('未获取到数据')
              }
            })
          },
          confirmProductId(productId){
            this.productId = productId
          },
          addStyle(state) {
            this.activeState = this.activeState === state ? null : state;
            this.gainData();
          },
          next(){
            this.currentPage ++;
            this.gainData(this.currentPage)
          },
          Previous() {
            this.currentPage--;
            this.gainData(this.currentPage)
          },
          sort(value){
            if(value === 'Sale') {
              if (this.currentState === value) {
                this.currentState = 'SaleActive';
                this.GoodsList = this.GoodsList.sort(function (a, b) {
                  return a.saleNum - b.saleNum
                })
              } else {
                this.currentState = value
                this.GoodsList = this.GoodsList.sort(function (a, b) {
                  return b.saleNum - a.saleNum
                })
              }
            }
            if(value === 'Price'){
              if (this.currentState === value) {
                this.currentState = 'SalePrice';
                this.GoodsList = this.GoodsList.sort(function (a, b) {
                  return a.salePrice - b.salePrice
                })
              } else {
                this.currentState = value;
                this.GoodsList = this.GoodsList.sort(function (a, b) {
                  return b.salePrice - a.salePrice
                })
              }
            }
          },
          addCart(){
            axios.post('/goods/addCart',{
              productId:this.productId
            }).then(response=>{
              let res = response.data;
              if(res.status === '013'){
                this.$message('你尚未登录,请你先登录！');
              }
              if(res.status === '009'){
                this.$message('已经成功添加到购物车！');
              }
            })
          }
        },
        watch: {
          currentPage(val) {
            if (val !== 1) {
              document.getElementById('previous').classList.remove('disabled')
            } else {
              document.getElementById('previous').classList.add('disabled')
            }
          },
          GoodsList() {
            if (this.GoodsList.length === 8 && this.currentPage === this.PageList[this.PageList.length - 1]) {
              this.nextPage += this.currentPage;
              this.PageList.push(this.nextPage);
              this.nextPage = 1;
            }else if(this.GoodsList.length !== 8){
              document.getElementById('next').classList.add('disabled')
            }
            if(this.GoodsList.length===8){
              document.getElementById('next').classList.remove('disabled')
            }
          }
        },
        filters:{
          doll(value){
            return '$'+value
          }
        },
        mounted() {
          this.gainData();
          }
        }

</script>

<style lang="scss" scoped>

</style>
