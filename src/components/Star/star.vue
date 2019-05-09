<template>
  <div class="star" :class="starType">
      <span v-for="itemClass in itemClasses" :class="itemClass" class="star-item"></span>
  </div>
</template>

<script>
  const LENGTH = 5;
  const CLS_ON = 'on';
  const CLS_HALF = 'half';
  const CLS_OFF = 'off';
    export default {
        props:{
          size:{
            type:Number
          },
          score:{
            type: Number
          }
        },
      computed:{
          starType(){
            return 'star-' + this.size;
          }
      }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .star
    font-size:0
    .star-item
      display: inline-block
      background:no-repeat
      /*&.star-48*/
      /*&.star-36*/
      /*&.star-24*/

</style>
