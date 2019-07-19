<template>
  <div class="login_container">
    <!-- 头像区域de  -->
    <div class="login_box">
      <div class="avatar_box">
        <img src="../assets/timg.jpg" alt />
      </div>

      <!-- 登录表单区域 -->
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" class="login_form">
        <el-form-item prop="username">
          <!-- 用户名 -->
          <el-input v-model="loginForm.username" prefix-icon="iconfont icon-user"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" type="password" prefix-icon="iconfont icon-3702mima  "></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { async } from 'q';
export default {
  data() {
    return {
      // 这是登录表单的数据绑定对象
      loginForm:{
        username:'admin',
        password:'123456'
      },
      // 这是表单的验证规则对象
      loginFormRules:{
        // 验证用户名是否合法
        username:[
          {required:true,message:'请输入用户名',trigger:'blur'},
          {min:3,max:10,message:'长度在3到10个字符',trigger:'blur' }
        ],
        // 验证密码是否合法
        password:[
          {required:true,message:'请输入密码',trigger:'blur'},
          {min:3,max:10,message:'长度在3到10个字符',trigger:'blur' }
        ]
      }
    };
  },
  methods: {
    // 清空用户名和密码
    resetLoginForm(){
      this.$refs.loginFormRef.resetFields()
    },
    login(){
      this.$refs.loginFormRef.validate(async valid => {
        if(!valid)return//如果验证没通过代码就不会往下执行
        // :res是data的别名  解构赋值
        var {data:res} = await this.$http.post('login',this.loginForm)
        if(res.meta.status!=200)return this.$message.error('登录失败');
        //登录失败
        this.$message.success('登录成功')//登录成功


        
        window.sessionStorage.setItem('token',res.data.token)
        this.$router.push('/home')
      })
    }
  }
};
</script>
<style lang='less' scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  .avatar_box {
    width: 130px;
    height: 130px;
    border-radius: 50%;
    padding: 10px;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 10px #ddd;
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}
 .login_form{
    position: absolute;
    bottom: 0;
    left:0;
    width:100%;
    padding:0 20px;
    box-sizing: border-box;
  }
  .btns{
    display: flex;
    justify-content: flex-end;
  }
</style>