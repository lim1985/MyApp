<template>
  <a-locale-provider :locale="locale">
    <div id="app">
      <router-view/>
      <!-- <AppPhoneModal ref="PhoneModal"/> -->
    </div>
   
  </a-locale-provider>
 
</template>
<script>

  import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
  import enquireScreen from '@/utils/device'
  import { AppDeviceEnquire } from '@/utils/mixin'
  // import AppPhoneModal from '@/views/list/modules/PhoneMsg/Phone'
  // import Vue from 'vue'  
  import { mapState} from 'vuex'
  export default {
    mixins: [AppDeviceEnquire],
    data () {
      return {
        locale: zhCN,
      }
    },
    components: {
    //  AppPhoneModal      
    },
     computed:{
      ...mapState({
         handleID:state=>state.L_Ubox.HandleID,
         event:state=>state.L_Ubox.Event
      }),    
    },
   
    mounted(){
     this.initWS();
    
        // if(event=='hookoff')
        // {
        //   console.log(`999-999`)
        //   this.show();
        // }
        // else
        // {
        //   console.log(`77777`)
        // }
    },
    created () {
     
     
      let that = this
      enquireScreen(deviceType => {
        // tablet
        if (deviceType === 0) {
          that.$store.commit('TOGGLE_DEVICE', 'tablet')
          that.$store.commit('CLOSE_SIDEBAR', false)
        }
        // mobile
        else if (deviceType === 1) {
          that.$store.commit('TOGGLE_DEVICE', 'mobile')
          that.$store.commit('CLOSE_SIDEBAR', false)
        }
        else {
          that.$store.commit('TOGGLE_DEVICE', 'desktop')
          that.$store.commit('SET_SIDEBAR_TYPE', true)
        }

      })
    },
    methods:{
   
       initWS()
        {
      this.$LUBOX.InitWS()
    //    console.log(`00000000`)
    //  console.log(this.Myevent)
        }
    }
  }
</script>
<style>
  #app {
    height: 100%;
  }
</style>