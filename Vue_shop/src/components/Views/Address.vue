<template>
    <div>
      <Header></Header>
      <div class="container">
        <div class="row address">
          <div class="col confirm process"><span>confirm address</span></div>
          <div class="col confirm"><span>View Your Order</span></div>
          <div class="col confirm"><span>Make Payment</span></div>
          <div class="col confirm"><span>Order Confirmation</span></div>
        </div>
        <div class="row addressList">
          <h6>SHIPPING ADDRESS</h6>
        </div>
        <div class="row">
          <div class="col-md-3" v-for="items of subArray" :key="items.addressId">
            <div class="card" :class="{'clickCard':currentAddress === items.addressId}" @click="selectItem(items.addressId)">
              <h6 class="card-header">{{items.userName}}<span class="d-inline-block float-right text-danger" v-if="items.isDefault">默认地址</span></h6>
              <div class="card-body">
                <h6 class="card-title addressName">地址:{{items.streetName}}</h6>
                <p class="card-text">邮政编号：{{items.postCode}}</p>
                <a href="#" class="btn btn-primary" @click="confirmDelete(items.addressId)" data-toggle="modal" data-target="#exampleModal">删除</a>
                <a href="#" class="btn btn-primary" v-if="!items.isDefault" @click="setDefault(items.addressId)">设置为默认地址</a>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="card">
              <h6 class="card-header">收件人</h6>
              <div class="card-body">
                <h6 class="card-title">地址:xxxxx</h6>
                <p class="card-text">邮政编号：xxxxxx</p>
                <a href="#" class="btn btn-primary" @click="addAddress">添加地址</a>
              </div>
            </div>
          </div>
        </div>
        <div class="row addressMore">
          <img src="/static/images/down.png" alt="" @click="showAllAddress" :class="{'up':showUp}">
        </div>
        <div class="row methodList">
          <h6>SHIPPING METHOD</h6>
        </div>
        <div class="row">
          <div class="col-md-3" >
            <div class="card"  >
              <h6 class="card-header">Standard shipping</h6>
              <div class="card-body">
                <h6 class="card-title">Free</h6>
                <p class="card-text">Once shipped，Order should arrive in the destination in 1-7 business days</p>
              </div>
            </div>
          </div>
          <div class="col-md-3 offset-md-6 nextBtn">
            <button class="btn btn-lg btn-danger" @click="ToOrder">Confirm Order</button>
        </div>
        </div>
      </div>
      <Modal>
        <h5 slot="title" class="modal-title">提示</h5>
        <div slot="body" class="modal-body">是否删除该地址?</div>
        <button class="btn btn-info" slot="save"  data-dismiss="modal" @click="deleteAddress">确认</button>
      </Modal>
      <div class="addAddress" v-if="ViewShow" @click="HideView">
          <div class="AddressView">
            <span class="frame-title">地址编辑</span>
            <div class="frame-input">
              <input type="text"  placeholder="收件人姓名" name="username" v-model="userName">
            </div>
            <div class="frame-input">
              <input type="text"  placeholder="邮寄地址" name="Address" v-model="streetName">
            </div>
            <div class="frame-input">
              <input type="text"  placeholder="邮政编码" name="postCode" v-model="postCode">
            </div>
            <div class="frame-input">
              <input type="text"  placeholder="电话号码" name="telNum" v-model="telNum">
            </div>
            <div class="frame-btn">
              <input type="button" class="btn btn-primary  btn-block" value="添加地址" @click="confirmAdd">
            </div>
          </div>
      </div>
      <Footer></Footer>
    </div>
</template>

<script>
  import axios from 'axios'
  import Modal from '../Common/Modal'
  import Header from '../Common/Header'
  import BreadCrumb from '../Common/BreadCrumb'
  import Footer from '../Common/Footer'
    export default {
        name: "Address",
        components:{
          Modal,
          Header,
          BreadCrumb,
          Footer
        },
        data () {
          return {
            AddressList:[],
            subArray:[],
            showUp:false,
            addressId:'',
            ViewShow:false,
            userName:'',
            telNum:'',
            streetName:'',
            postCode: '',
            nowAddress:''
          }
        },
      computed:{
        currentAddress(){
          return this.nowAddress || sessionStorage.getItem('Address')
        }
      },
        methods:{
          selectItem(addressId){
            this.nowAddress = addressId;
            this.$store.commit('orderAddress',{
              addressId: addressId
            })
          },
          HideView() {
            if (event.target.classList.value === 'addAddress') {
              this.ViewShow = false
            }
          },
          confirmAdd(){
            this.ViewShow = false;
            axios.post('/users/addAddress',{
              userName:this.userName,
              postCode:this.postCode,
              streetName:this.streetName,
              telNum:this.telNum
            }).then(response=>{
              let res = response.data;
              if(res.status === '035'){
                this.$message({
                  message:'新地址添加成功',
                  type:'success'
                })
              }else{
                this.$message({
                  message:'新地址添加失败',
                  type:'warning'
                })
              }
              this.gainAddressList();
            })
          },
          gainAddressList () {
            axios.post('/users/AddressList').then(response=>{
              let res = response.data;
              if(res.status === '026'){
                this.AddressList = res.result;
                this.subArray = this.AddressList.slice(0,3);
              }
            })
          },
          addAddress(){
            this.ViewShow = !this.ViewShow
          },
          ToOrder(){
            this.$router.push('/orderConfirm')
          },
          confirmDelete(addressId){
            this.addressId = addressId
          },
          deleteAddress(){
            axios.post('/users/deleteAddress',{
              addressId:this.addressId
            }).then(response=>{
              let res = response.data;
              if(res.status === '033'){
                this.$message({
                  message: '地址删除成功',
                  type:'success'
                })
              }
              this.gainAddressList();
            })
          },
          showAllAddress(){
            this.showUp = ! this.showUp;
            this.subArray = this.subArray === this.AddressList ? this.AddressList.slice(0,3) : this.AddressList
          },
          setDefault(addressId){
            axios.post('/users/setDefault',{
              addressId:addressId
            }).then(response=>{
              let res = response.data;
              if(res.status === '030'){
                this.$message({
                  message:'默认地址修改成功!',
                  type:'success'
                });

              }
            });
            this.gainAddressList();
          }
        },
        mounted() {
          this.gainAddressList();
        }
    }
</script>

<style lang="scss" scoped>

</style>
