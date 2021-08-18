import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import getters from './getters'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userPlayList:[],
    nowmusic:'',//当前音乐
    nowmusicmenu:{},//当前音乐详细信息
    isPlaying:true,
    musiclistId:[],//歌单歌曲的ID
    musicCount:0,//歌曲数量
    musicDuration:0,//歌曲时长
  },
  mutations,
  getters,
  actions: {
  },
  modules: {
  }
})
