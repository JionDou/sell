<template>
    <div class="shopcart">
      <div class="content">
        <div class="content-left">
          <div class="logo-wrapper">
            <div class="logo" :class="{'highlight':totalCount>0}">
              <i class="iconfont icon-shoping-cart highlight" :class="{'highlight':totalCount>0}">&#xe517;</i>
            </div>
            <div class="num" v-show="totalCount > 0">{{totalCount}}</div>
          </div>
          <div class="price" :class="{'highlight':totalPrice>0}">¥{{totalPrice}}</div>
          <div class="desc">另需配送费 ¥ {{deliveryPrice}}元</div>
        </div>
        <div class="content-right">
          <div class="pay" :class="payClass">
            {{payDesc}}
          </div>
        </div>
      </div>
      <div class="ball-container">
        <div transition="drop" v-for="ball in balls" v-show="ball.show" class="ball">
          <div class="inner inner-hook"></div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        props:{
          selectFoods:{
            type:Array,
            default(){
              return[
                {
                  price:40,
                  count:4
                }
              ];
            }
          },
          deliveryPrice:{
            type:Number,
            default:0
          },
          minPrice:{
            type: Number,
            default: 0
          }
        },
        data(){
          return{
            balls:[
              {
                show:false
              },
              {
                show:false
              },
              {
                show:false
              },
              {
                show:false
              },
              {
                show:false
              },
            ]
          };
        },
      computed:{
        totalPrice(){
          let total = 0;
          this.selectFoods.forEach((food) => {
            total += food.price * food.count;
          });
          return total;
        },
        totalCount(){
          let count = 0;
          this.selectFoods.forEach(() =>{
            count += food.count;
          });
          return count;
        },
        payDesc(){
          if (this.totalPrice === 0){
            return `¥${this.minPrice}元起送`;
          }else if (this.totalPrice - this.minPrice){
            let diff = this.minPrice - this.totalPrice;
            return `还差¥${diff}元起送`;
          }else {
            return '去结算';
          }
        },
        payClass(){
          if (this.totalPrice<this.minPrice){
            return 'not-enough';
          }else {
            return 'enough';
          }
        }
      },
      methods:{
          drop(el){
            // console.log(el);
            for (let i = 0; i<this.balls.length;i++){
                let ball = this.balls[i];
                if (!ball.show){
                  ball.show = true;
                  ball.el = el;
                  this.dropBall.push(ball);
                  return;
                }
            }
          }
      },
      transitions:{
          drop:{
            beforeEnter(el){
              let count = this.balls.length;
              while(count--){
                let ball = this.balls[count];
                if (ball.show){
                  let rect = ball.el.getBoundingClientRect();
                  let x = rect.left - 32;
                  let y = -(window.innerHeight - rect.top - 22);
                  el.style.display = '';
                  el.style.webkitTransform = `translate3d(0,${y}px,0)`;
                  el.style.transform = `translate3d(0,${y}px,0)`;
                  let inner = el.getElementsByClassName('inner-hook')[0];
                  inner.style.webkitTransform = `translate3d(0,${x}px,0,0)`;
                  inner.style.transform = `translate3d(0,${x}px,0,0)`;
                }
              }
            },
            enter(el){
              /* eslint-disable no-unused-vars*/
              let rf = el.offsetHeight;
              this.$nextTick(()=>{
                el.style.webkitTransform = 'translate3d(0,0,0)';
                el.style.transform = 'translate3d(0,0,0)';
                let inner = el.getElementsByClassName('inner-hook')[0];
                inner.style.webkitTransform = 'translate3d(0,0,0)';
                inner.style.transform = 'translate3d(0,0,0)';
              });
            },
            afterEnter(el){
                let ball = this.dropBalls.shift();
                if (ball){
                  ball.show = false;
                  el.style.display = 'none';
                }
            }
          }
      }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .shopcart
      position:fixed
      left:0
      bottom:0
      z-index:50
      width: 100%
      height:48px
      .content
        display:flex
        background:#141d27
        font-size:0
        color:rgba(255,255,255,0.4)
        .content-left
          flex:1
          .logo-wrapper
            display:inline-block
            position:relative
            top: -10px
            margin:0 12px
            padding:6px
            width:56px
            height:56px
            box-sizing:border-box
            vertical-align:top
            border-radius:50%
            background:#141d27
            .logo
              width: 100%
              height: 100%
              border-radius: 50%
              text-align:center
              background: #2b343c
              &.highlight
                background:rgb(0,160,220)
              .icon-shoping-cart
                line-height:44px
                font-size:24px
                color:#80858a
                &.highlight
                  color: #fff
            .num
              position:absolute
              top:0
              right:0
              width:24px
              height:16px
              line-height:16px
              text-align:center
              border-radius:16px
              font-size:9px
              font-weight:700
              color:#fff
              background:rgb(240,20,20)
              box-shadow:0 4px 8px 0 rgba(0,0,0,0.4)
          .price
            display inline-block
            vertical-align:top
            margin-top:12px
            line-height:24px
            padding-right:12px
            box-sizing:border-box
            border-right:1px solid rgba(255,255,255,0.1)
            font-size:16px
            font-weight:700
            &.highlight
              color: #fff
          .desc
            display inline-block
            vertical-align:top
            margin:12px 0 0 12px
            line-height:24px
            font-size:10px
        .content-right
          flex:0 0 105px
          width:105px
          .pay
            height:48px
            line-height:48px
            text-align:center
            font-size:12px
            font-weight:700
            &.not-enough
              background: #2b333b
            &.enough
              background: #00b43c
              color:#fff

      .ball-container
        .ball
          position:fixed
          left:32px
          bottom:22px
          z-index:200
          &.drop-transition
            transition: all 0.4s cubic-bezier(0.49,-0.29,0.75,0.41)
            .inner
              width:16px;
              height:16px;
              -webkit-border-radius: 50%
              -moz-border-radius: 50%
              border-radius: 50%
              background:rgb(0,160,220)
              transition:all 0.4s linear
</style>
