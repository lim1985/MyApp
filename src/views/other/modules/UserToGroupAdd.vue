<template>
  <a-modal
    title="添加组成员"
    :width="700"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="newhandleOk"
    @cancel="handleCancel"
    
  >       
  
    <template>
      <div style="width: 100%">
        <!-- <a-radio-group v-model="mode" :style="{ marginBottom: '8px' }">
          <a-radio-button value="top">横排</a-radio-button>
          <a-radio-button value="left">竖排</a-radio-button>          
        </a-radio-group> -->
        <div>
          <button v-show="vuex_UserINFO.showAdd" @click="AddPhoneUser()" type="button" class="ant-btn ant-btn-primary"><span>新增联系人</span></button>
        </div>     
        <a-form :form="form">      
          <a-form-item 
            v-for="(k,index) in form.getFieldValue('keys')"
            :key="index"
            v-bind="index >=0 ? formItemLayout : formItemLayoutWithOutLabel"
            :label="index >=0 ? '姓名' : ''"
            :required="false"
            hasFeedback
          >
            <div>
              <a-input
                v-decorator="[
                  `names[${k}]`,
                  {
                    validateTrigger: ['change'],
                    rules: [                  
                      {
                        validator:v().CheckNameAndTelNum,
                        required: true,
                        whitespace: true,                      
                      },
                    ],
                  },
                ]"
                placeholder="请输入联系人姓名或者手机号"
                style="width: 45%; margin-right: 8px"
              />           
              <a-icon
                v-if="form.getFieldValue('keys').length > 1"
                class="dynamic-delete-button"
                type="minus-circle-o"
                :disabled="form.getFieldValue('keys').length === 1"
                @click="() => remove(k,index)"
              />
            </div>
          </a-form-item>

          <!-- <a-form-item
            v-for="(k, index) in form.getFieldValue('keys')"
            :key="k"
            v-bind="index === 0 ? formItemLayout : formItemLayoutWithOutLabel"
            :label="index === 0 ? 'Passengers' : ''"
            :required="false"
          >
            <a-input
              v-decorator="[
                `names[${k}]`,
                {
                  validateTrigger: ['change', 'blur'],
                  rules: [
                    {
                      required: true,
                      whitespace: true,
                      message: 'Please input passenger\'s name or delete this field.',
                    },
                  ],
                },
              ]"
              placeholder="passenger name"
              style="width: 60%; margin-right: 8px"
            />
            <a-icon
              v-if="form.getFieldValue('keys').length > 1"
              class="dynamic-delete-button"
              type="minus-circle-o"
              :disabled="form.getFieldValue('keys').length === 1"
              @click="() => remove(k)"
            />
          </a-form-item> -->
          <!-- <a-form-item
            label="搜索姓名222"    
            hasFeedback              
          >
            <a-input-search style="width: 200px" placeholder="输入手机号或者姓名" v-decorator="['search2', {rules: [{validator:v().CheckNameAndTelNum}]}]"/>          
          </a-form-item> -->
          <a-form-item v-bind="formItemLayoutWithOutLabel">
            <a-button type="dashed" style="width:45%" @click="additem">
              <a-icon type="plus" /> 添加成员
            </a-button>
          </a-form-item>
          <!-- <a-form-item
            label="搜索姓名"    
            hasFeedback              
          >
            <a-input-search style="width: 200px" placeholder="输入手机号或者姓名" v-decorator="['search', {rules: [{validator:v().CheckNameAndTelNum}]}]"/>          
          </a-form-item> -->

        <!-- <a-form-item
          label="搜索"             
        >
      <a-auto-complete
      
      style="width: 200px"
      @change="onSearch"
      placeholder="Email"
    />
     </a-form-item> -->
        </a-form>
       
        <div style="background-color: #ececec; padding: 10px;">    
          <template v-for="(item,index) in rowlist">
            <a-row :key="index" :gutter="10">
              <a-col :gutter="10" v-for="(rowitem,rowindex) in item" :key='rowindex' :span="8">
                <a-card hoverable title="" :bordered="true">
                  <p>ID:{{ rowitem.id }}</p>
                  <p>姓名：{{ rowitem.username }}</p>
                  <p>部门：{{ rowitem.Abbreviation }}</p>
                  <p>职务: {{ rowitem.UJOB }}</p>
                  <p>电话：{{ rowitem.tel }}</p>
                </a-card>
              </a-col>         
            </a-row>         
          </template>
        </div>
        <!-- <div>
          <a-input-search
          placeholder="输入手机号或者姓名"
          style="width: 200px"
          @change="onSearch"
        />
        </div> -->
        <!-- <a-tabs defaultActiveKey="sysdxqrmzf" :tabPosition="mode" :style="{ height: '100%'}" @prevClick="callback" @nextClick="callback">
          <template v-for="(item) in AllDepUsers.data">
            <a-tab-pane :tab="item.areaname" :key="item.areakey">
              <template v-for="(Permission,index) in item.Permission" >
                <a-card :hoverable="true" :key="index" class="card" :title="Permission.Permission_name" :bordered="false">
                  <a-row
                    :gutter="24"
                    :style="{ marginBottom: '12px' }">
                    <a-col :span="24" v-for="(DEP, index) in Permission.DEP" :key="index" :style="{ marginBottom: '12px' }">                    
                      <a-col :span="24">
                        <h3><a-icon type="idcard" :style="{fontSize: '22px',padding:'10px' }" theme="twoTone" twoToneColor="#409EFF"/>{{ DEP.DepartmentName }}：</h3>
                      </a-col>            
                      <a-row 
                        :gutter="24" 
                        :style="{padding:'40px 10px 0px 20px',marginBottom: '12px' }">
                        <a-col v-for="(Users,index) in DEP.Users" :key="index" :span="6">         
                          <a-checkbox @change="onChangeCheck" :checked="checkGroup(Users.ID)" :value="Users.ID"></a-checkbox>
                          <span :style="{padding:'10px'}" :span="12">{{ Users.UserName }}</span>  
                        </a-col>                      
                      </a-row>              
                    </a-col>
                  </a-row>
                </a-card>
              </template>
            </a-tab-pane>
          </template>       
        </a-tabs> -->
      </div>
      <user-modal ref="UserPhonemodal" @ok="handleSaveOk" @close="handleSaveClose"/>
    </template>
   
    <!-- <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item
          label="DepID"
          v-show="false"
        >
          <a-input v-decorator="['DepID', {}]"/>
        </a-form-item>
        <a-form-item
          label="GroupID"
        >
          <a-input v-decorator="['GroupID', {}]" disabled />
        </a-form-item>

        <a-form-item
          label="组名称"
        >
          <a-input
            @change="InputpOnChange"
            placeholder='输入自定义组名称如：区政府办班子成员' 
            v-decorator="['GroupName', {rules: [{ required: true, message: '组名称不能为空！' },{validator:v().checkGroupName}]}]" />
        </a-form-item>
      </a-form>
    </a-spin> -->
  </a-modal>
   
</template>

<script>
  import UserModal from '../../list/modules/UserPhone/addUserPhone'
  import { GetAllDepUser,AddUserToGroup ,InGroupUsersID,isexist,newaddUsersToGroup} from '@/api/manage'
  import Validate from '@/tools/Validate/index'
 
  //CreateCustomGroup//
  import Vue from 'vue'  
  import { User_ID } from "@/store/mutation-types"  
  import { mapState} from 'vuex'
  
export default {
  name: 'UserToGroupAddModal',
    components: {     
      UserModal  
    },
   
  data () {
    return {
      id:0,
      userList:[
        // {
        //   rowlist:[
        //   {abc:'111'},
         
        // ]},
        //    {
        //   rowlist:[
        //   {abc:'444'},
        
        // ]}
      ],
      vmodelList:null,
      checkModel:[50,39,1159],
      mode: 'top',
      formItemLayoutWithOutLabel: {
        wrapperCol: {
          xs: { span: 24, offset: 0 },
          sm: { span: 20, offset: 4 },
        },
      },
        formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 4 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 20 },
        },
      },
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
      visible: false,
      confirmLoading: false,
      mdl: {},
      // form: this.$form.createForm(this),
      permissions: [],
      AllDepUsers:[],
      Mymdl:[],
      formItem:{},
      userCount:0,
      flag:1,
      rowlist:[]



    }
  },
     beforeCreate() {  
       console.log(this.$form)
        this.form = this.$form.createForm(this, { name: 'dynamic_form_item' });
        this.form.getFieldDecorator('keys', { initialValue: [0], preserve: true });
        console.log(this.form)
        console.log(this.form.getFieldValue('keys'))
        // const { form } = this;
        // console.log(form)
      //  console.log(this.form)
    // this.form.getFieldDecorator('keys', { initialValue: [], preserve: true });
  },
    computed:{
      ...mapState({
        vuex_UserINFO:state=>state.user.UserInformation
      }),

    },
   watch:{
     vuex_UserINFO(val)
     {       
       if(val.showAdd==false)
       {
         this.formItem=val                  
       }    
     }
   },
  created () {

    // this.loadPermissions()
  },
  async mounted(){    
    this.GetAllDepAndUser();  
   
  },
   
  methods: {
      remove(k,i) {
            const { form } = this;
            console.log(k,i)
            // can use data-binding to get
            const keys = form.getFieldValue('keys');
            // We need at least one passenger
            if (keys.length === 1 ) {
              return;
            }
        console.log(this.userList)
          if(!this.userList[i])
          {
            this.$message.error(`不可删除为空联系人对象`)
            return 
          }
            this.userList.splice(i,1)
            this.rowlist=this.group(this.userList,3)
            
            console.log(this.userList)
            console.log(this.rowlist)
            console.log(this.formItem)
            console.log(this.keys)
            console.log(k,i)
            // can use data-binding to set
            form.setFieldsValue({
              keys: keys.filter(key => key !== k),
            });     
              
          },
          group(list, rowCount){
              var ret = [];
              for(var i = 0; i < list.length; i++){
                  if(i%rowCount === 0){
                      ret.push([]);
                  }
                  
                  ret[ret.length-1].push(list[i])
              }
              return ret;
          },
         async additem() {
           const { form } = this;
           const keys = form.getFieldValue('keys');  
                      console.log(!keys)  

            console.log(JSON.stringify(this.formItem)=='{}')
           if(JSON.stringify(this.formItem)=='{}')
           {
             this.$message.error(`请先输入用户名或手机号,再添加成员`)
             console.log(`没数据`)
             return              
           }
           else
           {         
            //  if(JSON.stringify(this.userList).indexOf(this.formItem.id)==-1)
             let res=await isexist({UserPhoneID:this.vuex_UserINFO.id,GroupID:this.mdl.key})
             console.log(res)
             console.log(JSON.stringify(this.userList).indexOf(this.formItem.id)==-1)
             if(res.code==1)
             {
               this.$message.error(`当前组已经包含该联系人，不可重复添加！`)
               return 
             }
              if(JSON.stringify(this.userList).indexOf(this.formItem.id)==-1)
             {
              this.userList.push(this.formItem)
              let _arr=this.group(this.userList,3)
              this.rowlist=_arr   
              this.formItem={}              
             }
              else
             {
               this.$message.error(`不可往组里重复添加联系人`)
               return 
             }             
           }
     
              this.id=this.id+1
              const nextKeys = keys.concat(this.id);          
              form.setFieldsValue({
                keys: nextKeys,
              });     
          },          
            // console.log(this.userList.length)
            // if(this.userList.length)
            // this.userCount++
            // let _arrlist=[]
            // _arrlist.push(this.formItem)
            // this.userList.rowlist.push(_arrlist)
            // console.log(this.userList.length)
            // console.log(this.userList)
            // this.userList.push(this.formItem);
            //   console.log(this.userList.length)
            //   let rowlist=[]
            //   if(this.userList.length%3===0)
            //   {                
            //   }
            //   else
            //   {
            //    rowlist.push(this.formItem);
            //    this.userList.push(rowlist)
            //   }
            // console.log(this.userList)
            //   this.userList.forEach((item,index) => {
            //       console.log(item)
            // });
            // console.log(L)
            // console.log(this.userList)
            //         _data.UID=_this.vuex_UserINFO.id
            //  _data.GroupID=_this.mdl.key 
            // can use data-binding to get         
            //  this.form.getFieldValue('keys')     
            //  const keys = form.getFieldValue('keys');  
            //             console.log(keys)  
    AddPhoneUser(){
       this.$refs.UserPhonemodal.add();              
    },
       handleSaveClose(){
            // this.$refs.mytable.refresh()
      },
      handleSaveOk(){
         this.form.validateFields(async(err,values)=>{
           
           console.log(values.search);
          let num=values.search;
          let res=await Validate.Vuex_findByUserInformation(num);
           console.log(res);
         })
        console.log('AddOK')
            // this.$refs.mytable.refresh()
        },
     v(){     
        return Validate;
    }, 
    //   TelError () {
    //   const { getFieldError, isFieldTouched } = this.form;
    //   console.log(isFieldTouched('search'));
    //   console.log(getFieldError('search'));
    //   return isFieldTouched('search') && getFieldError('search');
    // },
      // onSearch(val){
      //   let vals="";      
     
      //   this.form.validateFields((err, values) => {
      //   if (!err) {
      //       console.log(val);
      //   }
      // });
       
      // },
    FindAllUserInGroup(s){
      console.log(s);
      let data={
       GroupID:s
       }
       InGroupUsersID(data).then(res=>{//读取组里的用户
         res.data.forEach(v => {          
          this.Mymdl.push(v.UserPhoneID);
         });
        //  console.log(this.Mymdl)
       })      
    },
    checkGroup(s)
    {            
      return this.Mymdl.indexOf(s)==-1?false:true
    },
      callback (val) {
      console.log(val)
    },      
    add (s) {
      this.edit(s)
    },
    edit (record) {
     
      this.mdl = Object.assign({}, record)
      // console.log("AAAAAAAAAA")
      // console.log(this.mdl.key);
      this.visible = true
      this.Mymdl=[];
     // this.FindAllUserInGroup(this.mdl.key)
      // 有权限表，处理勾选
      // if (this.mdl.permissions && this.permissions) {
      //   // 先处理要勾选的权限结构
      //   const permissionsAction = {}
      //   this.mdl.permissions.forEach(permission => {
      //     permissionsAction[permission.permissionId] = permission.actionEntitySet.map(entity => entity.action)
      //   })
      //   // 把权限表遍历一遍，设定要勾选的权限 action
      //   this.permissions.forEach(permission => {
      //     permission.selected = permissionsAction[permission.id] || []
      //   })
      // }

  // let {value} = e.target
  //            let s=makePy(value)
      // this.$nextTick(() => {
      //   this.form.setFieldsValue({
      //     DepID:record.DepID,
      //     GroupID:this.mdl.DepID+'-'+this.mdl.Key+'-',
      //     GroupName:''
      //   })
      // })
      console.log('this.mdl', this.mdl)
    },
    async GetAllDepAndUser()
    {
       let  userid= {AdminID:Vue.ls.get(User_ID)} 
      //  console.log(userid)
       this.AllDepUsers=await GetAllDepUser(userid)
        // console.log(this.AllDepUsers.data)
       
    },
  
    close () {
      
      this.$store.commit('SET_PhoneUSERINFO',''); 
      this.$emit('close')
      this.visible = false
    },
    ok()
    {
      this.$emit('ok')
      this.visible=false
    },
   async newhandleOk()
     {
      const { form } = this;
      const _this=this
     
          let _arr=  _this.userList.map(item=>{
        return {UserPhoneID:item.id,GroupID:_this.mdl.key}
      })
     let res=await newaddUsersToGroup(_arr)
      _this.confirmLoading = true
         if(res.code==1)
         {
            _this.$message.success('添加成功')
            _this.confirmLoading = false
            _this.ok();
            _this.handleCancel();
            _arr=[]
            _this.userList=[]
            _this.rowlist=[]           
            form.resetFields();
            
         }
         else
         {
             _this.$message.error('添加错误')
             _this.confirmLoading = false
         }
           
      //   _this.confirmLoading = true
      //   new Promise((resolve)=>{
      //     setTimeout(() => {
      //      AddUserToGroup(_data).then(res=>{
      //         resolve(res)
      //   })  
      //     }, 1000);
      // }).then(result=>{
      //   if(result.code==1)
      //   {
      //       _this.$message.success('修改成功')
      //       _this.confirmLoading = false
      //       _this.ok();
      //       _this.handleCancel();
      //   }
      //   else
      //   {
      //      _this.$message.error('修改成功')
      //      _this.confirmLoading = false
      //   }
      //   // console.log(result)
      // })
         
    
    },
    handleOk () {
      const _this = this 
      console.log(_this.userList)
      let _arr=  _this.userList.map(item=>{
        return {UserPhoneID:item.id,GroupID:_this.mdl.key}
      })
      console.log(_arr)
          // new Promise(resolve=>{
          //   setTimeout(() => {
          //       AddUserToGroup(_arr).then(res=>{
          //         console.log(res)
          //       })
          //   }, 1000);
          // })
      // console.log(this.mdl.key);   
      // console.log(_this.Mymdl)   
       let _data=new Object();
       _data.UIDS=""
       _data.UID=_this.vuex_UserINFO.id
       _data.GroupID=_this.mdl.key    
      //  console.log(_data);
        _this.confirmLoading = true
        new Promise((resolve)=>{
          setTimeout(() => {
           AddUserToGroup(_data).then(res=>{
              resolve(res)
        })  
          }, 1000);
      }).then(result=>{
        if(result.code==1)
        {
            _this.$message.success('修改成功')
            _this.confirmLoading = false
            _this.ok();
            _this.handleCancel();
        }
        else
        {
           _this.$message.error('修改成功')
           _this.confirmLoading = false
        }
        // console.log(result)
      })
         
     
   
      // 触发表单验证
      // this.form.validateFields((err, values) => {
      //   // 验证表单没错误
      //   if (!err) {
          
      //     console.log('form values', values)

      //     _this.confirmLoading = true
      //     // 模拟后端请求 2000 毫秒延迟
      //     new Promise((resolve) => {

      //       setTimeout(() => {
      //         CreateCustomGroup(values).then(res=>{            
      //           resolve(res)
      //         })
      //       }, 1000)
      //       }).then(result=>{
      //           console.log(result)
      //           if(result.code==-1)
      //           {
      //              _this.$message.error(result.msg)
      //              _this.confirmLoading = false
      //           }
      //           else
      //           {
      //               _this.$message.success(result.msg)
      //               _this.confirmLoading = false
      //               _this.close();
      //           }
      //         })
      //   }
      // })
    },
    handleCancel () {
      this.close()
    },
    onChangeCheck (e) {
        e.target.checked?this.Mymdl.push(e.target.value):this.Mymdl.splice(this.Mymdl.indexOf(e.target.value),1) 
        // console.log(this.Mymdl);
     
        console.log(this.Mymdl);
      // permission.indeterminate = !!permission.selected.length && (permission.selected.length < permission.actionsOptions.length)
      // permission.checkedAll = permission.selected.length === permission.actionsOptions.length
    },
    onChangeCheckAll (e, permission) {
      Object.assign(permission, {
        selected: e.target.checked ? permission.actionsOptions.map(obj => obj.value) : [],
        indeterminate: false,
        checkedAll: e.target.checked
      })
    },
    // loadPermissions () {
    //   const that = this
    //   getPermissions().then(res => {
    //     const result = res.result
    //     that.permissions = result.map(permission => {
    //       const options = actionToObject(permission.actionData)
    //       permission.checkedAll = false
    //       permission.selected = []
    //       permission.indeterminate = false
    //       permission.actionsOptions = options.map(option => {
    //         return {
    //           label: option.describe,
    //           value: option.action
    //         }
    //       })
    //       return permission
    //     })
    //   })
    // }

  }
}
</script>

<style scoped>

.dynamic-delete-button {
  cursor: pointer;
  position: relative;
  top: 4px;
  font-size: 24px;
  color: #999;
  transition: all 0.3s;
}
.dynamic-delete-button:hover {
  color: #777;
}
/* .dynamic-delete-button[disabled] {
  cursor: not-allowed;
  opacity: 0.5;
} */
</style>