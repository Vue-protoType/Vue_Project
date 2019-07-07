<template>
  <div>
    <el-row>
      <el-col :span="18" offset="3">
        <div class="footer">
          <div class="region">
            <span>Region</span>
              <select class="footer__region__select">
              <option value="en-US">USA</option>
              <option value="zh-CN">China</option>
              <option value="in">India</option>
            </select>
          </div>
          <div class="footer-nav">
            <span>Copyright © 2017 IMooc All Rights Reserved.</span>
            <a href="http://us.lemall.com/us/aboutUs.html">
              About Us
            </a>
            <a href="http://us.lemall.com/us/termsofUse.html">
              Terms &amp; Conditions
            </a>
            <a href="http://us.lemall.com/us/privacyPolicy.html">
              Privacy Policy
            </a>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style scoped lang="scss">
  .footer{
    width: 100%;
    display: flex;
    align-items: center;
    height: 60px;
  }
  .el-col{
    min-height: 60px;
  }
  .region{
    width: 30%;
  }
  .region>span{
    margin-left: 20px;
    color:#ada9a5;
  }
  .footer-nav{
    width: 70%;
    height: 20px;
    color: #ada9a5;
  }
  .footer-nav>a {
    margin-left: 50px;
    color: #ada9a5;
  }
  @media screen and (max-width: 1447px){
    .footer-nav>a{
      margin-left: 30px;
    }
    .footer-nav>span{
      display: none;
    }
  }
</style>
