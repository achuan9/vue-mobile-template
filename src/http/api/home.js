import axios from '../api.request'

export const getHomeData = ({act, layerId, extent}) => {
  return axios.request({
    url: 'map/layerData.shtml',
    method: 'get',
    params: {
      act, layerId, extent
    }
  })
}


