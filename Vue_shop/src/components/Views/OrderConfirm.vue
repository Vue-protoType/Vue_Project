<template>
    <div>
      <Header></Header>
      <div class="container">
        <div class="orderHeader">
          <h5>CHECK OUT</h5>
        </div>
        <div class="row address">
          <div class="col confirm process"><span>confirm address</span></div>
          <div class="col confirm process"><span>View Your Order</span></div>
          <div class="col confirm"><span>Make Payment</span></div>
          <div class="col confirm"><span>Order Confirmation</span></div>
        </div>
        <table class="table table-hover table-bordered">
          <thead class="table-primary text-center">
          <tr>
            <th scope="col">ORDER CONTENTS</th>
            <th scope="col">PRICE</th>
            <th scope="col">QUANTITY</th>
            <th scope="col">SUBTOTAL</th>
          </tr>
          </thead>
          <tbody>
          <tr class="text-center item" v-for="items of confirmGoodsList" v-if="items.checked === '1'">
            <td>
              <div class="confirm-img"><img :src="`/static/images/`+items.productImage" alt=""></div>
              <div class="item-name">{{items.productName}}</div>
            </td>
            <td class="item-Price text-primary">{{items.salePrice|doll}}</td>
            <td class="item-quantity"><span class="item-quantity-span">x{{items.productNum}}</span></td>
            <td class="item-subtotal">{{items.salePrice * items.productNum|doll}}</td>
          </tr>
          </tbody>
        </table>
        <div class="row oderDate">
          <div class="col-md-6 col-lg-3 offset-md-6 offset-lg-9">
            <ul class="orderDate">
              <li>Item subtotal:<span>{{orderTotal|doll}}</span></li>
              <li>Shipping<span>{{shipping|doll}}</span></li>
              <li>Discount:<span>{{Discount|doll}}</span></li>
              <li>Tax:<span>{{tax|doll}}</span></li>
              <li>Order total:<span>{{finallyCost|doll}}</span></li>
            </ul>
          </div>
        </div>
        <div class="row btn-nav">
          <div class="col-md-3 col-sm-6 col-6"><button class="btn btn-lg btn-info" @click="ToAddress">PREVIOUS</button></div>
          <div class="col-md-4 col-sm-6  col-6 offset-md-5"><button  class="btn btn-lg btn-danger float-right" @click="ToFinish">TO PAYMENT</button></div>
        </div>
        </div>
      <Footer></Footer>
      </div>
</template>

<script>
    import Header from '../Common/Header'
    import BreadCrumb from '../Common/BreadCrumb'
    import Footer from '../Common/Footer'
    import axios from 'axios'
    export default {
        name: "OrderConfirm",
        data(){
          return{
            confirmGoodsList:[],
            shipping:100,
            Discount:200,
            tax:400,
            orderTotal:0,
            finallyCost:0
          }
        },
        components:{
            Header,
            BreadCrumb,
            Footer
        },
      methods:{
        ToAddress(){
          this.$router.push('/address')
        },
        ToFinish(){
          axios.post('/users/payMenu',{
            orderTotal: this.orderTotal,
            AddressId: this.$store.state.orderAddress
          }).then(response=>{
            let res = response.data;
            if(res.status === '038'){
              this.$message({
                message:'订单创建成功',
                type:'success'
              });
              this.$router.push({
                name:"orderFinish",
                params:{
                  orderId: res.result.orderId,
                  orderTotal: res.result.orderTotal
                }
              })
            }
          });

        },
        init(){
          axios.get('/users/cartList').then(response=>{
            let res =response.data;
            if(res.status === '017'){
              this.confirmGoodsList = res.result;
              this.confirmGoodsList.forEach(item=>{
                  if(item.checked === '1'){
                    this.orderTotal += item.productNum*item.salePrice;
                    this.finallyCost = this.orderTotal + this.shipping + this.tax - this.Discount
                  }
              })
            }
          })
        }
      },
      mounted() {
          this.init();
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
