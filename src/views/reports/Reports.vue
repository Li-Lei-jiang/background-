<template>
 <div>
   <div class="slot-title">
     {{path}}
   </div>
   <div id="chart1"></div>
 </div>
</template>

<script>
 export default {
   data () {
     return {
path:'',
     }
   },
   components: {

   },
   methods: {
chart(){
   this.$store.dispatch("product/chart").then(res=>{
    //  console.log(res);
let option = {
        title:{
            text:'折线图'
        },
        tooltip:{},
        legend:{
            data:res.legend.data
        },
        xAxis:{
            data:res.xAxis[0].data
        },
        yAxis:{
        },
        series:res.series
    };
     let myChart = this.$echarts.init(document.getElementById('chart1'));
      myChart.setOption(option);
   })
}
   },
   mounted() {
this.path=this.$router.app._router.history.current.meta.path.join('>')
this.chart()
   },
   watch: {

   },
   computed: {
// charts() {
//        return this.$store.state.product.chart;
//     }
   }
 }
</script>

<style scoped lang='scss'>
#chart1{
width: 750px;
height: 400px;
margin:20px
}
</style>