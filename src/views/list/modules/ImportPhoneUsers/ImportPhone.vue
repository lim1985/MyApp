<template>
  <a-modal
    title="批量导入"
    :width="1000"
    :height="800"
    v-model="AddVisible"
    @ok="handleOk"
    @cancel="close"
    :okButtonProps="{ props: {disabled: Isdisabled} }"
    :cancelButtonProps="{ props: {disabled: false} }"
  >
    <a-spin :spinning="confirmLoading">
        
      <a-table 
        size="default" 
        ref="mytable"
        :rowKey="Userslist=>Userslist.index"
        :columns="columns" 
        :dataSource="Userslist" 
        :pagination="{ pageSize: 30 }" 
        :scroll="{ y: 550 }" 
      >

        <template slot="operation" slot-scope="text,record">
          <a-divider type="vertical" />
          <img width="20px" src="http://www.dxzc.gov.cn/images/gou.png" v-if="text=='1'"/>  
          <!-- <button v-if="text=='1'">正常</button> -->
          <div v-if="text=='-4'">
            <a-button @click="refcenes(record)" type="primary" size="default">引用</a-button>
            <!-- <a-button @click="ObjDelete(record.cellphone)" type="danger" size="default">删除</a-button> -->
          </div>
          <div v-if="text=='-5'">           
            <a-button @click="ObjDelete(record.cellphone)" type="danger" size="default">删除</a-button>
          </div>
        </template>
        <!-- <a slot="operation" slot-scope="text" @click="showButton(text)">action</a> -->
        <!-- <span slot="operation" slot-scope="text">
          <a @click="showButton(text)">
            操作
          </a> 
        </span> -->    
      </a-table>
    </a-spin>
  </a-modal>  
</template>
<script>
 import STable from '@/components/table/'

//getRoleList, getServiceList,
 
 
//   import Vue from 'vue'  
//   import { User_ID } from "@/store/mutation-types" 
   import { GetUserByNameAndDepID ,importUsersList} from '@/api/manage'
//   import { Promise } from 'q';
//   import Validate from '@/tools/Validate/index'
   import { makePy } from '@/assets/js/pinying.js'  

  //GetALLByDepID,asyncValidateTel,QueryAllDeplist,UpdatePartment,DelDePartment
// ];
export default {
  name: 'ImportPhoneuserModal', 
     components: {
      STable
    },
  data () {
    return {  
  Isdisabled:true,
  columns:[{
  title: '姓名',
  dataIndex: 'UserName',
  width: 80,
}, 
{
  title: '性别',
  dataIndex: 'Sex',
  width: 60,
    customRender: (text=>{
       return text=='1'?'男':'女'                    
   }) 
}, 
{
  title: '工作手机',
  dataIndex: 'cellphone',
  width: 120,
}, 
{
  title: '描述',
  dataIndex: 'msg',
  width: 520,

}, 
 {
    title: '操作',
     width: 160,
    // fixed: 'right',
    dataIndex: 'code',
    key: 'operation',
    scopedSlots: { customRender:'operation' }     
  }
],
      Userslist:[],
      mdl: {},
      Mymdl:{},    
      AddVisible:false,
      tel:'',
      Isvalidate:false,
      status:'',
      Tips:'',
      options:[],
      selectedRowKeys: [],
      selectedRows: [],     
      visible: false,
      confirmLoading: false
     
     
    }
  },
  beforeCreate () {
    // this.form = this.$form.createForm(this)
    // console.log('form::', this.form)
  },
  created () {
    
  },
    computed:{
    
    },
   watch: {
  
      },
      
  async mounted(){   
    //   this.DepName=await this.GetDepName()
    //    console.log(this.options)    
    },
  methods:  {
      ObjDelete(val){
         console.log(val)
     
         let i=0
      for(let x in this.Userslist)
         {
            if(this.Userslist[x].code=='-5')
            {
            i++
            if(this.Userslist[x].cellphone==val)
                {  
                this.Userslist.splice(x, 1)    
                i--                   
                }
            }           
        }  
            console.log(this.Userslist);
            console.log(i);
            if(i==0)
            {
                this.Isdisabled=false;
            }
      },
      refcenes(val){
          console.log(val)
      },
  
  async checkUserList(arr){//检测已经存在于该单位的同样手机号，同样姓名的联系人
    //    console.log(this.Userslist);
      let res =await GetUserByNameAndDepID(arr);
      let _newArr=[]
         for(let x in res.res)
         {            
             if(res.res[x])
             {
              _newArr.push(res.res[x])            
             }             
         }
    //   console.log(_newArr);
     return _newArr;
   },
    add (val) {
      this.edit(val);
    },
    edit (val) {      
        console.log(val);
      val.map((item,index)=>{
        //   console.log(item,index);
          this.Userslist.push({
            Permission_Key:item.U.Permission_Key,
            Department_ID:item.U.Department_ID,
            code:item.code,
            index:index,
            IsRefecenced:item.IsRefecenced,
            UserName:item.U.UserName,
            RefereStatus:item.U.RefereStatus,
            Sex:item.U.Sex,
            UJOB:item.U.UJOB,
            cellphone:item.U.cellphone,
            msg:item.msg,
            status:9,
            ID:item.U.ID,
            Py_Index:makePy(item.U.UserName)[0]
        });
      })  
  
  console.log(this.Userslist);
       if(this.Userslist.length>0)
       {
         
        this.checkUserList(this.Userslist).then(res=>{
             
           for(let x in this.Userslist)
           {
                // console.log(this.Userslist)
                // console.log(res)
                        
                        if(res.length==0)
                        {
                            console.log('返回数组为空！')
                            this.Isdisabled=false;
                        }
                        for(let y in res)
                    {
                        
                        if(this.Userslist[x].Department_ID==res[y].Department_ID && this.Userslist[x].cellphone==res[y].cellphone || this.Userslist[x].UserName==res[y].UserName)
                        {
                                this.Userslist[x].code='-5'
                        }                              
                    }
              
                        
           }             
        }) 
        // console.log(this.Userslist);       
       }
//       'UserName': s.UserName,
//       'Department_ID': s.DepKeylist[1],
//       'Permission_Key':s.DepKeylist[0],
//       'UJOB': s.UJOB,
//       'Tel': s.tel,
//       'H_Tel': s.htel,
//       'cellphone': s.cellphone,
//       'H_cellphone': s.hc,
//       'QQ': s.qq,
//       'avatar': s.avatar,
//       'inTime':timestamp,
//       'BirthDay': s.bhd,
//       'Type': s.type,
//       'OrderID': s.orderid,
//       'Sex': s.Sex,
//       'status': s.status,
//       'Email':'',
//       'Py_Index':s.Py_Index,
//       'beizhu':s.beizhu  

      this.$nextTick(() => {
        // this.form.resetFields();
        // this.form.setFieldsValue({ ...record })
        
       
         
        this.AddVisible = true;
      })
    },
    close () {
         this.Userslist=[]
         this.Isdisabled=true;
         this.$emit('close')
         this.AddVisible = false    
    },  
    handleCancel () {
     
    },
    async handleOk () {
          const _this = this
          let res=await importUsersList(_this.Userslist);
          console.log(res);
      // 触发表单验证
    //   this.form.validateFields((err, values) => {
    //     // 验证表单没错误
    //     if (!err) {
    //       console.log('form values', values)
    //       _this.confirmLoading = true
            
    //     }
    //   })
    },
      HandleUserPhoneAdd(e)
        {
        // this.Mymdl.Sex=this.Sex
        console.log(this.Mymdl)
        e.preventDefault()
         this.form.validateFields(async(err, values) => {

           console.log(values)
         
          
         })   
    },

  }
}
</script>
