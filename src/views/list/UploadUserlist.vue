<template>
  <a-card :bordered="false">   
    <div class="table-operator">
      <div>
        <div class="clearfix">
          <a-upload
            :fileList="fileList"
            :remove="handleRemove"
            :beforeUpload="beforeUpload"
            :multiple="false"
          >
            <a-button>
              <a-icon type="upload" /> 选择文件
            </a-button>
          </a-upload>
          <a-button
            type="primary"
            @click="handleUpload"
            :disabled="fileList.length === 0"
            :loading="uploading"
            style="margin-top: 16px"
          >
            {{ uploading ? '上传中...' : '开始上传' }}
          </a-button>
        </div>
        <a-row type="flex" justify="center" align="middle">
          <a-col :span="24">       
            <p class="height-50"><span>温馨提示：上传文件请下载模板，按照模板里的内容填写。</span></p>
          </a-col>
          <!-- <a-col :span="24"><p class="height-50"><span>温馨提示：通讯录里添加的联系人将会出现在通讯录的主目录。</span></p></a-col> -->
     
        </a-row>
      </div>
     
    </div>
    
  
   
    <ImportPhoneUsersModal ref="ImportPhoneUsers" @ok="handleSaveOk" @close="handleSaveClose"/>
  </a-card>

</template>

<script>
  // import reqwest from 'reqwest'
  // import STable from '@/components/table/'
  // import ATextarea from "ant-design-vue/es/input/TextArea"
  // import AInput from "ant-design-vue/es/input/Input"
  // import { mapState} from 'vuex'
   import Validate from '@/tools/Validate/index'
   import { Uploadfiles } from '@/api/manage'


   import ImportPhoneUsersModal from './modules/ImportPhoneUsers/ImportPhone'

  // import UpdateUserModal from './modules/UserPhone/UpdateUserPhone'
  // import SendsmsModal from './modules/sendSMS/sendsms'
  // import PhoneModal from '@/views/list/modules/PhoneMsg/Phone'

  export default {
    name: "UploadTableList",
    components: {
      ImportPhoneUsersModal
      // PhoneModal,
      // AInput,
      // ATextarea,
      // STable,
      // UserModal,
      // UpdateUserModal,
      // SendsmsModal  
    },
    computed:{
      // ...mapState({
      //   S_DEPKEY:state=>state.user.DEPKEY
      // })    
    },
    data () {
      return {    
        fileList: [],
        uploading: false,
        loading:false,
        sDepID:'',
        initLoaddata:[],     
        errlist:[],
        PhoneVisible:false,
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
        UseAddform:null,
        mdl: {},
        Mymdl:{},
        // 高级搜索 展开/关闭
        advanced: true,
        // 查询参数
        queryParam: {},
        // 表头
        // columns: [
        //   {
        //     title: '姓名',
        //     dataIndex: 'UserName'
        //   },
        //   {
        //     title: '状态',
        //     dataIndex: 'Ustatus',
        //     customRender: (text=>{
        //       if(text==9)
        //       {
        //         return '前台显示'
        //       }else if(text==7)
        //       {
        //         return '前台不显示'
        //       }else if(text==6)
        //       {
        //         return '引用'
        //       }
            
        //     }) 
        //   },
        //   {
        //     title: '职务',
        //     dataIndex: 'UJOB',
        //     // sorter: true,
        //     // needTotal: true,
        //     // customRender: (text) => text + ' 次'
        //   },
        //   {
        //     title: '工作座机',
        //     dataIndex: 'Tel',
        //     scopedSlots: { customRender: 'Tel' },
           
        //   },
        //   {
        //   title: '工作手机',
        //   dataIndex: 'cellphone',
        //   scopedSlots: { customRender: 'cellphone' },
        //   // sorter: true,
        //   // needTotal: true,
        //   // customRender: (text) => text + ' 次'
        //   }, 
        //     {
        //   title: '家庭手机',
        //   dataIndex: 'H_cellphone',
        //   scopedSlots: { customRender: 'H_cellphone' },
        //   // sorter: true,
        //   // needTotal: true,
        //   // customRender: (text) => text + ' 次'
        //   },         
        //   {
        //     table: '操作',
        //     dataIndex: 'action',
        //     width: '150px',
        //     scopedSlots: { customRender: 'action' },
        //   }
        // ],    
      }
    },
    created () {
        // getRoleList({ t: new Date()})     
        // GetPermissioninfobyKey({key:'qw'}).then(res=>{
        // console.log(res)
        //  })
    },
    async mounted(){   
      // this.options=await this.GetDepnameAndchild();
    },
    methods: {
      handleSaveOk(){},
      handleSaveClose(){
          console.log('出发上级组件')
          console.log(this.fileList)
      },
          Validation(file)
              {
                var testmsg=file.name.substring(file.name.lastIndexOf('.')+1)				
				const extension = testmsg === 'xls'
				const extension2 = testmsg === 'xlsx'
				const isLt2M = file.size / 1024 / 1024 < 10
				if(!extension && !extension2) {
            this.$message.error('上传文件只能是 xls、xlsx格式');
					// this.$message({
					// 	message: '上传文件只能是 xls、xlsx格式!',
					// 	type: 'warning'
          //           });
                    return false
				}
				if(!isLt2M) {
            this.$message.error('上传文件大小不能超过 10MB!');
					// this.$message({
					// 	message: '上传文件大小不能超过 10MB!',
					// 	type: 'warning'
          //           });
                    return false
				}
				return extension || extension2 && isLt2M
              }, 
      handleRemove(file) {
      const index = this.fileList.indexOf(file);
      const newFileList = this.fileList.slice();
      newFileList.splice(index, 1);
      this.fileList = newFileList
    },
     Getfilesname(file)
              {
                var testmsg=file.name.substring(file.name.lastIndexOf('.')+1)
                  var myDate = new Date();
                  var myYear = myDate.getFullYear();
                  var myMonth = myDate.getMonth() + 1;
                  var mydate = myDate.getDate();                 
                  var myHour = myDate.getHours();
                  var myMinute = myDate.getMinutes();
                  var mySecond = myDate.getSeconds();
                  var mytMilliSecond = myDate.getMilliseconds();
                  return '' + myYear + myMonth + mydate + myHour + myMinute + mySecond + mytMilliSecond+'.'+testmsg

              },
    beforeUpload(file) {
      console.log(file);
           if(!this.Validation(file))
       {
            return false 
       }
        // let fd = new FormData();   
        //  let filename=this.Getfilesname(file);
        // // console.log(file)
        // fd.append('file',file);//传文件
        // fd.append('filename',filename);
        // this.fileList = [...this.fileList, file]
        // Uploadfiles(fd).then(res=>{
        //   console.log(res);
        // })
      this.fileList = [...this.fileList, file]
      if(this.fileList.length>1)
      {
           this.$message.error('一次只能上传一个文件！');
           this.fileList.splice(1); 
           return false; 
      }
      return false;
    },
//      var Sheet1 = data.stream.Sheets.Sheet1;
// console.log(Sheet1);

 sheetToArray(sheet){
    var reg = /^([A-Z])(\d+)$/;
    var objs = [];
    for (var key in sheet) {
        var match = key.match(reg);
        if(match){
            var index = match[2];// A4, 取数字4
            if(index > 2) {// 1和2是属性名
                index = index - 3;// 实际内容从3开始，把3映射到下标0
                if(!objs[index]) {// 创建一个对象
                    objs[index] = {};
                }
                var k = sheet[match[1]+"2"]["v"]; // 取得对应的属性名
                  // console.log(typeof(sheet[key]["v"]));
                  // if(typeof((sheet[key]["v"]))=='string')
                  // {
                   
                  //       objs[index][k] = sheet[key]["v"].replace(/\s/g,'');
                  //        console.log(sheet[key]["v"])
                  // }
                objs[index][k] = sheet[key]["v"]; // 赋值.replace(/(^\s*)|(\s*$)/g, "")
                  
            }
        }
    }
    return objs;
},
    handleUpload() {
        const { fileList } = this;
        let fd = new FormData();   
        this.uploading=true;
        // let filename=this.Getfilesname(file);
        // console.log(file)
        fileList.forEach((item)=>{
        fd.append('file',item);//传文件
        fd.append('filename',this.Getfilesname(item));
        })
        Uploadfiles(fd).then(res=>{
           var _data = res.stream.Sheets.Sheet1;         
           let _temp=  this.sheetToArray(_data)
       
           if(_temp.length>0)
           {          
            this.fileList.splice(0);             
             return _temp;
           }         
        }).then(async res=>{    
          let _Err=[]     
          let resCount=res.length              
      //promise 回传模式
      //     const reslust= async()=>{
      //       return new Promise((resolve)=>{
      //           res.forEach(v=>{
      //            Validate.checkListPhone(v).then(res=>{
      //              resCount--;
      //              _Err.push(res);
      //              if(resCount==0)
      //              {
      //                    resolve(_Err);
      //              }                   
      //         })
      //       })
           
      //   })
      // }
      // let _res=await reslust();
      console.log(res);//返回excel表里的数据 数组对象 [{}]
          res.forEach(v => {                    
            Validate.checkListPhone(v).then(res=>{//把数据循环交给 checkListPhone方法进行检查
                _Err.push(res);
                resCount--;
                if(resCount==0)
                {           
                  this.uploading=false;
                  if(!this.uploading)
                  {
                    console.log('显示导入的from');
                    console.log(_Err);
                    this.$refs.ImportPhoneUsers.add(_Err);
                    // _Err.splice(0);  
                    // console.log(_Err);
                  }
                }
              })            
          });            
                   
        })
      },    
    },
  watch: {
    '$route'()
    {        
    
    }

    
},


 

  }
</script>
<style scoped>
.content .table-operator
{
  margin-bottom:0px;
}
p
{
  margin-top:10px;
}
</style>

  
