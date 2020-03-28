<template>
  <div>
   <a-modal
      title="选择自定义组"
      :width="400"
      :afterClose="isclose"
      v-model="Groupvisible"
      @ok="handleGroupOk"  
      :confirmLoading="confirmLoading"
    >
      <a-spin :spinning="confirmLoading">
        <a-row>
          <a-col :span="4"></a-col>
          <a-col :span="16">
            <a-select              
              placeholder="请选择自定义组"
              style="width: 200px"                     
              @change="customGrouphandleChange"              
            >
    <a-select-option v-for="d in customGroupdata" :key="d.value">{{d.text}}</a-select-option>
  </a-select>
            <!-- <a-cascader placeholder="选择部门类别" :options="options" @change="onChangeDeplist" :showSearch="{ filter }" :defaultValue="DepValue" /> -->
            <!-- <a-cascader placeholder="选择部门类别" v-decorator="['DepKeylist',{initialValue:this.DepValue,rules: [{ required: true, message: '部门不能为空！' }]}]" :showSearch="{filter}" :options="options" @change="onChangeDeplist"/>
             -->
          </a-col>
          <a-col :span="4"></a-col>
          <!-- ReferenceStatus -->
        </a-row>    
      </a-spin>
    </a-modal>
    <a-modal
      title="创建会议"
      :width="800"
      v-model="meetingVisible"
      @ok="handleOk"  
      :confirmLoading="confirmLoading"
    >
      <a-spin :spinning="confirmLoading">
        <a-form :form="form">
          <a-form-item   
            v-bind="formItemLayout"         
            label='会议名称'
            hasFeedback         
          >
            <a-input              
              placeholder='请输入会议名称' 
              v-decorator="['meetingName',{rules: [{ required: true },{ validator:v().checkcharacter }]}]"
            /> 
            <!-- checkUsername asyncCheckUserName -->
            <!-- <a-input placeholder='联系人姓名' v-model="Mymdl.UserName" id='UserName' /> -->
          </a-form-item>
          <!-- <a-form-item   
            v-show="showID"
            v-bind="formItemLayout"         
            label='会议主持人'
            hasFeedback         
          >
            <a-input                    
              placeholder='请输入会议主持人姓名' 
              v-decorator="['chairManGroupID',{rules: [{ required: true }]}]"
            />          
          </a-form-item> -->
           <a-form-item   
            v-bind="formItemLayout"         
            label='会议主持人/组'
            hasFeedback         
          >
            <a-input  
              @change="onSearchPhoneUser"            
              placeholder='请输入会议主持人姓名/组' 
              v-decorator="['chairManGroupName',{rules: [{ required: true },{ validator:v().checkcharacter }]}]">
          <a-select
            @change="selectGroup"
          slot="addonBefore"
          v-decorator="['prefix2', { initialValue: '1' }]"
          style="width: 80px"
        >
          <a-select-option value="1">
           姓名
          </a-select-option>
          <a-select-option value="2">
           组名
          </a-select-option>
        </a-select> 
              
            </a-input>          
          </a-form-item>
          <a-form-item   
            v-bind="formItemLayout"         
            label='会议出席人/组'
            hasFeedback         
          >
            <a-input   
              @change="onSearchPhoneUser"            
              placeholder='请输入会议出席人/组' 
              v-decorator="['personGroupName',{rules: [{ required: true },{ validator:v().checkcharacter }]}]">
              <a-select
              @change="selectGroup"
          slot="addonBefore"
          v-decorator="['prefix', { initialValue: '3' }]"
          style="width: 80px"
        >
          <a-select-option value="3">
           姓名
          </a-select-option>
          <a-select-option value="4">
           组名
          </a-select-option>
        </a-select> 
            </a-input>          
          </a-form-item>
          <a-form-item
            :colon="false"
            v-bind="formItemLayout"     
            label='会议类型'   
            hasFeedback                              
          >
            <a-select v-decorator="['meetingType',{initialValue:'区委常委会',rules: [{ required: false }]}]">
              <a-select-option value="区委常委会">区委常委会</a-select-option>
              <a-select-option value="政府常务会">政府常务会</a-select-option>  
                        
            </a-select>           
          </a-form-item> 
          <a-form-item
            :colon="false"
            v-bind="formItemLayout"     
            label='会议室'   
            hasFeedback                              
          >
            <a-select v-decorator="['room',{initialValue:'区委常委会议室',rules: [{ required: false }]}]">
              <a-select-option value="区委常委会议室">区委常委会议室</a-select-option>
              <a-select-option value="政府常务会议室">政府常务会议室</a-select-option>  
                        
            </a-select>           
          </a-form-item> 
             <!-- <a-form-item   
              :colon="false"
              v-bind="formItemLayout"             
              label='会议时间'  
              hasFeedback                 
            >
              <a-date-picker @change="pickerstartTime" v-decorator="['startTime',{rules: [{ required: false }]}]" />
          
            </a-form-item>  -->
             <a-form-item   
              :colon="false"
              v-bind="formItemLayout"             
              label='会议时间'  
              hasFeedback                 
            >
              <a-range-picker             
              @change="pickerendTime"
              v-decorator="['meetingTimes',{rules: [{ required: true }]}]"
              show-time
              format="YYYY-MM-DD HH:mm:ss"
              />
              <!-- <a-date-picker @change="pickerendTime" v-decorator="['endTime',{rules: [{ required: false }]}]" /> -->
              <!-- <a-input placeholder='填写联系人的出生日期' v-decorator="['BirthDay',{rules: [{ required: false },{ validator: checkTel }]}]"/> -->
            </a-form-item> 
             <a-form-item   
            v-bind="formItemLayout"         
            label='会议主题'
            hasFeedback         
          >
            <a-input              
              placeholder='请输入会议主题' 
              v-decorator="['meetingZT',{rules: [{ required: false },{ validator:v().checkcharacter }]}]"
            />          
          </a-form-item>
              <a-form-item   
            v-bind="formItemLayout"         
            label='记录人'
            hasFeedback         
          >
            <a-input              
              placeholder='请输入会议记录人员名字' 
              v-decorator="['RecordMan',{rules: [{ required: false },{ validator:v().checkcharacter }]}]"
            />          
          </a-form-item>
               <a-form-item   
            v-bind="formItemLayout"         
            label='会务人员'
            hasFeedback         
          >
            <a-input              
              placeholder='请输入会务人员名字' 
              v-decorator="['meetingMan',{rules: [{ required: false },{ validator:v().checkcharacter }]}]"
            />          
          </a-form-item>
              <a-form-item   
            v-bind="formItemLayout"         
            label='会风督察人员'
            hasFeedback         
          >
            <a-input              
              placeholder='请输入会风督察人员名字' 
              v-decorator="['meetingManager',{rules: [{ required: false },{ validator:v().checkcharacter }]}]"
            />          
          </a-form-item>
        
        </a-form>
      </a-spin>
    </a-modal> 
    <!-- <a-modal
      title="选择人员"
      :width="680"
      v-model="meetingVisible"    
      :confirmLoading="confirmLoading"
      :footer="null"
    >
     
    </a-modal> -->
     <!-- <a-table :columns="columns" :dataSource="AddUserData">
        <a slot="name" slot-scope="text" href="javascript:;">{{ text }}</a>
        <span slot="customTitle"><a-icon type="smile-o" /> 姓名</span>      
        <span slot="action" slot-scope="text, record">   
          <a @click="chele(record)">选择</a>
          <a-divider type="vertical" />     
        </span>
      </a-table> -->
  </div>  
</template>
<script>
  import Vue from 'vue'  
  import { mapState} from 'vuex'
  import { User_ID } from "@/store/mutation-types" 
  import {GetUserInformationByUserNameLIke,GetCustomGroupByDepID,createMeet} from '@/api/manage'//Select_PermissionsByRolesID,getUserrolesbyAdminID,AddPhoneUser,ReferenceAdd,
  import { Promise } from 'q';
  import Validate from '@/tools/Validate/index'
  // import { error } from 'util';
  import _ from 'lodash'
   //状态说明 [LIM_UsersPhone] 9 前台显示 7 前台不现实   
   //[LIM_ResferenceAndDep] 6 引用状态 -1 默认

  //GetALLByDepID,asyncValidateTel

export default {
  name: 'AdduserModal', 
  data () {
    return {   
      selectFlag:0,
      customGroupdata:[],
      Groupvisible:false,
      showID:false,
      meetingVisible:false,
                   AddUserData : [],
                   columns : [{
                    dataIndex: 'name',
                    key: 'name',
                    slots: { title: 'customTitle' },
                    scopedSlots: { customRender: 'name' },
                  }, {
                    title: '性别',
                    dataIndex: 'sex',
                    key: 'sex',
                       customRender: (text=>{
                        if(text==1)
                        {
                          return '男'
                        }
                        else              
                        {
                          return '女'
                        }            
                      }) 
                  }, {
                    title: '部门',
                    dataIndex: 'Abbreviation',
                    key: 'Abbreviation',
                  }, {
                    title: '手机号',
                    key: 'cellPhone',
                    dataIndex: 'cellPhone',
                    scopedSlots: { customRender: 'cellPhone' },
                  }, {
                    title: '操作',
                    key: 'action',
                    scopedSlots: { customRender: 'action' },
                  }],
     
      userVisible:false,
       parameter:{
        pageNo:1,
        pageSize:20
      },   
      getcellphone:'',
      Referencevisible:false,
      DepValue:[],
      tel:'',
      Isvalidate:false,
      status:'',
      Tips:'',
      options:[],
      selectedRowKeys: [],
      selectedRows: [],
      PhoneVisible:false,        
       formItemLayout: {
        labelCol: {
          xs: { span: 20 },
          sm: { span: 6 },
        },
        wrapperCol: {
          xs: { span:20 },
          sm: { span: 10 },
        },
      },
      visible: false,
      confirmLoading: false,
      mdl: {},

    }
  },
  beforeCreate () {
    this.form = this.$form.createForm(this)
    console.log('form::', this.form)
  },
  created () {
     
    // this.v();
  },
    computed:{
      ...mapState({
        // S_DEPKEY:state=>state.user.DEPKEY,
        // V_name:state=>state.user.name,
        // UserPhoneID:state=>state.user.UserPhoneID,
        // ReferenceStatus:state=>state.user.ReferenceStatus,
        // ReferenceUserId:state=>state.user.ReferenceUserId            
      })    
    },
   watch: {
    '$route'()
    {        
      // console.log(this.$route.meta)
      // this.$store.commit('SET_DEPKEY',this.$route.meta.permission[0]);     
      
    }
      },
  async mounted(){   
      // let _arr=await this.GetDepnameAndchild()    
      // console.log("777777777777777")
      // console.log(_arr) 
      // this.options=this.QuChongFuObject(_arr);  
      // console.log( this.options) 
      // this.setDepkey();

    },
  methods:  {
    isclose(){
       this.Groupvisible=false;     
    },
    customGrouphandleChange(val){    
      console.log(val)
      if(this.selectFlag==2)    
       {
        this.mdl.chairManGroupID=val
      this.customGroupdata.forEach(v=>{
             if(v.value==val)
             {
                 this.mdl.chairManGroupname=v.text
             }       
         })
       }
      else if(this.selectFlag==4)
      {
      this.mdl.personGroupID=val
          this.customGroupdata.forEach(v=>{
             if(v.value==val)
             {
          this.mdl.personGroupName=v.text
             }       
         })
      }
     console.log(this.mdl)
    },
    handleGroupOk()
    {
      //personGroupName 4 chairManGroupName 2
      setTimeout(() => {
          if(this.selectFlag==2)
          {
            this.form.setFieldsValue({
                chairManGroupName:this.mdl.chairManGroupname
            }) 
          }
          if(this.selectFlag==4)
          {
              this.form.setFieldsValue({
                personGroupName:this.mdl.personGroupName
            }) 
          }
           this.Groupvisible=false
      }, 500);
         
        console.log(this.mdl)
    },
    //   getCustomGroup()
    // {  
     
    //     let _depid=this.$route.fullPath.split('/')[3];
    //     let data={
    //       DepID:_depid
    //     }    
      
    //     GetCustomGroupByDepID(data).then(res=>{        
    //       console.log(res)
    //      this.Grouplist= res.data.rows.map(v=>{    
         
    //       return {title:v.GroupName,key:v.GroupID,icon:'null'}
    //       })
    //       if(!this.Grouplist.length)
    //       {
    //         this.$message.error('当前部门还未添加自定义组，请先添加自定义组')
    //         return;
    //       }
       
    //       if(!this.QueryUserParam.GroupID)
    //       {
    //          this.QueryUserParam={
    //         GroupID:this.Grouplist[0].key
    //       }          
    //      }
    //       this.$refs.mytable.refresh(true)
    //       console.log(this.Grouplist);   
    //     })
    // },
   async selectGroup(val){
      //  const { value ,id} = val.target  
      console.log(val)
      this.selectFlag=val;
      if(val==2 || val==4)
      {
          let _depid=this.$route.fullPath.split('/')[3];
          let data={
            DepID:_depid
          }    
        let grouplist=await GetCustomGroupByDepID(data);
          if(grouplist.data.count==0)
          {
            this.$message.error('部门暂时没有自定义组，请先添加')
          }
          else
          {
            //  customGroupdata
          let _arr=[]
          grouplist.data.rows.forEach(v => {
                    let _obj={}
                    _obj.text=v.GroupName,
                    _obj.value=v.GroupID
                    _arr.push(_obj)
              });
              this.customGroupdata=_arr   
              this.Groupvisible=true;     
          }
          console.log(grouplist);
        }     
    },
        onSearchPhoneUser:_.debounce( function(val){        
       const { value ,id} = val.target  
       if(value)
       {
      
         setTimeout(async() => {
            let phoneUser=await GetUserInformationByUserNameLIke({data:value})
         console.log(phoneUser)
         if(phoneUser.code==1)
         {
           if(id=='chairManGroupName')
           {
             this.mdl.chairManGroupID=phoneUser.res.data[0].ID
             this.mdl.chairManGroupName=''
           }
           else
           {
            this.mdl.personGroupID=phoneUser.res.data[0].ID
            this.mdl.personGroupName=''
           }
           console.log(this.mdl)
         }
         else
         {
           if(id=='chairManGroupName')
           {
             this.$message.error('系统内未找到该联系人,可能姓名输入错误，请重新输入')
             this.form.setFieldsValue({
                chairManGroupName:''
            }) 
           }
           else
           {
            this.$message.error('系统内未找到该联系人，可能姓名输入错误，请重新输入')           
            this.form.setFieldsValue({
                personGroupName:''
            }) 
           }
         }      
         }, 1000);
       }
    },1000),
    pickerstartTime(val)
    {
      console.log(val)
    },
    pickerendTime(val) {
      console.log(val)
    },
    handleOk(){
        const _this = this
      // 触发表单验证
      this.form.validateFields(async(err, values) => {
        // 验证表单没错误
        if (!err) 
        {
          let _obj=  Object.assign(values,this.mdl)
          console.log(_obj)
          let startTime=  _this.$moment(values.meetingTimes[0]).format('YYYY-MM-DD HH:mm:ss')
          let endTime=  _this.$moment(values.meetingTimes[1]).format('YYYY-MM-DD HH:mm:ss')
          _obj.startTime=startTime
          _obj.endTime=endTime
          _obj.meetingStatus=1
          _obj.meetingConvenDepID=this.$route.fullPath.split('/')[3];     
          let addresult=await createMeet(_obj);
           console.log(addresult)  
           if(addresult.meetingID)
           {
              _this.$message.success('创建会议成功')
              _this.meetingVisible=false;
              _this.$refs.mytable.refresh()  
           }   
        }
      })
    },
    set(){
      this.meetingVisible=true;
    },
      v(){     
        return Validate;
    },   
    //   AddReference(){
    //   this.Referencevisible=true;  
    //   console.log(this.DepValue);   

    // },
         filter(inputValue, path) {
       
      return (path.some(option => (option.label).toLowerCase().indexOf(inputValue.toLowerCase()) > -1));
    },
    // chele(record){      
    //     this.userVisible=false;
    //     setTimeout(() => {
    //     this.form.setFieldsValue({
    //       UserName:record.name,
    //       cellphone: record.cellPhone,
    //       UJOB: record.UJOB,
    //       tel: record.tel,   
    //       Abbreviation:record.Abbreviation,
    //       Sex:record.Sex+'',
        
    //     })  
    //         this.form.validateFields(['cellphone']);
    //     }, 1000);    
    // },
    //    onSearchPhoneUser:_.debounce(function(val){
    //    const { value} = val.target  
    //    console.log(value)  
    //    if(value)
    //    {
    //      this.isSearch=true    
    //      this.queryParam.data=value; 
    //      this.$refs.mytable.refresh()  
    //      console.log(this.queryParam);   
    //    }
    //    else
    //    {
    //      this.isSearch=false
    //      this.queryParam.data=value
    //      this.$refs.mytable.refresh()  
    //    }
    //   },1000),
    //  GetUserByUserName:_.debounce(async function(e)
    // {
    //    const { value } = e.target
    //     let reg = /^[\u0391-\uFFE5]{0,1}$/;
    //  if(!reg.test(value))
    // {
    //  let res=await GetUserInformationByUserNameLIke({data:value,parameter:this.parameter})
    //   console.log(res);    
    //   if(res.code==1)
    //   {
    //     if(res.res.totalCount>1)
    //     {
    //          this.AddUserData=res.res.data.map(action=>{
    //            return {key:action.ID,name:action.UserName,sex:action.Sex,Abbreviation:action.Abbreviation,cellPhone:action.cellphone,UJOB:action.UJOB,tel:action.Tel,Sex:action.Sex}
    //          })    
    //       this.userVisible=true;
    //       return;
    //     }     
    //       this.form.setFieldsValue({      
    //          UserName:res.res.data[0].UserName,  
    //       cellphone: res.res.data[0].cellphone,
    //       UJOB: res.res.data[0].UJOB,
    //       tel: res.res.data[0].Tel,  
    //       Abbreviation:res.res.data[0].Abbreviation, 
    //       Sex:res.res.data[0].Sex+''
    //     })
    //       this.form.validateFields(['cellphone']);
    //     //  tel: res.res.data[0].cellphone,
    //     //    UJOB: res.res.data[0].cellphone,
    //     //   UJOB

    //   }
    //   return;
    // }
    // },1500),
  
  
    // setDepkey(){

    //   let _dep=  localStorage.getItem('DepKeylist')     
    //   if(!_dep)
    //   {
    //     this.DepValue=['QW',152]
    //   }
    //   else
    //   {
    //   let s=_dep.split(',')
    //   let _arr=[]
    //   for(let i=0;i<s.length;i++)
    //   {
    //       if(i==1)
    //       {
    //         s[i]= parseInt(s[i])
    //       }
    //       _arr.push(s[i])
    //   }
    //   this.DepValue=_arr
    //   console.log(this.DepValue);
    //   }     
    // },
    //   QuChongFuObject(arr) {
    //         var uniques = [];          
    //         var obj = {};
    //             for(var i =0; i<arr.length; i++){
    //                 if(!obj[arr[i].value]){
    //                     uniques.push(arr[i]);
    //                     obj[arr[i].value] = true;
    //                 }
    //             }
              
    //                 return uniques
    //     },
  
    // //    async GetDepnameAndchild()
    // // {
    // //   let _arr=[] 
    // //   let  userid= {AdminID:Vue.ls.get(User_ID)} //在本地localStorage里拿到登陆后的管理员ID（AdminID）   
    // //   const roleslist= await getUserrolesbyAdminID({AdminID:userid.AdminID})//根据管理员ID 获取到RolesID 可能是一个也可以能是多个
     
    // //       for (let x in roleslist.roles)
    // //       {
    // //          let result=await Select_PermissionsByRolesID({ID:roleslist.roles[x]})//根据rolesID 拿到Permissionlist 返回字符串类型  
    // //          _arr.push(result.res)          
    // //       }
    // //     console.log("5555555")
    // //     console.log(_arr)
    // //      let arr=[]       
    // //       _arr.forEach(v => {
    // //         for(let x in v)
    // //         {
    // //            if(v[x].IsView && v[x].IsParent)
    // //            {
    // //              let obj=new Object();               
    // //               obj.label=v[x].label
    // //               obj.value=v[x].value                
    // //               let DepArr=[]                     
    // //               v[x].actionOptions.forEach(s=>{
    // //                   let childObj=new Object();
    // //                 if(s.IsView && s.Permission_Key==obj.value ) 
    // //                 {                       
    // //                     // console.log(s)
    // //                      childObj.label=s.Abbreviation
    // //                      childObj.value=s.DepartmentId
    // //                      DepArr.push(childObj)                                        
    // //                 }
    // //                    obj.children=DepArr
    // //               })                 
    // //                 arr.push(obj)
    // //            }               
    // //         }
    // //       });
    // //       //返回结果
    // //         console.log("返回结果")
    // //         console.log(arr);
    // //       return arr        
    // //   },

    // onChangeDeplist(value) {
    //   this.mdl=value;
     
    //   return value;
    // },
    // add () {
    //   setTimeout(() => {      
    //       this.edit();      
    //   }, 200);
    
    // },
    // edit () {
    //   // this.mdl = Object.assign({}, record) 
      
      
    //   this.$nextTick(() => {
    //     this.form.resetFields();
    //     this.setDepkey();  
    //     this.$store.commit('SET_ReferenceStatus',false); 
    //     this.form.setFieldsValue({
    //       DepKeylist: this.DepValue
    //     })
    //     this.PhoneVisible = true       
    //   })
    // },
    // close () {
    //      this.$emit('close')
    //      this.PhoneVisible = false    
    // },  
    // handleCancel () {
     
    // },
    // handleReferenceOk(){
    //     const _this = this
    //     new Promise ((resolve)=>{
    //          setTimeout(async () => {
    //            console.log(_this.mdl);
    //            console.log(_this.DepValue);
    //              const res=await ReferenceAdd({UserPhoneID:_this.ReferenceUserId,DepID:_this.DepValue[1]})             
    //              resolve(res);     
    //         // this.Referencevisible=false;
    //         // this.PhoneVisible=false;
    //         // this.$emit('ok') 
    //     }, 100);         
    //     }).then(r=>{
    //           if(r.code==1)
    //       {
    //         console.log('referenceok')
    //         this.Referencevisible=false;
    //         this.PhoneVisible=false;
    //         this.$emit('ok')             
    //       }
    //       else if (r.code==-4)
    //       {
    //         _this.$message.error(r.msg);  

    //       }
    //     })           
    // },
    //  handleOk () {
    //   const _this = this
    //   // 触发表单验证
    //   this.form.validateFields((err, values) => {
    //     // 验证表单没错误
    //     if (!err) {
        
    //       _this.confirmLoading = true
    //       // 模拟后端请求 2000 毫秒延迟
    //       new Promise((resolve,reject) => {          
    //       setTimeout(async () => {
    //           console.log(values);
    //           const res=await AddPhoneUser(values)             
    //           if(res)
    //           {
    //              resolve(res); 
    //           }
    //           else
    //           {
    //             reject(new error)
    //           }
                   
    //       }, 1000)          
    //       }).then(function (r) {
          
    //         if(r.code==-3)
    //       {            
    //           _this.$message.error('该号码已被使用，不能录入系统');  
    //           _this.status="error"
    //           _this.Tips='该号码已被使用，不能录入系统'
    //       }else if(r.code==-2)
    //       {
    //          _this.$message.error('添加联系人失败，请和管理员联系！');  
    //       }
    //       else
    //       {   
    //             localStorage.setItem('DepKeylist', values.DepKeylist)                
    //         //  _this.Vue.ls.set('DepKeylist',)         
    //           // _this.DepValue= values.DepKeylist       
                           
    //           _this.$message.success('添加人员成功。');             
    //           _this.PhoneVisible = false   
    //           _this.$emit('ok');                                      
    //       }}).catch(function (err) {
    //             console.log(err)
    //       }).finally(() => {
    //         _this.confirmLoading = false
    //         // _this.close();
          
    //       })        
    //     }
    //   })
    // },
    //停用函数
   

  }
}
</script>
