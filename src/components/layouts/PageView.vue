<template>
  <page-layout 
    :desc="description" 
    :title="getTitle" 
    :link-list="linkList" 
    :search="search" 
    :tabs="tabs" 
    @ischange="ok" 
    @getDep="getDep"
    :Deplists="Deplists"
    :showDepListSearch="showDepListSearch">
    <!-- <s-tree
      :dataSource="DepTree"         
      :openKeys.sync="openKeys"
      :search="true"
      :addgroup="false"
      :DepsDataSource="Deplists"
      :showDeplist="showListSearch"
      @click="handleClick"
      @SearchDepslist="handleSearchDeps"
      @add="handleAdd"
      :showDepTree="true"
      @ReturnValue="GetUsersList"
      @titleClick="handleTitleClick"
    >
    </s-tree> -->
    <div slot="extra" class="extra-img">
      <img :src="extraImage"/>
    </div>
    <!-- keep-alive  -->
    <route-view ref="content"></route-view>
   
  </page-layout>
</template>

<script>
  // import STree from '@/components/Tree/Tree'
  import PageLayout from '../page/PageLayout'
  import RouteView from './RouteView'
  // import GlobalSearch from '@views/list/search/GlobalSearch'

  export default {
    name: "PageContent",
    components: {
      // STree,
      RouteView,
      PageLayout,
      // GlobalSearch
    },
      // props: {
      //   showDepListSearch:{
      //   type: Boolean,
      //   default: false
      // },
      // },
 
    data () {
      return {
        openKeys:[],
        DepTree:[],
        Deplists:[],
        showListSearch:false,
        title: '',
        description: '',
        linkList: [],
        extraImage: '',
        search: false,
        tabs: {},
        showDepListSearch:false             
      }
    },  
  
       watch:{
    
      },
      // showDepListSearch(newval,oldval)
      // {
      //   console.log(newval)
      //       console.log(oldval)
      // }
      //   search:{
      //   handler:function(val,oldval){
      //     console.log(val)
      //   },
      // deep: true,
      // immediate: true

      // },
    //   // showDepListSearch(newval){
    //   //   console.log(newval);
    //   // }
   
    created(){
     
    },
    mounted () {
      console.log(`调用了mounted 方法`)
      this.getPageHeaderInfo()
     
    },
    updated () {
      console.log('调用了pageview的update')
      this.getPageHeaderInfo()
      this.showDeplist()
    },
    computed: {
    //  ListSearch() {
    //     const content = this.$refs.content && this.$refs.content.$children[0]       
    //     if (content)
    //     {
         
    //     this.showDepListSearch = content.showDepListSearch == true ? true : false
    //     console.log(this.showDepListSearch);
    //     return this.showDepListSearch
    //     }
    // },
      getTitle() {
        return this.$route.meta.title
      }
      

    },
    methods: {
      handleClick(){},
      handleSearchDeps(){},
      handleAdd(){},
      GetUsersList(){},
      handleTitleClick(){},
      getDep(val)
      {
        console.log(`点了以后`)
        console.log(val)
         const content = this.$refs.content && this.$refs.content.$children[0]    
         content.getDep(val)
      },
     ok(val){
         console.log(val)
         const content = this.$refs.content && this.$refs.content.$children[0]    
         content.ok(val)
        // setTimeout(() => {
        //   this.showDeplist()
        // }, 500);
        // content.showDepListSearch=val.val=='isnull'?false:true   
        // this.showDeplist(content)
        //  if(val.val=='isnull')       
        //  {
        //     content.showDepListSearch=false;
        //  }
        //  else
        //  {
        //     content.showDepListSearch=true;
        //     this.Deplists=content.Deplists
        //     content.ok(val)            
        //  }
        //  this.$nextTick(function(){
        // this.showDeplist() 
        //  })                                         
      },
      showDeplist()
      {
         const content = this.$refs.content && this.$refs.content.$children[0]        
         if(content)
         {            
           console.log(content)
            this.showDepListSearch = content.showDepListSearch == true ? true : false    
            this.Deplists=content.Deplists   
            console.log(this.Deplists)   
         }
      },
      getPageHeaderInfo () {
        // eslint-disable-next-line
        this.title = this.$route.meta.title         
        // 因为套用了一层 route-view 所以要取 ref 对象下的子节点的第一个对象
        const content = this.$refs.content && this.$refs.content.$children[0]  
        console.log(content)     
        if (content)
        {
          console.log(content.search);
          this.description = content.description
          this.linkList = content.linkList
          this.extraImage = content.extraImage
          this.search = content.search == true ? true : false
          this.tabs = content.tabs
          // console.log(this.showDepListSearch);
          // console.log(this.showDepListSearch);
          // this.depkey= this.$route.meta.permission[0]     
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .extra-img {
    margin-top: -60px;
    text-align: center;
    width: 195px;

    img {
      width: 100%;
    }
  }

  .mobile {
    .extra-img{
      margin-top: 0;
      text-align: center;
      width: 96px;

      img{
        width: 100%;
      }
    }
  }
</style>