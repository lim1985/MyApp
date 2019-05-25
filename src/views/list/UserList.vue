<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-form-item label="角色ID">
              <a-input placeholder="请输入用户"/>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="状态">
              <a-select placeholder="请选择" default-value="0">
                <a-select-option value="0">全部</a-select-option>
                <a-select-option value="1">关闭</a-select-option>
                <a-select-option value="2">运行中</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <span class="table-page-search-submitButtons">
              <a-button type="primary">查询</a-button>
              <a-button style="margin-left: 8px">重置</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>
  
  
    <s-table
      size="default"
      :columns="columns"
      :data="myloadData"
    >
      <div
        slot="expandedRowRender"
        slot-scope="record"
        style="margin: 0">
        <a-row
          :gutter="24"
          :style="{ marginBottom: '12px' }">
          <a-col :span="12" v-for="(role, index) in record.permissions" :key="index" :style="{ marginBottom: '12px' }">
            <a-col :span="4">
              <span>{{ role.permissionName }}：</span>
            </a-col>
            <a-col :span="20" v-if="role.actionEntitySet.length > 0">
              <a-tag color="cyan" v-for="(action, k) in role.actionEntitySet" :key="k">{{ action.describe }}</a-tag>
            </a-col>
            <a-col :span="20" v-else>-</a-col>
          </a-col>
        </a-row>
      </div>
      <span slot="action" slot-scope="text, record">
        <a @click="MyhandEdit(record)">编辑</a>
        <a-divider type="vertical" />
        <a-dropdown>
          <a class="ant-dropdown-link">
            更多 <a-icon type="down" />
          </a>
          <a-menu slot="overlay">
            <a-menu-item>
              <a href="javascript:;">详情</a>
            </a-menu-item>
            <a-menu-item>
              <a href="javascript:;">禁用</a>
            </a-menu-item>
            <a-menu-item>
              <a href="javascript:;">删除</a>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </span>
    </s-table>

    <a-modal
      title="角色赋予"
      style="top: 220px;"
      :width="800"
      v-model="roleslist_visible"  
      @ok="handleUpdateRoles"   
    >
      <a-transfer
        :dataSource="roleslist"
        :targetKeys="targetkeys"
        @change="handleChange"     
        :listStyle="{
          width: '300px',
          height: '300px',
        }"
        :render="item=>`${item.title}-${item.discription}`"
      >
      </a-transfer>
   
    </a-modal>

    <a-modal
      title="操作"
      style="top: 220px;"
      :width="800"
      v-model="visible"
      @ok="handleOk"
    >
      <a-form :autoFormCreate="(form)=>{this.form = form}">

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label='唯一识别码'
          hasFeedback
          validateStatus='success'
        >
          <a-input placeholder='唯一识别码' v-model="mdl.id" id='no' disabled="disabled" />
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label='角色名称'
          hasFeedback
          validateStatus='success'
        >
          <a-input placeholder='起一个名字' v-model="mdl.name" id='role_name' />
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label='状态'
          hasFeedback
          validateStatus='warning'
        >
          <a-select v-model="mdl.status">
            <a-select-option value='1'>正常</a-select-option>
            <a-select-option value='2'>禁用</a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label='描述'
          hasFeedback
        >
          <a-textarea :rows="5" v-model="mdl.describe" placeholder="..." id='describe'/>
        </a-form-item>

        <a-divider />

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label='拥有权限'
          hasFeedback
        >
          <a-row :gutter="16" v-for="(permission, index) in mdl.permissions" :key="index">
            <a-col :span="4">
              {{ permission.permissionName }}：
            </a-col>
            <a-col :span="20">
              <a-checkbox-group :options="permission.actionsOptions"/>
            </a-col>
          </a-row>

        </a-form-item>

      </a-form>
    </a-modal>

  </a-card>
</template>

<script>
  import STable from '@/components/table/'
  import { getRolesList ,GetAdmininfobyID ,UpdataAdminBYID} from '@/api/manage'
//getRoleList, getServiceList,
  export default {
    name: "TableList",
    components: {
      STable
    },
    data () {
      return {
        description: '列表使用场景：后台管理中的权限管理以及角色管理，可用于基于 RBAC 设计的角色权限控制，颗粒度细到每一个操作类型。',
        roleslist_visible:false,
        visible: false,
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
        form: null,
        mdl: {},

        // 高级搜索 展开/关闭
        advanced: false,
        // 查询参数
        queryParam: {},
        // 表头
        columns: [
          {
            title: 'ID',
            dataIndex: 'AdminID'
          },
          {
            title: '用户名',
            dataIndex: 'AdminName'
          },
          {
            title: '状态',
            dataIndex: 'IsLock',
            needTotal: true,
            key:'IsLock',
            customRender: text=>{
              return text ?'锁定':'正常'           
            } 
          },
          {
            title: '创建时间',
            dataIndex: 'LastLoginTime',
            sorter: true
          }, {
            title: '操作',
            width: '150px',
            dataIndex: 'action',
            scopedSlots: { customRender: 'action' },
          }
        ],
        // 加载数据方法 必须为 Promise 对象
        // loadData: parameter => {
        //   return getRoleList(parameter)
        //     .then(res => {
        //       return res.result
        //     })
        // },
         // 加载数据方法 必须为 Promise 对象
        myloadData: parameter => {
         // console.log(parameter)
          return this.$http.get('http://172.20.8.28:3001/api/userlist', {
            params: Object.assign(parameter, this.queryParam),
           }).then(res => {     
          //   console.log(res)      
            if(res.code==-1)
            {
                this.$router.push('/login')
            }
            return  res.result
          })
        },

        selectedRowKeys: [],
        selectedRows: [],
        roleslist:[],
        targetkeys:[],
        Userinfo:{
          ID:0,
          Roles:''
        }
      }
    },
    created () {
      // getServiceList().then(res => {
      //   console.log('getServiceList.call()', res)
      // })
     
      // getRoleList().then(res => {
      //   console.log('getRoleList.call()', res)
      // })
    
    },
     mounted() {
    //  this.loadRoleslist()
  },
    methods: {
    handleUpdateRoles()
    {
        // console.log(this.targetkeys)
        // console.log(this.Userinfo.ID)
        const RolesString=this.targetkeys.join("|")
       
       if(!RolesString)
       {         
          this.$message.error('请不要提交空数据');  
          return false         
       }
        const data={
          RolesID:RolesString,
          ID:this.Userinfo.ID
        }
        UpdataAdminBYID(data).then(res=>
        {
          if(res.code==1)
          {
             this.roleslist_visible=false
             this.$message.success('角色修改成功！');  
          }
          else
          {
             
             this.$message.error('角色修改失败！');  
          }
        })

       

    // console.log(this.roleslist[0].key)
    // console.log(this.targetkeys)
    
    //  if(this.roleslist[i].key!=this.targetkeys[i])
    //   {
    //      console.log(this.roleslist[i].key==this.targetkeys[i])
    //     arr.push(this.roleslist[i].key)
    //   }
      // console.log(arr)
 
    },
       renderItem(item) {
      const customLabel = (
        <span class="custom-item">
          {item.title} - {item.discription}
        </span>
      );
      return {
        label: customLabel, // for displayed item
        value: item.title, // for title and filter matching
      };
    },
    async loadRoleslist(ID)//读取权限列表
      {
     return new Promise ((resole,reject)=>{
     //根据用户ID读取用户信息
       GetAdmininfobyID({AdminID:ID}).then(res=>{
        return res
       }).then(res=>{
        // console.log(res)
        const roles=[]   
            if(res.result.rolesid!=null)//如果用户权限ID 不等于空
            {
               roles.push(res.result.rolesid.split("|")) //获得用户权限ID 数组 | 符号是分割符   
            //   console.log(roles[0])        
            }          
            else
            {
              roles.push('75')
            }           
                getRolesList().then(res=>{ 
                 // console.log(res)
                const _Data=res.result.data
                const Data=[]
                const _targetKeys=[]
             
                for(let i in _Data)
                 {                  
                    const _tempData={
                          key:_Data[i].roleid.toString(),
                          title:_Data[i].rolevalue,
                          discription:_Data[i].roledescription,
                          chosen: true
                    }
            
               _tempData.chosen=roles[0].indexOf(_Data[i].roleid+'')===-1
            console.log(_tempData)
                   if (!_tempData.chosen) {
                        _targetKeys.push(_tempData.key);
                      }
                      // console.log(_targetKeys)                
                       Data.push(_tempData)
                    let resbody={
                      rolelist:Data,
                      targetKeys:_targetKeys 
                    }                 
                    resole(resbody)
                 }                            
         })
       }).catch(err=>{
         reject(err)
       })    
    
          
            })
      },
      
     handleChange(targetKeys, direction, moveKeys) {
       console.log(targetKeys, direction, moveKeys);
      this.targetkeys = targetKeys       
     
    
    },
      
      MyhandEdit(record)
      {
        this.mdl=Object.assign({},record)
        console.log(this.mdl)   

        this.Userinfo.ID=this.mdl.AdminID
        this.Userinfo.Roles=this.mdl.RolesID
        this.roleslist_visible=true
        this.loadRoleslist(this.Userinfo.ID).then(res=>{  
          console.log(res.rolelist)           
                    this.roleslist=res.rolelist
                    this.targetkeys=res.targetKeys
                    
              })
            
   
      },
      handleEdit (record) {
        this.mdl = Object.assign({}, record)

        this.mdl.permissions.forEach(permission => {
          permission.actionsOptions = permission.actionEntitySet.map(action => {
            return { label: action.describe, value: action.action, defaultCheck: action.defaultCheck }
          })
        })
        this.visible = true
      },
      handleOk () {

      },
      onChange (selectedRowKeys, selectedRows) {
        this.selectedRowKeys = selectedRowKeys
        this.selectedRows = selectedRows
      },
      toggleAdvanced () {
        this.advanced = !this.advanced
      },
    },
    watch: {
      /*
      'selectedRows': function (selectedRows) {
        this.needTotalList = this.needTotalList.map(item => {
          return {
            ...item,
            total: selectedRows.reduce( (sum, val) => {
              return sum + val[item.dataIndex]
            }, 0)
          }
        })
      }
      */
    }
  }
</script>