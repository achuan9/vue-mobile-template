<template>
  <div style="position: relative; width: 100%; height: 100%">
    <!-- 导航 -->
    <div class="navigation">
      <button class="navigation-item" type="button" @click="toggleMap">
        <p>中国</p>
        <p>China</p>
      </button>
      <span class="navigation-split" v-show="curCityData.name">></span>
      <div class="navigation-item" v-show="curCityData.name">
        <p>{{curCityData.name}}</p>
        <p>{{jsonName.toUpperCase()}}</p>
      </div>
    </div>
    <!-- 中国地图 -->
    <div ref="mapChina" class="chart-cont" v-show="showChina">

    </div>
    <!-- 当前城市地图 -->
    <div ref="mapCity" class="chart-cont map-city" v-show="!showChina">
    </div>
  </div>
</template>
<script type='text/javascript'>
  import china from 'echarts/map/json/china.json';
  import 'echarts/map/js/china.js'
  import jsonMap from "./config.js";
  import ConvertData from "./ConvertData.js";
  export default {
    name: '',
    props: {
      data: {
        type: Array,
        required: true
      },
      dataCity: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        showChina: true,
        curCityData: {}, //点击中国地图的当前城市数据
        cityMapChart: null,
        jsonName: ''
      }
    },
    mounted() {
      this.showChinaMap()
    },
    methods: {
      /**
       * 切换到城市地图
       */
      async showCityMap() { 
        const that = this;
        const jsonName = that.jsonName;
        if (!that.$echarts.getMap(jsonName)) {
          const res = await that.$getLocal(`${process.env.BASE_URL}map/province/${jsonName}.json`)
          that.$echarts.registerMap(jsonName, res);
        }
        const curMap = that.$echarts.getMap(jsonName);
        const convertData = new ConvertData(curMap.geoJson.features, that.dataCity).getData();
        let myChart = that.$echarts.getInstanceByDom(that.$refs.mapCity);
        if (!myChart) {
          myChart = that.$echarts.init(that.$refs.mapCity);
          that.initMap(myChart)
        }
        myChart.setOption({
          geo: { map: jsonName },
          series: [{
            data: convertData
          }]
        })
        that.cityMapChart = myChart;
      },
      toggleMap() {
        this.curCityData = {};
        this.showChina = true;
        // this.cityMapChart.dispose();
      },
      showChinaMap() { //中国地图
        const that = this;
        const data = that.data;
        const convertData = new ConvertData(china.features, data).getData()
        let myChart = that.$echarts.getInstanceByDom(that.$refs.mapChina);
        if (!myChart) {
          myChart = that.$echarts.init(that.$refs.mapChina);
          that.initMap(myChart)
        }
        
        myChart.setOption({
          geo: { map: "china" },
          series: [{
            data: convertData
          }]
        })
        myChart.on('click', function({ componentType, data }) {
          if (componentType === "series" && data) {
            that.$echarts.dispose(that.$refs.mapCity)
            that.showChina = false
            that.curCityData = data;
            that.jsonName = jsonMap[data.name]
            that.$emit('click-city', data)
            that.showCityMap()
          }
        })
        
      },

      initMap(chart) { //公用的初始化地图
        const defaultOption = {
          tooltip: {
            formatter: function(params) {
              const { name, value } = params
              return `${name}: ${value[2]}`
            }
          },
          geo: {
            zoom: 1.1,
            scaleLimit: {
              min: 1,
              max: 2.5,
            },
            roam: true,
            itemStyle: {
              areaColor: '#072e51',
              borderColor: '#00b5e2'
            },
            emphasis: { //高亮状态
              label: {
                color: '#e61b1b',
                fontSize: 15
              },
              itemStyle: {
                areaColor: '#e1d50a',
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowBlur: 15,
                borderWidth: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
          },
          series: [{
            type: 'effectScatter', //地图上的涟漪效果点
            coordinateSystem: 'geo',
            symbolSize: 20,
            showEffectOn: 'render',
            rippleEffect: {
              brushType: 'stroke'
            },
            hoverAnimation: true,
            itemStyle: {
              normal: {
                color: '#25FFFB',
                shadowBlur: 10,
                shadowColor: '#fff'
              }
            },
            zlevel: 1
          }]
        }
        chart.setOption(defaultOption)
      }
    },
    watch: {
      data() {
        this.showChinaMap()
      },
      dataCity() {
        this.showCityMap()
      }
    }
  }
</script>
<style lang='scss' scoped>
  .navigation {
    position: absolute;
    left: 20px;
    top: 40px;
    z-index: 1;
    border-top: 1px solid #fff;
    border-bottom: 1px solid #fff;

    .navigation-item,
    .navigation-split {
      display: inline-block;
      vertical-align: middle;
      padding: 2px;
      font-size: 15px;
      text-align: center;
      color: #fff;
    }

    .navigation-split {
      margin: 0 5px;
    }
  }

  .chart-cont {
    position: absolute;
    left: 0;
    top: 0;
  }
</style>