import {GetUserInformationByUserNameLIke,asyncValidateTel,GetUserInformationByTelnum,GetuserInformationbyName,IsReference} from '@/api/manage'
import store from '../../store/'

const Validate={
  
  findbyUserInformation(obj)
  {
    var reg = /^1(3|4|5|7|8|9)\d{9}$/; //验证手机号  
    let reg2=/^[a-zA-Z\u4e00-\u9fa5]+$///验证中文和英文字符
    return new Promise(function(resolve){
      setTimeout(async() => {
        // let obj=new Object();
        // obj.data=val;
        // obj.pageNo=1   
        // obj.pageSize=15    
        
        console.log(obj)
        if(reg.test(obj.data)){
          console.log('是电话 到这了')
          let res = await GetUserInformationByTelnum(obj);
        
          console.log(res)
        
          resolve(res)
        }
        else if(reg2.test(obj.data))
        { 
          console.log(obj);
          let res = await GetUserInformationByUserNameLIke(obj);
          // if(res==-1)
          // {
            
          // }
          console.log(res)
          resolve(res);
        }
        else
        {
          
          let res = await GetuserInformationbyName(obj)
          resolve(res)
        }
      }, 1000);
    })
  }, 
   unique(array){//一维数组去重
    var r = [];
    for(var i = 0, l = array.length; i<l; i++){
      for(var j = i + 1; j < l; j++)
        if(array[i] == array[j]) j == ++i;
      r.push(array[i]);
    }
    return r;
  },
  ValidatePhone(s,id)
  {        
    return new Promise(function(resolve){
        setTimeout(async() => {  
          
              let obj=new Object();
              obj.tel=s;
              obj.ID=id;              
            let res= await asyncValidateTel(obj)
            resolve(res)
        }, 1000);
    })
  },
///^[a-zA-Z\u4e00-\u9fa5]+$/
checkZHZM(rule, value, callback)
{
  let reg=/^[a-zA-Z_、\u4e00-\u9fa5]+$/
  
  if(!value)
  {
    callback();
  }
  else if(!reg.test(value))
  {
    callback('只能输入字幕或中文')
    return
  }
  callback();
},

  // /^[A-Z]+$/
  checkA_Z(rule, value, callback)
  {
    let reg=/^[A-Z]+$/
    
    if(!value)
    {
      callback();
    }
    else if(!reg.test(value))
    {
      callback('标识只能输入大写字母')
      return
    }
    callback();
  },
  
  checkNum1to100(rule, value, callback)
  {
    let reg=/^(100|[1-9]\d|\d)$/
    
    if(!value)
    {
      callback();
    }
    else if(!reg.test(value))
    {
      callback('权重只能输入1-100的数字')
      return
    }
    callback();
  },
  checkNum100to2000(rule, value, callback)
  {
    let reg=/^(2000|[1-9]\d|\d)$/
    
    if(!value)
    {
      callback();
    }
    else if(!reg.test(value))
    {
      callback('只能输入1-2000的数字')
      return
    }
    callback();
  },
  checkNums(rule, value, callback)
  {
    let reg=/^[-+]?\d*$/;  
    
    if(!value)
    {
      callback();
    }
    else if(!reg.test(value))
    {
      callback('只能输入数字')
      return
    }
    callback();
  },
checkNum(rule, value, callback)
{
  let reg=/^[-+]?\d*$/;   
  if(!value)
  {
    callback();
  }
  else if(!reg.test(value))
  {
    callback('QQ只能输入数字')
    return
  }
  callback();
},
checkcharacter (rule, value, callback)
{
  let reg=/([\u4E00-\u9FA5]|[\uFE30-\uFFA0])+/;
  if(!value)
  {
    callback();
    return 
  }else if(!reg.test(value))
  {
    callback('只能输入中文及中文标点符号')
    return
  }
  callback();
},  
checkjob(rule, value, callback)
{
  let reg=/([\u4E00-\u9FA5]|[\uFE30-\uFFA0])+/;
  if(!value)
  {
    callback();
    return 
  }else if(!reg.test(value))
  {
    callback('职务只能输入中文及中文标点符号')
    return
  }
  callback();
},  
checkGroupName(rule, value, callback)
{
  let reg=/([\u4E00-\u9FA5]|[\uFE30-\uFFA0])+/;
  if(!value)
  {
    callback();
    return 
  }else if(!reg.test(value))
  {
    callback('组名称只能输入中文')
    return
  }
  callback();
}, 
checkPhoneNum(rule, value, callback){
  let reg=/^0?1(3|4|5|7|8|9)\d{9}$/; 
  if(!value)
  {
    callback();
    return 
  }else if(!reg.test(value))
  {
    callback('请正确填写手机号。如：13800008888')
    return
  }
    callback();
},
checkTel(rule, value, callback){
  let reg=/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/;
  if(!value)
  {
    callback();
    return 
  }else if(!reg.test(value))
  {
    callback('请正确填写座机号码。如：0739-5388888')
    return
  }
    callback();
},
 async asyncCheckUserName(rule,value,callback){
  let reg = /^[\u0391-\uFFE5]{0,8}$/;
  if(!reg.test(value))
  {
    callback('最多只能输入8个汉字')
    return
  }
  else
  {
    let _obj={};
    _obj.data=value;
    let res = await GetuserInformationbyName(_obj)
      console.log(res);
      callback();
  }
   


},
checkUsername(rule,value,callback)
{
  let reg = /^[\u0391-\uFFE5]{0,8}$/;
  if(!reg.test(value))
  {
    callback('最多只能输入8个汉字')
    return
  }
   callback();

},
async checkPhoneallowNull(rule, value, callback)
{
   let reg=/^0?1(3|4|5|7|8|9)\d{9}$/;   
   let reg2=/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/;//检测座机
   if(!value)
   {
     callback();
     return
   }
   else if (!reg.test(value) && !reg2.test(value))
   {
     callback('请正确填写手机号')  
     return       
   }
   else
   {       
    let s =await Validate.ValidatePhone(value,store.state.user.UserPhoneID)
        console.log(s)   
        if(s.code==-3)
        {
          callback('该手机号已经被其他人使用，请重新填写。')
          return 
        } 
        else
        {
          callback();
        }  
   }
},
async checkPhone(rule, value, callback) {  
    var reg = /^0?1(3|4|5|7|8|9)\d{9}$/;   //检测手机
    let reg2=/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/;//检测座机
    if (!reg.test(value) && !reg2.test(value)) {
       callback('请输入正确的手机号/座机号');              
       return;
    } 
     else     
    {
     
      let s =await Validate.ValidatePhone(value,"-1")
          console.log(s)
          if(s.code==-3)
          {
            store.commit('SET_ReferenceStatus',true); 
            store.commit('SET_ReferenceUserId',s.result.ID);        
            callback('该手机号已经被其他人使用，只能添加引用，不可重复添加。')
          } 
          else
          { 
            store.commit('SET_ReferenceStatus',false);  
            callback();
          }               
    }   
  //   if (!reg2.test(value)) {
  //     callback('请输入正确的座机号码如：07395396272');              
  //     return;
  //  }          
  //  else
  //  {
  //    callback();
  //    return ;
  //  }
  },

  async checkListPhone(value)
  {
    console.log(value);
    var reg = /^0?1(3|4|5|7|8|9)\d{9}$/;   
    if (!reg.test(value.cellphone)) {      
        let data={
          U:value,
          code:'-3',
          msg:'请输入正确手机号'
        }   
      return data
     }
    else 
    {
      let s =await Validate.ValidatePhone(value.cellphone,"-1")
      // const res=await ReferenceAdd({UserPhoneID:value.ID,DepID:value.Department_ID})          
        if(s.code==-3)
        {
          value.RefereStatus=6
          value.ID=s.result.ID
          console.log(value.ID)
          const res=await IsReference({UserPhoneID:value.ID,DepID:value.Department_ID})  
          console.log(res);
          if(res.code==-4)
          {
            let data={
              IsRefecenced:true,
              U:value,
              code:"-5",
              msg:'该手机号已经被该单位使用!'
            }  
            return data
          }
          else
          {
            let data={
              IsRefecenced:false,
              U:value,
              code:"-4",
              msg:'该手机号已经被其他单位使用!'
            }  
            return data
          }
        }
        else
        {
          value.RefereStatus=-1
          let data={
            U:value,
            code:'1'
          }
          return data
        }
      
    } 
  },
  async CheckNameAndTelNum(rule,value,callback)
  {
    var reg = /^1(3|4|5|7|8|9)\d{9}$/;   
    let reg2 = /^[\u0391-\uFFE5]{0,4}$/;
  // if(!reg.test(value))
  // {
  //   callback('姓名只能输入最多4个汉字')
  //   return
  // }
    if(!value)
    {
      let obj=new Object();
      obj.showAdd=false
     
      store.commit('SET_PhoneUSERINFO',obj)
      callback();                 
      return;
    }
  
    if (!reg.test(value) && !reg2.test(value)) {
      callback('请输入正确的手机号或者姓名不得包含符号');              
      return;
    }
    else 
    {
      console.log(value)
      let  parameter={
        pageNo:1,
        pageSize:10
      }
      let _obj=new Object();
      _obj.data=value
      _obj.parameter=parameter
      let _s =await Validate.findbyUserInformation(_obj) 
      console.log(_s)
      let obj=new Object();
      if(_s.code==-1)
      {
        console.log(_s);
        obj.showAdd=true
        obj.code=-1
        store.commit('SET_PhoneUSERINFO',obj)
        callback('该手机号或姓名不存在，请直接添加');                 
        return;
      } 
      else if(_s.isNum)
      {
        obj.username=_s.res.data[0].UserName,
        obj.code=_s.code         
        obj.id=_s.res.data[0].ID,      
        obj.tel=_s.res.data[0].cellphone,   
        obj.UJOB=_s.res.data[0].UJOB,   
        obj.Abbreviation=_s.res.data[0]['ResferecDep.Abbreviation']
        obj.showAdd=false   
        
        store.commit('SET_PhoneUSERINFO',obj); 
      }
      else
      {
        obj.username=_s.res.data[0].UserName,
        obj.code=_s.code         
        obj.id=_s.res.data[0].ID,      
        obj.Abbreviation=_s.res.data[0]['Abbreviation']
        obj.tel=_s.res.data[0].cellphone,   
        obj.UJOB=_s.res.data[0].UJOB,   
        obj.showAdd=false   
        store.commit('SET_PhoneUSERINFO',obj); 
      }        
//  UJOB
// :
// "信息化办主任"
// UserName
// :
// "张海波"
// cellphone
// :
// "13807399838"       
      
       
     
    }   
  },
  async CheckPhoneNumAndchanese(value)//检测0到4位中文和正确的手机号
  {
    var reg = /^1(3|4|5|7|8|9)\d{9}$/;   
    let reg2 = /^[\u0391-\uFFE5]{0,4}$/;
    if(!value)
    {
      return false
    }
    if (!reg.test(value) && !reg2.test(value)) {
          return false
    }
    else
    {
      return true
    }


  } ,
  async Vuex_findByUserInformation(value)
  {
    let  parameter={
      pageNo:1,
      pageSize:10
    }
    let _obj=new Object();
    _obj.data=value
    _obj.parameter=parameter
    let _s =await Validate.findbyUserInformation(_obj) 
     console.log(_s)
      let obj=new Object();
      if(_s.code==-1)
      {
        console.log(_s);
        obj.showAdd=true
        obj.code=-1
        store.commit('SET_PhoneUSERINFO',obj)
        // callback('该手机号或姓名不存在，请直接添加');                 
        return;
      }         
     
        // obj.username=_s.res.UserName,
        // obj.code=_s.code         
        // obj.id=_s.res.ID,      
        // obj.tel=_s.res.cellphone,   
        // obj.showAdd=false   
        console.log(obj);
        obj.username=_s.res.data[0].UserName,
        obj.code=_s.code         
        obj.id=_s.res.data[0].ID,      
        obj.Abbreviation=_s.res.data[0]['Abbreviation']
        obj.tel=_s.res.data[0].cellphone,   
        obj.UJOB=_s.res.data[0].UJOB,   
        obj.showAdd=false   
        console.log(obj);
        store.commit('SET_PhoneUSERINFO',obj); 
        // store.commit('SET_PhoneUSERINFO',obj); 
  } 
}
export default Validate