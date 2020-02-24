<template>
  <div class="user-wrapper">
    <span class="action">
      <!-- <a-icon type="mail"></a-icon> -->
      短信余额：{{ smscount()+'条' }}
      
    </span>
    <span class="action">
      <a-icon type="question-circle-o"></a-icon>
    </span>  
    <header-notice class="action"/>
    <a-dropdown>
      <span class="action ant-dropdown-link user-dropdown-menu">
        <a-avatar class="avatar" size="small" :src="avatar()"/>
        <span>{{ nickname() }}</span>
      </span>
      <a-menu slot="overlay" class="user-dropdown-menu-wrapper">
        <a-menu-item key="0">
          <router-link :to="{ name: 'center' }">
            <a-icon type="user"/>
            <span>个人中心</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="1">
          <router-link :to="{ name: 'settings' }">
            <a-icon type="setting"/>
            <span>账户设置</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="2" disabled>
          <a-icon type="setting"/>
          <span>测试</span>
        </a-menu-item>
        <a-menu-divider/>
        <a-menu-item key="3">
          <a href="javascript:;" @click="handleLogout">
            <a-icon type="logout"/>
            <span>退出登录</span>
          </a>
        </a-menu-item>
      </a-menu>
    </a-dropdown>
  </div>
</template>

<script>
  import HeaderNotice from './HeaderNotice'
  import { mapActions, mapGetters } from 'vuex'

  export default {
    name: "UserMenu",
    components: {
      HeaderNotice
    },
    methods: {     
      ...mapActions(["Logout"]),
      ...mapGetters(["nickname", "avatar","smscount"]),
      handleLogout() {
        const that = this
        const hostName=location.hostname;
        const Port=location.port;
        this.$confirm({
          title: '提示',
          content: '真的要注销登录吗 ?',
          onOk() {
            return that.Logout({}).then(() => {
              console.log(window.location)
          
          if(Port)
          {
              window.location="http://"+hostName+":"+Port;
              return ;
          }
               window.location="http://"+hostName;
            
              // window.location.reload()

            }).catch(err => {
              that.$message.error({
                title: '错误',
                description: err.message
              })
            })
          },
          onCancel() {
          },
        });
      },
    }
  }
</script>

<style scoped>

</style>