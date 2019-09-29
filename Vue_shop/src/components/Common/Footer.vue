<template>
    <div class="container" id="footer">
      <div class="row">
        <div class="col-lg-2 col-md-3 col-sm-6 col-12">
          <div class="select">
            <span>Region:</span>
            <select @change="select" ref="value">
              <option value="China">中文</option>
              <option value="English">English</option>
            </select>
          </div>
        </div>
        <div class="col-lg-10 col-md-9 col-sm-6 col-12">
          <div class="nav-content">
            <ul class="nav justify-content-center">
              <li class="nav-item "><a href="#" class="nav-link">Copyright © 2017 IMooc All Rights Reserved</a></li>
              <li class="nav-item "><a href="#" class="nav-link">{{$t('navList.AboutUs')}}</a></li>
              <li class="nav-item "><a href="#" class="nav-link">{{$t('navList.Terms')}}</a></li>
              <li class="nav-item "><a href="#" class="nav-link">{{$t('navList.Privacy')}}</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "Footer",
        methods:{
          select () {
            var value = this.$refs.value.value;
            if (value === 'China') {
              this.$i18n.locale  = 'zh'
            } else if (value === 'English') {
              this.$i18n.locale  = 'en'
            }
          }
        }
    }
</script>

<style lang="scss" scoped>

</style>
