<template>
  <div class="page">
<div v-if='goodstotal'>
      <el-pagination
      @size-change="goodsChange"
      @current-change="goodsCurrentChange"
      :current-page="currentPage"
      :page-sizes="[ 10, 20, 40,50]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="goodstotal"
    ></el-pagination>
</div>
<div v-else>
      <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[ 5, 10, 20,40]"
      :page-size="5"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPage: 1,
      pagenum: 1,
      pagesize:5,
      goodsPageSize:10,
      query: ""
    };
  },
  props: {
    total: {
      type: Number,
      default: 0
    },
    goodstotal:{
      type: Number,
      default: 0
    }
  },
  components: {},
  methods: {
    handleSizeChange(val) { //用户分页
      this.pagesize=val
      this.$store.dispatch("user/usersList", {
        pagenum: this.pagenum,
        pagesize: this.pagesize,
        query: this.query
      });
    },
    handleCurrentChange(val) { //用户分页
      this.pagenum=val
      this.$store.dispatch("user/usersList", {
        pagenum: this.pagenum,
        pagesize: this.pagesize,
        query: this.query
    })
  },
   goodsChange(val) { //商品分页
      this.goodsPageSize=val
      this.$store.dispatch("product/goodsList", {
        pagenum: this.pagenum,
        pagesize: this.goodsPageSize,
        query: this.query
      });
    },
    goodsCurrentChange(val) { //商品分页
      this.pagenum=val
      this.$store.dispatch("product/goodsList", {
        pagenum: this.pagenum,
        pagesize: this.goodsPageSize,
        query: this.query
    })
  },
  },
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.page{
  margin:20px 
}
</style>