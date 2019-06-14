<template>
  <a-modal
    title="操作"
    :width="400"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
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
    </a-spin>
  </a-modal>
</template>

<script>
  import { CreateCustomGroup } from '@/api/manage'
  import Validate from '@/tools/Validate/index'
  import { makePy } from '@/assets/js/pinying.js'  
export default {
  name: 'CustomAddModal',
  data () {
    return {
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

      form: this.$form.createForm(this),
      permissions: []
    }
  },
  created () {
    // this.loadPermissions()
  },
  methods: {
    InputpOnChange(e){
      console.log(e)
      let {value} = e.target
      let s=makePy(value)
      console.log(s)
        this.$nextTick(() => {
        this.form.setFieldsValue({
           GroupID:this.mdl.DepID+'-'+this.mdl.Key+'-'+s[0]         
        })
      })
    },
     v(){     
        return Validate;
    },  
    add (s) {
      this.edit(s)
    },
    edit (record) {
      console.log(record)
      this.mdl = Object.assign({}, record)
      this.visible = true
      
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
      this.$nextTick(() => {
        this.form.setFieldsValue({
          DepID:record.DepID,
          GroupID:this.mdl.DepID+'-'+this.mdl.Key+'-',
          GroupName:''
        })
      })
      console.log('this.mdl', this.mdl)
    },
    close () {
      this.$emit('close')
      this.visible = false
    },
    handleOk () {
      const _this = this
      // 触发表单验证
      this.form.validateFields((err, values) => {
        // 验证表单没错误
        if (!err) {
          
          console.log('form values', values)

          _this.confirmLoading = true
          // 模拟后端请求 2000 毫秒延迟
          new Promise((resolve) => {

            setTimeout(() => {
              CreateCustomGroup(values).then(res=>{            
                resolve(res)
              })
            }, 1000)
            }).then(result=>{
                console.log(result)
                if(result.code==-1)
                {
                   _this.$message.error(result.msg)
                   _this.confirmLoading = false
                }
                else
                {
                    _this.$message.success(result.msg)
                    _this.confirmLoading = false
                    _this.close();
                }
              })


          //   setTimeout(() => resolve(), 2000)
          // }).then(() => {
          //   // Do something
          //   _this.$message.success('保存成功')
          //   _this.$emit('ok')
          // }).catch(() => {
          //   // Do something
          // }).finally(() => {
          //   _this.confirmLoading = false
          //   _this.close()
          // })
        }
      })
    },
    handleCancel () {
      this.close()
    },
    onChangeCheck (permission) {
      permission.indeterminate = !!permission.selected.length && (permission.selected.length < permission.actionsOptions.length)
      permission.checkedAll = permission.selected.length === permission.actionsOptions.length
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

</style>
