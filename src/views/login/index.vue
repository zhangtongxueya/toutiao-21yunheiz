<template>
  <div class="login-container">
    <div class="login-head"></div>
    <!-- el-form 表单组件   每个表单项都必须使用 el-form-item 组件包裹  -->
    <!--
      配置 form 表单验证:
      1.必须给 el-form 组件绑定 model 为表单数据对象
      2.给需要验证的表单项 el-form-item 绑定 prop 属性
         prop 属性设置为需校验的字段名(表单对象中的数据名称)
      3.通过 el-form 组件的 rules 属性配置验证规则

      没输入内容,直接点击 登录按钮 不会触发表单验证(优化这个方面)
      1.给 el-form 设置 ref 起个名字
      2.通过 ref 获取 el-form 组件,调取组件的 validate 方法
    -->
    <el-form class="login-from" ref="login-form" :model="user" :rules="formRules">
      <el-form-item prop="mobile">
        <el-input v-model="user.mobile" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input v-model="user.code" placeholder="请输入验证码"></el-input>
      </el-form-item>
      <el-form-item prop="agree">
        <el-checkbox v-model="user.agree">我已阅读并同意用户协议和隐私条款</el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onLogin" class="login-btn" :loading="loginLoading">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// import request from '@/utils/requert'  请求统一在 api/user 中管理,所以这里不需要了

import {
  login
} from '@/api/user'

export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '13911111111', // 手机号
        code: '246810', // 验证码
        agree: false // 是否同意协议
      },
      loginLoading: false, // 登录的 loading 状态
      formRules: { // 表单验证规则配置
        mobile: [{
          required: true,
          message: '手机号不能为空',
          trigger: 'blur'
        },
        {
          pattern: /^1[3|5|7|8|9]\d{9}$/,
          message: '请输入正确的号码格式',
          trigger: 'blur'
        }
        ],
        code: [{
          required: true,
          message: '验证码不能为空',
          trigger: 'blur'
        },
        {
          pattern: /^\d{6}$/,
          message: '请输入正确的验证码格式',
          trigger: 'blur'
        }
        ],
        agree: [{
          // 自定义校验规则
          // 通过验证: callback()
          // 验证失败: callback(new Error("错误消息"))
          validator: (rule, value, callback) => {
            // console.log(value)
            if (value) {
              callback()
            } else {
              callback(new Error('请同意用户协议'))
            }
          },
          trigger: 'change'
        }]
      }
    }
  },
  methods: {
    onLogin () {
      // 获取表单数据(根据接口要求绑定数据)
      // const user = this.user
      // 表达那验证
      this.$refs['login-form'].validate(valid => {
        // console.log(valid)
        // 如果表单验证失败,停止请求提交
        if (!valid) {
          return
        }
        // 验证通过,请求登录
        this.login()
      })
    },
    login () {
      // 验证通过,提交登录
      // 开启登陆中 loading....
      this.loginLoading = true

      // request({
      // method: 'POST',
      // url: '/mp/v1_0/authorizations',
      // data: this.user
      // })
      // 优化代码中的请求操作
      // 1.接口请求可能需要重用
      // 2.实际工作中,接口非常容变动,改起来麻烦
      // 建议把所有的请求都封装成一个函数然后统一的组织到模块中进行管理
      // 好处: 管理.维护更方便,也好重用 (api/user.js)
      login(this.user).then(res => { // this.user 就是传到 api/user 中的data
        // 登录成功
        // console.log(res)
        this.$message({
          message: '登录成功',
          type: 'success'
        })
        // 登录成功或者失败都要关闭 loading...
        this.loginLoading = false

        // 将接口返回的用户数据放到本地存储，方便应用 数据 共享
        // 本地存储只能存储字符串，如果存储对象，数组之类的数据，需要转成 JSON 格式字符串存储
        window.localStorage.setItem('user', JSON.stringify(res.data.data))

        // 跳转首页
        // this.$router.push('/')
        this.$router.push({
          name: 'home'
        })
      }).catch(err => {
        console.log('登录失败', err)
        this.$message.error('登录失败,手机号或者验证码出错误')
        // 登录成功或者失败都要关闭 loading...
        this.loginLoading = false
      })
      // 处理后端响应结果
      // 成功: xxx 失败: xxx
    }
  }
}

</script>
<style scoped lang="less">
  .login-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: url("./login_bg.jpg") no-repeat;
    background-size: cover;

    .login-head {
      width: 300px;
      height: 57px;
      margin-bottom: 20px;
      background: url("./logo_index.png") no-repeat;
    }

    .login-from {
      background-color: #fff;
      padding: 50px;
      min-width: 300px;

      .login-btn {
        width: 100%;
      }
    }
  }

</style>
