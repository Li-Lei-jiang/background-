<template>
  <div>
    <div class="slot-title">{{path}}</div>
    <div class="body">
      <el-card class="box-card">
        <div class="top">
          <div class="input">
            <el-input v-model="input" placeholder="请输入搜索内容">
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </div>
        </div>
        <div class="form">
          <el-table :data="order" style="width: 100%" border>
            <el-table-column
              prop="order"
              label="#"
              align="center"
              type="index"
              :index="index"
              width="100px"
            ></el-table-column>
            <el-table-column prop="order_number" label="订单编号" align="center" width="155px"></el-table-column>
            <el-table-column prop="order_price" label="订单价格" align="center" width="150px"></el-table-column>
            <el-table-column prop="order_pay" label="是否付款" align="center" width="150px">
              <template scope="scope">
                <el-tag v-if="scope.row.order_pay==='0'" type="danger">已付款</el-tag>
                <el-tag v-else >待付款</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="is_send" label="是否发货" align="center" width="150px"></el-table-column>

            <el-table-column prop="create_time" label="下单时间" align="center" width="150px"></el-table-column>
            <el-table-column prop="operation" label="操作" align="center" width="150px">
              <template scope="scope">
                <el-button type="primary" size="mini" icon="el-icon-edit" @click="edit(scope.row)"></el-button>
                <el-button
                  type="success"
                  icon="el-icon-location-outline"
                  size="mini"
                  @click="setting()"
                ></el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        {{cityOptions}}
        <Page :goodstotal="total"></Page>
      </el-card>
      <el-dialog title="编辑地址" :visible.sync="editLock">
        <el-cascader
    :options="cityOptions"
    :props="props"
    clearable></el-cascader>
      </el-dialog>
      <el-dialog title="物流信息" :visible.sync="settingLock">
        <div >
  <el-steps direction="vertical" :active='0' >
    <el-step v-for='(item,index) in logistic' :key="index" :title="item.context" :description="item.time"></el-step>
  </el-steps>
</div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import Page from "../../components/page/Page";
import cityOptions from '../../assets/city_data2017_element'
export default {
  data() {
    return {
      path: "",
      input: "",
      editLock: false,
      settingLock:false,
      pagenum: 1, //当前页
      pagesize: 10, //每页显示条数
      query: "", //查询参数
      user_id:'',
      pay_status:'',
      is_send:'',
      index:1,
      region:'',
      order_id:'',
      cityOptions: cityOptions,
      props:{label: "label", value: "value"}
    };
  },
  components: {
    Page
  },
  methods: {
    ordersList() {
      this.$store.dispatch("product/ordersList", {
        pagenum: this.pagenum,
        pagesize: this.pagesize,
        query: this.query
      }).then(res => {
          res.goods.map(item => {
            item.create_time = this.$dayjs(item.create_time).format(
              "YYYY-MM-DD  hh:mm:ss"
            );
          });
        });
    },
     edit(val) {
      this.editLock = true;
      // console.log(val);
    },
    setting(){
      this.settingLock=true
      this.$store.dispatch("product/logisticsDesc", 1106975712662 )
    }
  },
  mounted() {
    this.path = this.$router.app._router.history.current.meta.path.join(">");
    this.ordersList();
  },
  watch: {},
  computed: {
    order() {
      return this.$store.state.product.orderList.goods;
    },
    total() {
      return this.$store.state.product.goodsList.total;
    },
     logistic() {
      return this.$store.state.product.logistics;
    }
  }
};
</script>

<style scoped lang='scss'>
.body {
  padding: 20px;
  .top {
    display: flex;
    width: 100%;
    margin-bottom: 20px;
    .input {
      width: 300px;
    }
    .button {
      margin-left: 20px;
    }
  }
  .icon {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  }
}
</style>