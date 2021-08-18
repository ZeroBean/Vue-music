export default {
    routes: [
        {
            path: '/',
            redirect: '/home/rtstyle',
        },
        {
            path: '/home',
            name: 'home',
            component: () => import('@/views/Home/Home'),
            //meta: { index: 7 },
            children: [
                {
                    path: 'rtstyle',
                    name: 'style',
                    component: () => import('@/views/right/menu/RightStyle.vue'),
                    //meta:{index:7}
                },
                {
                    path: 'rtsongs',
                    name: 'songs',
                    component:()=>import('@/views/right/menu/RightSongs'),
                    //meta:{index:8}
                },
                {
                    path: 'rtanchor',
                    name: 'anchor',
                    component:()=>import('@/views/right/menu/RightAnchor'),
                    //meta:{index:9}
                },
                {
                    path:'rtlist',
                    name: 'list',
                    component:()=>import('@/views/right/menu/RightList'),
                    //meta:{index:10}
                },
                {
                    path:'rtsinger',
                    name: 'singer',
                    component:()=>import('@/views/right/menu/RightSinger'),
                    //meta:{index:11}
                },
                {
                    path: 'rtnewsing',
                    name: 'newsing',
                    component: () => import('@/views/right/menu/RightNewsing'),
                    //meta:{index:12}
                },
            ]
        },
        {
            path: '/songs:id',
            name: 'songslist',
            component: () => import('components/common/songlist/SongList'),
            //meta:{index:2}
        },
        {
            path: '/videos:id',
            name: 'videos',
            component: () => import('components/common/musicvideo/VideoDetail'),
            //meta:{index:2}
        },
        {
            path: '/musicvideo',
            name: 'musicVideo',
            component: () => import('components/common/musicvideo/MusicVideo'),
            //meta:{index:4}
        },
        {
            path: '/singleSong',
            name: 'singleSong',
            component: () => import('components/common/single/singleSong'),
            //meta:{index:0}
        },
    ],
    mode: 'history',
}