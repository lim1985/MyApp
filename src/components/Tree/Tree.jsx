import { Menu, Icon, Input } from 'ant-design-vue'


const { Item, ItemGroup, SubMenu } = Menu
const { Search } = Input

export default {
  name: 'Tree',
  props: {
    dataSource: {
      type: Array,
      required: true
    },
    openKeys: {
      type: Array,
      default: () => []
    },
    search: {
      type: Boolean,
      default: false
    },
    addgroup: {
      type: Boolean,
      default: false
    }
  },
  created () {
    this.localOpenKeys = this.openKeys.slice(0)
    console.log(this.localOpenKeys)
    // DEPID:this.$route.fullPath.split('/')
    // console.log(this.$route.fullPath.split('/'))
  
  },
  data () {
    return {
      localOpenKeys: [],
     
     
    }
  },
  methods: {
    handleAddGroup(){
     let _depid=this.$route.fullPath.split('/')[3];
     let _key=this.$route.meta.permission[0];  
     let _obj={
       DepID:_depid,
       Key:_key
     }
      this.$emit('addGroup',_obj);
    },
    handlePlus (item) {
      item.depid=this.$route.fullPath.split('/')[3]
      this.$emit('add', item)
    },
    handleTitleClick (...args) {
      this.$emit('titleClick', { args })
    },
   
    handleMinu(item)
    {    
      item.depid=this.$route.fullPath.split('/')[3]
      this.$emit('minu', item)
    },

    renderSearch () {
      return (
        <Search
          placeholder="input search text"
          style="width: 100%; margin-bottom: 1rem"
        />
      )
    },
    renderAddGroup() {
      return (
        <div><a-button {...{on:{click:()=>this.handleAddGroup()}}} type="primary" block>添加自定义组</a-button><br/></div>     
      )
    },
    renderminusGroup(item){
      return (   
     <a class="btn" style="left: 0px !important;"><a-button {...{on:{click:()=>this.handleMinu(item)}}}  type="danger" size="small">删除</a-button></a>
     
         )
    },//删除组操作
    renderIcon (icon) {
      return icon && (<Icon type={icon} />) || null
    },
   
    renderMenuItem (item) {
      return (
        <Item style="padding-left:35px;" key={item.key}>
     
          { this.renderIcon(item.icon) }
          { this.renderminusGroup(item) }
          { item.title }
          <a class="btn" style="width: 20px;z-index:1300" {...{ on: { click: () => this.handlePlus(item) } }}>
          <a-icon type="plus"/>         
            </a>
        </Item>
      )
    },
    // <a-icon type="plus"/>
    renderItem (item) {
      return item.children ? this.renderSubItem(item, item.key) : this.renderMenuItem(item, item.key)
    },
    renderItemGroup (item) {
      const childrenItems = item.children.map(o => {
        return this.renderItem(o, o.key)
      })

      return (
        <ItemGroup key={item.key}>
          <template slot="title">
            <span>{ item.title }</span>
            <a-dropdown>
              <a class="btn"><a-icon type="ellipsis" /></a>
              <a-menu slot="overlay">
                <a-menu-item key="1">新增</a-menu-item>
                <a-menu-item key="2">合并</a-menu-item>
                <a-menu-item key="3">移除</a-menu-item>
              </a-menu>
            </a-dropdown>
          </template>
          { childrenItems }
        </ItemGroup>
      )
    },
    renderSubItem (item, key) {
      const childrenItems = item.children && item.children.map(o => {
        return this.renderItem(o, o.key)
      })

      const title = (
        <span slot="title">
          { this.renderIcon(item.icon) }
          <span>{ item.title }</span>
        </span>
      )

      if (item.group) {
        return this.renderItemGroup(item)
      }
      // titleClick={this.handleTitleClick(item)}
      return (
        <SubMenu key={key}>
          { title }
          { childrenItems }
        </SubMenu>
      )
    }
  },
  render () {
    const { dataSource, search, addgroup } = this.$props

    // this.localOpenKeys = openKeys.slice(0)
    const list = dataSource.map(item => {
      return this.renderItem(item)
    })

    return (
      <div class="tree-wrapper">
        { addgroup ? this.renderAddGroup():null}
        { search ? this.renderSearch() : null }
        <Menu mode="inline" class="custom-tree" {...{ on: { click: item => this.$emit('click', item), 'update:openKeys': val => { this.localOpenKeys = val } } }} openKeys={this.localOpenKeys}>
          { list }
        </Menu>
      </div>
    )
  }

}
