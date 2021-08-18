export default {
    // 对state数据进行过滤
    getUserSongList(state){
        if(state.userPlayList.length>0){
            return state.userPlayList
        }
    },
    getNowMusic(state){
        if(state.nowmusic === null){
            state.nowmusic = '';
        }
        // console.log(state.nowmusic);
        return state.nowmusic;
    },
    getNowMusicMenu(state){
        if(state.nowmusicmenu.al === undefined){
            return {
                al:{
                  picUrl:require('assets/img/common/logo.png'),
                  name:'歌名',
                  pic:0,
                  id:0,
                },
                ar:[{
                    id:0,
                    name:'歌手'
                }],
                dt:0,
              } 
        }else{
            return state.nowmusicmenu;
        }
    },
    //获取歌单列表IDs
    getMusicListIds(state){
        return state.musiclistId
    },
    getMusicCount(state){
        return state.musicCount
    },
    //获取歌曲时长
    getDuration(state){
        return state.musicDuration;
    },
    //获取播放状态
    getIsPlay(state){
        return state.isPlaying;
    },
}