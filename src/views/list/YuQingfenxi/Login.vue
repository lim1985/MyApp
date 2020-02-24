<template>
  <div class="main">
    <a-form :form="form" class="user-layout-login" ref="formLogin" id="formLogin">
      <!-- <a-form :autoFormCreate="(form)=>{this.form = form}" > -->
      <a-tabs
        :activeKey="customActiveKey"
        :tabBarStyle="{ textAlign: 'center', borderBottom: 'unset' }"
        @change="handleTabClick">
        <a-tab-pane key="tab1" tab="账号密码登陆111">
          
          <a-form-item        
            hasFeedback    
          > 
            <!-- <a-input placeholder='填正确填写部门简称' v-model="Mymdl.Abbreviation" id='Abbreviation' /> -->
            <a-input 
              size="large" 
              placeholder='输入管理员账号' 
              v-decorator="['username',{rules: [{ validator: this.handleUsernameOrEmail },{ required: true, message: '管理员姓名不能为空！' }]}]"
            /> 
          </a-form-item>
          <!-- <a-form-item
            fieldDecoratorId="username"
            :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入帐户名或邮箱地址' }, { validator: this.handleUsernameOrEmail }], validateTrigger: 'change'}"
          >
            <a-input size="large" type="text" placeholder="帐户名或邮箱地址">
              <a-icon slot="prefix" type='user' :style="{ color: 'rgba(0,0,0,.25)' }"/>
            </a-input>
          </a-form-item> -->
          <!-- "username":username,
        "password":password,
        "kaptcha":kaptchaCode -->
          <!-- <a-form-item
            fieldDecoratorId="password"
            :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入密码' }], validateTrigger: 'blur'}">
            <a-input size="large" type="password" placeholder="密码">
              <a-icon slot="prefix" type='lock' :style="{ color: 'rgba(0,0,0,.25)' }"/>
            </a-input>
          </a-form-item> -->
          <a-form-item        
            hasFeedback    
          > 
            <!-- <a-input placeholder='填正确填写部门简称' v-model="Mymdl.Abbreviation" id='Abbreviation' /> -->
            <a-input 
              size="large" 
              placeholder='输入管理员密码' 
              type="password"
              v-decorator="['password',{rules: [{ required: true, message: '密码不能为空！' }]}]"
            /> 
          </a-form-item>
          <a-form-item>
            <a-input 
              size="large" 
              placeholder='输入验证码'             
              v-decorator="['kaptcha']"
            /> 
            <img src='http://172.20.8.28:8080/getCode' />     
          </a-form-item>
        </a-tab-pane>
        <a-tab-pane key="tab2" tab="手机号登陆">

          <!-- <a-form-item
                v-bind="formItemLayout"
                label='部门简称'
                hasFeedback    
              > -->
          <!-- <a-input placeholder='填正确填写部门简称' v-model="Mymdl.Abbreviation" id='Abbreviation' /> -->
          <!-- <a-input 
            placeholder='输入部门简称' 
            v-decorator="['Abbreviation',{rules: [{ required: true, message: '部门简称不能为空！' },{validator:v().checkjob}]}]"
          /> 
        </a-form-item> -->

          <a-form-item
            hasFeedback    
          > 
            <!-- <a-input placeholder='填正确填写部门简称' v-model="Mymdl.Abbreviation" id='Abbreviation' /> -->
            <a-input 
              size="large" 
              placeholder='手机号' 
              v-decorator="['mobile',{rules: [{ required: true, message: '请输入正确的手机号' },{validator:v().checkPhoneNum}]}]"
            /> 
          </a-form-item>
          <!-- 
          <a-form-item
            fieldDecoratorId="UserName"
            :fieldDecoratorOptions="{rules: [{ required: true, pattern: /^[\u0391-\uFFE5]{0,4}$/, message: '请输入姓名' }], validateTrigger: 'change'}">
            <a-input size="large" type="text" placeholder="姓名">
              <a-icon slot="prefix" type='UserName' :style="{ color: 'rgba(0,0,0,.25)' }"/>
            </a-input>
          </a-form-item> -->

          <!-- <a-form-item
            fieldDecoratorId="mobile"
            :fieldDecoratorOptions="{rules: [{ required: true, pattern: /^1[345789]\d{9}$/, message: '请输入正确的手机号' }], validateTrigger: 'change'}">
            <a-input size="large" type="text" placeholder="手机号">
              <a-icon slot="prefix" type='mobile' :style="{ color: 'rgba(0,0,0,.25)' }"/>
            </a-input>
          </a-form-item> -->

          <a-row :gutter="16">
            <a-col class="gutter-row" :span="16">
              <!-- <a-form-item
                fieldDecoratorId="captcha"
                :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入验证码' }], validateTrigger: 'blur'}">
                <a-input size="large" type="text" placeholder="验证码">
                  <a-icon slot="prefix" type='mail' :style="{ color: 'rgba(0,0,0,.25)' }"/>
                </a-input>
              </a-form-item> -->
              <a-form-item
                hasFeedback    
              > 
                <!-- <a-input placeholder='填正确填写部门简称' v-model="Mymdl.Abbreviation" id='Abbreviation' /> -->
                <a-input 
                  size="large" 
                  placeholder='验证码' 
                  v-decorator="['captcha',{rules: [{ required: true, message: '请输入验证码' }]}]"
                /> 
              </a-form-item>
            </a-col>
            <a-col class="gutter-row" :span="8">
              <a-button
                class="getCaptcha"
                :disabled="state.smsSendBtn"
                @click.stop.prevent="getCaptcha"
                v-text="!state.smsSendBtn && '获取验证码' || (state.time+' s')"></a-button>
            </a-col>
          </a-row>
        </a-tab-pane>
      </a-tabs>

      <a-form-item>
        <a-checkbox v-model="formLogin.rememberMe">自动登陆</a-checkbox>
        <router-link :to="{ name: 'recover', params: { user: 'aaa'} }" class="forge-password" style="float: right;">
          忘记密码
        </router-link>
      </a-form-item>

      <a-form-item style="margin-top:24px">
        <a-button
          size="large"
          type="primary"
          htmlType="submit"
          class="login-button"
          :loading="loginBtn"
          @click.stop.prevent="handleSubmit"
          :disabled="loginBtn">确定
        </a-button>
      </a-form-item>

      <div class="user-login-other">
        <span>其他登陆方式</span>
        <div class="hunanlogin">
          <!-- http://zwfw.hunan.gov.cn/hnvirtualhall/login.jsp?areacode=430503999000&redirect_url=http://www.dxzc.gov.cn/Government/Letter/Letterwriter.aspx?DepartmentId=15&code= -->
          <!-- <router-link :to="{ path: 'http://zwfw.hunan.gov.cn/hnvirtualhall/login.jsp?areacode=430503999000', query: { redirect_url: 'http://172.20.8.28' }}"><img width="40%" style="padding:5px" src="http://zwfw-new.hunan.gov.cn/hnzwfw/zwfw4/images/app_logo.png" /><span>一体化平台登陆</span></router-link> -->
          <a @click="gotoHunan()"><img width="40%" style="padding:5px" src="http://zwfw-new.hunan.gov.cn/hnzwfw/zwfw4/images/app_logo.png" /><span class="ss">统一登录入口</span></a>        
        </div>
       
        <!-- <a><a-icon class="item-icon" type="alipay-circle"></a-icon></a>
        <a><a-icon class="item-icon" type="taobao-circle"></a-icon></a>
        <a><a-icon class="item-icon" type="weibo-circle"></a-icon></a> -->
        <router-link class="register" :to="{ name: 'register' }">
          注册账户
        </router-link>
      </div>
    </a-form>

    <two-step-captcha
      v-if="requiredTwoStepCaptcha"
      :visible="stepCaptchaVisible"
      @success="stepCaptchaSuccess"
      @cancel="stepCaptchaCancel"></two-step-captcha>
  </div>
</template>

<script>
 
 
  // import api from '@/api'
  import TwoStepCaptcha from '@/components/tools/TwoStepCaptcha'
  import { yuqingLogin } from '@/api/manage' //YQGetCode
  import { mapActions } from "vuex"
  import { timeFix } from "@/utils/util"
  import Validate from '@/tools/Validate/index'
  // import user from '@/store/modules/user'
  export default {
    components: {
      TwoStepCaptcha
    },
    data () {
      return {
        Userinfo:{},
        go:false,
        gotoLogin:false,
        customActiveKey: "tab1",
        loginBtn: false,
        // login type: 0 email, 1 username, 2 telephone
        loginType: 0,
        requiredTwoStepCaptcha: false,
        stepCaptchaVisible: false,
        form: null,
        state: {
          time: 60,
          smsSendBtn: false,
        },
        formLogin: {
          username: "",
          password: "",
          captcha: "",
          mobile: "",
          rememberMe: true
        },
        CodeUrl:''
      }
    },
    mounted(){
      // console.log(this.$route.path);
      // console.log(window.location.href);

    },
  //     beforeCreate () {
  //   this.form = this.$form.createForm(this)
  //   console.log('form::', this.form)
  // },
   async created () 
   {   
      //  if(_Logins!='')
      //  {

      //  }
      // this.form.setFieldsValue({
      //     username: _Logins[0],
      //     password: _Logins[1]
      //   })
      // let url=window.location;
      // console.log(url.search);
      // if(url.search)
      // {
      //   //http://api.dxzc.gov.cn:3000/api/getalluserinfo?code='+s
      //   //?code=d3zdsJ-lTZe3hOba5WfgtQ&userType=1
      //   let res=url.search.split('=')

      //   let s=res[1];
      //   console.log(s.split("&"));
      //   let a=s.split('&');
      //   console.log(a[0]);
      //   //zIsRSTuoR721YPw1kuMgyQ&userType
      //   //"9OhFCnFHSAOhFMcfTv3Efg&userType"
      //   // let _arrs=res[1].splice('&');
      //   // console.log(_arrs)
      //   let userinformation= await GetUserInformation({code:a[0]});
       
      //   // if(userinformation)
      //   if(userinformation.c=='{"errorCode":"invalid_clie'|| userinformation.c=='{"errorCode":"invalid')
      //   {
      //     console.log('妈的，参数都写错了')
      //     return 
      //   }
      //   else
      //   { 
      //      let toJson=JSON.parse(userinformation.c);
      //      if(toJson.phone)
      //      {
      //         this.go=true;
      //         console.log(toJson);
      //         this.Userinfo=toJson;
      //         this.handleSubmit();
      //      }
      //   }
       
        
      //   //let json=JSON.parse(userinformation.c)
    
       
      //   //  console.log(json)
      // //   //"errorCode":"invalid_client" "errorCode":"invalid_clie"     "{"errorCode":"invalid_client",    
      // //  if(json.phone)
      // //  {
      // //    console.log('可以了')
      // //    this.go=true;
      // //    this.handleSubmit();
      // //  }
      // }
      // else
      // {
      //   console.log('没有获取到code')
      // }
    //  let res=this.GetRequest()
       
      // this.$http.get('/auth/2step-code')
      //   .then(res => {
     
      //     this.requiredTwoStepCaptcha = res.result.stepCode
      //   }).catch(err => {
      //     console.log('2step-code:', err)
      //   })
     // this.requiredTwoStepCaptcha = true
     
    this.form = this.$form.createForm(this)
    console.log('form::', this.form)
  
    },
    methods: {
   GetRequest() {   
   var url = location.search; //获取url中"?"符后的字串   
   var theRequest = new Object();   
   if (url.indexOf("?") != -1) {   
      let str = url.substr(1);   
      let  strs = str.split("&");   
      for(var i = 0; i < strs.length; i ++) {   
         theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);   
      }   
   }   
   return theRequest;   
}   ,
      gotoHunan(){
        console.log('ssssss')
        this.gotoLogin=true;
        window.location="http://zwfw-new.hunan.gov.cn/hnvirtualhall/login.jsp?areacode=430503999000&redirect_url="+window.location.href; 
        //href="http://zwfw.hunan.gov.cn/hnvirtualhall/login.jsp?areacode=430503999000&redirect_url=http://172.20.8.28:8080
      },
      // getCode(fullpath)
      // {
      //   // str.replace(/\?.*/,'?')
      //   console.log(fullpath);
      //   let s= fullpath.replace(/^([^\?]*).*$/)
      //   console.log(s)
      // },
      v(){     
       return Validate;
    },  
      ...mapActions([ "Login", "Logout" ]),
      // handler
      handleUsernameOrEmail (rule, value, callback) {
        const regex = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
        if (regex.test(value)) {
          this.loginType = 0
        } else {
          this.loginType = 1
        }
        callback()
      },
      handleTabClick (key) {
        this.customActiveKey = key
        // this.form.resetFields()
      },
      handleSubmit () {
        let that = this
        let flag = false
        let jsonObj
        let loginParams = {
        //   remember_me: that.formLogin.rememberMe
        };
        if(that.go)
        {
          loginParams = Object.assign(loginParams, this.Userinfo)
          console.log(loginParams);
          console.log('到这了，可以发给后台了')   
          that.loginBtn = true
          console.log(loginParams)
          that.Login(loginParams).then((res) => {
          console.log('服务器回传的')
          console.log(res);   
          if(res.code===1)
          {
            that.loginSuccess(res)    
          }    
          else
          {
            this.$message.error(timeFix()+','+ res.message, 3)
            that.loginBtn = false
          }      
        }) 
               
        }       
        else
        {
           console.log(loginParams)
        // 使用账户密码登陆 this.form.validateFields((err, values) => {
        if (that.customActiveKey === 'tab1') {
          that.form.validateFields([ 'username', 'password','kaptcha' ], { force: true }, (err, values) => {
            if (!err) {
              flag = true
             // console.log(username , password);
           //  console.log(values.username+','+values.password);
              console.log(values);
              loginParams[!that.loginType ? 'email' : 'username'] = values.username
              loginParams.password =values.password
              loginParams.kaptcha =values.kaptcha
              console.log(loginParams);
                jsonObj = JSON.stringify(loginParams);
              if(loginParams.remember_me)
              {
                // password:"52979899"
                // username:"admin"
               let userObj={
                 username:values.username,
                 passowrd:values.password,
                 kaptcha:values.kaptcha
               };
            
                localStorage.setItem("UserLogins",JSON.stringify(userObj));
              }
            }
          })
          
        // 使用手机号登陆
        } else {
          console.log(that.customActiveKey)
          that.form.validateFields([ 'mobile', 'captcha' ], { force: true }, (err, values) => {
         
            if (!err) {
              flag = true
              loginParams = Object.assign(loginParams, values)
           
            }
          })
        }
      }
        if (!flag) return

        that.loginBtn = true
        console.log(jsonObj)
        yuqingLogin(jsonObj).then((res) => {
          console.log('服务器回传的')
          console.log(res);   
        //   if(res.code===1)
        //   {
        //     that.loginSuccess(res)    
        //   }    
        //   else
        //   {
        //     this.$message.error(timeFix()+','+ res.message, 3)
        //     that.loginBtn = false
        //   }      
        })
        // .catch((err) => {
        //   that.requestFailed(err);
        // })

      },
    //   getCaptcha (e) {
    //     e.preventDefault()
    //     let that = this

    //     this.form.validateFields([ 'mobile' ], { force: true },
    //       (err,values) => {
    //         if (!err) {
    //           console.log(values);
    //           this.state.smsSendBtn = true;

    //           let interval = window.setInterval(() => {
    //             if (that.state.time-- <= 0) {
    //               that.state.time = 60;
    //               that.state.smsSendBtn = false;
    //               window.clearInterval(interval);
    //             }
    //           }, 1000);
    //           let _data={            
    //             "mobile":values.mobile     
    //           }
    //           const hide = this.$message.loading('验证码发送中..', 0);
    //              GetVerificatCode(JSON.stringify(_data)).then(res=>{
    //                console.log(res);
    //                if(res.res=='短信发送成功')
    //                {
    //                   setTimeout(hide, 2500);
    //                   this.$notification[ 'success' ]({
    //                     message: '提示',
    //                     description: '发送成功，请查看手机上的验证码',
    //                     duration: 8
    //                   })
    //                }
    //                else
    //                {
    //                  if(res.code==-1)
    //                  {
    //                     setTimeout(hide, 2500);
    //                   this.$notification[ 'error' ]({
    //                     message: '提示',
    //                     description: '该手机号不是管理员，如需要开通账号请与系统管理员联系',
    //                     duration: 8
    //                   })
    //                  }
    //                }
                                   
    //              })  
    //               .catch(err => {
    //               setTimeout(hide, 1);
    //               clearInterval(interval);
    //               that.state.time = 60;
    //               that.state.smsSendBtn = false;
    //               this.requestFailed(err);
    //             });
    //           // this.$http.post(api.SendSms, { mobile: that.formLogin.mobile })
    //           //   .then(res => {
    //           //     setTimeout(hide, 2500);
    //           //     this.$notification[ 'success' ]({
    //           //       message: '提示',
    //           //       description: '验证码获取成功，您的验证码为：' + res.result.captcha,
    //           //       duration: 8
    //           //     })
    //           //   })
    //             // .catch(err => {
    //             //   setTimeout(hide, 1);
    //             //   clearInterval(interval);
    //             //   that.state.time = 60;
    //             //   that.state.smsSendBtn = false;
    //             //   this.requestFailed(err);
    //             // });
    //         }
    //       }
    //     );
    //   },
      stepCaptchaSuccess () {
        this.loginSuccess()
      },
      stepCaptchaCancel () {
        this.Logout().then(() => {
          this.loginBtn = false
          this.stepCaptchaVisible = false
        })
      },
      loginSuccess (res) {
        this.loginBtn = false
        this.$router.push({ name: "index" })
        this.$message.success(timeFix()+res.username + '，欢迎回来', 3)
      },
      requestFailed (err) {
        this.$notification[ 'error' ]({
          message: '错误',
          description: ((err.response || {}).data || {}).message || "请求出现错误，请稍后再试",
          duration: 4,
        });
        this.loginBtn = false;
      },
    }
  }
</script>

<style lang="scss" scoped>
.ss{
  font-family:"黑体,宋体，微软雅黑";
  color:#fff;
  font-weight: 800;
  font-size: 14px;
  letter-spacing:1px;
}
.hunanlogin { 
   background-color: #1890ff;
   border-radius: 5px;
}
  .user-layout-login {
    label {
      font-size: 14px;
    }

    .getCaptcha {
      display: block;
      width: 100%;
      height: 40px;
    }

    .forge-password {
      font-size: 14px;
    }

    button.login-button {
      padding: 0 15px;
      font-size: 16px;
      height: 40px;
      width: 100%;
    }

    .user-login-other {
      text-align: left;
      margin-top: 24px;
      line-height: 22px;

      .item-icon {
        font-size: 24px;
        color: rgba(0,0,0,.2);
        margin-left: 16px;
        vertical-align: middle;
        cursor: pointer;
        transition: color .3s;

        &:hover {
          color: #1890ff;
        }
      }

      .register {
        float: right;
      }
    }
  }

</style>