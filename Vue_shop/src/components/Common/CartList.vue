<template>
<div>
  <div class="container cart-title">my cart</div>
  <div class="container table-view">
    <table class="table">
      <thead class="thead">
      <tr class="text-center table-primary">
        <th scope="col">ITEMS</th>
        <th scope="col">PRICE</th>
        <th scope="col">QUANTITY</th>
        <th scope="col">SUBTOTAL</th>
        <th scope="col">EDIT</th>
      </tr>
      </thead>
      <tbody>
      <tr class="text-center item" v-for="items of cartList" :key="items.productId">
        <td>
          <div class="check-icon" >
            <span @click="updateNum('checkState',items)" :class="{'check':items.checked === '1'}"></span>
          </div>
          <div class="check-image"><img :src="`/static/images/`+items.productImage" alt=""></div>
          <div class="item-name">{{items.productName}}</div>
        </td>
        <td class="item-Price text-primary">{{items.salePrice|doll}}</td>
        <td class="item-quantity"><button class="btn btn-sm btn-primary" @click="updateNum('reduce',items)">-</button> <a href="#" class="ItemNum">{{items.productNum}}</a> <button class="btn btn-sm btn-primary" @click="updateNum('add',items)">+</button></td>
        <td class="item-subtotal">{{items.salePrice * items.productNum |doll}}</td>
        <td class="item-edit"><img src="../../../static/images/recycle.png" alt="删除" @click="deleteItem(items.productId)"  data-toggle="modal" data-target="#exampleModal"></td>
      </tr>
      </tbody>
    </table>
    <Modal>
      <h5 slot="title" class="modal-title">提示</h5>
      <div slot="body" class="modal-body">是否将该商品从购物车中删除?</div>
      <button class="btn btn-info" slot="save"  @click="deleteGoods" data-dismiss="modal">确认</button></Modal>
  </div>
  <div class="container">
    <div class="costNav">
      <div class="checkAll-icon">
        <span @click="toggleCheckAll" :class="{'check':checkAllFlag}"></span>
        <a>Select all</a>
      </div>
      <div class="checkOut">
          Item total: <span class="text-danger">{{costAll|doll}}</span>
        <button class="btn btn-danger btn-lg" @click="ToAddress" :disabled="checkedCount === 0">checkout</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
   import Modal from '../Common/Modal'
   import axios from 'axios'
    export default {
        name: "CartList",
        components:{
          Modal
        },
        data(){
            return{
              cartList : [],
              ConfirmProductId:'',
              confirm:''
            }
        },
        computed:{
              checkAllFlag () {
                return this.checkedCount === this.cartList.length
              },
              checkedCount(){
                var i = 0;
                this.cartList.forEach(item=>{
                  if(item.checked === '1'){
                    i++
                  }
                });
                return i
              },
              costAll(){
                var cost = 0;
                this.cartList.forEach(item=>{
                  if(item.checked === '1') {
                    cost += item.productNum * item.salePrice
                  }
                });
                return cost
              }
        },
        methods:{
          toggleCheckAll(){
            var flag = !this.checkAllFlag;
            this.cartList.forEach(item=>{
              item.checked = (flag * 1).toString();
              this.confirm = item.checked
            });
            axios.post('/users/cartList/checkAll',{
              checkAll:this.confirm
            }).then(response=>{
              let res = response.data
              if(res.status === '023'){
                console.log('操作成功')
              }
            })
          },
          updateNum(flag,item){
            if(flag === 'add'){
              item.productNum ++
            }else if(flag === 'reduce'){
              if(item.productNum <=1){
                return
              }
              item.productNum --
            }
            if(flag ==='checkState' && item.checked === '1'){
              item.checked = '0'
            }else if(flag === 'checkState' && item.checked === '0'){
              item.checked = '1'
            }
            axios.post('/users/cartList/update',{
              productNum:item.productNum,
              productId:item.productId,
              checked:item.checked
            }).then(response=>{
              let res = response.data;
              if(res.status === '021'){
                this.$message({
                  message: '修改成功!',
                  type:'success'
                })
              }
            })
          },
          gainGoodsList(){
            axios.get('/users/cartList').then(response=> {
              let res = response.data;
              if(res.status === '017'){
                this.cartList = res.result;
                this.$store.commit('gainNum',{
                  Num:res.result.length
                })
              }else{
                sessionStorage.removeItem('Num')
              }
            })
          },
          deleteItem(productId){
            this.ConfirmProductId = productId;
          },
          ToAddress(){
            if(this.checkedCount > 0){
              this.$router.push('/address')
            }
          },
          deleteGoods(){
            axios.post('/users/cartList/delete',{
              productId:this.ConfirmProductId
            }).then(response=>{
              let res = response.data;
              if(res.status === '019'){
                this.$message({
                  message:'删除成功',
                  type:'success'
                });
                this.gainGoodsList()
              }
            })
          }
        },
        mounted() {
            this.gainGoodsList()
        },
      filters:{
          doll(val){
            return '$'+val+'.00'
          }
      }
    }
</script>

<style lang="scss" scoped>

</style>
