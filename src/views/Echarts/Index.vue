<template>
  <div class="wrapper">
    <div class="echarts-item">
      <echarts-line :data="dataLine"></echarts-line>
    </div>
  </div>
</template>
<script type='text/javascript'>
  import EchartsMapChina from './components/EchartsMap/EchartsMapChina';
  import EchartsLine from './components/EchartsLine/Index';



  export default {
    name: '',
    components: { EchartsMapChina, EchartsLine },
    data() {

      return {
        dataLine: [
          {name: "1月", value: 100},
          {name: "2月", value: 200},
          {name: "3月", value: 300},
          {name: "4月", value: 400},
          {name: "5月", value: 500},
          {name: "6月", value: 600},
          {name: "7月", value: 700},
        ],
        dataMap: [
          { name: '北京', value: Math.round(Math.random() * 100) },
          { name: '天津', value: Math.round(Math.random() * 100) },
          { name: '上海', value: Math.round(Math.random() * 100) },
          { name: '重庆', value: Math.round(Math.random() * 100) },
          { name: '河北', value: Math.round(Math.random() * 100) },
          { name: '河南', value: Math.round(Math.random() * 100) },
          { name: '云南', value: Math.round(Math.random() * 100) },
          { name: '辽宁', value: Math.round(Math.random() * 100) },
          { name: '黑龙江', value: Math.round(Math.random() * 100) },
          { name: '湖南', value: Math.round(Math.random() * 100) },
          { name: '安徽', value: Math.round(Math.random() * 100) },
          { name: '山东', value: Math.round(Math.random() * 100) },
          { name: '新疆', value: Math.round(Math.random() * 100) },
          { name: '江苏', value: Math.round(Math.random() * 100) },
          { name: '浙江', value: Math.round(Math.random() * 100) },
          { name: '江西', value: Math.round(Math.random() * 100) },
          { name: '湖北', value: Math.round(Math.random() * 100) },
          { name: '广西', value: Math.round(Math.random() * 100) },
          { name: '甘肃', value: Math.round(Math.random() * 100) },
          { name: '山西', value: Math.round(Math.random() * 100) },
          { name: '内蒙古', value: Math.round(Math.random() * 100) },
          { name: '陕西', value: Math.round(Math.random() * 100) },
          { name: '吉林', value: Math.round(Math.random() * 100) },
          { name: '福建', value: Math.round(Math.random() * 100) },
          { name: '贵州', value: Math.round(Math.random() * 100) },
          { name: '广东', value: Math.round(Math.random() * 100) },
          { name: '青海', value: Math.round(Math.random() * 100) },
          { name: '西藏', value: Math.round(Math.random() * 100) },
          { name: '四川', value: Math.round(Math.random() * 100) },
          { name: '宁夏', value: Math.round(Math.random() * 100) },
          { name: '海南', value: Math.round(Math.random() * 100) },
          { name: '台湾', value: Math.round(Math.random() * 100) },
          { name: '香港', value: Math.round(Math.random() * 100) },
          { name: '澳门', value: Math.round(Math.random() * 100) }
        ]
      }
    },
    created() {

    },
    methods: {

    },
  }
</script>
<style lang='scss' scoped>
.echarts-item {
  width: 400px;
  height: 400px;
}
</style>
