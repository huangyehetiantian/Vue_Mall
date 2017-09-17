<template>
  <div id="app">
   <leftNav></leftNav>
   <div class="main">
     <router-view ></router-view>
   </div>
    <!--<router-view name="left" style="width:50%;color:white;float:left;background:black;height:300px;"></router-view>-->
    <!--<router-view name="right" style="width:50%;color:white;;float:right;background:red;height:300px;"></router-view>-->
  </div>
</template>

<script>
import leftNav from '@/components/common/leftNav'
export default {
  name: 'app',
  data () {
    return {

    }
  },
  components: {
    leftNav
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  /*margin-top: 60px;*/
}
.main{
  width:95%;
  float:right;
  background:#EFF2F7;
  /*height:100%;*/
  overflow:auto;
}
</style>
