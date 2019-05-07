<template>
  <div>
    <v-header :seller="seller"></v-header>
    <div id="tab">
      <div class="tab-item">
        <a >
          <router-link to="/goods">商品</router-link>
        </a>
      </div>
      <div class="tab-item">
        <a href="#">
          <router-link to="/ratings">评论</router-link>
        </a>
      </div>
      <div class="tab-item">
        <a >
          <router-link to="/seller">商家</router-link>
        </a>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  import Header from './pages/Header/header'
  const ERR_OK = 0;
  export default {
    data() {
      return {
        seller:{}
      }
    },
    components: {
      'v-header': Header
    },
    created() {
      this.axios.get('/apiData/seller').then((response) => {
        response = response.data;
        if (response.errno === ERR_OK) {
          this.seller = response.data;
          console.log(this.seller);
        }
      });
      // this.$http.get('apiData/seller').then((response) => {
      //   response = response.body;
      //   console.log(response)
      //   if (response.errno === ERR_OK){
      //     this.seller = response.data;
      //     console.log(this.seller);
      //   }
      // })
    },
  }

</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../static/css/reset.css"
  * {
    margin: 0;
    padding: 0;
  }
    #tab
      display: flex
      width: 100%
      height: 40px
      line-height: 40px
      border-bottom 1px solid rgba(7,17,27,0.1)
    .tab-item
      flex 1
      text-align center
      & > a
        display block
        font-size 14px
        color rgb(77,85,93)
.router-link-active
  color orange
</style>
