import {asyncValidateTel,GetUserInformationByTelnum,GetuserInformationbyName} from '@/api/manage'
import store from '../../store/'

const Validate={
  
  findbyUserInformation(val)
  {
    var reg = /^1(3|4|5|7|8|9)\d{9}$/;   
    return new Promise(function(resolve){
      setTimeout(async() => {
        let obj=new Object();
        obj.data=val;
        if(reg.test(obj.data)){
          let res = await GetUserInformationByTelnum(obj);
          resolve(res)
        }
        else
        {
          let res = await GetuserInformationbyName(obj)
          resolve(res)
        }
      }, 1000);
    })
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
  let reg=/^[a-zA-Z\u4e00-\u9fa5]+$/
  
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
checkUsername(rule,value,callback)
{
  let reg = /^[\u0391-\uFFE5]{0,4}$/;
  if(!reg.test(value))
  {
    callback('姓名只能输入最多4个汉字')
    return
  }
   callback();

},
async checkPhoneallowNull(rule, value, callback){
   let reg=/^1(3|4|5|7|8|9)\d{9}$/; 
   if(!value)
   {
     callback();
     return
   }
   else if(!reg.test(value))
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
        } 
        else
        {
          callback();
        }  
   }
},
async checkPhone(rule, value, callback) {  
    var reg = /^1(3|4|5|7|8|9)\d{9}$/;   
    if (!reg.test(value)) {
       callback('请输入正确的手机号');              
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
          { store.commit('SET_ReferenceStatus',false);  
            callback();
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
  
    if (!reg.test(value) && !reg2.test(value)) {
      callback('请输入正确的手机号或者姓名不得包含符号');              
      return;
    }
    else 
    {
      let _s =await Validate.findbyUserInformation(value) 
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
        obj.username=_s.res.UserName,
        obj.code=_s.code         
        obj.id=_s.res.ID,      
        obj.tel=_s.res.cellphone,   
        obj.showAdd=false   
        store.commit('SET_PhoneUSERINFO',obj); 
    }   
  },
  async Vuex_findByUserInformation(value)
  {
    let _s =await Validate.findbyUserInformation(value) 
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
        obj.username=_s.res.UserName,
        obj.code=_s.code         
        obj.id=_s.res.ID,      
        obj.tel=_s.res.cellphone,   
        obj.showAdd=false   
        store.commit('SET_PhoneUSERINFO',obj); 
  } 
}
export default Validate