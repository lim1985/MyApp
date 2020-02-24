<template>
  <page-layout 
    :desc="description" 
    :title="getTitle" 
    :link-list="linkList" 
    :search="search" 
    :tabs="tabs" 
    @ischange="ok" 
    :showDepListSearch="showDepListSearch">
    <div slot="extra" class="extra-img">
      <img :src="extraImage"/>
    </div>
    <!-- keep-alive  -->
    <route-view ref="content"></route-view>
   
  </page-layout>
</template>

<script>
  import PageLayout from '../page/PageLayout'
  import RouteView from './RouteView'
  // import GlobalSearch from '@views/list/search/GlobalSearch'

  export default {
    name: "PageContent",
    components: {
      RouteView,
      PageLayout,
      // GlobalSearch
    },
    data () {
      return {
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
    },
    created(){
     
    },
    mounted () {
        this.getPageHeaderInfo()
     
    },
    updated () {
      console.log('调用了pageview的update')
      this.getPageHeaderInfo()
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
  
      ok(val){
          console.log('送上来的是'+`${val}`)
            const content = this.$refs.content && this.$refs.content.$children[0]
            content.ok(val);          
            // this.$emit('toSearch',val);               
      },
      getPageHeaderInfo () {
        // eslint-disable-next-line
        this.title = this.$route.meta.title     
        // // console.log(this.$route.meta.permission[0] ) 
        //   if(this.$route.meta.permission[0]||!this.$route.meta.permission[0]=='Admin')
        //   {
        //      this.$store.commit('SET_DEPKEY',this.$route.meta.permission[0]);
        //   }
        // this.depkey= this.$route.meta.permission[0]  
        // if(this.depkey)
        // {
        //    this.$store.commit('SET_DEPKEY',this.depkey);
        // }
        // console.log(this.depkey)
        //  console.log(this.title)        
        // 因为套用了一层 route-view 所以要取 ref 对象下的子节点的第一个对象
        const content = this.$refs.content && this.$refs.content.$children[0]       
        if (content)
        {
          console.log(content.search);
          this.description = content.description
          this.linkList = content.linkList
          this.extraImage = content.extraImage
          this.search = content.search == true ? true : false
          this.tabs = content.tabs
          this.showDepListSearch = content.showDepListSearch == true ? true : false
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