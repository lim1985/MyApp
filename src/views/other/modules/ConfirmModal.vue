<template>
 
    <a-popconfirm v-show="visible" title="Are you sure delete this task?" @confirm="confirm" @cancel="cancel" okText="Yes" cancelText="No">
    <a href="#">Delete</a>
  </a-popconfirm>
 
</template>

<script>
export default {
  name: 'OrgModal',
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
      mdl: {}
    }
  },
  beforeCreate () {
    this.form = this.$form.createForm(this)
    console.log('form::', this.form)
  },
  created () {

  },
  methods: {
       confirm (e) {
      console.log(e)
      this.$message.success('Click on Yes')
    },
    cancel (e) {
      console.log(e)
      this.$message.error('Click on No')
    },
    show(){
      this.visible=true;

    },
    add (id) {
      this.edit({ parentId: id })
    },
    edit (record) {
      this.mdl = Object.assign({}, record)
      this.visible = true
      this.$nextTick(() => {
        this.form.setFieldsValue({ ...record })
      })
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
            setTimeout(() => resolve(), 2000)
          }).then(() => {
            // Do something
            _this.$message.success('保存成功')
            _this.$emit('ok')
          }).catch(() => {
            // Do something
          }).finally(() => {
            _this.confirmLoading = false
            _this.close()
          })
        }
      })
    },
    handleCancel () {
      this.close()
    }

  }
}
</script>
