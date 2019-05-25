<template>
  <a-card :bordered="false">
    <!-- <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-form-item label="规则编号">
              <a-input placeholder=""/>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="使用状态">
              <a-select placeholder="请选择" default-value="0">
                <a-select-option value="0">全部</a-select-option>
                <a-select-option value="1">关闭</a-select-option>
                <a-select-option value="2">运行中</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <template v-if="advanced">
            <a-col :md="8" :sm="24">
              <a-form-item label="调用次数">
                <a-input-number style="width: 100%"/>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="更新日期">
                <a-date-picker style="width: 100%" placeholder="请输入更新日期"/>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="使用状态">
                <a-select placeholder="请选择" default-value="0">
                  <a-select-option value="0">全部</a-select-option>
                  <a-select-option value="1">关闭</a-select-option>
                  <a-select-option value="2">运行中</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="使用状态">
                <a-select placeholder="请选择" default-value="0">
                  <a-select-option value="0">全部</a-select-option>
                  <a-select-option value="1">关闭</a-select-option>
                  <a-select-option value="2">运行中</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </template>
          <a-col :md="!advanced && 8 || 24" :sm="24">
            <span class="table-page-search-submitButtons" :style="advanced && { float: 'right', overflow: 'hidden' } || {} ">
              <a-button type="primary">查询</a-button>
              <a-button style="margin-left: 8px">重置</a-button>
              <a @click="toggleAdvanced" style="margin-left: 8px">
                {{ advanced ? '收起' : '展开' }}
                <a-icon :type="advanced ? 'up' : 'down'"/>
              </a>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div> -->

    <div class="table-operator">
      <a-button type="primary" @click="addDEP()" icon="plus">新建部门</a-button>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="DelMultiple()"><a-icon type="delete" />删除</a-menu-item>
          <!-- lock | unlock -->
          <a-menu-item key="2"><a-icon type="lock" />锁定</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px">
          批量操作 <a-icon type="down" />
        </a-button>
      </a-dropdown>
    </div>

    <s-table
      ref="mytable"
      size="default"
      :rowKey="loadData.Depkey"
      :columns="columns"
      :data="loadData"
      :showAlertInfo="true"
      @onSelect="onChange"
    >
      <span slot="action" slot-scope="text, record">
        <a @click="handleEdit(record)">编辑</a>
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
              <a-popconfirm title="是否要删除此行？" @confirm="handleDEL(record)">
                <a>删除</a>
              </a-popconfirm>
             
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </span>
    </s-table>

    <a-modal
      title="操作"
      :width="800"
      v-model="visible"
      @ok="handleUpDate"
    >
      <a-form :autoFormCreate="(form)=>{this.form = form}">
       
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label='部门编号'
          hasFeedback
          validateStatus='success'        
        >
          <a-input disabled="disabled" placeholder='部门编号' v-model="Mymdl.DepartmentId" id='DepartmentId' />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label='所属类别'
          hasFeedback                        
        >
          <a-select   
            showSearch
            :defaultValue="Mymdl.Permission_Key"  
            placeholder="选择部门类别"           
            v-model="Mymdl.Permission_Key">
            <!-- <a-select-option value="-1">请选择部门</a-select-option> -->
            <template v-for="(item,index) in DepName">
              <a-select-option :key="index" :value="item.Depkey" :title="item.DepName">{{ item.DepName }}</a-select-option>
            </template>
            <!-- <a-select-option v-for="item,key in DepName" value='1'>Option 1</a-select-option>
            <a-select-option value='2'>Option 2</a-select-option>
            <a-select-option value='3'>Option 3</a-select-option>  -->
          </a-select>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label='部门名称（全称）'
          hasFeedback
        
        >
          <a-input id="DepartmentName" @change="DepOnChange" v-model="Mymdl.DepartmentName" style="width: 100%" />
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label='部门简称'
          hasFeedback
       
        >
          <a-input id="Abbreviation" v-model="Mymdl.Abbreviation" style="width: 100%" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label='部门上传目录'
          hasFeedback        
        >
          <a-input placeholder='填正确填写部门上传目录' v-model="Mymdl.UploadDir" id='UploadDir' />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label='权重'
          hasFeedback
          help='权重越大排序约靠前'
        >      
          <a-input :min="1" :max="100" id="Priority" v-model="Mymdl.Priority" style="width: 100%" />
        </a-form-item>

        <!-- <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label='更新时间'
          hasFeedback
          validateStatus='error'
        >
          <a-date-picker
            style="width: 100%"
            showTime
            format="YYYY-MM-DD HH:mm:ss"
            placeholder="Select Time"
          />
        </a-form-item> -->

      </a-form>

    </a-modal>

    <a-modal
      title="添加部门"
      :width="1000"
      v-model="AddDEPVisible"
      @ok="MyhandleOk"
    >
      <a-form :autoFormCreate="(form)=>{this.form = form}">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label='所属类别'
          hasFeedback     
          fieldDecoratorId="depKey"
          :fieldDecoratorOptions="{rules: [{ required: true, message: '请先选择部门类别' }]}"    
        >
          <a-select       
            showSearch    
            placeholder="选择部门类别"
            defaultValue="-1"
            v-model="Mymdl.depKey">
            <!-- <a-select-option value="-1">请选择部门</a-select-option> -->
            <template v-for="(item,index) in DepName">
              <a-select-option :key="index" :value="item.Depkey">{{ item.DepName }}</a-select-option>
            </template>
            <!-- <a-select-option v-for="item,key in DepName" value='1'>Option 1</a-select-option>
            <a-select-option value='2'>Option 2</a-select-option>
            <a-select-option value='3'>Option 3</a-select-option>  -->
          </a-select>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label='部门名称'
          hasFeedback          
          fieldDecoratorId="DepName"
          :fieldDecoratorOptions="{rules: [{ required: true, message: '请填写部门名称' }]}"  
        >
          <a-input placeholder='部门名称（全称）' v-model="Mymdl.DEPName" @change="DepOnChange" id='DEPName' />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label='部门简称'
          hasFeedback     
          fieldDecoratorId="Abbreviation"
          :fieldDecoratorOptions="{rules: [{ required: true, message: '请填写部门简称' }]}"     
        >
          <a-input placeholder='填正确填写部门简称' v-model="Mymdl.Abbreviation" id='Abbreviation' />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label='部门标识'
          hasFeedback        
          
        >
          <a-input placeholder='填正确填写部门上传目录' v-model="Mymdl.UploadDir" id='UploadDir' />
        </a-form-item>
        
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label='权重'
          hasFeedback      
          fieldDecoratorId="Priority"
          :fieldDecoratorOptions="{rules: [{ required: true, message: '请填写部门权重（1-100）' }]}"       
        >
          <a-input placeholder='填写权重最大为：100' v-model="Mymdl.Priority" @keyup="loadNumber($event)" id='Priority' />
        </a-form-item>
       

      </a-form>
    </a-modal>

  </a-card>
</template>

<script>
  import Vue from 'vue'
  import STable from '@/components/table/'
  import ATextarea from "ant-design-vue/es/input/TextArea"
  import AInput from "ant-design-vue/es/input/Input"
  import { User_ID } from "@/store/mutation-types"
  import { makePy } from '../../assets/js/pinying.js'   
  import { getUserrolesbyAdminID,GetPermissionByroleID,GetPermissioninfobyKey,AddParment,QueryAllDeplist,UpdatePartment,DelDePartment} from '@/api/manage'
//getRoleList,
// GetPermissioninfobyKey
  export default {
    name: "TableList",
    components: {
      AInput,
      ATextarea,
      STable
    },
  
    data () {
      return {
      
        value:'',
        DepName:[],
        AddDEPVisible:false,
        visible: false,
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 12 },
        },
        form: null,
        mdl: {},
        Mymdl:{},
        // 高级搜索 展开/关闭
        advanced: true,
        // 查询参数
        queryParam: {},
        // 表头
        columns: [
          {
            title: '部门编号',
            dataIndex: 'DepartmentId'
          },
          {
            title: '部门名称',
            dataIndex: 'DepartmentName'
          },        
          {
            title: '部门简称',
            dataIndex: 'Abbreviation',
            // needTotal: true
          },
            {
            title: '所属分类',
            dataIndex: 'Permission_name',          
            // needTotal: true
           
          },
          {
            title: '权重',
            dataIndex: 'Priority',
            sorter: true,
            needTotal: true,
          },          
          {
            table: '操作',
            dataIndex: 'action',
            width: '150px',
            scopedSlots: { customRender: 'action' },
          }
        ],
        // 加载数据方法 必须为 Promise 对象
        loadData: parameter => {
          console.log('-------')
          console.log(parameter)
          return QueryAllDeplist(Object.assign(parameter, this.queryParam))
        
            .then(res => {
              console.log('返回数据')
              console.log(res.result)
              return res.result
            })
        },

        selectedRowKeys: [],
        selectedRows: []
      }
    },
 
    created () {
      // getRoleList({ t: new Date()})
    
      //   //  GetPermissioninfobyKey({key:'qw'}).then(res=>{
        //    console.log(res)
        //  })

     
    },
    async mounted(){
      this.DepName=await this.GetDepName();
      console.log(this.DepName)


    },
    methods: {
     DelMultiple()
      {     
  this.selectedRows.forEach(async v => {
          //  console.log(v)               
             let res= await DelDePartment(v)     
         
              if(!res.code)
              {
                 this.$message.error(res.message);    
              }
              else
              {              
                 this.$refs.mytable.refresh()
                 this.$message.success(res.message); 
              }            
         });
         
      },
    
       loadNumber(event) {
        var el = event.currentTarget;
        var elValue = el.value;
        var reg = /^((?!0)\d{1,2}|100)$/;
        if (!elValue.match(reg)) {
            elValue = "";
            console.log("b")
            return false;
        } else {
            return true;
        }
    },
        DepOnChange(e)//根据输入的文字变成拼音首字母
        {
            let {value} = e.target
            let py=makePy(value)
                console.log(py[0])
            this.Mymdl.UploadDir=py[0]
        },
     async GetDepName()
    {
     
      let  userid= {AdminID:Vue.ls.get(User_ID)} //在本地localStorage里拿到登陆后的管理员ID（AdminID）
      const roleslist= await getUserrolesbyAdminID({AdminID:userid.AdminID})//根据管理员ID 获取到RolesID 可能是一个也可以能是多个
      let _temp=''
      let s =''
      let DepArr=[]
        for (let x in roleslist.roles)
        {
              let res=await  GetPermissionByroleID({ID:roleslist.roles[x]})//根据rolesID 拿到Permissionlist 返回字符串类型
              _temp=res.result+'|'               //合并循环出来的字符串
              s+=_temp                //同上
        }
       let _arr=s.split('|')//按 “|”分隔符生成数组    
       var r = _arr.filter(function(element,index,self){//数组去重         
       return self.indexOf(element) === index && element //去无效属性
    })      
      
        for (let x in r)
        {
            const obj=new Object();
            const res=await GetPermissioninfobyKey({key:r[x]})
                        //console.log(res)           
            obj.DepName=res.result.Permission_name,
            obj.Depkey=res.result.Permission_key,
            obj.OrderID=res.result.OrderID,
            DepArr.push(obj)
        }
        return DepArr
    
   },
     async handleDEL(record)
     {
        this.Mymdl = Object.assign({}, record)
      
      
        const res=await DelDePartment(this.Mymdl)
      
          if(!res.code)
              {
                 this.$message.error(res.message);    
              }
              else
              {              
                 this.$refs.mytable.refresh()
                 this.$message.success(res.message); 
              }
     },
      async handleUpDate(e)
      {
        console.log(this.Mymdl)
          e.preventDefault()
          this.form.validateFields(async(err)=>{
            if(!err)
            {
           
              const res=await UpdatePartment(this.Mymdl)
              console.log(res)

              if(!res.code)
              {
                 this.$message.error(res.message);    
              }
              else
              {
                 this.visible=false
                 this.$refs.mytable.refresh()
                 this.$message.success(res.message); 
              }
             
            }
          })
      },
      async MyhandleOk(e)
        {
          
        e.preventDefault()
        this.form.validateFields(async(err, values) => {
          if (!err) {
          const res=await AddParment(this.Mymdl)
          if(res.code==-1)
          {
             this.$message.error(res.message);   
          }
          else
          {
             this.$refs.mytable.refresh()
             this.$message.success('添加单位成功。'); 
            
             this.AddDEPVisible = false        
          }
        
          console.log(this.Mymdl)
            // eslint-disable-next-line no-console
            console.log('Received values of form: ', values)
          }
        })           
        },
      async addDEP()
        {
          //  let a= await this.GetDepName();
           setTimeout(() => {
              this.AddDEPVisible = true  
               this.$nextTick(()=>{
              this.form.resetFields()   
            })
               
           }, 100);
          
          
            
                           
        },
      handleEdit (record) {

        this.Mymdl = Object.assign({}, record)
        console.log(this.Mymdl)
       
        this.visible = true
      },
      handleOk () {
          console.log(this.Mymdl);
      },
      onChange (row) {
        this.selectedRowKeys = row.selectedRowKeys
        this.selectedRows = row.selectedRows

      
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