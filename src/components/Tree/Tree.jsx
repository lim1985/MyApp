import { Menu, Icon, Input } from 'ant-design-vue'

import Validate from '@/tools/Validate/index'
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
    },
    showDepTree:{
      type: Boolean,
      default: false
    },
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
      reqCount:0
      // visible:true,
      // it:{
      //   key:1,
      //   value:1,
      //   title:'好的'
      // }
     
    }
  },
  methods: {
    async handleSearch(val){   
     const { value} = val.target       
     let _value=value
     let isok=await Validate.CheckPhoneNumAndchanese(_value)    
    
       if(isok)
       {      
         this.$emit('ReturnValue',_value);         
        // this.reqCount++        
       } 
       else if (_value=='')
       {        
         this.$emit('ReturnValue',_value);          
       }
      
    },
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
    handSelectDep({key})
    {
      console.log(`Click on item ${key}`);
    },
    renderSearch () {
      return (
        <Search
          {...{on:{change:(v)=>this.handleSearch(v)}}}
          placeholder="请输入姓名搜索 如：张三"
          style="width: 100%; margin-bottom: 1rem">
          
          </Search>
        
      )
    },
    // renderDepartmentName(){
    //   return (<Select placeholder="选择活动" style={{ width: 300 }}>
    //     <Select.Option key={this.it.id} value={this.it.id}>
    //                {this.it.title}
    //     </Select.Option>
    //     </Select>)
    // },
    renderAddGroup() {
      return (
        <div><a-button {...{on:{click:()=>this.handleAddGroup()}}} type="primary" block>添加自定义组</a-button><br/></div>     
      )
    },
    renderAddUsers(item) {
      return (
        <a class="btn" style="width: 20px;z-index:1300" {...{ on: { click: () => this.handlePlus(item) } }}>
        <a-icon type="plus"/>         
          </a>    
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
      const { addgroup } = this.$props

      return (
        <Item style="padding-left:35px;" key={item.key}>     
          { this.renderIcon(item.icon) }
          { addgroup ? this.renderminusGroup(item):null}        
          { item.title }
          { addgroup ? this.renderAddUsers(item):null}        
          
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
  //    { showDepTree ?this.renderDepartmentName():null}
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
