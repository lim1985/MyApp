import { UserLayout, BasicLayout, RouteView, PageView } from '@/components/layouts'

export const newasyncRoterMap=(params)=>{
  console.log(`----------------------`)
  console.log(params)
let res= [ {
 path: '/',
 name: 'index',
 component: BasicLayout,
 meta: { title: '首页' },
 redirect: '/views',
 children: [
  
  {
    path: '/views',
    redirect: '/views/DepTreelist',
    name: 'Deptongxunlu',    
    meta: { title: '大祥区通讯录', icon: 'dashboard' },
    component: PageView,
    children:[
      {
        name: 'DepList',   
        path: '/views/DepTreelist',
        component: () => import('@/views/other/TreeList'),
        meta: { title: '部门列表' }
      }
    ] 
  // {
  //    path:'/dashboard/DepCardList',
  //    name:'cardlist',
  //    component: () => import('@/views/list/DepCardList'), 
  //    meta: { title: '卡片式', icon: 'dashboard' },  
  //  }  
  },  
   {
    path: '/list/QW',
    name: 'QW',   
    redirect: {name:'Phonelist_QW'},
    component: PageView,
    meta: { title: '区委', icon: 'dashboard', permission: [ 'QW','edit' ] },
    children: [
      {
        path: '/list/UserPhonelist/152',          
        name: 'Phonelist_QW',
        component: () => import('@/views/list/UserPhonelist'),
        meta: { title: '通信录', permission: [ 'QW' ] }
      },
      {
        path: '/list/CustomGroup/152',          
        name: 'CustomGroup_QW',
        component: () => import('@/views/other/customgroup'),
        meta: { title: '自定义组', permission: [ 'QW' ] }
      },
      
    ]
  },
  {
    path: '/list/QRD',
    name: 'QRD',
    redirect: {name:'Phonelist_QRD'},
    component: PageView,
    meta: { title: '区人大常委会', icon: 'dashboard', permission: [ 'QRD' ] },
    children: [
      {
        path: '/list/UserPhonelist/153',
        name: 'Phonelist_QRD',
        component: () => import('@/views/list/UserPhonelist'),
        meta: { title: '通信录', permission: [ 'QRD' ] }
      },
      {
        path: '/list/CustomGroup/153',          
        name: 'CustomGroup_QRD',
        component: () => import('@/views/other/customgroup'),
        meta: { title: '自定义组', permission: [ 'QRD' ] }
      }  
    ]
  },
  {
    component: PageView,
    path: '/list/QRMZF',
    name: 'QRMZF',
    redirect: {name:'Phonelist_QRMZF'},
    meta: { title: '区人民政府',icon: 'dashboard', permission: [ 'QRMZF' ] },
    children:[
      {
      
        path: '/list/UserPhonelist/154',
        name: 'Phonelist_QRMZF',
        component: () => import('@/views/list/UserPhonelist'),
        meta: { title: '通信录', permission: [ 'QRMZF' ] }
      },
      {
        path: '/list/CustomGroup/154',          
        name: 'CustomGroup_QRMZF',
        component: () => import('@/views/other/customgroup'),
        meta: { title: '自定义组', permission: [ 'QRMZF' ] }
      } 
      
    ]
  }, 
  {
    component: PageView,
    path: '/list/QZX',
    name: 'QZX',
    redirect: {name:'Phonelist_QZX'},
    meta: { title: '区政协',icon: 'dashboard', permission: [ 'QZX' ] },
    children:[
      {
     
        path: '/list/UserPhonelist/155',
        name: 'Phonelist_QZX',
        component: () => import('@/views/list/UserPhonelist'),
        meta: { title: '通信录', permission: [ 'QZX' ] }
      }
    ]
  }, 
  {
    component: PageView,
    path: '/list/QRWB',
    name: 'QRWB',
    redirect: {name:'Phonelist_QRWB'},
    meta: { title: '区人武部',icon: 'dashboard', permission: [ 'QRWB' ] },
    children:[
      {
       
        path: '/list/UserPhonelist/156',
        name: 'Phonelist_QRWB',
        component: () => import('@/views/list/UserPhonelist'),
        meta: { title: '通信录', permission: [ 'QRWB' ] }
      }
    ]
  },
  {
    component: PageView,
    path: '/list/QJWJCJ',
    name: 'QJWJCJ',
    redirect: {name:'Phonelist_QJWJCJ'},
    meta: { title: '区纪委、监察局',icon: 'dashboard', permission: [ 'QJWJCJ' ] },
    children:[
      {
      
        path: '/list/UserPhonelist/157',
        name: 'Phonelist_QJWJCJ',
        component: () => import('@/views/list/UserPhonelist'),
        meta: { title: '通信录', permission: [ 'QJWJCJ' ] }
      }
    ]
  },
  {
    path: '/list/QWB',
    name: 'QWB',
    // redirect: {name:'Phonelist_QWB'},
    component: PageView,
    meta: { title: '区委办公室系统', icon: 'dashboard', permission: [ 'QWB' ] },
    children: [
      {
        component: RouteView,
        path: '/list/QWBGS',
        name: 'QWBGS',
        redirect: {name:'Phonelist_QWBGS'},
        meta: { title: '区委办公室', permission: [ 'QWBGS' ] },
        children:[
          {
          
            path: '/list/UserPhonelist/84',
            name: 'Phonelist_QWBGS',
            component: () => import('@/views/list/UserPhonelist'),
            meta: { title: '通信录', permission: [ 'QWBGS' ] }
          },
          {
            path: '/list/CustomGroup/84',          
            name: 'CustomGroup_QWBGS',
            component: () => import('@/views/other/customgroup'),
            meta: { title: '自定义组', permission: [ 'QWBGS' ] }
          } 
        ]
      },  
      {
        component: RouteView,
        path: '/list/QWGGB',
        name: 'QWGGB',
        redirect: {name:'Phonelist_QWGGB'},
        meta: { title: '区委改革办', permission: [ 'QWGGB' ] },
        children:[
          {
        
            path: '/list/UserPhonelist/85',
            name: 'Phonelist_QWGGB',
            component: () => import('@/views/list/UserPhonelist'),
            meta: { title: '通信录', permission: [ 'QWGGB' ] }
          }
        ]
      }, 
      {
        component: RouteView,
        path: '/list/XKB',
        name: 'XKB',
        redirect: {name:'Phonelist_XKB'},
        meta: { title: '小康办', permission: [ 'XKB' ] },
        children:[
          {
          
            path: '/list/UserPhonelist/86',
            name: 'Phonelist_XKB',
            component: () => import('@/views/list/UserPhonelist'),
            meta: { title: '通信录', permission: [ 'XKB' ] }
          }
        ]
      }, 
      //BMB（GJBMJ）	保密办（国家保密局）
      {
        component: RouteView,
        path: '/list/DCS',
        name: 'DCS',
        redirect: {name:'Phonelist_DCS'},
        meta: { title: '督察室', permission: [ 'DCS' ] },
        children:[
          {
           
            path: '/list/UserPhonelist/87',
            name: 'Phonelist_DCS',
            component: () => import('@/views/list/UserPhonelist'),
            meta: { title: '通信录', permission: [ 'DCS' ] }
          }
        ]
      }, 
      {
        component: RouteView,
        path: '/list/BMB（GJBMJ）',
        name: 'BMB（GJBMJ）',
        redirect: {name:'Phonelist_BMB（GJBMJ）'},
        meta: { title: '保密办（国家保密局）', permission: [ 'BMB（GJBMJ）' ] },
        children:[
          {
         
            path: '/list/UserPhonelist/88',
            name: 'Phonelist_BMB（GJBMJ）',
            component: () => import('@/views/list/UserPhonelist'),
            meta: { title: '通信录', permission: [ 'BMB（GJBMJ）' ] }
          }
        ]
      },
      {
        component: RouteView,
        path: '/list/ZYS',
        name: 'ZYS',
        redirect: {name:'Phonelist_ZYS'},
        meta: { title: '政研室', permission: [ 'ZYS' ] },
        children:[
          {
         
            path: '/list/UserPhonelist/89',
            name: 'Phonelist_ZYS',
            component: () => import('@/views/list/UserPhonelist'),
            meta: { title: '通信录', permission: [ 'ZYS' ] }
          }
        ]
      },
      {
        component: RouteView,
        path: '/list/DAJ',
        name: 'DAJ',
        redirect: {name:'Phonelist_DAJ'},
        meta: { title: '档案局', permission: [ 'DAJ' ] },
        children:[
          {
          
            path: '/list/UserPhonelist/90',
            name: 'Phonelist_DAJ',
            component: () => import('@/views/list/UserPhonelist'),
            meta: { title: '通信录', permission: [ 'DAJ' ] }
          }
        ]
      },
    ]
  },
  {
    path: '/list/DQ',
    name: 'DQ',
    // redirect: {name:'Phonelist_QWB'},
    component: PageView,
    meta: { title: '党群系统', icon: 'dashboard', permission: [ 'DQ' ] },
    children: [
      {
        component: RouteView,
        path: '/list/QWZZB',
        name: 'QWZZB',
        redirect: {name:'Phonelist_QWZZB'},
        meta: { title: '区委组织部', permission: [ 'QWZZB' ] },
        children:[
          {
         
            path: '/list/UserPhonelist/91',
            name: 'Phonelist_QWZZB',
            component: () => import('@/views/list/UserPhonelist'),
            meta: { title: '通信录', permission: [ 'QWZZB' ] }
          },
          {
            path: '/list/CustomGroup/91',          
            name: 'CustomGroup_QWZZB',
            component: () => import('@/views/other/customgroup'),
            meta: { title: '自定义组', permission: [ 'QWZZB' ] }
          } 
        ]
      },  
      {
        component: RouteView,
        path: '/list/QWXCB',
        name: 'QWXCB',
        redirect: {name:'Phonelist_QWXCB'},
        meta: { title: '区委巡查办', permission: [ 'QWXCB' ] },
        children:[
          {
        
            path: '/list/UserPhonelist/92',
            name: 'Phonelist_QWXCB',
            component: () => import('@/views/list/UserPhonelist'),
            meta: { title: '通信录', permission: [ 'QWXCB' ] }
          }
        ]
      }, 
      {
        component: RouteView,
        path: '/list/QWXCZ',
        name: 'QWXCZ',
        redirect: {name:'Phonelist_QWXCZ'},
        meta: { title: '区委巡查组', permission: [ 'QWXCZ' ] },
        children:[
          {
         
            path: '/list/UserPhonelist/93',
            name: 'Phonelist_QWXCZ',
            component: () => import('@/views/list/UserPhonelist'),
            meta: { title: '通信录', permission: [ 'QWXCZ' ] }
          }
        ]
      },      
      {
        component: RouteView,
        path: '/list/JGDW',
        name: 'JGDW',
        redirect: {name:'Phonelist_JGDW'},
        meta: { title: '机关党委', permission: [ 'JGDW' ] },
        children:[
          {
           
            path: '/list/UserPhonelist/94',
            name: 'Phonelist_JGDW',
            component: () => import('@/views/list/UserPhonelist'),
            meta: { title: '通信录', permission: [ 'JGDW' ] }
          }
        ]
      }, 
      {
        component: RouteView,
        path: '/list/LGBJ',
        name: 'LGBJ',
        redirect: {name:'Phonelist_LGBJ'},
        meta: { title: '老干部局', permission: [ 'LGBJ' ] },
        children:[
          {
          
            path: '/list/UserPhonelist/95',
            name: 'Phonelist_LGBJ',
            component: () => import('@/views/list/UserPhonelist'),
            meta: { title: '通信录', permission: [ 'LGBJ' ] }
          }
        ]
      },    
      {
        component: RouteView,
        path: '/list/DX',
        name: 'DX',
        redirect: {name:'Phonelist_DX'},
        meta: { title: '党校', permission: [ 'DX' ] },
        children:[
          {
         
            path: '/list/UserPhonelist/96',
            name: 'Phonelist_DX',
            component: () => import('@/views/list/UserPhonelist'),
            meta: { title: '通信录', permission: [ 'DX' ] }
          }
        ]
      },
      {
        component: RouteView,
        path: '/list/JGBZWYKBGS',
        name: 'JGBZWYKBGS',
        redirect: {name:'Phonelist_JGBZWYKBGS'},
        meta: { title: '机构编制委员会办公室', permission: [ 'JGBZWYKBGS' ] },
        children:[
          {          
            path: '/list/UserPhonelist/97',
            name: 'Phonelist_JGBZWYKBGS',
            component: () => import('@/views/list/UserPhonelist'),
            meta: { title: '通信录', permission: [ 'JGBZWYKBGS' ] }
          }
        ]
      },
      {
        component: RouteView,
        path: '/list/ZGK',
        name: 'ZGK',
        redirect: {name:'Phonelist_ZGK'},
        meta: { title: '总工会', permission: [ 'ZGK' ] },
        children:[
          {
           
            path: '/list/UserPhonelist/98',
            name: 'Phonelist_ZGK',
            component: () => import('@/views/list/UserPhonelist'),
            meta: { title: '通信录', permission: [ 'ZGK' ] }
          }
        ]
      },
      {
        component: RouteView,
        path: '/list/TQW',
        name: 'TQW',
        redirect: {name:'Phonelist_TQW'},
        meta: { title: '团区委', permission: [ 'TQW' ] },
        children:[
          {
         
            path: '/list/UserPhonelist/99',
            name: 'Phonelist_TQW',
            component: () => import('@/views/list/UserPhonelist'),
            meta: { title: '通信录', permission: [ 'TQW' ] }
          }
        ]
      },
      {
        component: RouteView,
        path: '/list/FNLHK',
        name: 'FNLHK',
        redirect: {name:'Phonelist_FNLHK'},
        meta: { title: '妇女联合会', permission: [ 'FNLHK' ] },
        children:[
          {
          
            path: '/list/UserPhonelist/100',
            name: 'Phonelist_FNLHK',
            component: () => import('@/views/list/UserPhonelist'),
            meta: { title: '通信录', permission: [ 'FNLHK' ] }
          }
        ]
      },
      {
        component: RouteView,
        path: '/list/XFHTCSKJFBGS',
        name: 'XFHTCSKJFBGS',
        redirect: {name:'Phonelist_XFHTCSKJFBGS'},
        meta: { title: '信访和调处社会纠纷办公室', permission: [ 'XFHTCSKJFBGS' ] },
        children:[
          {
          
            path: '/list/UserPhonelist/101',
            name: 'Phonelist_XFHTCSKJFBGS',
            component: () => import('@/views/list/UserPhonelist'),
            meta: { title: '通信录', permission: [ 'XFHTCSKJFBGS' ] }
          }
        ]
      },
      {
        component: RouteView,
        path: '/list/JGSWGLJ',
        name: 'JGSWGLJ',
        redirect: {name:'Phonelist_JGSWGLJ'},
        meta: { title: '机关事务管理局', permission: [ 'JGSWGLJ' ] },
        children:[
          {
         
            path: '/list/UserPhonelist/102',
            name: 'Phonelist_JGSWGLJ',
            component: () => import('@/views/list/UserPhonelist'),
            meta: { title: '通信录', permission: [ 'JGSWGLJ' ] }
          }
        ]
      },
    ]
  },
  {
    path: '/list/QXCXT',
    name: 'QXCXT',
    // QWXZB	区委宣传部
    // WHLYGDTYJ	文化旅游广电体育局
    component: PageView,
    meta: { title: '宣传系统', icon: 'dashboard', permission: [ 'QXCXT' ] },
    children: [
      {
        component: RouteView,
        path: '/list/QWXZB',
        name: 'QWXZB',
        redirect: {name:'Phonelist_QWXZB'},
        meta: { title: '区委宣传部', permission: [ 'QWXZB' ] },
        children:[
          {
         
            path: '/list/UserPhonelist/103',
            name: 'Phonelist_QWXZB',
            component: () => import('@/views/list/UserPhonelist'),
            meta: { title: '通信录', permission: [ 'QWXZB' ] }
          }
        ]
      },  
      {
        component: RouteView,
        path: '/list/WHLYGDTYJ',
        name: 'WHLYGDTYJ',
        redirect: {name:'Phonelist_WHLYGDTYJ'},
        meta: { title: '文化旅游广电体育局', permission: [ 'WHLYGDTYJ' ] },
        children:[
          {          
            path: '/list/UserPhonelist/104',
            name: 'Phonelist_WHLYGDTYJ',
            component: () => import('@/views/list/UserPhonelist'),
            meta: { title: '通信录', permission: [ 'WHLYGDTYJ' ] }
          }
        ]
      }, 
    ]
  },
  {
    path: '/list/QTZXT',
    name: 'QTZXT',
    // QWTZB	区委统战部
    // GSYLHK	工商业联合会
    component: PageView,
    meta: { title: '区统战系统', icon: 'dashboard', permission: [ 'QTZXT' ] },
    children: [
      {
        component: RouteView,
        path: '/list/QWTZB',
        name: 'QWTZB',
        redirect: {name:'Phonelist_QWTZB'},
        meta: { title: '区委统战部', permission: [ 'QWTZB' ] },
        children:[
          {
         
            path: '/list/UserPhonelist/105',
            name: 'Phonelist_QWTZB',
            component: () => import('@/views/list/UserPhonelist'),
            meta: { title: '通信录', permission: [ 'QWTZB' ] }
          }
        ]
      },  
      {
        component: RouteView,
        path: '/list/GSYLHK',
        name: 'GSYLHK',
        redirect: {name:'Phonelist_GSYLHK'},
        meta: { title: '工商业联合会', permission: [ 'GSYLHK' ] },
        children:[
          {          
            path: '/list/UserPhonelist/106',
            name: 'Phonelist_GSYLHK',
            component: () => import('@/views/list/UserPhonelist'),
            meta: { title: '通信录', permission: [ 'GSYLHK' ] }
          }
        ]
      }, 
    ]
  },
  {
    path: '/list/QZFXT',
    name: 'QZFXT',
    component: PageView,
    meta: { title: '区政法系统', icon: 'dashboard', permission: [ 'QZFXT' ] },
    children: [
      {
        component: RouteView,
        path: '/list/QWZFW',
        name: 'QWZFW',
        redirect: {name:'Phonelist_QWZFW'},
        meta: { title: '区委政法委', permission: [ 'QWZFW' ] },
        children:[
          {         
            path: '/list/UserPhonelist/107',
            name: 'Phonelist_QWZFW',
            component: () => import('@/views/list/UserPhonelist'),
            meta: { title: '通信录', permission: [ 'QWZFW' ] }
          }
        ]
      },  
      {
        component: RouteView,
        path: '/list/QRMFY',
        name: 'QRMFY',
        redirect: {name:'Phonelist_QRMFY'},
        meta: { title: '区人民法院', permission: [ 'QRMFY' ] },
        children:[
          {           
            path: '/list/UserPhonelist/108',
            name: 'Phonelist_QRMFY',
            component: () => import('@/views/list/UserPhonelist'),
            meta: { title: '通信录', permission: [ 'QRMFY' ] }
          }
        ]
      },     
      {
        component: RouteView,
        path: '/list/QRMJCY',
        name: 'QRMJCY',
        redirect: {name:'Phonelist_QRMJCY'},
        meta: { title: '区人民检察院', permission: [ 'QRMJCY' ] },
        children:[
          {          
            path: '/list/UserPhonelist/109',
            name: 'Phonelist_QRMJCY',
            component: () => import('@/views/list/UserPhonelist'),
            meta: { title: '通信录', permission: [ 'QRMJCY' ] }
          }
        ]
      }, 
        // SFJ	司法局
      {
        component: RouteView,
        path: '/list/GAFJ',
        name: 'GAFJ',
        redirect: {name:'Phonelist_GAFJ'},
        meta: { title: '公安分局', permission: [ 'GAFJ' ] },
        children:[
          {
          
            path: '/list/UserPhonelist/110',
            name: 'Phonelist_GAFJ',
            component: () => import('@/views/list/UserPhonelist'),
            meta: { title: '通信录', permission: [ 'GAFJ' ] }
          }
        ]
      }, 
      {
        component: RouteView,
        path: '/list/SFJ',
        name: 'SFJ',
        redirect: {name:'Phonelist_SFJ'},
        meta: { title: '司法局', permission: [ 'SFJ' ] },
        children:[
          {           
            path: '/list/UserPhonelist/111',
            name: 'Phonelist_SFJ',
            component: () => import('@/views/list/UserPhonelist'),
            meta: { title: '通信录', permission: [ 'SFJ' ] }
          }
        ]
      }, 
    ]
  },
  
// QZFBGSBFJG	区政府办公室系统、部分政府机构
// ZFBGS	政府办公室
// MZJ	民政局

// CJRLHK	残疾人联合会

// AQSCJDGLJ	安全生产监督管理局
// SPYPJDGLJ	食品药品监督管理局

// CEGJGLJ	蔡锷故居管理局
// ZWFWZX	政务服务中心
// RMFKBGS	人民防空办公室
// ZDHFWZSGZBGS	征地和房屋征收工作办公室
  {
    path: '/list/QZFBGSBFJG',
    name: 'QZFBGSBFJG',
    component: PageView,
    meta: { title: '区政府办公室系统、部分政府机构', icon: 'dashboard', permission: [ 'QZFBGSBFJG' ] },
    children: [
      {
        component: RouteView,
        path: '/list/ZFBGS',
        name: 'ZFBGS',
        redirect: {name:'Phonelist_ZFBGS'},
        meta: { title: '政府办公室', permission: [ 'ZFBGS' ] },
        children:[
          {
          
            path: '/list/UserPhonelist/112',
            name: 'Phonelist_ZFBGS',
            component: () => import('@/views/list/UserPhonelist'),
            meta: { title: '通信录', permission: [ 'ZFBGS' ] }
          },
          {
            path: '/list/CustomGroup/112',          
            name: 'CustomGroup_ZFBGS',
            component: () => import('@/views/other/customgroup'),
            meta: { title: '自定义组', permission: [ 'ZFBGS' ] }
          } 
        ]
      },  
      {
        component: RouteView,
        path: '/list/MZJ',
        name: 'MZJ',
        redirect: {name:'Phonelist_MZJ'},
        meta: { title: '民政局', permission: [ 'MZJ' ] },
        children:[
          {
         
            path: '/list/UserPhonelist/113',
            name: 'Phonelist_MZJ',
            component: () => import('@/views/list/UserPhonelist'),
            meta: { title: '通信录', permission: [ 'MZJ' ] }
          }
        ]
      },     
      {
        component: RouteView,
        path: '/list/CJRLHK',
        name: 'CJRLHK',
        redirect: {name:'Phonelist_CJRLHK'},
        meta: { title: '残疾人联合会', permission: [ 'CJRLHK' ] },
        children:[
          {
          
            path: '/list/UserPhonelist/114',
            name: 'Phonelist_CJRLHK',
            component: () => import('@/views/list/UserPhonelist'),
            meta: { title: '通信录', permission: [ 'CJRLHK' ] }
          }
        ]
      },       
      {
        component: RouteView,
        path: '/list/AQSCJDGLJ',
        name: 'AQSCJDGLJ',
        redirect: {name:'Phonelist_AQSCJDGLJ'},
        meta: { title: '安全生产监督管理局', permission: [ 'AQSCJDGLJ' ] },
        children:[
          {
         
            path: '/list/UserPhonelist/115',
            name: 'Phonelist_AQSCJDGLJ',
            component: () => import('@/views/list/UserPhonelist'),
            meta: { title: '通信录', permission: [ 'AQSCJDGLJ' ] }
          }
        ]
      }, 
      {
        component: RouteView,
        path: '/list/SPYPJDGLJ',
        name: 'SPYPJDGLJ',
        redirect: {name:'Phonelist_SPYPJDGLJ'},
        meta: { title: '食品药品监督管理局', permission: [ 'SPYPJDGLJ' ] },
        children:[
          {         
            path: '/list/UserPhonelist/116',
            name: 'Phonelist_SPYPJDGLJ',
            component: () => import('@/views/list/UserPhonelist'),
            meta: { title: '通信录', permission: [ 'SPYPJDGLJ' ] }
          }
        ]
      }, 
      {
        component: RouteView,
        path: '/list/CEGJGLJ',
        name: 'CEGJGLJ',
        redirect: {name:'Phonelist_CEGJGLJ'},
        meta: { title: '蔡锷故居管理局', permission: [ 'CEGJGLJ' ] },
        children:[
          {          
            path: '/list/UserPhonelist/117',
            name: 'Phonelist_CEGJGLJ',
            component: () => import('@/views/list/UserPhonelist'),
            meta: { title: '通信录', permission: [ 'CEGJGLJ' ] }
          }
        ]
      }, 
      {
        component: RouteView,
        path: '/list/ZWFWZX',
        name: 'ZWFWZX',
        redirect: {name:'Phonelist_ZWFWZX'},
        meta: { title: '行政审批服务局', permission: [ 'ZWFWZX' ] },
        children:[
          {
         
            path: '/list/UserPhonelist/118',
            name: 'Phonelist_ZWFWZX',
            component: () => import('@/views/list/UserPhonelist'),
            meta: { title: '通信录', permission: [ 'ZWFWZX' ] }
          },
          {
            path: '/list/CustomGroup/118',          
            name: 'CustomGroup_ZWFWZX',
            component: () => import('@/views/other/customgroup'),
            meta: { title: '自定义组', permission: [ 'ZWFWZX' ] }
          } 
        
        ]
      }, 
      {
        component: RouteView,
        path: '/list/RMFKBGS',
        name: 'RMFKBGS',
        redirect: {name:'Phonelist_RMFKBGS'},
        meta: { title: '人民防空办公室', permission: [ 'RMFKBGS' ] },
        children:[
          {
        
            path: '/list/UserPhonelist/119',
            name: 'Phonelist_RMFKBGS',
            component: () => import('@/views/list/UserPhonelist'),
            meta: { title: '通信录', permission: [ 'RMFKBGS' ] }
          }
        ]
      }, 
      {
        component: RouteView,
        path: '/list/ZDHFWZSGZBGS',
        name: 'ZDHFWZSGZBGS',
        redirect: {name:'Phonelist_ZDHFWZSGZBGS'},
        meta: { title: '征地和房屋征收工作办公室', permission: [ 'ZDHFWZSGZBGS' ] },
        children:[
          {
          
            path: '/list/UserPhonelist/120',
            name: 'Phonelist_ZDHFWZSGZBGS',
            component: () => import('@/views/list/UserPhonelist'),
            meta: { title: '通信录', permission: [ 'ZDHFWZSGZBGS' ] }
          }
        ]
      }, 
    ]
  },
  {
  path: '/list/QSHFZBZXT',
  name: 'QSHFZBZXT',
  component: PageView,
  meta: { title: '区社会发展与保障系统', icon: 'dashboard', permission: [ 'QSHFZBZXT' ] },
  children: [
    {
      component: RouteView,
      path: '/list/DXQTJJ',
      name: 'DXQTJJ',
      redirect: {name:'Phonelist_DXQTJJ'},
      meta: { title: '统计局', permission: [ 'DXQTJJ' ] },
      children:[
        {
        
          path: '/list/UserPhonelist/68',
          name: 'Phonelist_DXQTJJ',
          component: () => import('@/views/list/UserPhonelist'),
          meta: { title: '通信录', permission: [ 'DXQTJJ' ] }
        }
      ]
    },  
    {
      component: RouteView,
      path: '/list/FZHGGJ',
      name: 'FZHGGJ',
      redirect: {name:'Phonelist_FZHGGJ'},
      meta: { title: '发展和改革局', permission: [ 'FZHGGJ' ] },
      children:[
        {
         
          path: '/list/UserPhonelist/69',
          name: 'Phonelist_FZHGGJ',
          component: () => import('@/views/list/UserPhonelist'),
          meta: { title: '通信录', permission: [ 'FZHGGJ' ] }
        }
      ]
    },     
    {
      component: RouteView,
      path: '/list/RLZYHSKBZJ',
      name: 'RLZYHSKBZJ',
      redirect: {name:'Phonelist_RLZYHSKBZJ'},
      meta: { title: '人力资源和社会保障局', permission: [ 'RLZYHSKBZJ' ] },
      children:[
        {
        
          path: '/list/UserPhonelist/121',
          name: 'Phonelist_RLZYHSKBZJ',
          component: () => import('@/views/list/UserPhonelist'),
          meta: { title: '通信录', permission: [ 'RLZYHSKBZJ' ] }
        }
      ]
    },  
  ]
},
{
  path: '/list/QGJXT',
  name: 'QGJXT',
  component: PageView,
  meta: { title: '区工交系统', icon: 'dashboard', permission: [ 'QGJXT' ] },
  children: [
    {
      component: RouteView,
      path: '/list/KJHGYXXHJ',
      name: 'KJHGYXXHJ',
      redirect: {name:'Phonelist_KJHGYXXHJ'},
      meta: { title: '科技和工业信息化局', permission: [ 'KJHGYXXHJ' ] },
      children:[
        {
        
          path: '/list/UserPhonelist/122',
          name: 'Phonelist_KJHGYXXHJ',
          component: () => import('@/views/list/UserPhonelist'),
          meta: { title: '通信录', permission: [ 'KJHGYXXHJ' ] }
        }
      ]
    },  
    {
      component: RouteView,
      path: '/list/JTYSJ',
      name: 'JTYSJ',
      redirect: {name:'Phonelist_JTYSJ'},
      meta: { title: '交通运输局', permission: [ 'JTYSJ' ] },
      children:[
        {
       
          path: '/list/UserPhonelist/123',
          name: 'Phonelist_JTYSJ',
          component: () => import('@/views/list/UserPhonelist'),
          meta: { title: '通信录', permission: [ 'JTYSJ' ] }
        }
      ]
    }  
  ]
},
{
  path: '/list/QSHCZXT',
  name: 'QSHCZXT',
  component: PageView,
  meta: { title: '区商贸财政系统', icon: 'dashboard', permission: [ 'QSHCZXT' ] },
  children: [
    {
      component: RouteView,
      path: '/list/SWJ',
      name: 'SWJ',
      redirect: {name:'Phonelist_SWJ'},
      meta: { title: '商务局', permission: [ 'SWJ' ] },
      children:[
        {
         
          path: '/list/UserPhonelist/124',
          name: 'Phonelist_SWJ',
          component: () => import('@/views/list/UserPhonelist'),
          meta: { title: '通信录', permission: [ 'SWJ' ] }
        }
      ]
    },  
    {
      component: RouteView,
      path: '/list/CZJ',
      name: 'CZJ',
      redirect: {name:'Phonelist_CZJ'},
      meta: { title: '财政局', permission: [ 'CZJ' ] },
      children:[
        {
         
          path: '/list/UserPhonelist/125',
          name: 'Phonelist_CZJ',
          component: () => import('@/views/list/UserPhonelist'),
          meta: { title: '通信录', permission: [ 'CZJ' ] }
        }
      ]
    },  
    {
      component: RouteView,
      path: '/list/SJJ',
      name: 'SJJ',
      redirect: {name:'Phonelist_SJJ'},
      meta: { title: '审计局', permission: [ 'SJJ' ] },
      children:[
        {
      
          path: '/list/UserPhonelist/126',
          name: 'Phonelist_SJJ',
          component: () => import('@/views/list/UserPhonelist'),
          meta: { title: '通信录', permission: [ 'SJJ' ] }
        }
      ]
    }
    ,  
    {
      component: RouteView,
      path: '/list/GXHZSLHS',
      name: 'GXHZSLHS',
      redirect: {name:'Phonelist_GXHZSLHS'},
      meta: { title: '供销合作社联合社', permission: [ 'GXHZSLHS' ] },
      children:[
        {
        
          path: '/list/UserPhonelist/127',
          name: 'Phonelist_GXHZSLHS',
          component: () => import('@/views/list/UserPhonelist'),
          meta: { title: '通信录', permission: [ 'GXHZSLHS' ] }
        }
      ]
    }  
  ]
},
{
  path: '/list/QNCXT',
  name: 'QNCXT',
  component: PageView,
  meta: { title: '区农村系统', icon: 'dashboard', permission: [ 'QNCXT' ] },
  children: [
    {
      component: RouteView,
      path: '/list/NYNCJ',
      name: 'NYNCJ',
      redirect: {name:'Phonelist_NYNCJ'},
      meta: { title: '农业农村局', permission: [ 'NYNCJ' ] },
      children:[
        {
         
          path: '/list/UserPhonelist/128',
          name: 'Phonelist_NYNCJ',
          component: () => import('@/views/list/UserPhonelist'),
          meta: { title: '通信录', permission: [ 'NYNCJ' ] }
        }
      ]
    },  
    {
      component: RouteView,
      path: '/list/CMSCJ',
      name: 'CMSCJ',
      redirect: {name:'Phonelist_CMSCJ'},
      meta: { title: '畜牧水产局', permission: [ 'CMSCJ' ] },
      children:[
        {
        
          path: '/list/UserPhonelist/129',
          name: 'Phonelist_CMSCJ',
          component: () => import('@/views/list/UserPhonelist'),
          meta: { title: '通信录', permission: [ 'CMSCJ' ] }
        }
      ]
    },  
    {
      component: RouteView,
      path: '/list/NYJXGLJ',
      name: 'NYJXGLJ',
      redirect: {name:'Phonelist_NYJXGLJ'},
      meta: { title: '农业机械管理局', permission: [ 'NYJXGLJ' ] },
      children:[
        {
        
          path: '/list/UserPhonelist/130',
          name: 'Phonelist_NYJXGLJ',
          component: () => import('@/views/list/UserPhonelist'),
          meta: { title: '通信录', permission: [ 'NYJXGLJ' ] }
        }
      ]
    },  
    {
      component: RouteView,
      path: '/list/NYZHKFB',
      name: 'NYZHKFB',
      redirect: {name:'Phonelist_NYZHKFB'},
      meta: { title: '农业综合开发办', permission: [ 'NYZHKFB' ] },
      children:[
        {
         
          path: '/list/UserPhonelist/131',
          name: 'Phonelist_NYZHKFB',
          component: () => import('@/views/list/UserPhonelist'),
          meta: { title: '通信录', permission: [ 'NYZHKFB' ] }
        }
      ]
    },  
    {
      component: RouteView,
      path: '/list/FPB',
      name: 'FPB',
      redirect: {name:'Phonelist_FPB'},
      meta: { title: '扶贫办', permission: [ 'FPB' ] },
      children:[
        {        
          path: '/list/UserPhonelist/132',
          name: 'Phonelist_FPB',
          component: () => import('@/views/list/UserPhonelist'),
          meta: { title: '通信录', permission: [ 'FPB' ] }
        }
      ]
    },  
    {
      component: RouteView,
      path: '/list/NCJYFWZ',
      name: 'NCJYFWZ',
      redirect: {name:'Phonelist_NCJYFWZ'},
      meta: { title: '农村经营服务站', permission: [ 'NCJYFWZ' ] },
      children:[
        {
        
          path: '/list/UserPhonelist/133',
          name: 'Phonelist_NCJYFWZ',
          component: () => import('@/views/list/UserPhonelist'),
          meta: { title: '通信录', permission: [ 'NCJYFWZ' ] }
        }
      ]
    },  
    {
      component: RouteView,
      path: '/list/NYFWZ',
      name: 'NYFWZ',
      redirect: {name:'Phonelist_NYFWZ'},
      meta: { title: '能源服务站', permission: [ 'NYFWZ' ] },
      children:[
        {
        
          path: '/list/UserPhonelist/134',
          name: 'Phonelist_NYFWZ',
          component: () => import('@/views/list/UserPhonelist'),
          meta: { title: '通信录', permission: [ 'NYFWZ' ] }
        }
      ]
    }    
  ]
},
{
  path: '/list/QJSXT',
  name: 'QJSXT',
  component: PageView,
  meta: { title: '区建设系统', icon: 'dashboard', permission: [ 'QJSXT' ] },
  children: [
    {
      component: RouteView,
      path: '/list/ZFHCXJSJ',
      name: 'ZFHCXJSJ',
      redirect: {name:'Phonelist_ZFHCXJSJ'},
      meta: { title: '住房和城乡建设局', permission: [ 'ZFHCXJSJ' ] },
      children:[
        {
        
          path: '/list/UserPhonelist/135',
          name: 'Phonelist_ZFHCXJSJ',
          component: () => import('@/views/list/UserPhonelist'),
          meta: { title: '通信录', permission: [ 'ZFHCXJSJ' ] }
        }
      ]
    },  
    {
      component: RouteView,
      path: '/list/CSGLHZHZFJ',
      name: 'CSGLHZHZFJ',
      redirect: {name:'Phonelist_CSGLHZHZFJ'},
      meta: { title: '城市管理和综合执法局', permission: [ 'CSGLHZHZFJ' ] },
      children:[
        {        
          path: '/list/UserPhonelist/136',
          name: 'Phonelist_CSGLHZHZFJ',
          component: () => import('@/views/list/UserPhonelist'),
          meta: { title: '通信录', permission: [ 'CSGLHZHZFJ' ] }
        }
      ]
    },  
    {
      component: RouteView,
      path: '/list/GYJZQGLWYK',
      name: 'GYJZQGLWYK',
      redirect: {name:'Phonelist_GYJZQGLWYK'},
      meta: { title: '工业集中区管理委员会', permission: [ 'GYJZQGLWYK' ] },
      children:[
        {
       
          path: '/list/UserPhonelist/137',
          name: 'Phonelist_GYJZQGLWYK',
          component: () => import('@/views/list/UserPhonelist'),
          meta: { title: '通信录', permission: [ 'GYJZQGLWYK' ] }
        }
      ]
    },  
    {
      component: RouteView,
      path: '/list/MZXLXFNLKFJSZHB',
      name: 'MZXLXFNLKFJSZHB',
      redirect: {name:'Phonelist_MZXLXFNLKFJSZHB'},
      meta: { title: '敏州西路、雪峰南路开发建设指挥部', permission: [ 'MZXLXFNLKFJSZHB' ] },
      children:[
        {       
          path: '/list/UserPhonelist/138',
          name: 'Phonelist_MZXLXFNLKFJSZHB',
          component: () => import('@/views/list/UserPhonelist'),
          meta: { title: '通信录', permission: [ 'MZXLXFNLKFJSZHB' ] }
        }
      ]
    },  
    {
      component: RouteView,
      path: '/list/CXJYJSTZYXGS',
      name: 'CXJYJSTZYXGS',
      redirect: {name:'Phonelist_CXJYJSTZYXGS'},
      meta: { title: '城乡、教育建设投资有限公司', permission: [ 'CXJYJSTZYXGS' ] },
      children:[
        {        
          path: '/list/UserPhonelist/139',
          name: 'Phonelist_CXJYJSTZYXGS',
          component: () => import('@/views/list/UserPhonelist'),
          meta: { title: '通信录', permission: [ 'CXJYJSTZYXGS' ] }
        }
      ]
    },  
    {
      component: RouteView,
      path: '/list/PHQGZJSTZYXGS',
      name: 'PHQGZJSTZYXGS',
      redirect: {name:'Phonelist_PHQGZJSTZYXGS'},
      meta: { title: '棚户区改造建设投资有限公司', permission: [ 'PHQGZJSTZYXGS' ] },
      children:[
        {        
          path: '/list/UserPhonelist/140',
          name: 'Phonelist_PHQGZJSTZYXGS',
          component: () => import('@/views/list/UserPhonelist'),
          meta: { title: '通信录', permission: [ 'PHQGZJSTZYXGS' ] }
        }
      ]
    }   
  ]
},
{
  path: '/list/QJS_WSXT',
  name: 'QJS_WSXT',
  component: PageView,
  meta: { title: '区教科、卫生计生系统', icon: 'dashboard', permission: [ 'QJS_WSXT' ] },
  children: [
    {
      component: RouteView,
      path: '/list/JYJ',
      name: 'JYJ',
      redirect: {name:'Phonelist_JYJ'},
      meta: { title: '教育局', permission: [ 'JYJ' ] },
      children:[
        {
        
          path: '/list/UserPhonelist/141',
          name: 'Phonelist_JYJ',
          component: () => import('@/views/list/UserPhonelist'),
          meta: { title: '通信录', permission: [ 'JYJ' ] }
        }
      ]
    },  
    {
      component: RouteView,
      path: '/list/WSJKJ',
      name: 'WSJKJ',
      redirect: {name:'Phonelist_WSJKJ'},
      meta: { title: '卫生健康局', permission: [ 'WSJKJ' ] },
      children:[
        {
        
          path: '/list/UserPhonelist/142',
          name: 'Phonelist_WSJKJ',
          component: () => import('@/views/list/UserPhonelist'),
          meta: { title: '通信录', permission: [ 'WSJKJ' ] }
        }
      ]
    },  
    {
      component: RouteView,
      path: '/list/AWB',
      name: 'AWB',
      redirect: {name:'Phonelist_AWB'},
      meta: { title: '爱卫办', permission: [ 'AWB' ] },
      children:[
        {
       
          path: '/list/UserPhonelist/143',
          name: 'Phonelist_AWB',
          component: () => import('@/views/list/UserPhonelist'),
          meta: { title: '通信录', permission: [ 'AWB' ] }
        }
      ]
    }  
  ]
},
{
  path: '/list/QSGZQ',
  name: 'QSGZQ',
  component: PageView,
  meta: { title: '部分市管驻区单位', icon: 'dashboard', permission: [ 'QSGZQ' ] },
  children: [
    {
      component: RouteView,
      path: '/list/GJSWJ',
      name: 'GJSWJ',
      redirect: {name:'Phonelist_GJSWJ'},
      meta: { title: '国家税务局', permission: [ 'GJSWJ' ] },
      children:[
        {        
          path: '/list/UserPhonelist/144',
          name: 'Phonelist_GJSWJ',
          component: () => import('@/views/list/UserPhonelist'),
          meta: { title: '通信录', permission: [ 'GJSWJ' ] }
        }
      ]
    },  
    {
      component: RouteView,
      path: '/list/DFSWJ',
      name: 'DFSWJ',
      redirect: {name:'Phonelist_DFSWJ'},
      meta: { title: '地方税务局', permission: [ 'DFSWJ' ] },
      children:[
        {        
          path: '/list/UserPhonelist/145',
          name: 'Phonelist_DFSWJ',
          component: () => import('@/views/list/UserPhonelist'),
          meta: { title: '通信录', permission: [ 'DFSWJ' ] }
        }
      ]
    },  
    {
      component: RouteView,
      path: '/list/GSFJ',
      name: 'GSFJ',
      redirect: {name:'Phonelist_GSFJ'},
      meta: { title: '工商分局', permission: [ 'GSFJ' ] },
      children:[
        {       
          path: '/list/UserPhonelist/146',
          name: 'Phonelist_GSFJ',
          component: () => import('@/views/list/UserPhonelist'),
          meta: { title: '通信录', permission: [ 'GSFJ' ] }
        }
      ]
    },  
    {
      component: RouteView,
      path: '/list/GHFJ',
      name: 'GHFJ',
      redirect: {name:'Phonelist_GHFJ'},
      meta: { title: '规划分局', permission: [ 'GHFJ' ] },
      children:[
        {       
          path: '/list/UserPhonelist/147',
          name: 'Phonelist_GHFJ',
          component: () => import('@/views/list/UserPhonelist'),
          meta: { title: '通信录', permission: [ 'GHFJ' ] }
        }
      ]
    },  
    {
      component: RouteView,
      path: '/list/GTFJ',
      name: 'GTFJ',
      redirect: {name:'Phonelist_GTFJ'},
      meta: { title: '国土分局', permission: [ 'GTFJ' ] },
      children:[
        {       
          path: '/list/UserPhonelist/148',
          name: 'Phonelist_GTFJ',
          component: () => import('@/views/list/UserPhonelist'),
          meta: { title: '通信录', permission: [ 'GTFJ' ] }
        }
      ]
    },  
    {
      component: RouteView,
      path: '/list/HBFJ',
      name: 'HBFJ',
      redirect: {name:'Phonelist_HBFJ'},
      meta: { title: '环保分局', permission: [ 'HBFJ' ] },
      children:[
        {       
          path: '/list/UserPhonelist/149',
          name: 'Phonelist_HBFJ',
          component: () => import('@/views/list/UserPhonelist'),
          meta: { title: '通信录', permission: [ 'HBFJ' ] }
        }
      ]
    },  
    {
      component: RouteView,
      path: '/list/JJDD',
      name: 'JJDD',
      redirect: {name:'Phonelist_JJDD'},
      meta: { title: '交警大队', permission: [ 'JJDD' ] },
      children:[
        {       
          path: '/list/UserPhonelist/150',
          name: 'Phonelist_JJDD',
          component: () => import('@/views/list/UserPhonelist'),
          meta: { title: '通信录', permission: [ 'JJDD' ] }
        }
      ]
    },  
    {
      component: RouteView,
      path: '/list/XFDD',
      name: 'XFDD',
      redirect: {name:'Phonelist_XFDD'},
      meta: { title: '消防大队', permission: [ 'XFDD' ] },
      children:[
        {       
          path: '/list/UserPhonelist/151',
          name: 'Phonelist_XFDD',
          component: () => import('@/views/list/UserPhonelist'),
          meta: { title: '通信录', permission: [ 'XFDD' ] }
        }
      ]
    }      
  ]
},
{
  path: '/list/QXZ_XT',
  name: 'QXZ_XT',
  component: PageView,
  meta: { title: '区乡镇系统', icon: 'dashboard', permission: [ 'QXZ_XT' ] },
  children: [
    {
      component: RouteView,
      path: '/list/LSZ',
      name: 'LSZ',
      redirect: {name:'Phonelist_LSZ'},
      meta: { title: '罗市镇', permission: [ 'LSZ' ] },
      children:[
        {        
          path: '/list/UserPhonelist/70',
          name: 'Phonelist_LSZ',
          component: () => import('@/views/list/UserPhonelist'),
          meta: { title: '通信录', permission: [ 'LSZ' ] }
        }
      ]
    },  
    {
      component: RouteView,
      path: '/list/YXZJD',
      name: 'YXZJD',
      redirect: {name:'Phonelist_YXZJD'},
      meta: { title: '雨溪镇街道', permission: [ 'YXZJD' ] },
      children:[
        {        
          path: '/list/UserPhonelist/71',
          name: 'Phonelist_YXZJD',
          component: () => import('@/views/list/UserPhonelist'),
          meta: { title: '通信录', permission: [ 'YXZJD' ] }
        }
      ]
    },  
    {
      component: RouteView,
      path: '/list/TJJD',
      name: 'TJJD',
      redirect: {name:'Phonelist_TJJD'},
      meta: { title: '檀江街道', permission: [ 'TJJD' ] },
      children:[
        {       
          path: '/list/UserPhonelist/72',
          name: 'Phonelist_TJJD',
          component: () => import('@/views/list/UserPhonelist'),
          meta: { title: '通信录', permission: [ 'TJJD' ] }
        }
      ]
    },  
    {
      component: RouteView,
      path: '/list/XYLJD',
      name: 'XYLJD',
      redirect: {name:'Phonelist_XYLJD'},
      meta: { title: '学院路街道', permission: [ 'XYLJD' ] },
      children:[
        {       
          path: '/list/UserPhonelist/73',
          name: 'Phonelist_XYLJD',
          component: () => import('@/views/list/UserPhonelist'),
          meta: { title: '通信录', permission: [ 'XYLJD' ] }
        }
      ]
    },  
    {
      component: RouteView,
      path: '/list/HJNZJD',
      name: 'HJNZJD',
      redirect: {name:'Phonelist_HJNZJD'},
      meta: { title: '火车南站街道', permission: [ 'HJNZJD' ] },
      children:[
        {       
          path: '/list/UserPhonelist/74',
          name: 'Phonelist_HJNZJD',
          component: () => import('@/views/list/UserPhonelist'),
          meta: { title: '通信录', permission: [ 'HJNZJD' ] }
        }
      ]
    },  
    {
      component: RouteView,
      path: '/list/CNJD',
      name: 'CNJD',
      redirect: {name:'Phonelist_CNJD'},
      meta: { title: '城南街道', permission: [ 'CNJD' ] },
      children:[
        {       
          path: '/list/UserPhonelist/75',
          name: 'Phonelist_CNJD',
          component: () => import('@/views/list/UserPhonelist'),
          meta: { title: '通信录', permission: [ 'CNJD' ] }
        }
      ]
    },  
    {
      component: RouteView,
      path: '/list/CYJD',
      name: 'CYJD',
      redirect: {name:'Phonelist_CYJD'},
      meta: { title: '翠园街道', permission: [ 'CYJD' ] },
      children:[
        {       
          path: '/list/UserPhonelist/76',
          name: 'Phonelist_CYJD',
          component: () => import('@/views/list/UserPhonelist'),
          meta: { title: '通信录', permission: [ 'CYJD' ] }
        }
      ]
    },  
    {
      component: RouteView,
      path: '/list/BCYJD',
      name: 'BCYJD',
      redirect: {name:'Phonelist_BCYJD'},
      meta: { title: '百春园街道', permission: [ 'BCYJD' ] },
      children:[
        {       
          path: '/list/UserPhonelist/77',
          name: 'Phonelist_BCYJD',
          component: () => import('@/views/list/UserPhonelist'),
          meta: { title: '通信录', permission: [ 'BCYJD' ] }
        }
      ]
    },  
    {
      component: RouteView,
      path: '/list/CXJD',
      name: 'CXJD',
      redirect: {name:'Phonelist_CXJD'},
      meta: { title: '城西街道', permission: [ 'CXJD' ] },
      children:[
        {       
          path: '/list/UserPhonelist/78',
          name: 'Phonelist_CXJD',
          component: () => import('@/views/list/UserPhonelist'),
          meta: { title: '通信录', permission: [ 'CXJD' ] }
        }
      ]
    },  
    {
      component: RouteView,
      path: '/list/CBL',
      name: 'CBL',
      redirect: {name:'Phonelist_CBL'},
      meta: { title: '城北路', permission: [ 'CBL' ] },
      children:[
        {       
          path: '/list/UserPhonelist/79',
          name: 'Phonelist_CBL',
          component: () => import('@/views/list/UserPhonelist'),
          meta: { title: '通信录', permission: [ 'CBL' ] }
        }
      ]
    },  
    {
      component: RouteView,
      path: '/list/ZXLJD',
      name: 'ZXLJD',
      redirect: {name:'Phonelist_ZXLJD'},
      meta: { title: '中心路街道', permission: [ 'ZXLJD' ] },
      children:[
        {       
          path: '/list/UserPhonelist/80',
          name: 'Phonelist_ZXLJD',
          component: () => import('@/views/list/UserPhonelist'),
          meta: { title: '通信录', permission: [ 'ZXLJD' ] }
        }
      ]
    },  
    {
      component: RouteView,
      path: '/list/HQLJD',
      name: 'HQLJD',
      redirect: {name:'Phonelist_HQLJD'},
      meta: { title: '红旗路街道', permission: [ 'HQLJD' ] },
      children:[
        {       
          path: '/list/UserPhonelist/81',
          name: 'Phonelist_HQLJD',
          component: () => import('@/views/list/UserPhonelist'),
          meta: { title: '通信录', permission: [ 'HQLJD' ] }
        }
      ]
    },  
    {
      component: RouteView,
      path: '/list/CEX',
      name: 'CEX',
      redirect: {name:'Phonelist_CEX'},
      meta: { title: '蔡锷乡', permission: [ 'CEX' ] },
      children:[
        {       
          path: '/list/UserPhonelist/82',
          name: 'Phonelist_CEX',
          component: () => import('@/views/list/UserPhonelist'),
          meta: { title: '通信录', permission: [ 'CEX' ] }
        }
      ]
    },  
    {
      component: RouteView,
      path: '/list/BQX',
      name: 'BQX',
      redirect: {name:'Phonelist_BQX'},
      meta: { title: '板桥乡', permission: [ 'BQX' ] },
      children:[
        {       
          path: '/list/UserPhonelist/83',
          name: 'Phonelist_BQX',
          component: () => import('@/views/list/UserPhonelist'),
          meta: { title: '通信录', permission: [ 'BQX' ] }
        }
      ]
    }            
  ]
},
{
  path: '/list/QT',
  name: 'QT',   
  redirect: {name:'Phonelist_QT'},
  component: PageView,
  meta: { title: '其他', icon: 'dashboard',  permission: [ 'QT' ]},
  children: [
    {
      path: '/list/UserPhonelist/163',          
      name: 'Phonelist_QT',
      component: () => import('@/views/list/UserPhonelist'),
      meta: { title: '无分类联系人', permission: [ 'QT' ]}
    },
  ]
},


  {
    path: '/DepartmentManager',
    name: 'DepartmentManager',
    redirect: '/Department/manager',
    component: PageView,
    meta: { title: '管理', icon: 'dashboard', permission: [ 'Admin' ] },
    children: [
      {      
            path: '/CMCCSend/send',
            name: 'CMCCSend',
            component: () => import('@/views/list/modules/sendSMS/cmccSendSms'),
            meta: { title: '移动发短信' , permission: [ 'Admin' ] }
      },
      {
        path: '/Department/manager',
        name: 'Department',
        component: () => import('@/views/list/Department'),
        meta: { title: '部门管理', permission: [ 'Admin' ] }
      },
      {
        path: '/list/uploadUserlist',
        name: 'UploadUserlist',
        component: () => import('@/views/list/UploadUserlist'),
        meta: { title: '联系人批量导入', permission: [ 'Admin' ] }
      },
      // {
      //   path: '/list/old-permission',
      //   name: 'old-permission',
      //   component: () => import('@/views/list/oldPermissionList'),
      //   meta: { title: '原版权限管理', permission: [ 'Admin' ] }
      // },
      {
        path: '/list/user-list',
        name: 'UserList',
        component: () => import('@/views/list/UserList'),
        meta: { title: '用户管理', permission: [ 'Admin' ] }
      },
      {
        path: '/list/role-list',
        name: 'RoleList',
        component: () => import('@/views/list/RoleList'),
        meta: { title: '角色管理', permission: [ 'Admin' ] }
      },
      {
        path: '/list/permission-list',
        name: 'PermissionList',
        component: () => import('@/views/list/PermissionList'),
        meta: { title: '部门类别管理', permission: [ 'Admin' ] }
      },
    ]
  },  
  // {
  //   path:'/view',
  //   name: 'deplistview',
  //   component: PageView,
  //   redirect: '/view/list',
  //   meta: { title: '列表', icon: 'slack' },
  //   children:[
  //     {
  //       path:'/view/list',
  //       name: 'Deplist',
  //       component: () => import('@/views/other/TreeList'),
  //       meta: { title: '部门列表', icon: 'slack',keepAlive: true  },

  //     }
  //   ]
  // },
    // other
    // {
    //   path: '/other',
    //   name: 'otherPage',
    //   component: PageView,
    //   meta: { title: '其他组件', icon: 'slack' },
    //   redirect: '/other/icon-selector',
    //   children: [
        // {
        //   path: '/other/icon-selector',
        //   name: 'TestIconSelect',
        //   component: () => import('@/views/other/IconSelectorView'),
        //   meta: { title: 'IconSelector', icon: 'tool', keepAlive: true }
        // },
        // {
        //   path: '/other/list',
        //   component: RouteView,
        //   meta: { title: '业务布局', icon: 'layout' },
        //   redirect: '/other/list/tree-list',
        //   children: [
        //     {
        //       path: '/other/list/tree-list',
        //       name: 'TreeList',
        //       component: () => import('@/views/other/TreeList'),
        //       meta: { title: '树目录表格', keepAlive: true }
        //     }
           
        //   ]
        // }
    //   ]
    // }
  ]
 }]
    return res
}
//旧的路由表
export const asyncRouterMap = [

  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: '首页' },
    redirect: '/dashboard/analysis',
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        redirect: '/dashboard/analysis',
        component: RouteView,
        meta: { title: '首页', icon: 'dashboard' },
        children: [
          {
            path: '/dashboard/analysis',
            name: 'Analysis',
            component: () => import('@/views/dashboard/Analysis'),
            meta: { title: '工作台' }
          }       
        ]
      },
    {
      path: '/list/QW',
      name: 'QW',   
      redirect: {name:'Phonelist_QW'},
      component: PageView,
      meta: { title: '区委', icon: 'dashboard', permission: [ 'QW' ] },
      children: [
        {
          path: '/list/UserPhonelist/QW',          
          name: 'Phonelist_QW',
          component: () => import('@/views/list/UserPhonelist'),
          meta: { title: '通信录', permission: [ 'QW' ] }
        }
      ]
    },
    {
      path: '/list/QSHFZBZXT',
      name: 'QSHFZBZXT',   
      redirect: {name:'Phonelist_QSHFZBZXT'},
      component: PageView,
      meta: { title: '区社会发展与保障系统', icon: 'dashboard', permission: [ 'QSHFZBZXT' ] },
      children: [
        {
          path: '/list/UserPhonelist/QTJJ',          
          name: 'Phonelist_QTJJ',        
          component: () => import('@/views/list/UserPhonelist'),
          meta: { title: '区统计局',},       
          children: [
            {
              path: '/list/UserPhonelist/QW',          
              name: 'Phonelist_QTJJ',
              component: () => import('@/views/list/UserPhonelist'),
              meta: { title: '通信录', permission: [ 'QW' ] }
            },      
            {
              path: '/list/UserPhonelist/QW',          
              name: 'Phonelist_QTJJ',
              component: () => import('@/views/list/UserPhonelist'),
              meta: { title: '自定义通讯录', permission: [ 'QW' ] }
            },       
          ]
        }
      ]
    },
      {
        path: '/list/QRD',
        name: 'QRD',
        redirect: {name:'Phonelist_QRD'},
        component: PageView,
        meta: { title: '区人大常委会', icon: 'dashboard', permission: [ 'QRD' ] },
        children: [
          {
            path: '/list/UserPhonelist/QRD',
            name: 'Phonelist_QRD',
            component: () => import('@/views/list/UserPhonelist'),
            meta: { title: '通信录', permission: [ 'QRD' ] }
          }
        ]
      },   
      {
        path: '/list/QXZ_XT',
        name: 'QXZ_XT',
        redirect: {name:'Phonelist_QLSZ'},
        component: PageView,
        meta: { title: '区乡镇系统', icon: 'dashboard', permission: [ 'QXZ_XT' ] },
        children: [
          {
            path: '/list/UserPhonelist/LSZ',
            name: 'Phonelist_QLSZ',
            component: () => import('@/views/list/UserPhonelist'),
            meta: { title: '罗市镇' }
          }
        ]
      }, 
      {
        path: '/DepartmentManager',
        name: 'DepartmentManager',
        redirect: '/Department/manager',
        component: PageView,
        meta: { title: '管理', icon: 'dashboard', permission: [ 'Admin' ] },
        children: [
          {
            path: '/Department/manager',
            name: 'Department',
            component: () => import('@/views/list/Department'),
            meta: { title: '部门管理', permission: [ 'Admin' ] }
          },
          {
            path: '/list/user-list',
            name: 'UserList',
            component: () => import('@/views/list/UserList'),
            meta: { title: '用户管理', permission: [ 'Admin' ] }
          },
          {
            path: '/list/role-list',
            name: 'RoleList',
            component: () => import('@/views/list/RoleList'),
            meta: { title: '角色管理', permission: [ 'Admin' ] }
          },
          {
            path: '/list/permission-list',
            name: 'PermissionList',
            component: () => import('@/views/list/PermissionList'),
            meta: { title: '部门类别管理', permission: [ 'Admin' ] }
          },
        ]
      },  
      {
  path: '/myform',
  redirect: '/myform/basic-form',
  component: PageView,
  meta: { title: '自定义组', icon: 'form'  },//区人大permission
  children: [
    {
      path: '/myform/base-form',
      name: 'BaseForm',
      component: () => import('@/views/form/BasicForm'),
      meta: { title: '管理组' }
    },
    {
      path: '/myform/step-form',
      name: 'StepForm',
      component: () => import('@/views/form/stepForm/StepForm'),
      meta: { title: '分步表单' }
    },
    {
      path: '/myform/advanced-form',
      name: 'AdvanceForm',
      component: () => import('@/views/form/advancedForm/AdvancedForm'),
      meta: { title: '高级表单' }
      }
    ]
},
    
      {
        path: '/list',
        name: 'list',
        component: PageView,
        redirect: '/list/query-list',
        meta: { title: 'guanli2', icon: 'table', },
        children: [
          {
            path: '/list/query-list',
            name: 'QueryList',
            component: () => import('@/views/list/TableList'),
            meta: { title: '查询表格', permission: [ 'Admin' ] }
          },
          {
            path: '/list/edit-table',
            name: 'EditList',
            component: () => import('@/views/list/TableInnerEditList'),
            meta: { title: '内联编辑表格', permission: [ 'Admin' ] }
          },
          {
            path: '/list/user-list',
            name: 'UserList',
            component: () => import('@/views/list/UserList'),
            meta: { title: '用户管理', permission: [ 'Admin' ] }
          },
          {
            path: '/list/role-list',
            name: 'RoleList',
            component: () => import('@/views/list/RoleList'),
            meta: { title: '角色管理', permission: [ 'Admin' ] }
          },
          {
            path: '/list/permission-list',
            name: 'PermissionList',
            component: () => import('@/views/list/PermissionList'),
            meta: { title: '权限管理', permission: [ 'Admin' ] }
          },
          {
            path: '/list/basic-list',
            name: 'BasicList',
            component: () => import('@/views/list/StandardList'),
            meta: { title: '标准列表', permission: [ 'Admin' ] }
          },
          {
            path: '/list/card',
            name: 'CardList',
            component: () => import('@/views/list/CardList'),
            meta: { title: '卡片列表', permission: [ 'Admin' ] }
          },
          {
            path: '/list/search',
            name: 'SearchList',
            component: () => import('@/views/list/search/SearchLayout'),
            redirect: '/list/search/article',
            meta: { title: '搜索列表', permission: [ 'table' ] },
            children: [
              {
                path: '/list/search/article',
                name: 'SearchArticles',
                component: () => import('../views/list/TableList'),
                meta: { title: '搜索列表（文章）', permission: [ 'table' ] }
              },
              {
                path: '/list/search/project',
                name: 'SearchProjects',
                component: () => import('../views/list/TableList'),
                meta: { title: '搜索列表（项目）', permission: [ 'table' ] }
              },
              {
                path: '/list/search/application',
                name: 'SearchApplications',
                component: () => import('../views/list/TableList'),
                meta: { title: '搜索列表（应用）', permission: [ 'table' ] }
              },
            ]
          },
        ]
      },

      // profile
      {
        path: '/profile',
        name: 'profile',
        component: RouteView,
        redirect: '/profile/basic',
        meta: { title: '详情页', icon: 'profile', permission: [ 'profile' ] },
        children: [
          {
            path: '/profile/basic',
            name: 'ProfileBasic',
            component: () => import('@/views/profile/basic/Index'),
            meta: { title: '基础详情页', permission: [ 'profile' ] }
          },
          {
            path: '/profile/advanced',
            name: 'ProfileAdvanced',
            component: () => import('@/views/profile/advanced/Advanced'),
            meta: { title: '高级详情页', permission: [ 'profile' ] }
          }
        ]
      },

      // result
      {
        path: '/result',
        name: 'result',
        component: PageView,
        redirect: '/result/success',
        meta: { title: '结果页', icon: 'check-circle-o', permission: [ 'result' ] },
        children: [
          {
            path: '/result/success',
            name: 'ResultSuccess',
            component: () => import(/* webpackChunkName: "result" */ '@/views/result/Success'),
            meta: { title: '成功', hiddenHeaderContent: true, permission: [ 'result' ] }
          },
          {
            path: '/result/fail',
            name: 'ResultFail',
            component: () => import(/* webpackChunkName: "result" */ '@/views/result/Error'),
            meta: { title: '失败', hiddenHeaderContent: true, permission: [ 'result' ] }
          }
        ]
      },

      // Exception
      {
        path: '/exception',
        name: 'exception',
        component: RouteView,
        redirect: '/exception/403',
        meta: { title: '异常页', icon: 'warning', permission: [ 'exception' ] },
        children: [
          {
            path: '/exception/403',
            name: 'Exception403',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/403'),
            meta: { title: '403', permission: [ 'exception' ] }
          },
          {
            path: '/exception/404',
            name: 'Exception404',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404'),
            meta: { title: '404', permission: [ 'exception' ] }
          },
          {
            path: '/exception/500',
            name: 'Exception500',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/500'),
            meta: { title: '500', permission: [ 'exception' ] }
          }
        ]
      },

      // account
      {
        path: '/account',
        component: RouteView,
        name: 'account',
        meta: { title: '个人页', icon: 'user', keepAlive: true, permission: [ 'user' ] },
        children: [
          {
            path: '/account/center',
            name: 'center',
            component: () => import('@/views/account/center/Index'),
            meta: { title: '个人中心', keepAlive: true, permission: [ 'user' ] }
          },
          {
            path: '/account/settings',
            name: 'settings',
            component: () => import('@/views/account/settings/Index'),
            meta: { title: '个人设置', hideHeader: true, keepAlive: true, permission: [ 'user' ]  },
            redirect: '/account/settings/base',
            alwaysShow: true,
            children: [
              {
                path: '/account/settings/base',
                name: 'BaseSettings',
                component: () => import('@/views/account/settings/BaseSetting'),
                meta: { title: '基本设置', hidden: true, keepAlive: true, permission: [ 'user' ]  }
              },
              {
                path: '/account/settings/security',
                name: 'SecuritySettings',
                component: () => import('@/views/account/settings/Security'),
                meta: { title: '安全设置', hidden: true, keepAlive: true, permission: [ 'user' ]  }
              },
              {
                path: '/account/settings/custom',
                name: 'CustomSettings',
                component: () => import('@/views/account/settings/Custom'),
                meta: { title: '个性化设置', hidden: true, keepAlive: true, permission: [ 'user' ]  }
              },
              {
                path: '/account/settings/binding',
                name: 'BindingSettings',
                component: () => import('@/views/account/settings/Binding'),
                meta: { title: '账户绑定', hidden: true, keepAlive: true, permission: [ 'user' ]  }
              },
              {
                path: '/account/settings/notification',
                name: 'NotificationSettings',
                component: () => import('@/views/account/settings/Notification'),
                meta: { title: '新消息通知', hidden: true, keepAlive: true, permission: [ 'user' ]  }
              },
            ]
          },
        ]
      },
      
    ]
  },
  {
    path: '*', redirect: '/404', hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Register')
      },
      {
        path: 'register-result',
        name: 'registerResult',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/RegisterResult')
      }
    ]
  },

  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  },

]
