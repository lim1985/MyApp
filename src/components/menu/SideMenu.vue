<template>
  <a-layout-sider
    :class="['sider', device === 'desktop' ? null : 'shadow', theme ]"
    width="256px" 
    :collapsible="collapsible"
    v-model="collapsed" 
    :trigger="null">
    <logo />
    <s-menu
      :collapsed="collapsed"
      :menu="menus"
      :theme="theme"
      @select="onSelect"
      :mode="mode"
      style="padding: 16px 0px;"></s-menu>
  </a-layout-sider>

</template>

<script>
  import ALayoutSider from "ant-design-vue/es/layout/Sider"
  import Logo from '../tools/Logo'
  import SMenu from './index'
  import { mapState } from 'vuex'

  export default {
    name: "SideMenu",
    components: { ALayoutSider, Logo, SMenu },
    props: {
      mode: {
        type: String,
        required: false,
        default: 'inline'
      },
      theme: {
        type: String,
        required: false,
        default: 'dark'
      },
      collapsible: {
        type: Boolean,
        required: false,
        default: false
      },
      collapsed: {
        type: Boolean,
        required: false,
        default: false
      },
      menus: {
        type: Array,
        required: true
      }
    },
    created () {
      // console.log(this.menus);
    },
    computed: {
      ...mapState({
        device: state => state.app.device,
      })
    },
    methods: {
      onSelect (obj) {
        this.$emit('menuSelect', obj)
      }
    }
  }
</script>