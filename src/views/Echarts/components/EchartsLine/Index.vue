<template>
  <div ref="chart" style="width: 100%; height: 100%">

  </div>
</template>
<script type='text/javascript'>
  export default {
    name: '',
    props: {
      data: {
        type: Array,
        required: true
      }
    },
    data() {
      return {

      }
    },
    mounted() {
      this.init()
    },
    methods: {
      init() {
        const that = this;
        const data = that.data;
        const myChart = that.$echarts.init(that.$refs.chart);

        var xData = [],
          yData = [],
          bgData = [];

        data.map(function(a, b) {
          xData.push(a.name);
          yData.push(a.value);
          bgData.push(1)
        });


        myChart.setOption({
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'line',
              lineStyle: {
                opacity: 0
              }
            },
            formatter: '{b0}: {c0}'
          },
          grid: {
            top: 66,
            bottom: 20,
            left: '2%',
            right: '5%',
            containLabel: true
          },
          xAxis: [{
            type: 'category',
            gridIndex: 0,
            data: xData,
            axisTick: {
              alignWithLabel: true
            },
            axisLine: {
              lineStyle: {
                color: '#009ffd'
              }
            },
            axisLabel: {
              show: true,
              color: '#fff'
            }
          }],
          yAxis: [{
              type: 'value',
              boundaryGap: [0, '10%'],
              gridIndex: 0,
              name: `单位`,
              nameTextStyle: {
                color: '#fff'
              },
              splitLine: {
                show: false
              },
              axisTick: {
                show: false
              },
              axisLine: {
                lineStyle: {
                  color: '#009ffd'
                }
              },
              axisLabel: {
                color: '#fff',
                formatter: '{value}'
              }
            },
            {
              type: 'value',
              gridIndex: 0,
              splitNumber: 12,
              splitLine: {
                show: false
              },
              axisLine: {
                show: false
              },
              axisTick: {
                show: false
              },
              axisLabel: {
                show: false
              },
              splitArea: {
                show: true,
                areaStyle: {
                  color: ['rgba(250,250,250,0.0)', 'rgba(250,250,250,0.05)']
                }
              }
            }
          ],
          series: [{
              type: 'bar',
              barWidth: '30%',
              xAxisIndex: 0,
              yAxisIndex: 0,
              itemStyle: {
                 color: new that.$echarts.graphic.LinearGradient(
                    0, 0, 0, 1, [{
                        offset: 0,
                        color: '#00f0f8'
                      },
                      {
                        offset: 1,
                        color: '#005cbd'
                      }
                    ]
                  ),
                barBorderRadius: 10,
              },
              data: yData,
              zlevel: 11

            },
            {
              name: '背景',
              type: 'bar',
              barWidth: '50%',
              xAxisIndex: 0,
              yAxisIndex: 1,
              barGap: '-135%',
              data: bgData,
              itemStyle: {
                normal: {
                  color: 'rgba(255,255,255,0.1)'
                }
              },
              zlevel: 9
            },

          ]
        });
      }
    }
  }
</script>
<style lang='scss' scoped>

</style>
