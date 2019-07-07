<template>
<div>
  <el-row class="header">
    <el-col :span="16" offset="3" class="title">shipping address</el-col>
  </el-row>
  <el-row class="List" >
    <el-col :span="4" :offset="3" v-for="(item, index) of addressListFilter" :key="item.addressId" :class="{'check': checkIndex === index}" >
      <div @click="showIndex(index, item.addressId)" class="selectRang">
      <dl>
        <dt>{{item.userName}}</dt>
        <dd class="address">{{item.streetName}}</dd>
        <dd>{{item.postCode}}</dd>
      </dl>
      <div class="address-default" v-if="item.isDefault">Default address</div>
        <div class="SetDefault" v-if="!item.isDefault" @click="comfirmSet(item.addressId)">Set Default</div>
      <div class="delete-address" @click="deleteAddress(item.addressId)"></div>
      </div>
    </el-col>
    <el-col :span="4" :offset="3">
      <div class="Add-Address" @click="openBox">
      <div class="add-icon">
        <img src="../../static/add.png" alt="">
      </div>
      <div class="add-title">Add new Address</div>
      </div>
    </el-col>
  </el-row>
  <el-row class="moreList" >
    <div class="moreBox" @click="more" >{{state}} </div>
    <span :class="{'open' : limit > 2}" @click="more" ></span>
  </el-row>
  <el-row class="method-header">
    <el-col :span="16" offset="3" class="title">shipping method</el-col>
  </el-row>
  <el-row class="Method" >
    <el-col :span="4" :offset="3">
      <div class="methods-title">Standard shipping</div>
      <div class="methods">Free</div>
      <div class="introduce">Once shipped，Order should arrive in the destination in 1-7 business days</div>
    </el-col>
  </el-row>
  <el-row class="Next-Btn">
    <el-col :span="4" offset="16" class="btn"><el-button type="primary" class="main-btn" @click="skip">Next</el-button></el-col>
  </el-row>
  <el-dialog
    title="提示"
    :visible.sync="dialogVisible"
    width="30%">
    <span>是否设置该地址为默认地址</span>
    <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="SetDefault">确 定</el-button>
  </span>
  </el-dialog>
  <div class="Mask" v-show="isopen" @click.self="closeMask">
    <div class="addressBox">
      <span class="boxHeader">地址编辑</span>
      <div class="login"><input type="text" name="addressId" v-model="addressId" placeholder="地址ID" readonly="readonly"></div>
      <div class="login"><input type="text" name="userName" v-model="userName" placeholder="用户名/只能输入字母和中文/" @blur="check('userName')" ref="userName"></div>
      <div class="login"><input type="text" name="streetName" v-model="streetName" placeholder="街道名/只能输入字母、中文、数字/"  @blur="check('streetName')" ref="streetName"></div>
      <div class="login"><input type="text" name="postCode" v-model="postCode" placeholder="邮政编码/只能输入6位数字/"  @blur="check('postCode')" ref="postCode"></div>
      <div class="sumbit">
        <el-button type="submit" round @click="redact" @keyup.enter="redact">保存</el-button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Site',
  data () {
    return {
      addressList: [],
      limit: 2,
      state: 'Hold up',
      activeState: false,
      checkIndex: 0,
      dialogVisible: false,
      addressId: '',
      isopen: false,
      userName: '',
      streetName: '',
      postCode: '',
      selectAddrId: ''
    }
  },
  computed: {
    addressListFilter () {
      return this.addressList.slice(0, this.limit)
    }
  },
  methods: {
    closeMask () {
      if (event.target) {
        this.isopen = false
      }
    },
    init () {
      axios.get('./users/addressList').then((response) => {
        var res = response.data
        if (res.status === '0') {
          this.addressList = res.result
          this.selectAddrId = this.addressList[0].addressId
        }
      })
    },
    showIndex (index, addressId) {
      this.checkIndex = index
      this.selectAddrId = addressId
    },
    skip () {
      this.$router.push({path: '/orderConfirm', query: {addressId: this.selectAddrId}})
    },
    more () {
      if (this.limit === 2) {
        this.limit = this.addressList.length
        this.state = 'Pack up'
        this.activeState = true
      } else {
        this.limit = 2
        this.state = 'Hold up'
        this.activeState = false
      }
    },
    comfirmSet (addressId) {
      this.dialogVisible = true
      if (addressId) {
        this.addressId = addressId
      }
    },
    openBox () {
      this.isopen = !this.isopen
      this.addressId = ''
      var code = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
      for (var i = 0; i < 10; i++) {
        var num = Math.floor(Math.random() * 10)
        this.addressId += code[num]
      }
    },
    SetDefault () {
      this.dialogVisible = false
      axios.post('/users/SetDefault', {
        addressId: this.addressId
      }).then((response) => {
        this.init()
      })
    },
    check (condition) {
      if (condition === 'userName') {
        var User = /^[\u4E00-\u9FA5A-Za-z]+$/
        if (!User.test(this.userName)) {
          this.$refs.userName.style.border = '1px solid red'
        } else {
          this.$refs.userName.style.border = 'none'
        }
      }
      if (condition === 'streetName') {
        var Street = /^[\u4E00-\u9FA5A-Za-z0-9]+$/
        if (!Street.test(this.streetName)) {
          this.$refs.streetName.style.border = '1px solid red'
        } else {
          this.$refs.streetName.style.border = 'none'
        }
      }
      if (condition === 'postCode') {
        var Code = /^[1-9][0-9]{5}$/
        if (!Code.test(this.postCode)) {
          this.$refs.postCode.style.border = '1px solid red'
        } else {
          this.$refs.postCode.style.border = 'none'
        }
      }
    },
    deleteAddress (addressId) {
      axios.post('./users/deleteAddress', {
        addressId: addressId
      }).then((response) => {
        this.init()
      })
    },
    redact () {
      var Code = /^[1-9][0-9]{5}$/
      var User = /^[\u4E00-\u9FA5A-Za-z]+$/
      var Street = /^[\u4E00-\u9FA5A-Za-z0-9]+$/
      if (!Code.test(this.postCode) || this.userName === '' || !Street.test(this.streetName) || !User.test(this.userName) || this.streetName === '' || this.postCode === '') {
        return false
      } else {
        this.isopen = false
        axios.post('./users/addAddress', {
          addressId: this.addressId,
          streetName: this.streetName,
          userName: this.userName,
          postCode: this.postCode
        }).then((response) => {
          this.init()
        })
      }
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style scoped lang="scss">
  .open{
    transform: rotate(180deg);
  }
  .moreList{
    min-height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  .moreBox{
    width: 10%;
    line-height: 16px;
    font-size: 16px;
    color:$color;
    text-align: right;
  }
  .selectRang{
    height: 100%;
  }
  .moreList>span{
    display: inline-block;
    width: 16px;
    height: 16px;
    margin: 2px 0 0 2px;
    background: url('../../static/down.png') no-repeat;
  }
  .header {
    min-height: 61px;
  }
  .Add-Address{
    height: 100%;
  }
  .title{
    font-size: 16px;
    padding: 20px 0px;
    text-transform: uppercase;
    letter-spacing: .25em;
    font-weight: bold;
    color: #605F5F;
  }
  .Method>.el-col{
    height: 162px;
    border: 2px solid #03a9f4;
  }
  .List>.el-col{
    margin-top: 20px;
    height: 162px;
    border: 2px solid #e9e9e9;
    margin-right: 20px;
    position: relative;
  }
  .List>.el-col:hover{
    border: 2px solid #03a9f4;
    cursor: pointer;
    .SetDefault{
      display: block;
    }
  }
  .check{
    border: 2px solid #03a9f4 !important;
  }
  dl{
    width: 90%;
    margin-left: 10%;
  }
  dt{
    line-height: 26px;
    padding: 10px 25px 10px 0px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 20px;
    font-weight: 800;
  }
  .address{
    height: 50px;
  }
  .address-default{
    float: left;
    margin: 5% 0 0 10%;
    color: #ee7a23;
  }
  .delete-address{
    float: right;
    margin-right: 20px;
    background: url('../../static/recycle.png') no-repeat;
    width: 32px;
    height: 32px;
  }
  .delete-address:hover{
    background: url('../../static/recycleactive.png') no-repeat;
  }
  .add-icon{
    height: 50%;
    width: 100%;
    text-align: center;
    padding-top: 30px;
  }
  .add-title{
    text-align: center;
    font-weight: 700;
  }
  .method-header{
    margin-top: 40px;
  }
  .methods-title{
    width: 90%;
    margin: 10% 0 0 10%;
    font-size: 18px;
  }
  .methods{
    width: 90%;
    margin: 5% 0 0 10%;
    font-weight: bolder;
  }
  .introduce{
    width: 80%;
    margin: 10% 10% 0 10%;
    color:#ada9a5;
    height: 50%;
    overflow: hidden;
  }
  .Next-Btn{
    margin-top: 50px;
  }
  .main-btn{
    width: 200px;
    letter-spacing: 10px;
  }
  @media screen and (max-width: 1071px){
    .delete-address{
      margin-right: 0px;
    }
  }
  @media screen and (max-width: 920px){
    .address-default{
      font-size: 12px;
    }
    .introduce{
      font-size: 12px;
    }
  }
  @media screen and (max-width: 1024px){
    .delete-address{
      margin-right: 0px;
    }
    .introduce{
      margin: 13px 0px 0px 20px;
    }
    .methods-title{
      font-size: 15px;
    }
  }
  @media screen and (max-width: 768px){
    .List>.el-col{
      width: 50%;
      margin-left: 25%;
    }
    .title{
      margin-left: 25%;
    }
    .Method>.el-col{
      width: 50%;
      margin-left: 25%;
    }
    .delete-address{
      margin-right: 20px;
    }
  }
  .SetDefault{
    position: absolute;
    left: 10%;
    bottom: 12%;
    color: $border-color;
    display: none;
  }
.Mask{
  overflow: hidden;
  z-index: 9999997;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0px;
  left: 0px;
  background: rgb(0, 0, 0);
  opacity:0.8;
}
  .addressBox{
    margin: 100px auto;
    width: 555px;
    height: 488px;
    border-radius: 15px;
    background: #fff;
  }
  .boxHeader{
    width: 100%;
    font-size :35px;
    text-align: center;
    padding: 35px 0px;
    font-weight: 700;
    display: block;
    border-bottom: 1px solid $color;
    margin-bottom: 30px;
    color: black;
  }
  .login{
    width: 100%;
    height: 45px;
    margin: 10px 0px;
    justify-content: center;
    display: flex;
    align-items: center;
  }
  .login>input {
    width: 50%;
    height: 30px;
    border: none;
    border-radius: 20px;
    box-shadow: none;
    outline: none;
    padding: 0px 45px;
    background: #e1e1e1;
    transition: all 0.5s ease 0s;
  }
  .login>input:focus{
    background: #CCCCCC;
    box-shadow: 0 0 15px #03a9f4;
  }
  input::-moz-placeholder{
    font-size: 14px;
    font-weight: bold;
  }
  input::-webkit-input-placeholder{
    font-size: 14px;
    font-weight: bold;
  }
  .sumbit{
    width: 100%;
    display: flex;
    height: 100px;
    align-items: center;
    justify-content: center;
  }
  .el-button {
    width: 200px;
    background: #00B7FF;
    color: #FFFFFF;
  }
</style>
