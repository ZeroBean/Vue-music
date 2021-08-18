import { 
    USER_SONGLIST, 
    NOW_MUSIC, 
    NOW_MUSICMENU,  
    SET_PLAY, 
    ADD_COUNT,
    MINUS_COUNT,
    SET_DURATION,
    CLEAR_COUNT,
    SET_COUNT,
    MUSIC_LISTIDS,
} from './mutationType'

export default {
    [USER_SONGLIST](state, list) {
        state.userPlayList = [...list];
    },
    [NOW_MUSIC](state, url) {
        state.nowmusic = url;
    },
    [NOW_MUSICMENU](state, menu) {
        state.nowmusicmenu = menu
    },
    [SET_PLAY](state,flag){
        state.isPlaying  = flag;
    },
    [ADD_COUNT](state){
        
        if(state.musiclistId.length>0 && state.musicCount + 1 < state.musiclistId.length){
            state.musicCount++;
        }
    },
    [MINUS_COUNT](state){
        if(state.musiclistId.length>0 && state.musicCount>0){
            state.musicCount--;
        }
    },
    [SET_DURATION](state,num){
        state.musicDuration = num;
    },
    [CLEAR_COUNT](state){
        if(state.musiclistId.length>0){
            state.musicCount = 0;
        }
    },
    [SET_COUNT](state,num){
        if (state.musiclistId.length > 0) {
            // console.log(num);
            state.musicCount = num;
        }
    },
    [MUSIC_LISTIDS](state,list){
        state.musiclistId = [...list];
    }
}
