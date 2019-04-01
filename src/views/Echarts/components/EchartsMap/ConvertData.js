/**
 * 传入地图geoJson.features 和 接口数据，通过getData()获取地图options.series中需要的数据
 * @param {Array} features 地图数据中的features
 * @param {Array} data 接口数据，格式 [{name: "赣州", value: 100}]
 * @method getData 获取格式化后的数据
 */

class ConvertData {
  constructor(
    features = [], 
    data = []
  ) {
    this.features = features;
    this.data = data;
    this.cpMap = {}
    this.__initCpMap()
  }

  __initCpMap() {
    for (const item of this.features) {
      const { properties } = item;
      this.cpMap[properties.name] = properties.cp
    }
  }

  getData() {
    const res = this.data.map(({ name, value }) => {
      const geoCoord = this.cpMap[name];
      if (geoCoord) {
        return {
          name: name,
          value:  [...geoCoord, value]
        };
      }
    })
    return res;
  }
}
export default ConvertData;