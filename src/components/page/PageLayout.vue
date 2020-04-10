<template>
  <div :style="!$route.meta.pageHeader ? 'margin: -24px -24px 0px;' : null">
    <!-- pageHeader , route meta hideHeader:true on hide -->
    <page-header v-if="!$route.meta.pageHeader" :title="title" :logo="logo" :avatar="avatar">
      <slot slot="action" name="action"></slot>
      <slot slot="content" name="headerContent"></slot>
      <div slot="content" v-if="!this.$slots.headerContent && desc">
        <p style="font-size: 14px;color: rgba(0,0,0,.65)">{{ desc }}</p>
        <div class="link">
          <template v-for="(link, index) in linkList">
            <a :key="index" :href="link.href">
              <a-icon :type="link.icon"/>
              <span>{{ link.title }}</span>
              <span>{{ depkey }}</span>
            </a>
          </template>
        </div>
      </div>
      <slot slot="extra" name="extra"></slot>
      <div slot="pageMenu">
        <div class="page-menu-search" v-if="search">
          <div>
            <a-input-search style="width:60%; max-width: 522px;" @change="Search" placeholder="请输入联系人姓名或者手机号..." size="large" enterButton="搜索" />
          </div>
          <div v-if="showDepListSearch" style="width:60%; max-width: 522px;" class="ant-input-affix-wrapper ant-input-affix-wrapper-lg ant-input-search ant-input-search-enter-button ant-input-search-large">
            <div class="ant-input-affix-wrapper ant-input-affix-wrapper-sm ant-input-search ant-input-search-enter-button ant-input-search-large" style="padding-top:8px;width:38%;min-width:512px">
              <ul style="padding-inline-start:10px;" class="search-list" >    
                <li v-for="(item,index) in Deplists" @click="GetDep(item)" :key="index" class="global-search-item">{{ item.Depname }}</li>  
                <!-- <li class="global-search-item">侠岚{{ showDepListSearch }}</li>
                <li class="global-search-item">夏朗{{ Deplists }}</li> -->
                <!-- <li class="global-search-item">下拉菜单怎么设置{{ Deplists }}</li> -->
            
                
              </ul>          
            </div>   
          </div>     
        </div>              
        <!-- <ul style="width: 80%; max-width: 522px;" class="ant-input-affix-wrapper ant-input-affix-wrapper-lg ant-input-search ant-input-search-enter-button ant-input-search-large">
         
            <div class="search-list  ant-input ant-input-lg">
                <li class="global-search-item">
                 <span class="global-search-item-desc">
            大祥区人社局
            </span>
            </li>
                   <li class="global-search-item">
                 <span class="global-search-item-desc">
            大祥区发改局
            </span>
            </li>
            </div>
          </ul> -->
        <div class="page-menu-tabs" v-if="tabs && tabs.items">
          <!-- @change="callback" :activeKey="activeKey" -->
          <a-tabs :tabBarStyle="{margin: 0}" @change="tabs.callback" :activeKey="tabs.active()">
            <a-tab-pane v-for="item in tabs.items" :tab="item.title" :key="item.key"></a-tab-pane>
          </a-tabs>
        </div>
      </div>
    </page-header>
    <div class="content">
      <div :class="['page-header-index-wide']">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
  import PageHeader from './PageHeader'
  import _ from 'lodash'
  export default {
    name: "LayoutContent",
    components: {
      PageHeader
    },
    // ['desc', 'logo', 'title', 'avatar', 'linkList', 'extraImage']
    props: {
      depkey:{
        type:String,
        default:null
      },
      desc: {
        type: String,
        default: null
      },
      logo: {
        type: String,
        default: null
      },
      title: {
        type: String,
        default: null
      },
      avatar: {
        type: String,
        default: null
      },
      
      Deplists: {
        type: Array,
        default: null
      },
      linkList: {
        type: Array,
        default: null
      },
      extraImage: {
        type: String,
        default: null
      },
      search: {
        type: Boolean,
        default: false
      },
      showDepListSearch:{
        type: Boolean,
        default: false
      },
      tabs: {
        type: Object,
        default: () => {}
      }
    },
    //  data () {
    //   return {       
    //     showDepListSearch:false             
    //   }
    // },
    // computed:{
    //   DepList(){
    //     return this.Deplists
    //   }
    // },
    watch:{
    //    'Deplists': function (val, oldVal) {
    //   console.log(val, oldVal,(val== oldVal))
    // },

      // Deplists(newval,oldval)
      // {
      //   console.log(newval)
      //   console.log(oldval)
      //   return newval
      // }
    },
    mounted(){
      console.log(this.showDepListSearch);
    },
    methods: {   
       GetDep(item)
        {
          console.log(item) 
           this.$emit('getDep',{val:item})        
        },
       Search:_.debounce(function(val){
       const { value} = val.target  
       console.log(value)  

       if(value)
       {                
         this.$emit('ischange',{val:value,isshow:true})       
       }
       else
       {
         this.$emit('ischange',{val:'isnull'})      
       }
      },1000),
    }
  }
</script>

<style lang="scss" scoped>
   .search-list
   {

   }
  .search-list li{
     width: 100%;
    text-align: left;
  }
  .content {
    margin: 24px 24px 0;

    .link {
      margin-top: 16px;

      &:not(:empty) {
        margin-bottom: 16px;
      }
      a {
        margin-right: 32px;
        height: 24px;
        line-height: 24px;
        display: inline-block;

        i {
          font-size: 24px;
          margin-right: 8px;
          vertical-align: middle;
        }
        span {
          height: 24px;
          line-height: 24px;
          display: inline-block;
          vertical-align: middle;
        }
      }
    }
  }
  .page-menu-search {
    text-align: center;
    margin-bottom: 16px;
  }
  .page-menu-tabs {
    margin-top: 48px;
  }
</style>