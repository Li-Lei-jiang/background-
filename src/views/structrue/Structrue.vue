<template>
  <div>
    <div class="head">
      <div class="left">欢迎来到yolo后台系统</div>
      <div class="right">
        <div class="time">{{date}}</div>
        <div class="weather">
          <div>{{weather}}</div>
          <div>{{wendu}}℃</div>
        </div>
        <div class="dear" v-if="usernames">亲爱的，{{usernames}}</div>
        <div class="logout" @click="logout">退出</div>
      </div>
    </div>

    <div style="display:flex">
      <div style="width:200px">
        <Aside></Aside>
      </div>
    <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Aside from "../../components/aside/Aside";
export default {
  data() {
    return {
      date: "",
      weather: "",
      wendu: ""
    };
  },
  components: {
    Aside
  },
  methods: {
    cityWeather() {
      this.$axios
        .get("http://wthrcdn.etouch.cn/weather_mini?city=成都")
        .then(response => {
          this.weather = response.data.data.forecast[0].type;
          this.wendu = response.data.data.wendu;
          // console.log(response.data);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    logout() {
      this.$store.commit("user/STE_USER", "");
    }
  },
  mounted() {
    setInterval(() => {
      this.date = new Date().toLocaleString();
    }, 1000);
    this.cityWeather();
  },
  watch: {},
  computed: {
    usernames() {
      return this.$store.state.user.user.username;
    }
  }
};
</script>

<style scoped lang='scss'>
.head {
  height: 60px;
  border-bottom: 1px solid #f0f2f5;
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  line-height: 60px;
  color: #2e5e85;
  .right {
    display: flex;
    .weather {
      margin: 0 20px;
      display: flex;
    }
    .logout {
      cursor: pointer;
      color: #409eff;
      margin-left: 12px;
    }
  }
}
.container {
  display: flex;
}
</style>