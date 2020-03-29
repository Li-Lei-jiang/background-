<template>
 <div>
   <div class="slot-title">
     {{path}}
   </div>
   <div class="body">
     <el-card>
       <div class="table">
          <el-table :data="right" style="width: 100%" border stripe>
            <el-table-column label="#" prop="index" align="center" type="index" :index="index" width="100px"></el-table-column>
            <el-table-column label="权限名称" prop="authName" width="455px" align="center"></el-table-column>
            <el-table-column label="权限等级" prop="level" width="455px" align="center">
              <template scope="scope">
               <el-tag v-if='scope.row.level==="0"'>一级</el-tag>
               <el-tag v-if='scope.row.level==="1"' type='success'>二级</el-tag>
               <el-tag v-if='scope.row.level==="2"' type="warning">三级</el-tag>
              </template>
            </el-table-column>
          </el-table>
        </div>
     </el-card>
   </div>
 </div>
</template>

<script>
 export default {
   data () {
     return {
path:'',
index:1,

     }
   },
   components: {

   },
   methods: {
rightsList(){
this.$store.dispatch("role/rightsList", 'list')
}
   },
   mounted() {
this.path=this.$router.app._router.history.current.meta.path.join('>')
this.rightsList()
   },
   watch: {

   },
   computed: {
right() {
      return this.$store.state.role.right;
    }
   }
 }
</script>

<style scoped lang='scss'>
.body{
  padding: 20px
}
</style>